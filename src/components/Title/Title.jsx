const Title = ({ children, type, secondaryText }) => {
  if (type === 'page') {
    return (
      <h1 className="text-stone-200 text-4xl font-bold mb-4">
        {children}
        {secondaryText && (
          <span className="opacity-60 font-light ml-4">{secondaryText}</span>
        )}
      </h1>
    );
  } if (type === 'section') {
    return (
      <h2 className="text-stone-200 text-3xl font-bold mb-6">{children}</h2>
    );
  }
};

export default Title;
