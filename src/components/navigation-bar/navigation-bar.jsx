import { Navbar, Container, Nav, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand to="/">MovieAPI</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <NavItem eventkey={1} href="/login">
                  <Nav.Link to="/login" as={Link}>
                    Login
                  </Nav.Link>
                </NavItem>
                <NavItem eventkey={2} href="/signup">
                  <Nav.Link to="/signup" as={Link}>
                    Signup
                  </Nav.Link>
                </NavItem>
              </>
            )}
            {user && (
              <>
                <NavItem eventkey={1} href="/">
                  <Nav.Link to="/" as={Link}>
                    Home
                  </Nav.Link>
                </NavItem>
                <NavItem>
                  <Nav.Link to="/profile" as={Link}>
                    Profile
                  </Nav.Link>
                </NavItem>
                <NavItem eventkey={2} href="/login">
                  <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
                </NavItem>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
