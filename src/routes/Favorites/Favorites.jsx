import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { FavoriteContext } from '../../contexts/favorite';

import useFetch from '../../hooks/useFetch';
import useSearchParamsState from '../../hooks/useSearchParamsState';
import Title from '../../components/Title/Title';
import MovieCard from '../../components/MovieCard/MovieCard';
import Loader from '../../components/Loader/Loader';
import Pagination from '../../components/Pagination/Pagination';

import { formatNumber } from '../../utils/functions';

const Favorites = () => {
  const { favoriteIds } = useContext(FavoriteContext);
  const [currentPage, setCurrentPage] = useSearchParamsState('page', 1);

  const moviesUrl =
    process.env.REACT_APP_TMDB_URL +
    'discover/movie?api_key=' +
    process.env.REACT_APP_TMDB_API_KEY +
    '&page=' +
    currentPage +
    '&language=hu-HU&region=HU&include_adult=false&include_video=false';

  const movies = useFetch(moviesUrl);

  const changeCurrentPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <main className="container mx-auto px-4 py-10">
      {movies.results ? (
        <>
          <div className="mb-10">
            <Title type="page">Kedvenc filmek</Title>
          </div>

          <strong>Film ID:</strong> {favoriteIds.join(', ')}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-6">
            {/*movies.results &&
              movies.results.map((movie) => {
                return <MovieCard key={movie.id} movie={movie} />;
              })*/}
          </div>

          {/*<Pagination
            totalPages={movies.total_pages}
            currentPage={currentPage}
            onClickHandler={changeCurrentPage}
          />*/}
        </>
      ) : (
        <div className="flex items-center justify-center h-40">
          <Loader />
        </div>
      )}
    </main>
  );
};

export default Favorites;
