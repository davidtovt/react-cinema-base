import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <Link
      to={'/movies/' + movie.id}
      className="relative overflow-hidden rounded-xl drop-shadow-md transition-transform duration-300 hover:scale-95 after:absolute after:block after:z-10 after:w-full after:h-1/2 after:bottom-0 after:left-0 after:bg-gradient-to-t after:from-gray-900"
    >
      <div className="relative before:pb-[150%] before:block">
        <img
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={
            process.env.REACT_APP_TMDB_POSTER_PATH +
            'w' +
            process.env.REACT_APP_TMDB_POSTER_LIST_WIDTH +
            movie.poster_path
          }
          alt={movie.title}
        />
      </div>
      <h5 className="absolute bottom-0 left-0 z-20 w-full px-4 py-6 text-sm font-semibold text-white text-center">
        {movie.title} <span className="block font-normal opacity-50">{movie.release_date}</span>
      </h5>
    </Link>
  );
};

export default MovieCard;
