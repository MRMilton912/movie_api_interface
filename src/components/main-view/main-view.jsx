import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
//import { LoginView } from "../login-view/login-view";


export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "The Departed'",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/51InjRPaF7L._SX377_BO1,204,203,200_.jpg",
      Director: "Martin Scorsese"
    },
    {
      id: 2,
      title: "The Wolf of Wall Street",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/51WAikRq37L._SX218_BO1,204,203,200_QL40_FMwebp_.jpg",
      Director: "Martin Scorsese"
    },
    {
      id: 3,
      title: "Casino",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/5131OWtQRaL._SX381_BO1,204,203,200_.jpg",
      Director: "Martin Scorsese"
    },
    {
      id: 4,
      title: "Kill Bill",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/51HbNW6RzhL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg",
      Director: "Quentin Tarantino"
    },
    {
      id: 5,
      title: "Django Unchained",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/41MBLi5a4jL._SX384_BO1,204,203,200_.jpg",
      Director: "Quentin Tarantino"
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);

//  if (!user) {
//    return <LoginView/>;
//  }


  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={() => {
            setSelectedMovie(movie);
          }}
        />
      ))}
    </div>
  );
};

export default MainView;