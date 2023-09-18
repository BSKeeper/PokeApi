import '../sass/Button.scss'

const Button = ({icon, handleClick}) => {
  return (
    <div className='ButtonBox'>
        <button 
            className='Button' 
            onClick={handleClick}>
                    {icon}
                </button>
        <div className='ButtonShadow'></div>
    </div>
  )
}

export default Button