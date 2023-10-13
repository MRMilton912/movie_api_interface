import PropTypes from 'prop-types';

export const MovieCard = ({ key, movie, onClick }) => {
  console.log(movie)
  return <div onClick={onClick} key={key}>
   {movie.title}</div>;
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