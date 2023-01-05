import useFetch from '../../hooks/useFetch';

import { useParams } from 'react-router-dom';

const MovieSingle = () => {
  const { movieId } = useParams();

  const apiUrl =
    process.env.REACT_APP_TMDB_URL +
    'movie/' +
    movieId +
    '?api_key=' +
    process.env.REACT_APP_TMDB_API_KEY +
    '&language=hu-HU';

  const movie = useFetch(apiUrl);

  console.log(movie);

  return (
    <section>
      <h1>{movie.title}</h1>
    </section>
  );
};

export default MovieSingle;
