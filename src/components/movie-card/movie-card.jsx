import PropTypes from 'prop-types';

export const MovieCard = ({ movie, onClick }) => {
  return <div onClick={onClick}>
   {movie.title}</div>;
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,//is required
    image: PropTypes.string,//is required
    director: PropTypes.string
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};