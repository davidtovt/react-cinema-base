import { createContext, useReducer } from 'react';

export const FavoriteContext = createContext({
  favoriteIds: [],
});

const INITIAL_STATE = {
  favoriteIds: [411, 315162],
};

const ACTION_TYPES = {
  SET_FAVORITE: 'favorite/SET_FAVORITE',
};

const favoriteReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPES.SET_FAVORITE:
      return { state, favoriteIds: payload };
    default:
      throw Error('Favorite reducer error.');
  }
};

export const FavoriteProvider = ({ children }) => {
  const [{ favoriteIds }, dispatch] = useReducer(
    favoriteReducer,
    INITIAL_STATE
  );

  const addToFavorite = (movieId) => {
    const payload = [...favoriteIds, movieId];

    dispatch({ type: ACTION_TYPES.SET_FAVORITE, payload });
  };

  const removeFromFavorite = (movieId) => {
    const payload = favoriteIds.filter((favorite) => favorite !== movieId);

    dispatch({ type: ACTION_TYPES.SET_FAVORITE, payload });
  };

  const toggleFavorite = (movieId) => {
    return !favoriteIds.includes(movieId)
      ? addToFavorite(movieId)
      : removeFromFavorite(movieId);
  };

  return (
    <FavoriteContext.Provider value={{ favoriteIds, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};
