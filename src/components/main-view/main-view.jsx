import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
//import { LoginView } from "../login-view/login-view";
import { useState, useEffect } from "react";


export const MainView = () => {
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("https://openlibrary.org/search.json?q=star+wars")
      .then((response) => response.json())
      .then((data) => {
        const movieFromApi = data.docs.map((doc) => {
          return {
            id: doc.key,
            title: doc.title,
          };
        });
        setMovies(movieFromApi);
      });
  }, []);

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