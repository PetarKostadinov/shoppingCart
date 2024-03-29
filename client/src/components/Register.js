
import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Store } from '../helpersComponents/Store';
import { toast } from 'react-toastify';
import { register } from '../service/userService';

function Register() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repass, setRepass] = useState('');
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== repass) {
            toast.error('Passwords don\'t match');
            return;
        }

        try {
            const data = await register(username, email, password);

            ctxDispatch({ type: 'USER_REGISTER', payload: data });
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate(redirect || '/');
        } catch (err) {

            if ((err.message).includes('email')) {
                toast.error('Invalid Email!');
            } else {
                toast.error('Invalid Username or Password!');
            }
        }
    };

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    return (
        <Container className="small-container">
            <Helmet>
                <title>Register</title>
            </Helmet>
            <h1 className="my-3">Register</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control required onChange={(e) => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" required onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" required onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="repass">
                    <Form.Label>Repeat Password</Form.Label>
                    <Form.Control type="password" required onChange={(e) => setRepass(e.target.value)} />
                </Form.Group>
                <div className="mb-3">
                    <Button type="submit">Register</Button>
                </div>
                <div className="mb-3">
                    Already have an account?{' '}
                    <Link to={`/login?redirect=${redirect}`}>Login Here</Link>
                </div>
            </Form>
        </Container>
    )
}

export default Register