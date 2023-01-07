import SiteLogo from '../SiteLogo/SiteLogo';

const SiteHeader = () => {
  return (
    <footer className="bg-stone-800 py-6">
      <div className="container mx-auto px-4 flex items-center">
        <SiteLogo />

        <p className="ml-auto">Készítette: <strong>David</strong></p>
      </div>
    </footer>
  );
};

export default SiteHeader;
