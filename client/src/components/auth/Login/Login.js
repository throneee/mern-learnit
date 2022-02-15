import React, { useState, useContext } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../../contexts/AuthContext';
import AlertMessage from '../../layout/AlertMessage';

const Login = () => {
    // context
    const { loginUser } = useContext(AuthContext);

    // router
    let navigate = useNavigate();

    // state
    const [loginState, setLoginState] = useState({
        username: '',
        password: '',
    });

    const [alertState, setAlertState] = useState(null);

    // Logic code
    const { username, password } = loginState;

    const onChangeLogin = (e) => {
        setLoginState({ ...loginState, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const loginData = await loginUser(loginState);
            if (!loginData.success) {
                setAlertState({
                    type: 'danger',
                    message: loginData.message,
                });
                setTimeout(() => {
                    setAlertState(null);
                }, 3000);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className='auth__body'>
            <AlertMessage info={alertState}></AlertMessage>
            <Form className='mb-5' onSubmit={handleLogin}>
                <Form.Group className='mb-4'>
                    <Form.Control
                        type='text'
                        placeholder='Username'
                        name='username'
                        required
                        value={username}
                        onChange={onChangeLogin}></Form.Control>
                </Form.Group>
                <Form.Group className='mb-4'>
                    <Form.Control
                        type='password'
                        placeholder='Password'
                        name='password'
                        required
                        value={password}
                        onChange={onChangeLogin}></Form.Control>
                </Form.Group>
                <Button type='submit' variant='success'>
                    Login
                </Button>
            </Form>
            <p>
                Don't have an account?
                <Link to='/register' className='button__switch'>
                    <Button variant='danger'>Register</Button>
                </Link>
            </p>
        </div>
    );
};

export default Login;
