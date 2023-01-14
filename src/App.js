import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './routes/Layout/Layout';
import Home from './routes/Home/Home';
import Favorites from './routes/Favorites/Favorites';
import MovieSingle from './routes/MovieSingle/MovieSingle';

import { library } from '@fortawesome/fontawesome-svg-core';

import {
  faFolderOpen,
  faClock,
  faArrowUpRightFromSquare,
  faCirclePlay,
  faChevronLeft,
  faHeart,
  faCalendarDays,
  faEye,
  faPaste,
  faArrowDownWideShort,
  faArrowUpWideShort,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faFolderOpen,
  faClock,
  faArrowUpRightFromSquare,
  faCirclePlay,
  faChevronLeft,
  faHeart,
  faCalendarDays,
  faEye,
  faPaste,
  faArrowDownWideShort,
  faArrowUpWideShort
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path=":movieId" element={<MovieSingle />} />
          <Route path="favorites" element={<Favorites />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
