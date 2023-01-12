import { Link } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faCalendarDays,
  faEye,
} from '@fortawesome/free-solid-svg-icons';

import SiteLogo from '../SiteLogo/SiteLogo';

library.add(faHeart, faCalendarDays, faEye);

const SiteHeader = () => {
  return (
    <header className="bg-gradient-to-r from-stone-800 to-stone-900 text-slate-100 py-6 drop-shadow-lg">
      <div className="container mx-auto px-4 flex items-center">
        <nav className="flex items-center w-full">
          <SiteLogo logoType="primary" />

          <ul className="flex space-x-8 list-none ml-auto">
            <li>
              <Link
                to="/"
                className="hover:text-lime-500 transition-color duration-300"
              >
                <FontAwesomeIcon className="md:mr-3" icon="fa-solid fa-heart" />
                <span className="hidden md:inline">Kedvencek</span>
              </Link>
            </li>
            <li>
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
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default SiteHeader;
