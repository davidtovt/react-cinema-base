import { useParams } from 'react-router-dom';
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
import Title from '../../components/Title/Title';
import Score from '../../components/Score/Score';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader/Loader';
import MovieCard from '../../components/MovieCard/MovieCard';
import GalleryCard from '../../components/GalleryCard/GalleryCard';
import UserCard from '../../components/UserCard/UserCard';

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
              <Button
                to={-1}
                variant="link"
                size="sm"
                color="white"
                extraClassNames="mb-6"
              >
                <FontAwesomeIcon
                  className="mr-2 text-lime-500"
                  icon="fa-solid fa-chevron-left"
                />
                Vissza a filmekhez
              </Button>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="hidden lg:block col-span-1 lg:col-span-3">
                  <MovieCard key={movie.id} movie={movie} empty />
                </div>
                <div className="col-span-1 lg:col-span-9 flex flex-col">
                  <div className="block md:flex items-center mb-6">
                    <div className="mr-4">
                      <Title
                        type="page"
                        secondaryText={
                          movie.release_date && movie.release_date.split('-')[0]
                        }
                      >
                        {movie.title}
                      </Title>

                      <ul className="flex flex-wrap -mt-2">
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

                          <ul className="flex flex-wrap">
                            {movie.genres &&
                              movie.genres.map((genre) => (
                                <li className="mr-3" key={genre.id}>
                                  {genre.name}
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
                      <div className="flex items-center ml-auto mt-6 mt-lg-0">
                        <span className="leading-none mr-3 md:text-right">
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
                      <div className="col-span-12 md:col-span-6">
                        <h4 className="text-base font-bold mb-1">Rendező</h4>

                        <p className="mb-4">{directors.join(', ')}</p>
                      </div>

                      <div className="col-span-12 md:col-span-6">
                        <h4 className="text-base font-bold mb-1">Író</h4>

                        <p className="mb-4">{writers.join(', ')}</p>
                      </div>

                      <div className="col-span-12 md:col-span-6">
                        <h4 className="text-base font-bold mb-1">
                          Eredeti cím
                        </h4>

                        <p className="mb-4">{movie.original_title}</p>
                      </div>

                      <div className="col-span-12 md:col-span-6">
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
              <Title type="section">Képek</Title>

              <LightGallery elementClassNames="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-1 mb-10">
                {imageBackdrops &&
                  imageBackdrops.map((image, index) => (
                    <GalleryCard key={index} path={image.file_path} title={movie.title} />
                  ))}
              </LightGallery>

              <Title type="section">Színészek</Title>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-6 mb-6">
                {credits.cast &&
                  credits.cast.map((cast) => (
                    <UserCard key={cast.id} user={cast} />
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
