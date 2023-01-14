import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { FavoriteProvider } from './contexts/favorite';
import reportWebVitals from './reportWebVitals';

import './styles/style.scss';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <FavoriteProvider>
      <App />
    </FavoriteProvider>
  </React.StrictMode>
);

reportWebVitals();
