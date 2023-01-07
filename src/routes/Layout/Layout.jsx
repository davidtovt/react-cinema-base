import { Outlet } from 'react-router-dom';

import SiteHeader from '../../components/SiteHeader/SiteHeader';
import SiteFooter from '../../components/SiteFooter/SiteFooter';

const Layout = () => {
  return (
    <>
      <SiteHeader />

      <Outlet />

      <SiteFooter />
    </>
  );
};

export default Layout;
