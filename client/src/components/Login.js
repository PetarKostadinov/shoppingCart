
import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Store } from './Store';
import { toast } from 'react-toastify';
import { loginUser } from '../service/userService';

function Login() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser(email, password);

            if (data.status === 401) {
                throw new Error(data.message)
            }
            ctxDispatch({ type: 'USER_LOGIN', payload: data });
            localStorage.setItem('userInfo', JSON.stringify(data));

            navigate(redirect || '/');
        } catch (error) {
            toast.error(error.message);
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
                <title>Login</title>
            </Helmet>
            <h1 className="my-3">Login</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlid="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlid="password">
                    <Form.Label>Pasword</Form.Label>
                    <Form.Control
                        type="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <div className="mb-3">
                    <Button type="submit">Login</Button>
                </div>
                <div className="mb-3">
                    No Registration ?{' '}
                    <Link to={`/register?redirect=${redirect}`}>Register Here</Link>
                </div>
            </Form>
        </Container>
    )
}

export default Login;