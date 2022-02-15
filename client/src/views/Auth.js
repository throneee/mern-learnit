import React, { useContext } from 'react';

import { AuthContext } from '../contexts/AuthContext';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from '../components/auth/Login/Login';
import Register from '../components/auth/Register/Register';
import Spinner from 'react-bootstrap/Spinner';

const Auth = ({ authRoute }) => {
    const {
        authState: { authLoading, isAuthenticated },
    } = useContext(AuthContext);

    let body;
    if (!authLoading) {
        body = (
            <>
                <Spinner
                    animation='border'
                    variant='info'
                    className='mb-5'></Spinner>
            </>
        );
    } else if (isAuthenticated) {
        return (
            <Routes>
                <Route
                    path='/'
                    element={<Navigate replace to='/dashboard' />}></Route>
            </Routes>
        );
    } else {
        body = (
            <>
                {authRoute === 'login' && <Login></Login>}
                {authRoute === 'register' && <Register></Register>}
            </>
        );
    }

    return (
        <div className='auth'>
            <div className='auth__form'>
                <h1 className='mt-4'>LearnIT</h1>
                <h5 className='mb-5'>Learn for future</h5>
                {body}
            </div>
        </div>
    );
};

export default Auth;
