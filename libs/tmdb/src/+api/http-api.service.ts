import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { TMDB_ENV_CONFIG } from '../+core/tmdb-env.provider';
import type { ExternalIds, TvSeriesDetails } from '../+models';
import type { TmdbReqParams } from '../+models/request-params';
import type { TmdbRespBody } from '../+models/response-body';
import { Tmdb } from '..';

@Injectable({ providedIn: 'root' })
export class TmdbHttpApiService {
  readonly #config = inject(TMDB_ENV_CONFIG);
  readonly #http = inject(HttpClient);
  readonly url = {
    movie: () => `${this.#config.apiBaseUrlV3}/movie`,
    tvShows: () => `${this.#config.apiBaseUrlV3}/tv`,
    company: () => `${this.#config.apiBaseUrlV3}/company`,
    person: () => `${this.#config.apiBaseUrlV3}/person`,
    nowPlayingMovies: () => `${this.url.movie()}/now_playing`,
    topRatedMovies: () => `${this.url.movie()}/top_rated`,
    popularMovies: () => `${this.url.movie()}/popular`,
    movieExternalIds: (id: number) => `${this.url.movie()}/${id}/external_ids`,
    airingTvShows: () => `${this.url.tvShows()}/airing_today`,
    trendingPeople: () => `${this.#config.apiBaseUrlV3}/trending/person/day`,
    tvSeriesDetail: (id: number) => `${this.url.tvShows()}/${id}`,
    tvSeriesKeywords: (id: number) => `${this.url.tvShows()}/${id}/keywords`,
    personDetail: (id: number) => `${this.url.person()}/${id}`,
    tvSeriesExternalIds: (id: number) => {
      return `${this.url.tvShows()}/${id}/external_ids`;
    },
    tvSeriesCredits: (id: number) => {
      return `${this.url.tvShows()}/${id}/aggregate_credits`;
    },
    tvSeriesReviews: (id: number) => {
      return `${this.url.tvShows()}/${id}/reviews`;
    },
    tvSeriesVideos: (id: number) => {
      return `${this.url.tvShows()}/${id}/videos`;
    },
    tvSeriesImages: (id: number) => {
      return `${this.url.tvShows()}/${id}/images`;
    },
    tvSeriesRecommendations: (id: number) => {
      return `${this.url.tvShows()}/${id}/recommendations`;
    },
  } as const;

  /**
   * @see https://developer.themoviedb.org/reference/movie-popular-list
   */
  getPopularMovies(params?: TmdbReqParams.GetMovieList) {
    return this.#http.get<TmdbRespBody.GetMovieList>(this.url.popularMovies(), {
      params,
    });
  }

  /**
   * @see https://developer.themoviedb.org/reference/movie-top-rated-list
   */
  getTopRatedMovies(params?: TmdbReqParams.GetMovieList) {
    return this.#http.get<TmdbRespBody.GetMovieList>(
      this.url.topRatedMovies(),
      { params },
    );
  }

  /**
   * @see https://developer.themoviedb.org/reference/movie-now-playing-list
   */
  getNowPlayingMovies(params?: TmdbReqParams.GetMovieList) {
    return this.#http.get<TmdbRespBody.GetMovieList>(
      this.url.nowPlayingMovies(),
      { params },
    );
  }

  /**
   * @see https://developer.themoviedb.org/reference/tv-series-airing-today-list
   */
  getAiringTvShows(params?: TmdbReqParams.GetTvShowList) {
    return this.#http.get<TmdbRespBody.GetTvShowList>(
      this.url.airingTvShows(),
      { params },
    );
  }

  /**
   * @see https://developer.themoviedb.org/reference/trending-people
   */
  getTrendingPeople(language: string) {
    return this.#http.get<TmdbRespBody.GetPeopleList>(
      this.url.trendingPeople(),
      {
        params: { language },
      },
    );
  }

  /**
   * @see https://developer.themoviedb.org/reference/tv-series-details
   */
  getTvSeriesDetails(seriesId: number, language: string) {
    return this.#http.get<TvSeriesDetails>(this.url.tvSeriesDetail(seriesId), {
      params: { language },
    });
  }

  /**
   * @see https://developer.themoviedb.org/reference/tv-series-keywords
   */
  getTvSeriesKeywords(seriesId: number) {
    return this.#http.get<TmdbRespBody.GetKeywordList>(
      this.url.tvSeriesKeywords(seriesId),
    );
  }

  /**
   * @see https://developer.themoviedb.org/reference/movie-external-ids
   */
  getMovieExternalIds(id: number) {
    return this.#http.get<ExternalIds>(this.url.movieExternalIds(id));
  }

  /**
   * @see https://developer.themoviedb.org/reference/tv-series-external-ids
   */
  getTvSeriesExternalIds(id: number) {
    return this.#http.get<ExternalIds>(this.url.tvSeriesExternalIds(id));
  }

  /**
   * @see https://developer.themoviedb.org/reference/tv-series-aggregate-credits
   */
  getTvSeriesCredits(id: number, language: string) {
    return this.#http.get<TmdbRespBody.GetMovieCredits>(
      this.url.tvSeriesCredits(id),
      {
        params: { language },
      },
    );
  }

  /**
   * @see https://developer.themoviedb.org/reference/tv-series-reviews
   */
  getTvSeriesReviews(id: number, language: string) {
    return this.#http.get<TmdbRespBody.GetReviews>(
      this.url.tvSeriesReviews(id),
      { params: { language } },
    );
  }

  /**
   * @see https://developer.themoviedb.org/reference/tv-series-videos
   */
  getTvSeriesVideos(id: number, language: string) {
    return this.#http.get<TmdbRespBody.GetVideos>(this.url.tvSeriesVideos(id), {
      params: { language },
    });
  }

  /**
   * @see https://developer.themoviedb.org/reference/tv-series-images
   */
  getTvSeriesImages(id: number, language: string) {
    return this.#http.get<TmdbRespBody.GetImages>(this.url.tvSeriesImages(id), {
      params: { language },
    });
  }

  /**
   * @see https://developer.themoviedb.org/reference/tv-series-recommendations
   */
  getTvSeriesRecommendations(id: number, language: string, page = 1) {
    return this.#http.get<TmdbRespBody.GetTvShowRecommendations>(
      this.url.tvSeriesRecommendations(id),
      {
        params: {
          language,
          page,
        },
      },
    );
  }

  /**
   * @see https://developer.themoviedb.org/person/${id}
   */
  getPersonDetail(id: number) {
    return this.#http.get<Tmdb.PersonDetail>(
      this.url.personDetail(id),
    );
  }
}
