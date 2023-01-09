const Button = (props) => {
  console.log(props);
  return (
    <a
      className='inline-flex items-center px-6 py-4 rounded-lg font-bold bg-lime-500/10 backdrop-blur hover:bg-lime-500/20 transition-colors'
      {...props}
    >
      {props.children}
    </a>
    
  )
}

export default Button;