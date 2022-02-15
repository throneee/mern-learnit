import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

import Landing from './components/layout/Landing/Landing';
import Auth from './views/Auth';
import Dashboard from './views/Dashboard';
import About from './views/About';

import AuthContextProvider from './contexts/AuthContext';
import PostContextProvider from './contexts/PostContext';
import ProtectedRoute from './components/routing/ProtectedRoute';

const App = () => {
    return (
        <AuthContextProvider>
            <PostContextProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path='*' element={<Landing />}></Route>
                        <Route
                            path='/login/*'
                            element={<Auth authRoute={'login'}></Auth>}></Route>
                        <Route
                            path='/register'
                            element={
                                <Auth authRoute={'register'}></Auth>
                            }></Route>
                        <Route
                            path='/dashboard'
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }></Route>
                        <Route
                            path='/about'
                            element={
                                <ProtectedRoute>
                                    <About />
                                </ProtectedRoute>
                            }></Route>
                    </Routes>
                </BrowserRouter>
            </PostContextProvider>
        </AuthContextProvider>
    );
};

export default App;
