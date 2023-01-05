import { Link } from 'react-router-dom';

const SiteLogo = ({ logoType }) => {
  return (
    <Link to="/" className="text-3xl uppercase mr-8">
      <strong className={logoType === 'primary' ? 'text-lime-500' : ''}>
        Cinema
      </strong>
      Base
    </Link>
  );
};

export default SiteLogo;
