import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import styles from "./Navigation.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse,faPeopleGroup,faFutbol,faPeopleArrows,faPerson } from '@fortawesome/free-solid-svg-icons';

export function Navigation() {
  return (
    <div className={styles.NavWrapper}>
        <Navbar expand="lg" className="p-3">
          <Container>
            <Navbar.Brand className={`${styles.SmallNavBrand} me-5`} as={Link} to="/">FPLStats</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link className={`${styles.SmallNavLinks} me-3`} as={Link} to="/">
                    <FontAwesomeIcon icon={faHouse} className='me-2'/>
                    Home
                </Nav.Link>
                <Nav.Link className={`${styles.SmallNavLinks} me-3`} as={Link} to="/teams">
                    <FontAwesomeIcon icon={faPeopleGroup} className='me-2'/>
                    Teams
                </Nav.Link>
                <Nav.Link className={`${styles.SmallNavLinks} me-3`} as={Link} to="/">
                    <FontAwesomeIcon icon={faPerson} className='me-2'/>
                    Players
                </Nav.Link>
                <Nav.Link className={`${styles.SmallNavLinks} me-3`} as={Link} to="/">
                    <FontAwesomeIcon icon={faPeopleArrows} className='me-2'/>
                    Compare
                </Nav.Link>
                <Nav.Link className={`${styles.SmallNavLinks} me-3`} as={Link} to="/fixtures">
                    <FontAwesomeIcon icon={faFutbol} className='me-2'/>
                    Fixtures
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    </div>

  );
}