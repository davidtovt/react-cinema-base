import { Link, useParams } from 'react-router-dom';
import LightGallery from 'lightgallery/react';

import lgVideo from 'lightgallery/plugins/video';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFolderOpen,
  faClock,
  faArrowUpRightFromSquare,
  faCirclePlay,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';

import useFetch from '../../hooks/useFetch';
import PageTitle from '../../components/PageTitle/PageTitle';
import Score from '../../components/Score/Score';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader/Loader';

import 'lightgallery/scss/lightgallery.scss';
import 'lightgallery/scss/lg-video.scss';

library.add(
  faFolderOpen,
  faClock,
  faArrowUpRightFromSquare,
  faCirclePlay,
  faChevronLeft
);

/**
 * Functions
 */

const getCredits = (credits, department, job) => {
  const list = [];

  credits.crew &&
    Object.values(credits.crew).forEach((crew) => {
      if (crew.department === department && job.includes(crew.job)) {
        list.push(crew.name);
      }
    });

  return list;
};

const getCountries = (production_countries, countries) => {
  const countriesList = [];

  production_countries &&
    production_countries.forEach((production_country) => {
      const result = Object.values(countries).filter(
        (country) => country.iso_3166_1 === production_country.iso_3166_1
      );

      result.forEach((value) => {
        countriesList.push(value.native_name);
      });
    });

  return countriesList;
};

/**
 * Component
 */

