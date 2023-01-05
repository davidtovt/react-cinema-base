import SiteLogo from '../SiteLogo/SiteLogo';

const SiteHeader = () => {
  return (
    <footer className="bg-gray-50 py-6">
      <div className="container mx-auto px-4 flex items-center">
        <SiteLogo />

        <p className="ml-auto">Made by <strong>David</strong></p>
      </div>
    </footer>
  );
};

export default SiteHeader;
