import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { BoxArrowRight } from 'react-bootstrap-icons';

import { AuthContext } from '../../contexts/AuthContext';

const NavbarMenu = () => {
    const {
        authState: {
            user: { username },
        },
        logoutUser,
    } = useContext(AuthContext);

    const handleLogout = (e) => {
        e.preventDefault();

        logoutUser();
    };

    return (
        <Navbar expand='lg' className='shadow px-5 navbar'>
            <Navbar.Brand className='font-weight-bolder text-white'>
                <h3>LearnIT</h3>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls='basic-navbar-nav'></Navbar.Toggle>

            <Navbar.Collapse
                id='basic-navbar-nav'
                className='justify-content-between'>
                <Nav>
                    <Nav.Link className='text-white' to='/dashboard' as={Link}>
                        Dashboard
                    </Nav.Link>
                    <Nav.Link className='text-white' to='/about' as={Link}>
                        About
                    </Nav.Link>
                </Nav>

                <Nav className='navbar__logout-mobile'>
                    <Nav.Link className='text-white' disabled>
                        Welcome {username}!
                    </Nav.Link>
                    <Button
                        variant='danger'
                        className='text-white d-flex align-items-center'
                        onClick={handleLogout}>
                        <BoxArrowRight className='me-2'></BoxArrowRight>
                        Logout
                    </Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavbarMenu;
