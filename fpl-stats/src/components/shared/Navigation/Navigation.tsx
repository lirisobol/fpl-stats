import styles from "./Navigation.module.scss";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Offcanvas } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPeopleGroup, faFutbol, faPeopleArrows, faPerson } from '@fortawesome/free-solid-svg-icons';
import LogoIcon from '../Logo';

export function Navigation() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className={styles.NavWrapper}>
        <Navbar expand="lg" className="p-1 w-100">
            <Container className={styles.NavContainer}>
                <Navbar.Brand className={`${styles.NavBrand} me-5`} as={Link} to="/">
                    <LogoIcon />
                    FPLStats
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShow} />
                <Navbar.Offcanvas
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="end"
                    show={show}
                    onHide={handleClose}
                >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title id="offcanvasNavbarLabel">
                        FPLStats
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className='me-auto '>
                        <Nav.Link className={styles.NavLink} as={Link} to="/" onClick={handleClose}>
                            <FontAwesomeIcon icon={faHouse} className={styles.NavIcon} />
                            Home
                        </Nav.Link>
                        <Nav.Link className={styles.NavLink} as={Link} to="/teams" onClick={handleClose}>
                            <FontAwesomeIcon icon={faPeopleGroup} className={styles.NavIcon} />
                            Teams
                        </Nav.Link>
                        <Nav.Link className={styles.NavLink} as={Link} to="/players" onClick={handleClose}>
                            <FontAwesomeIcon icon={faPerson} className={styles.NavIcon} />
                            Players
                        </Nav.Link>
                        <Nav.Link className={styles.NavLink} as={Link} to="/compare" onClick={handleClose}>
                            <FontAwesomeIcon icon={faPeopleArrows} className={styles.NavIcon} />
                            Compare
                        </Nav.Link>
                        <Nav.Link className={styles.NavLink} as={Link} to="/fixtures" onClick={handleClose}>
                            <FontAwesomeIcon icon={faFutbol} className={styles.NavIcon} />
                            Fixtures
                        </Nav.Link>
                    </Nav>
                </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    </div>
  );
}
