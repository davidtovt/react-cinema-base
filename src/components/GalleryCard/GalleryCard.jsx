const GalleryCard = ({ path, title }) => {
  return (
    <a
      href={process.env.REACT_APP_TMDB_POSTER_PATH + 'original' + path}
      className="relative overflow-hidden before:pb-[50%] before:block rounded"
    >
      <img
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={process.env.REACT_APP_TMDB_POSTER_PATH + 'w300' + path}
        alt={title}
      />
    </a>
  );
};

export default GalleryCard;
