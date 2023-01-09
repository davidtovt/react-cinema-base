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
} from '@fortawesome/free-solid-svg-icons';

import useFetch from '../../hooks/useFetch';
import PageTitle from '../../components/PageTitle/PageTitle';
import Score from '../../components/Score/Score';
import Button from '../../components/Button/Button';

import 'lightgallery/scss/lightgallery.scss';
import 'lightgallery/scss/lg-video.scss';

library.add(faFolderOpen, faClock, faArrowUpRightFromSquare, faCirclePlay);

/**
 * Functions
 */

const getCrew = (credits, department, job) => {
  const list = [];

  credits.crew &&
    Object.values(credits.crew).forEach((crew) => {
      if (crew.department === department && job.includes(crew.job)) {
        list.push(crew.name);
      }
    });

  return list;
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

  const movie = useFetch(movieUrl);
  const videos = useFetch(videosUrl);
  const credits = useFetch(creditsUrl);
  const externalIds = useFetch(externalIdsUrl);

  const directors = getCrew(credits, 'Directing', 'Director');
  const writers = getCrew(credits, 'Writing', ['Writer', 'Story', 'Novel']);

  const videosResult =
    videos.results &&
    videos.results.filter((video) => video.site === 'YouTube');

  const videoTrailer =
    videosResult && videosResult.filter((video) => video.type === 'Trailer');

  //console.log(videos);

  return (
    <main className="pb-10">
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
                    <li className="mr-6">
                      <FontAwesomeIcon
                        className="mr-3 opacity-60"
                        icon="fa-solid fa-clock"
                      />
                      {movie.runtime} perc
                    </li>
                    {externalIds.imdb_id && (
                      <li>
                        <a
                          href={
                            'https://www.imdb.com/title/' + externalIds.imdb_id
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

                <div className="grid grid-cols-12">
                  <div className="col-span-6">
                    <h4 className="text-lg font-bold mb-1">Rendező</h4>

                    <p className="mb-6">{directors.join(', ')}</p>
                  </div>

                  <div className="col-span-6">
                    <h4 className="text-lg font-bold mb-1">Író</h4>

                    <p className="mb-6">{writers.join(', ')}</p>
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
          <p className="mb-6">{movie.original_title}</p>
        </div>
      </section>
    </main>
  );
};

export default MovieSingle;
