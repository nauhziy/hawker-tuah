import "./Card.css";

interface CardProps {
  serial_no: string;
  src: string;
  name: string;
  //   address: string;
  //   description: string;
}

const Card: React.FC<CardProps> = ({ src, name }) => {
  return (
    <div className="card">
      <img src={src} alt="" />
      <div className="card__info">
        <h2>{name}</h2>
      </div>
    </div>
  );
};

export default Card;
