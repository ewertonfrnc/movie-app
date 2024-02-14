import { SerializedShow, TMDBShow } from '../../../interfaces/show.interface';
import { UserData } from '../../../interfaces/user.interface';

export function serializeTMDBShow(show: TMDBShow, user: UserData) {
  const {
    belongs_to_collection,
    backdrop_path,
    genres,
    id,
    name,
    overview,
    poster_path,
    release_date,
    runtime,
    status,
    tagline,
    title,
    vote_average,
  } = show;

  return {
    showId: id,
    userId: user.id,
    title: title || name,
    backdrop_path,
    tagline,
    status,
    runtime,
    belongs_to_collection,
    genres,
    overview,
    poster_path,
    release_date,
    vote_average,
  };
}
