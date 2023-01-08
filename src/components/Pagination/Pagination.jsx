import { Link } from 'react-router-dom';

/**
 * Functions
 */

const setPagesOject = (totalPages, current, pageLimit = 5) => {
  let pages = {
    first: 1,
    before_dot: false,
    before: [],
    current: current,
    after_dot: false,
    after: [],
    last: totalPages,
  };

  for (
    let i = parseInt(pages.current) - 1;
    i >= parseInt(pages.current) - parseInt(pageLimit);
    i--
  ) {
    if (i > pages.first) {
      pages.before.unshift(i);
    } else {
      break;
    }
  }

  for (
    let i = parseInt(pages.current) + 1;
    i <= parseInt(pages.current) + parseInt(pageLimit);
    i++
  ) {
    if (i < pages.last) {
      pages.after.push(i);
    } else {
      break;
    }
  }

  if (pages.before.length >= pageLimit && pages.before[0] > pages.first + 1) {
    pages.before_dot = true;
  }

  if (
    pages.after.length >= pageLimit &&
    pages.after[pages.after.length - 1] < totalPages - 1
  ) {
    pages.after_dot = true;
  }

  return pages;
};

const setCurrentPage = (onClickHandler, page) => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });

  onClickHandler(page);
};

const setPageUrl = (page, urlParams, currentPage) => {
  urlParams.delete('page');

  let baseUrl = '?page=' + page;

  if (urlParams.toString().length) {
    baseUrl += '&' + urlParams.toString();
  }

  urlParams.set('page', currentPage);

  return baseUrl;
};

/**
 * Component
 */

const Pagination = ({
  urlParams,
  totalPages,
  currentPage,
  pageLimit,
  onClickHandler,
}) => {
  const pagesObject = setPagesOject(totalPages, currentPage, pageLimit);

  return (
    <ol className="flex flex-wrap items-center justify-center list-none">
      {parseInt(currentPage) !== parseInt(pagesObject.first) && (
        <li>
          <Link
            onClick={() => setCurrentPage(onClickHandler, pagesObject.first)}
            to={setPageUrl(pagesObject.first, urlParams, currentPage)}
            className="flex p-2 m-0.5 min-h-[2.5rem] min-w-[2.5rem] text-center items-center justify-center rounded-xl hover:bg-stone-700 transition-color duration-300"
          >
            {pagesObject.first}
          </Link>
        </li>
      )}
      {pagesObject.before_dot && (
        <li>
          <span className="px-1 opacity-30">...</span>
        </li>
      )}
      {pagesObject.before.map((page) => (
        <li key={page}>
          <Link
            onClick={() => setCurrentPage(onClickHandler, page)}
            to={setPageUrl(page, urlParams, currentPage)}
            className="flex p-2 m-0.5 min-h-[2.5rem] min-w-[2.5rem] text-center items-center justify-center rounded-xl hover:bg-stone-700 transition-color duration-300"
          >
            {page}
          </Link>
        </li>
      ))}
      <li>
        <span className="flex p-2 m-0.5 min-h-[2.5rem] min-w-[2.5rem] text-center items-center justify-center rounded-xl bg-stone-400 text-stone-900">
          {pagesObject.current}
        </span>
      </li>
      {pagesObject.after.map((page) => (
        <li key={page}>
          <Link
            onClick={() => setCurrentPage(onClickHandler, page)}
            to={setPageUrl(page, urlParams, currentPage)}
            className="flex p-2 m-0.5 min-h-[2.5rem] min-w-[2.5rem] text-center items-center justify-center rounded-xl hover:bg-stone-700 transition-color duration-300"
          >
            {page}
          </Link>
        </li>
      ))}
      {pagesObject.after_dot && (
        <li>
          <span className="px-1 opacity-30">...</span>
        </li>
      )}
      {parseInt(currentPage) !== parseInt(pagesObject.last) && (
        <li>
          <Link
            onClick={() => setCurrentPage(onClickHandler, pagesObject.last)}
            to={setPageUrl(pagesObject.last, urlParams, currentPage)}
            className="flex p-2 m-0.5 min-h-[2.5rem] min-w-[2.5rem] text-center items-center justify-center rounded-xl hover:bg-stone-700 transition-color duration-300"
          >
            {pagesObject.last}
          </Link>
        </li>
      )}
    </ol>
  );
};

export default Pagination;
