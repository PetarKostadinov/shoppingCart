import axios from 'axios';
import React, { useContext, useReducer, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import getError from '../util';
import { Store } from './Store';

const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_REQUEST':
            return { ...state, loadingUpdate: true };
        case 'UPDATE_SUCCESS':
            return { ...state, loadingUpdate: false };
        case 'UPDATE_FAIL':
            return { ...state, loadingUpdate: false };
        default:
            return state;
    }
}

function Profile() {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;
    const [username, setUsername] = useState(userInfo.username);
    const [email, setEmail] = useState(userInfo.email);
    const [password, setPassword] = useState('');
    const [repass, setRepass] = useState('');

    const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
        loadingUpdate: false
    })

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                '/api/users/profile',
                {
                    username,
                    email,
                    password
                },
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` }
                }
            );
            dispatch({ type: 'UPDATE_SUCCESS' });
            ctxDispatch({ type: 'USER_LOGIN', payload: data });
            localStorage.setItem('userInfo', JSON.stringify(data));
            toast.success('User updated successfully');

        } catch (err) {
            dispatch({ type: 'FETCH_FAIL' });
            toast.error(getError(err));
        }
    }

    return (
        <div className="container small-container">
            <Helmet>
                <title>User Profile</title>
            </Helmet>
            <h1 className="my-3">User Profile</h1>
            <form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}

                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Repeat Password</Form.Label>
                    <Form.Control
                        type="password"
                        onChange={(e) => setRepass(e.target.value)}

                    />
                </Form.Group>
                <div className="mb-3">
                    <Button type="submit">
                        Update
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default Profile;
