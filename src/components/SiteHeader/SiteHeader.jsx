import { Link } from 'react-router-dom';

import SiteLogo from '../SiteLogo/SiteLogo';

const SiteHeader = () => {
  return (
    <header className="bg-gradient-to-r from-slate-900 to-slate-600 text-slate-100 py-6">
      <div className="container mx-auto px-4 flex items-center">
        <nav className="flex items-center">
          <SiteLogo logoType="primary" />

          <ul className="flex space-x-6 list-none">
            <li>
              <Link
                to="/movies"
                className="hover:text-lime-500 transition-color duration-300"
              >
                Movies
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-lime-500 transition-color duration-300"
              >
                Series
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default SiteHeader;
