import { Link } from 'react-router-dom';

const Button = (props) => {
  const {
    variant,
    size,
    shape,
    color,
    extraClassNames,
    status,
    children,
    onClickHandle,
    ...rest
  } = props;

  let classNames =
    'inline-flex items-center font-bold backdrop-blur transition-colors ' +
    extraClassNames;

  classNames += shape === 'circle' ? ' rounded-full justify-center' : ' rounded-lg';

  switch (size) {
    case 'sm':
      classNames += shape === 'circle' ? ' w-10 h-10' : ' text-sm px-4 py-2';
      break;
    default:
      classNames += shape === 'circle' ? ' w-14 h-14' : ' px-6 py-4';
  }

  switch (color) {
    case 'white':
      classNames += ' bg-white/10 hover:bg-white/20';
      break;
    case 'pink':
      classNames +=
        status === 'active'
          ? ' bg-pink-400 text-white'
          : ' bg-pink-400/10 hover:bg-pink-400/20 text-pink-400';
      break;
    case 'blue':
      classNames +=
        status === 'active'
          ? ' bg-blue-400 text-white'
          : ' bg-blue-400/10 hover:bg-blue-400/20 text-blue-400';
      break;
    default:
      classNames += ' bg-lime-500/10 hover:bg-lime-500/20';
  }

  if (variant === 'link') {
    return (
      <Link className={classNames} onClick={onClickHandle} {...rest}>
        {children}
      </Link>
    );
  } else if (variant === 'button') {
    return (
      <button className={classNames} onClick={onClickHandle} {...rest}>
        {children}
      </button>
    );
  } else {
    return (
      <a className={classNames} onClick={onClickHandle} {...props}>
        {children}
      </a>
    );
  }
};

export default Button;
