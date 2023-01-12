import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './routes/Layout/Layout';
import Home from './routes/Home/Home';
import MovieSingle from './routes/MovieSingle/MovieSingle';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path=":movieId" element={<MovieSingle />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
