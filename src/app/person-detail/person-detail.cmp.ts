import { coerceNumberProperty } from '@angular/cdk/coercion';
import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import {
  TMDB_ENV_CONFIG,
  Tmdb,
  TmdbHttpApiService,
  WithContext,
} from '@libs/tmdb';
import { signalState } from '@ngrx/signals';
import { ScreenService } from '@ui';

type SubState<T> = WithContext<T | undefined>;

interface State {
  details: SubState<Tmdb.PersonDetail>;
}

const initialState: State = {
  details: {
    loading: false,
    value: undefined,
  },
};

@Component({
  standalone: true,
  selector: 'app-person-detail',
  styleUrl: 'person-detail.cmp.scss',
  templateUrl: 'person-detail.cmp.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [JsonPipe],
})
export class PersonDetailCmp implements OnInit {
  #title = inject(Title);
  #destroyRef = inject(DestroyRef);
  readonly id = input.required<number, string>({
    transform: coerceNumberProperty,
    alias: 'personId',
  });
  protected config = inject(TMDB_ENV_CONFIG);
  protected api = inject(TmdbHttpApiService);
  protected screen = inject(ScreenService);

  readonly detail = signal<Tmdb.PersonDetail | null>(null);

  get baseMediaUrl() {
    return 'https://media.themoviedb.org/t/p/w';
  }

  readonly state = signalState(initialState);

  ngOnInit() {
    this.api
      .getPersonDetail(this.id())
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((x) => {
        this.detail.set(x);
      });
  }

  setTitle = effect(() => {
    const details = this.state.details().value;
    if (details?.name) {
      this.#title.setTitle(`${details?.name} | Person`);
    }
  });
}
