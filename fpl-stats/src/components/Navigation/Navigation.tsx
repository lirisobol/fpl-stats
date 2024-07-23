import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import styles from "./Navigation.module.scss";

export function Navigation() {
  return (
    <div className={styles.NavWrapper}>
        <Navbar expand="lg" className="p-3">
          <Container>
            <Navbar.Brand className={`${styles.SmallNavBrand} me-5`} as={Link} to="/">FPLStats</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link className={`${styles.SmallNavLinks} me-3`} as={Link} to="/">Home</Nav.Link>
                <Nav.Link className={`${styles.SmallNavLinks} me-3`} as={Link} to="/teams">Teams</Nav.Link>
                <Nav.Link className={`${styles.SmallNavLinks} me-3`} as={Link} to="/fixtures">Fixtures</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    </div>

  );
}