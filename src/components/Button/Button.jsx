import { Link } from 'react-router-dom';

const Button = (props) => {
  const { variant, size, color, extraClassNames, children, ...rest } = props;

  let classNames =
    'inline-flex items-center rounded-lg font-bold backdrop-blur transition-colors ' +
    extraClassNames;

  switch (size) {
    case 'sm':
      classNames += ' text-sm px-4 py-2';
      break;
    default:
      classNames += ' px-6 py-4';
  }

  switch (color) {
    case 'white':
      classNames += ' bg-white/10 hover:bg-white/20';
      break;
    default:
      classNames += ' bg-lime-500/10  hover:bg-lime-500/20';
  }

  if (variant === 'link') {
    return (
      <Link className={classNames} {...rest}>
        {children}
      </Link>
    );
  } else {
    return (
      <a className={classNames} {...props}>
        {props.children}
      </a>
    );
  }
};

export default Button;
