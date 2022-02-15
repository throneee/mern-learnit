import React, { useState, useContext } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../../contexts/AuthContext';
import AlertMessage from '../../layout/AlertMessage';

const Register = () => {
    // Context
    const { registerUser } = useContext(AuthContext);

    // state
    const [registerState, setRegisterState] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    });

    const [alertState, setAlertState] = useState(null);

    // Logic code
    const { username, password, confirmPassword } = registerState;

    const onChangeRegister = (e) => {
        setRegisterState({ ...registerState, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setAlertState({
                type: 'danger',
                message: 'Password not match',
            });
            setTimeout(() => {
                setAlertState(null);
            }, 3000);
            return;
        }

        try {
            const registerData = await registerUser(registerState);

            if (!registerData.success) {
                setAlertState({
                    type: 'danger',
                    message: registerData.message,
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
            <Form className='mb-5' onSubmit={handleRegister}>
                <Form.Group className='mb-4'>
                    <Form.Control
                        type='text'
                        placeholder='Username'
                        name='username'
                        required
                        value={username}
                        onChange={onChangeRegister}></Form.Control>
                </Form.Group>
                <Form.Group className='mb-4'>
                    <Form.Control
                        type='password'
                        placeholder='Password'
                        name='password'
                        required
                        value={password}
                        onChange={onChangeRegister}></Form.Control>
                </Form.Group>
                <Form.Group className='mb-4'>
                    <Form.Control
                        type='password'
                        placeholder='Confirm Password'
                        name='confirmPassword'
                        required
                        value={confirmPassword}
                        onChange={onChangeRegister}></Form.Control>
                </Form.Group>
                <Button type='submit' variant='success'>
                    Register
                </Button>
            </Form>
            <p>
                If you already have an account
                <Link to='/login' className='button__switch'>
                    <Button variant='danger'>Login</Button>
                </Link>
            </p>
        </div>
    );
};

export default Register;
