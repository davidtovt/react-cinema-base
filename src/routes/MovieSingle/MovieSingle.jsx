import { useParams } from 'react-router-dom';

import useFetch from '../../hooks/useFetch';
import PageTitle from '../../components/PageTitle/PageTitle';

const MovieSingle = () => {
  const { movieId } = useParams();

  const movieUrl =
    process.env.REACT_APP_TMDB_URL +
    'movie/' +
    movieId +
    '?api_key=' +
    process.env.REACT_APP_TMDB_API_KEY +
    '&language=hu-HU';

  const keywordsUrl =
    process.env.REACT_APP_TMDB_URL +
    'movie/' +
    movieId +
    '/keywords?api_key=' +
    process.env.REACT_APP_TMDB_API_KEY;

  const movie = useFetch(movieUrl);

  const keywords = useFetch(keywordsUrl);

  console.log(movie);

  console.log(keywords);

  return (
    <main className="pb-10">
      <div
        className="absolute flex items-end w-full min-h-[300px] h-[80vh] bg-center bg-cover opacity-30 after:absolute after:block after:z-1 after:w-full after:h-1/2 after:bottom-0 after:left-0 after:bg-gradient-to-t after:from-stone-900"
        style={{
          backgroundImage:
            'url(' +
            process.env.REACT_APP_TMDB_POSTER_PATH +
            'original' +
            movie.backdrop_path +
            ')',
        }}
      >
      </div>

      <section className="relative z-10 container mx-auto pt-10 px-4">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3">
            <div className="relative before:pb-[150%] before:block">
              {movie.poster_path ? (
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
              ) : (
                <div className="absolute top-0 left-0 w-full h-full bg-stone-800"></div>
              )}
            </div>
          </div>
          <div className="col-span-9">
            <PageTitle secondaryText={movie.release_date}>
              {movie.title}
            </PageTitle>

            <p className="mb-6">{movie.original_title}</p>

            <p className="mb-4">{movie.overview}</p>

            <ul className="mb-4">
              {movie.genres &&
                movie.genres.map((genre) => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MovieSingle;
