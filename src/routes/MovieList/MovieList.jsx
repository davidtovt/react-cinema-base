import useFetch from '../../hooks/useFetch';
import PageTitle from '../../components/PageTitle/PageTitle';
import MovieCard from '../../components/MovieCard/MovieCard';
import Loader from '../../components/Loader/Loader';

import { formatNumber } from '../../utils/functions';

const MovieList = () => {
  const apiUrl =
    process.env.REACT_APP_TMDB_URL +
    'discover/movie?api_key=' +
    process.env.REACT_APP_TMDB_API_KEY +
    '&language=hu-HU&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate';

  const movies = useFetch(apiUrl);

  return (
    <section>
      {movies.results ? (
        <>
          <div className="flex mb-6">
            <PageTitle
              secondaryText={
                'Total result: ' + formatNumber(movies.total_results)
              }
            >
              Movies
            </PageTitle>

            <select className="py-3 px-4 rounded-xl ml-auto mb-4">
              <option value="0">Rendezés</option>
            </select>
          </div>

          <div className="grid grid-cols-5 gap-6">
            {movies.results &&
              movies.results.map((movie) => {
                return <MovieCard key={movie.id} movie={movie} />;
              })}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-40">
          <Loader />
        </div>
      )}
    </section>
  );
};

export default MovieList;
