import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProfileView } from "../profile-view/profileview";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  }; //delete

  useEffect(() => {
    if (!token) return;

    fetch(`https://flixapidata-a1788f46103e.herokuapp.com/movies`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const movieFromApi = data.map((doc) => {
          return {
            id: doc._id,
            title: doc.Title,
            director: doc.Director.Name,
            image: doc.ImagePath,
          };
        });
        setMovies(movieFromApi);
      });
  }, [token]);

  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={logout} />
      <br />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Col>
                  <SignupView />
                </Col>
              )
            }
          />

          <Route
            path="/profile"
            element={
              !user ? (
                <Navigate to="/login" />
              ) : (
                <ProfileView
                  user={user}
                  movies={movies}
                  token={token}
                  setUser={setUser}
                />
              )
            }
          />

          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Col md={5}>
                  <LoginView
                    onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token);
                      console.log({
                        user,
                        token,
                      });
                    }}
                  />
                </Col>
              )
            }
          />

          <Route
            path="/"
            element={
              movies.length === 0 ? (
                <div>The movie list is empty</div>
              ) : (
                movies.map((movie) => (
                  <Col className="mb-5" key={movie.id} md={3}>
                    <MovieCard
                      movie={movie}
                      user={user}
                      token={token}
                      setUser={setUser}
                    />
                  </Col>
                ))
              )
            }
          />
          <Route
            path="movies/:movieId"
            element={<MovieView movies={movies} />}
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};

export default MainView;
