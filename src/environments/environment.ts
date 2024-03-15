import type { TmdbEnvConfig } from '@libs/tmdb';

export const environment = {
  id: 'amdb',
  name: 'AMDB',
  production: true,
  tmdbConfig: <TmdbEnvConfig>{
    apiKey: '25d5d59107be3550063d92fc082f8668',
    apiBaseUrlV3: 'https://api.themoviedb.org/3',
    apiBaseUrlV4: 'https://api.themoviedb.org/4',
    imageBaseUrl: 'https://image.tmdb.org/t/p/w',
    apiReadAccessToken:
      'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNWQ1ZDU5MTA3YmUzNTUwMDYzZDkyZmMwODJmODY2OCIsInN1YiI6IjVmYmFhMGUzOGRlMGFlMDAzZjRiYzg5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CdnUGnRTYrYpKR3YuADksmSFZLEF8CdTO_5CZrp7O8M',
  },
};
