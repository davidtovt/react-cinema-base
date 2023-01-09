const PageTitle = ({ children, secondaryText }) => {
  return (
    <h1 className="text-stone-200 text-4xl font-bold mb-4">
      {children}
      {secondaryText && <span className="opacity-60 font-light ml-4">{secondaryText}</span>}
    </h1>
  );
};

export default PageTitle;