const MovieSingle = () => {
  const { movieId } = useParams();

  const movieUrl =
    process.env.REACT_APP_TMDB_URL +
    'movie/' +
    movieId +
    '?api_key=' +
    process.env.REACT_APP_TMDB_API_KEY +
    '&language=hu-HU';

  const videosUrl =
    process.env.REACT_APP_TMDB_URL +
    'movie/' +
    movieId +
    '/videos?api_key=' +
    process.env.REACT_APP_TMDB_API_KEY +
    '&language=hu-HU';

  const creditsUrl =
    process.env.REACT_APP_TMDB_URL +
    'movie/' +
    movieId +
    '/credits?api_key=' +
    process.env.REACT_APP_TMDB_API_KEY +
    '&language=hu-HU';

  const externalIdsUrl =
    process.env.REACT_APP_TMDB_URL +
    'movie/' +
    movieId +
    '/external_ids?api_key=' +
    process.env.REACT_APP_TMDB_API_KEY +
    '&language=hu-HU';

  const countryUrl =
    process.env.REACT_APP_TMDB_URL +
    'configuration/countries?api_key=' +
    process.env.REACT_APP_TMDB_API_KEY +
    '&language=hu-HU';

  const imagesUrl =
    process.env.REACT_APP_TMDB_URL +
    'movie/' +
    movieId +
    '/images?api_key=' +
    process.env.REACT_APP_TMDB_API_KEY;

  const movie = useFetch(movieUrl);
  const videos = useFetch(videosUrl);
  const credits = useFetch(creditsUrl);
  const externalIds = useFetch(externalIdsUrl);
  const countries = useFetch(countryUrl);
  const images = useFetch(imagesUrl);

  const directors = getCredits(credits, 'Directing', 'Director');
  const writers = getCredits(credits, 'Writing', ['Writer', 'Story', 'Novel']);

  const videosResult =
    videos.results &&
    videos.results.filter((video) => video.site === 'YouTube');

  const videoTrailer =
    videosResult && videosResult.filter((video) => video.type === 'Trailer');

  const countriesResult = getCountries(movie.production_countries, countries);

  const imageBackdrops =
    images.backdrops &&
    images.backdrops.filter(
      (image) => image.iso_639_1 === 'hu' || image.iso_639_1 === null
    );

  const contentLoaded =
    Object.keys(movie).length &&
    Object.keys(videos).length &&
    Object.keys(credits).length &&
    Object.keys(externalIds).length &&
    Object.keys(countries).length &&
    Object.keys(images).length;

  return (
    <main className="pb-10">
      {contentLoaded ? (
        <>
          <section
            className="relative bg-top bg-cover after:absolute after:block after:z-1 after:w-full after:h-full after:bottom-0 after:left-0 after:bg-gradient-to-t after:from-stone-900/[.95] after:to-stone-900/[.50]"
            style={
              movie.backdrop_path && {
                backgroundImage:
                  'url(' +
                  process.env.REACT_APP_TMDB_POSTER_PATH +
                  'original' +
                  movie.backdrop_path +
                  ')',
              }
            }
          >
            <div className="relative z-10 container mx-auto py-10 px-4 text-white">
              <Link
                to={-1}
                className="inline-flex items-center mb-6 px-4 py-2 rounded-lg text-sm font-bold bg-white/10 backdrop-blur hover:bg-white/20 transition-colors"
              >
                <FontAwesomeIcon
                  className="mr-2 text-lime-500"
                  icon="fa-solid fa-chevron-left"
                />
                Vissza a filmekhez
              </Link>

              <div className="grid grid-cols-12 gap-10">
                <div className="col-span-3">
                  <div className="relative overflow-hidden rounded-xl before:pb-[150%] before:block">
                    {movie.poster_path ? (
                      <img
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        src={
                          process.env.REACT_APP_TMDB_POSTER_PATH +
                          'w500' +
                          movie.poster_path
                        }
                        alt={movie.title}
                      />
                    ) : (
                      <div className="absolute top-0 left-0 w-full h-full bg-stone-800"></div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col col-span-9">
                  <div className="flex items-center mb-6">
                    <div>
                      <PageTitle
                        secondaryText={
                          movie.release_date && movie.release_date.split('-')[0]
                        }
                      >
                        {movie.title}
                      </PageTitle>

                      <ul className="flex -mt-2">
                        <li className="mr-6">
                          <FontAwesomeIcon
                            className="mr-3 opacity-60"
                            icon="fa-solid fa-clock"
                          />
                          {movie.runtime} perc
                        </li>
                        <li className="flex items-center mr-3">
                          <FontAwesomeIcon
                            className="mr-3 opacity-60"
                            icon="fa-solid fa-folder-open"
                          />

                          <ul className="flex">
                            {movie.genres &&
                              movie.genres.map((genre) => (
                                <li className="mr-3" key={genre.id}>
                                  <Link className="underline underline-offset-2 hover:no-underline">
                                    {genre.name}
                                  </Link>
                                </li>
                              ))}
                          </ul>
                        </li>
                        {externalIds.imdb_id && (
                          <li>
                            <a
                              href={
                                'https://www.imdb.com/title/' +
                                externalIds.imdb_id
                              }
                              target="_blank"
                              rel="noreferrer"
                              className="underline underline-offset-2 hover:no-underline"
                            >
                              <FontAwesomeIcon
                                className="mr-3 opacity-60"
                                icon="fa-solid fa-arrow-up-right-from-square"
                              />
                              IMDb
                            </a>
                          </li>
                        )}
                      </ul>
                    </div>

                    {movie.vote_average > 0 ? (
                      <div className="flex items-center ml-auto">
                        <span className="leading-none mr-3 text-right">
                          <strong>{movie.vote_count.toLocaleString()}</strong>
                          <span className="block text-sm">értékelés</span>
                        </span>

                        <Score
                          score={movie.vote_average}
                          size="large"
                          className="relative"
                        />
                      </div>
                    ) : (
                      ''
                    )}
                  </div>

                  <div className="max-w-4xl">
                    <h4 className="text-xl font-bold mb-1">Bevezető</h4>

                    <p className="mb-6 text-lg">{movie.overview}</p>

                    <div className="grid grid-cols-12 text-sm mb-2">
                      <div className="col-span-6">
                        <h4 className="text-base font-bold mb-1">Rendező</h4>

                        <p className="mb-4">{directors.join(', ')}</p>
                      </div>

                      <div className="col-span-6">
                        <h4 className="text-base font-bold mb-1">Író</h4>

                        <p className="mb-4">{writers.join(', ')}</p>
                      </div>

                      <div className="col-span-6">
                        <h4 className="text-base font-bold mb-1">
                          Eredeti cím
                        </h4>

                        <p className="mb-4">{movie.original_title}</p>
                      </div>

                      <div className="col-span-6">
                        <h4 className="text-base font-bold mb-1">
                          Rendező ország
                        </h4>

                        <p className="mb-4">{countriesResult.join(', ')}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto">
                    {videoTrailer && videoTrailer[0] && (
                      <LightGallery plugins={[lgVideo]}>
                        <Button
                          href={
                            'https://www.youtube.com/watch?v=' +
                            videoTrailer[0].key +
                            '&mute=0'
                          }
                        >
                          <FontAwesomeIcon
                            className="mr-3 text-3xl text-lime-500"
                            icon="fa-solid fa-circle-play"
                          />
                          Előzetes megtekintése
                        </Button>
                      </LightGallery>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="pt-10">
            <div className="container mx-auto px-4">
              <h2 className="text-stone-200 text-3xl font-bold mb-6">Képek</h2>

              <LightGallery elementClassNames="grid grid-cols-5 gap-1 mb-10">
                {imageBackdrops &&
                  imageBackdrops.map((image) => (
                    <a
                      href={
                        process.env.REACT_APP_TMDB_POSTER_PATH +
                        'original' +
                        image.file_path
                      }
                      className="relative overflow-hidden before:pb-[50%] before:block rounded"
                    >
                      <img
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        src={
                          process.env.REACT_APP_TMDB_POSTER_PATH +
                          'w300' +
                          image.file_path
                        }
                        alt={movie.title}
                      />
                    </a>
                  ))}
              </LightGallery>

              <h2 className="text-stone-200 text-3xl font-bold mb-6">
                Színészek
              </h2>

              <div className="grid grid-cols-7 gap-6 mb-6">
                {credits.cast &&
                  credits.cast.map((cast) => (
                    <div
                      key={cast.id}
                      className="relative overflow-hidden rounded-xl drop-shadow-md bg-stone-800"
                    >
                      <div className="relative before:pb-[150%] before:block">
                        {cast.profile_path ? (
                          <img
                            className="absolute top-0 left-0 w-full h-full object-cover"
                            src={
                              process.env.REACT_APP_TMDB_POSTER_PATH +
                              'w185' +
                              cast.profile_path
                            }
                            alt={cast.name}
                          />
                        ) : (
                          <div className="absolute flex top-0 left-0 w-full h-full items-center p-3 text-center justify-center uppercase font-bold text-4xl opacity-30 bg-stone-700">
                            Hiányzó kép
                          </div>
                        )}
                      </div>
                      <div className="py-3 px-4">
                        <h5 className="font-bold text-white">{cast.name}</h5>
                        <span className="block text-sm leading-tight">
                          {cast.character}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        <div className="flex items-center justify-center h-40">
          <Loader />
        </div>
      )}
    </main>
  );
};

export default MovieSingle;
