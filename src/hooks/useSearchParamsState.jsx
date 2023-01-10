import { useSearchParams } from 'react-router-dom';

const useSearchParamsState = (searchParamName, defaultValue) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const acquiredSearchParam = searchParams.get(searchParamName);
  const searchParamsState = acquiredSearchParam ?? defaultValue;

  const setSearchParamsState = (newState) => {
    const next = Object.assign(
      {},
      [...searchParams.entries()].reduce(
        (object, [key, value]) => ({ ...object, [key]: value }),
        {}
      ),
      { [searchParamName]: newState }
    );

    setSearchParams(next);
  };

  return [searchParamsState, setSearchParamsState];
};

export default useSearchParamsState;
