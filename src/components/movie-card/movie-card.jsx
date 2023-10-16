import PropTypes from 'prop-types';
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ key, movie, onClick }) => {
  return (
    <Card>
      <Card.Img variant="top" src={"/img/" + movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director}</Card.Text>
        <Button onClick={() => onClick(movie)} key={key} variant="link">Open</Button>
      </Card.Body>
    </Card>
  );

//  console.log(movie)
//  return <div onClick={onClick} key={key}>
//   {movie.title}</div>;
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,//is required
    image: PropTypes.string,//is required
    director: PropTypes.string
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  key: PropTypes.string
};