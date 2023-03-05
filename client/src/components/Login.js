
import React from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Link, useLocation } from 'react-router-dom'

function Login() {

    const {search} = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    return (
        <Container className="small-container">
            <Helmet>
                <title>Login</title>
            </Helmet>
            <h1 className="my-3">Login</h1>
            <Form>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" required></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="password" required></Form.Control>
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

export default Login
