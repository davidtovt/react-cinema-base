import { Outlet } from 'react-router-dom';

import SiteHeader from '../../components/SiteHeader/SiteHeader';
import SiteFooter from '../../components/SiteFooter/SiteFooter';

const Layout = () => {
  return (
    <>
      <SiteHeader />

      <main className="container mx-auto px-4 py-10">
        <Outlet />
      </main>

      <SiteFooter />
    </>
  );
};

export default Layout;
