import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button key={movie.id} variant="link">
            Open
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );

  //  console.log(movie)
  //  return <div onClick={onClick} key={key}>
  //   {movie.title}</div>;
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string, //is required
    image: PropTypes.string, //is required
    director: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  key: PropTypes.string,
};
