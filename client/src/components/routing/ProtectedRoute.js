import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

import Spinner from 'react-bootstrap/esm/Spinner';
import NavbarMenu from '../layout/NavbarMenu';

const ProtectedRoute = ({ children }) => {
    const {
        authState: { authLoading, isAuthenticated },
    } = useContext(AuthContext);

    if (authLoading) {
        return (
            <>
                <Spinner
                    animation='border'
                    variant='info'
                    className='my-5'></Spinner>
            </>
        );
    }

    return isAuthenticated ? (
        <>
            <NavbarMenu></NavbarMenu>
            {children}
        </>
    ) : (
        <Navigate replace to='/login' />
    );
};

export default ProtectedRoute;
