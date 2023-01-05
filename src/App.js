import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './routes/Layout/Layout';
import Home from './routes/Home/Home';
import MovieList from './routes/MovieList/MovieList';
import MovieSingle from './routes/MovieSingle/MovieSingle';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="movies">
            <Route index element={<MovieList />} />
            <Route path=":movieId" element={<MovieSingle />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
