import { Link } from 'react-router-dom';

import Score from '../Score/Score';

const MovieCard = ({ movie }) => {
  return (
    <Link
      to={'/filmek/' + movie.id}
      className="relative overflow-hidden rounded-xl drop-shadow-md transition-transform duration-300 hover:scale-95 after:absolute after:block after:z-10 after:w-full after:h-1/2 after:bottom-0 after:left-0 after:bg-gradient-to-t after:from-stone-800"
    >
      <div className="relative before:pb-[150%] before:block">
        {movie.poster_path ? (
          <img
            className="absolute top-0 left-0 w-full h-full object-cover"
            src={
              process.env.REACT_APP_TMDB_POSTER_PATH +
              'w300' +
              movie.poster_path
            }
            alt={movie.title}
          />
        ) : (
          <div className="absolute flex top-0 left-0 w-full h-full items-center p-3 text-center justify-center uppercase font-bold text-4xl opacity-30 bg-stone-700">
            Hiányzó borítókép
          </div>
        )}
      </div>
      <h5 className="absolute bottom-0 left-0 z-20 w-full px-4 py-5 font-semibold text-white text-center leading-tight">
        {movie.title}
        <span className="block text-sm font-normal opacity-50 mt-2">
          {movie.release_date}
        </span>
      </h5>

      {movie.vote_average > 0 && <Score score={movie.vote_average} className="absolute top-4 right-4" />}
    </Link>
  );
};

export default MovieCard;
