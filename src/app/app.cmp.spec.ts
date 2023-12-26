import { TestBed } from '@angular/core/testing';
import { AppCmp } from './app.cmp';

describe('AppCmp', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppCmp],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppCmp);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'amdb' title`, () => {
    const fixture = TestBed.createComponent(AppCmp);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('amdb');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppCmp);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, amdb');
  });
});
