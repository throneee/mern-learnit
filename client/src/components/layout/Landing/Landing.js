import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const Landing = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate replace to='/login' />}></Route>
        </Routes>
    );
};

export default Landing;
