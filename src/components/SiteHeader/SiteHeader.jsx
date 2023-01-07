import { Link } from 'react-router-dom';

import SiteLogo from '../SiteLogo/SiteLogo';

const SiteHeader = () => {
  return (
    <header className="bg-stone-800 text-slate-100 py-6 drop-shadow-lg">
      <div className="container mx-auto px-4 flex items-center">
        <nav className="flex items-center">
          <SiteLogo logoType="primary" />

          <ul className="flex space-x-6 list-none">
            <li>
              <Link
                to="/filmek"
                className="hover:text-lime-500 transition-color duration-300"
              >
                Filmek
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-lime-500 transition-color duration-300"
              >
                Sorozatok
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default SiteHeader;
