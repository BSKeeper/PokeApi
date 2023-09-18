import '../sass/Card.scss'

const Card = ({name, img}) => {
  return (
    <div className="Card">
        <p className="CardName">{name}</p>
        <div className="CardCircle"></div>
        <img className="CardImg" src={img} alt="pokemon" />
    </div>
  )
}

export default Card