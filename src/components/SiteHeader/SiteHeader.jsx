import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { FavoriteContext } from '../../contexts/favorite';

import SiteLogo from '../SiteLogo/SiteLogo';

const SiteHeader = () => {
  const { favoriteIds } = useContext(FavoriteContext);

  return (
    <header className="bg-gradient-to-r from-stone-800 to-stone-900 text-slate-100 py-6 drop-shadow-lg">
      <div className="container mx-auto px-4 flex items-center">
        <nav className="flex items-center w-full">
          <SiteLogo logoType="primary" />

          <ul className="flex space-x-8 list-none ml-auto">
            <li>
              <Link
                to="favorites"
                className="relative hover:text-lime-500 transition-color duration-300"
              >
                <FontAwesomeIcon className="md:mr-3" icon="fa-solid fa-heart" />
                <span className="hidden md:inline">Kedvencek</span>
                {favoriteIds.length > 0 && (
                  <span className="absolute flex items-center justify-center -top-2 left-2 text-xs w-5 h-5 bg-lime-500 border-2 border-stone-900 text-stone-900 rounded-full">
                    {favoriteIds.length}
                  </span>
                )}
              </Link>
            </li>
            {/*<li>
              <Link
                to="/"
                className="hover:text-lime-500 transition-color duration-300"
              >
                <FontAwesomeIcon
                  className="md:mr-3"
                  icon="fa-solid fa-calendar-days"
                />
                <span className="hidden md:inline">Megnézendő</span>
              </Link>
            </li>*/}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default SiteHeader;
