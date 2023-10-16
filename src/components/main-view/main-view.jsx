import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";



export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  const logout = () => { setUser(null); setToken(null); localStorage.clear(); }

  useEffect(() => {
    if (!token) return;

    fetch("https://flixapidata-a1788f46103e.herokuapp.com/movies", {//fetch, file path
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const movieFromApi = data.map((doc) => {
          return {
            id: doc._id,
            title: doc.Title,
            director: doc.Director.Name,
            image: doc.ImagePath
          };
        });
        setMovies(movieFromApi);
      });
  }, [token]);

  if (!user) {
    return (
      <>
        <NavigationBar user={user} onLoggedOut={logout} />
        <LoginView onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
          console.log({
            user, token
          })
        }} />
        or
        <SignupView />
      </>
    );
  }

  if (selectedMovie) {
    return (
      <>
        <NavigationBar user={user} onLoggedOut={logout} />
        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
      </>
    )
  }

  if (movies.length === 0) {
    return <>
      <NavigationBar user={user} onLoggedOut={logout} />
      <div>The movie list is empty</div>
    </>
  }

  return (
    <>
      <NavigationBar user={user} onLoggedOut={logout} />
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
    </>
  );
};

export default MainView;