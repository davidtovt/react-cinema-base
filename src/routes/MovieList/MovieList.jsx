import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPaste,
  faArrowDownWideShort,
  faArrowUpWideShort,
} from '@fortawesome/free-solid-svg-icons';

import useFetch from '../../hooks/useFetch';
import useSearchParamsState from '../../hooks/useSearchParamsState';
import PageTitle from '../../components/PageTitle/PageTitle';
import MovieCard from '../../components/MovieCard/MovieCard';
import Loader from '../../components/Loader/Loader';
import Pagination from '../../components/Pagination/Pagination';

import { formatNumber } from '../../utils/functions';

library.add(faPaste, faArrowDownWideShort, faArrowUpWideShort);

/**
 * Component
 */

const MovieList = () => {
  const [currentPage, setCurrentPage] = useSearchParamsState('page', 1);
  const [sortBy, setSortBy] = useSearchParamsState('sortBy', 'popularity');
  const [orderBy, setOrderBy] = useSearchParamsState('orderBy', 'desc');

  const moviesUrl =
    process.env.REACT_APP_TMDB_URL +
    'discover/movie?api_key=' +
    process.env.REACT_APP_TMDB_API_KEY +
    '&sort_by=' +
    sortBy +
    '.' +
    orderBy +
    '&page=' +
    currentPage +
    '&language=hu-HU&region=HU&include_adult=false&include_video=false';

  const movies = useFetch(moviesUrl);

  const changeCurrentPage = (page) => {
    setCurrentPage(page);
  };

  const sortByHandler = (event) => {
    const newSortBy = event.target.value;

    setSortBy(newSortBy);
  };

  const orderByHandler = () => {
    const newOrderBy = orderBy === 'asc' ? 'desc' : 'asc';

    setOrderBy(newOrderBy);
  };

  return (
    <main className="container mx-auto px-4 py-10">
      {movies.results ? (
        <>
          <div className="grid grid-cols-12 items-center mb-6">
            <div className="col-span-7">
              <PageTitle
                secondaryText={formatNumber(movies.total_results) + ' db'}
              >
                Filmek
              </PageTitle>
            </div>

            <div className="flex items-center justify-end col-span-5 mb-1">
              <label className="mb-3 mr-5" htmlFor="list-sort-by">
                Rendezés
              </label>
              <select
                onChange={sortByHandler}
                value={sortBy}
                id="list-sort-by"
                className="w-80 bg-stone-400 border-stone-500 text-stone-900 pl-4 pr-10 py-3 rounded-xl w-full mb-3"
              >
                <option value="popularity">Népszerűség szerint</option>
                <option value="release_date">Megjelenés szerint</option>
                <option value="title">Cím szerint</option>
                <option value="vote_average">Értékelés szerint</option>
              </select>
              <button
                onClick={orderByHandler}
                className="flex items-center mb-3 ml-5 transition-color duration-300 hover:text-lime-500"
              >
                <FontAwesomeIcon
                  className="text-xl"
                  icon={
                    'fa-solid fa-arrow-' +
                    (orderBy === 'asc' ? 'up' : 'down') +
                    '-wide-short'
                  }
                />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-6 mb-6">
            {movies.results &&
              movies.results.map((movie) => {
                return <MovieCard key={movie.id} movie={movie} />;
              })}
          </div>

          <Pagination
            totalPages={movies.total_pages}
            currentPage={currentPage}
            onClickHandler={changeCurrentPage}
          />
        </>
      ) : (
        <div className="flex items-center justify-center h-40">
          <Loader />
        </div>
      )}
    </main>
  );
};

export default MovieList;
