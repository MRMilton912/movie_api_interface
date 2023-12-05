import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import {
  Container,
  Row,
  Col,
  Button,
  CardGroup,
  Card,
  Form,
  Link,
} from "react-bootstrap";

export const ProfileView = ({ user, token, movies, setUser }) => {
  const [name, setName] = useState(user.name);
  const [password, setPassword] = useState(user.password);
  const [email, setEmail] = useState(user.email);
  const [birthday, setBirthday] = useState(user.birthday);

  console.log(user);
  const favMovie = user.FavoriteMovies
    ? movies.filter((movie) => user.FavoriteMovies.includes(movie.id))
    : [];

  const handleUpdate = (event) => {
    event.preventDefault();
    let data = {
      name: name,
      password: password,
      email: email,
      birthday: birthday,
    };
    fetch(
      `https://flixapidata-a1788f46103e.herokuapp.com/users/${user.Username}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer ${token}",
        },
      }
    )
      .then(async (response) => {
        if (response.ok) {
          response.json();
          alert("Updated");
        } else {
          const em = await response.text();
          console.log(em);
          alert("Update failed");
        }
      })
      .then((updatedUser) => {
        if (updatedUser) {
          localStorage.setItem("user".JSON.stringify(updatedUser));
          setUser(updatedUser);
        }
      });
  };

  const handleDelete = () => {
    fetch(
      `https://flixapidata-a1788f46103e.herokuapp.com/users/${user.Username}`,
      {
        method: "DELETE",
        headers: { Authorization: "Bearer ${token}" },
      }
    ).then((response) => {
      if (response.ok) {
        setUser(null);
        alert("Your account has been deleted");
      } else {
        alert("something broke!");
      }
    });
  };

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <CardGroup>
              <Card>
                <Card.Body>
                  <Card.Title>My Profile</Card.Title>
                  <Form>
                    <Form.Group>
                      <Form.Label>
                        Username:
                        <Form.Control
                          type="text"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        />
                      </Form.Label>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>
                        Password:
                        <Form.Control
                          type="password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                        />
                      </Form.Label>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>
                        Password:
                        <Form.Control
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                      </Form.Label>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>
                        Password:
                        <Form.Control
                          type="date"
                          value={birthday}
                          onChange={(e) => {
                            setBirthday(e.target.value);
                          }}
                        />
                      </Form.Label>
                    </Form.Group>
                  </Form>
                  <Button onClick={handleUpdate}>Update Profile</Button>
                  <Button onClick={handleDelete}>Delete Account</Button>
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          {favMovie.map((movies) => {
            return (
              <Col key={movies._id}>
                <MovieCard
                  movie={movies}
                  token={token}
                  setUser={setUser}
                  user={user}
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};
