export type VideoTrailer = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
};

export type TMDBShow = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  genres: {
    id: number;
    name: string;
  }[];
  id: number;
  overview: string;
  poster_path: string;
  release_date: string;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  title: string;
  vote_average: number;
  vote_count: number;
  name: string;
  type: string;
  media_type: string;
  seasons: SeasonDetails[];
};

export type SeasonDetails = {
  showId: number;
  finished_watching: boolean;
  episode_count: number;
  air_date: string;
  name: string;
  overview: string;
  id: number;
  poster_path: string;
  season_number: number;
  vote_average: number;
  episodes: Episode[];
};

export type Episode = {
  air_date: string;
  episode_number: number;
  episode_type: string;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
  isWatched: boolean;
};

export type Cast = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  character: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  department: string;
  job: string;
};

export type Show = {
  movieId: number;
  title: string;
  tagline: string;
  backdropPath: string;
  posterPath: string;
  releaseDate: string;
  mediaType: string;
  runtime: number;
  voteAverage: number;
  genre: string;
  overview: string;
};

export type WatchedMovie = {
  title: string;
  userId: string;
  movieId: number;
};

export type SUPAEpisode = {
  userId: string;
  showId: number;
  showName: string;
  seasonNumber: number;
  episodeId: number;
  episodeName: string;
  episodeNumber: number;
  stillPath: string;
  created_at?: string;
  showPoster: string;
  showBackdropPath: string;
};

export type MovieGenre = {
  id: number;
  name: string;
};

export type SerializedShow = {
  showId: number;
  userId: string;
  title: string;
  backdrop_path: string;
  tagline: string;
  status: string;
  runtime: number;
};
