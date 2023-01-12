const UserCard = ({ user }) => {
  return (
    <div className="relative overflow-hidden rounded-xl drop-shadow-md bg-stone-800">
      <div className="relative before:pb-[150%] before:block">
        {user.profile_path ? (
          <img
            className="absolute top-0 left-0 w-full h-full object-cover"
            src={
              process.env.REACT_APP_TMDB_POSTER_PATH +
              'w185' +
              user.profile_path
            }
            alt={user.name}
          />
        ) : (
          <div className="absolute flex top-0 left-0 w-full h-full items-center p-3 text-center justify-center uppercase font-bold text-2xl opacity-30 bg-stone-700">
            Hiányzó kép
          </div>
        )}
      </div>
      <div className="py-3 px-4">
        <h5 className="font-bold text-white">{user.name}</h5>
        <span className="block text-sm leading-tight">{user.character}</span>
      </div>
    </div>
  );
};

export default UserCard;
