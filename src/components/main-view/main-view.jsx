import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
//import { LoginView } from "../login-view/login-view";


export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "The Departed",
      image:
        "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSU0SP40gBSnIxxWMpN4-OYUXDRKsOFZX6L5dNv0srZlwKiAlvy",
      Director: "Martin Scorsese"
    },
    {
      id: 2,
      title: "The Wolf of Wall Street",
      image:
        "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTrqI60p3I82Q67Wh6HEyDC24Orl0qFzSWNX7EH6niO1SnvBsPl",
      Director: "Martin Scorsese"
    },
    {
      id: 3,
      title: "Casino",
      image:
        "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT3OF-ScT2zplAWB1QnfLeXKYygKDnQbQmnn8oMldgKtsbgxpr2",
      Director: "Martin Scorsese"
    },
    {
      id: 4,
      title: "Kill Bill",
      image:
        "https://upload.wikimedia.org/wikipedia/en/2/2c/Kill_Bill_Volume_1.png",
      Director: "Quentin Tarantino"
    },
    {
      id: 5,
      title: "Django Unchained",
      image:
        "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSnm2FczCxSnt69XUZqqI5-sfy66SvjiV0du9mfUKRRCGqVAurt",
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