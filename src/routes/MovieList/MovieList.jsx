import { useState, useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPaste,
  faArrowDownWideShort,
  faArrowUpWideShort,
} from '@fortawesome/free-solid-svg-icons';

import useFetch from '../../hooks/useFetch';
import PageTitle from '../../components/PageTitle/PageTitle';
import MovieCard from '../../components/MovieCard/MovieCard';
import Loader from '../../components/Loader/Loader';
import Pagination from '../../components/Pagination/Pagination';

import { formatNumber } from '../../utils/functions';

library.add(faPaste, faArrowDownWideShort, faArrowUpWideShort);

const MovieList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('popularity');
  const [orderBy, setOrderBy] = useState('desc');

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

  const orderByHandler = () => {
    setOrderBy(orderBy === 'asc' ? 'desc' : 'asc');

    const urlParams = new URLSearchParams(window.location.search);

    urlParams.set('orderBy', orderBy);

    window.history.replaceState(null, null, '?' + urlParams.toString());
  };

  const sortByHandler = (event) => {
    setSortBy(event.target.value);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.get('oldal')) {
      setCurrentPage(urlParams.get('oldal'));
    }
  }, []);

  return (
    <main className="container mx-auto px-4 py-10">
      {movies.results ? (
        <>
          <div className="grid grid-cols-12 items-center mb-6">
            <div className="col-span-9">
              <PageTitle
                secondaryText={formatNumber(movies.total_results) + ' db'}
              >
                Filmek
              </PageTitle>
            </div>

            <div className="flex items-center col-span-3 mb-1">
              <button
                onClick={orderByHandler}
                className="mb-3 mr-5 text-xl transition-color duration-300 hover:text-lime-500"
              >
                <FontAwesomeIcon
                  icon={
                    'fa-solid fa-arrow-' +
                    (orderBy === 'asc' ? 'up' : 'down') +
                    '-wide-short'
                  }
                />
                <div className="sr-only">Rendezés</div>
              </button>
              <select
                onChange={sortByHandler}
                className="bg-stone-400 border-stone-500 text-stone-900 pl-4 pr-10 py-3 rounded-xl w-full mb-3"
              >
                <option value="popularity">Népszerűség szerint</option>
                <option value="release_date">Megjelenés szerint</option>
                <option value="title">Cím szerint</option>
                <option value="vote_average">Értékelés szerint</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-6 mb-6">
            {movies.results &&
              movies.results.map((movie) => {
                return <MovieCard key={movie.id} movie={movie} />;
              })}
          </div>

          <Pagination
            baseUrl="?oldal="
            totalPages={movies.total_pages}
            currentPage={currentPage}
            onClickHandler={(page) => setCurrentPage(page)}
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
