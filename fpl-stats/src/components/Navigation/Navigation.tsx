import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import styles from "./Navigation.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse,faPeopleGroup,faFutbol,faPeopleArrows,faPerson } from '@fortawesome/free-solid-svg-icons';

export function Navigation() {
  return (
    <div className={styles.NavWrapper}>
        <Navbar expand="lg" className="p-1">
          <Container className={`${styles.NavContainer} ms-4`}>
            <Navbar.Brand className={`${styles.NavBrand} me-5`} as={Link} to="/">
                FPLStats
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className='me-auto'>
                <Nav.Link className={`${styles.NavLink} me-3`} as={Link} to="/">
                    <FontAwesomeIcon icon={faHouse} className={styles.NavIcon}/>
                    Home
                </Nav.Link>
                <Nav.Link className={`${styles.NavLink} me-3`} as={Link} to="/teams">
                    <FontAwesomeIcon icon={faPeopleGroup} className={styles.NavIcon}/>
                    Teams
                </Nav.Link>
                <Nav.Link className={`${styles.NavLink} me-3`} as={Link} to="/">
                    <FontAwesomeIcon icon={faPerson} className={styles.NavIcon}/>
                    Players
                </Nav.Link>
                <Nav.Link className={`${styles.NavLink} me-3`} as={Link} to="/">
                    <FontAwesomeIcon icon={faPeopleArrows} className={styles.NavIcon}/>
                    Compare
                </Nav.Link>
                <Nav.Link className={`${styles.NavLink} me-3`} as={Link} to="/fixtures">
                    <FontAwesomeIcon icon={faFutbol} className={styles.NavIcon}/>
                    Fixtures
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    </div>

  );
}