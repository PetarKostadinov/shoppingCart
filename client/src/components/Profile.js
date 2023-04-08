import React, { useContext, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import getError from '../util';
import { Store } from '../helpersComponents/Store';
import { updateProfile } from '../service/userService';

function Profile() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [username, setUsername] = useState(userInfo.username);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState('');
  const [repass, setRepass] = useState('');
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (password !== repass) {
        throw new Error('Passwords don\'t match!');
      }
      setLoadingUpdate(true);

      const data = await updateProfile(
        userInfo,
        username,
        email,
        password,
        repass
      );

      if (data.status === 409) {
        throw new Error(data.message);
      }
      setLoadingUpdate(false);
      ctxDispatch({ type: 'USER_LOGIN', payload: data });
      toast.success('User updated successfully');
    } catch (err) {
      setLoadingUpdate(false);
      toast.error(getError(err) || err);
    }
  };

  useEffect(() => {
    localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
  }, [state.userInfo]);

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
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="rePassword">
          <Form.Label>Repeat Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setRepass(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit" disabled={loadingUpdate}>
            {loadingUpdate ? 'Updating...' : 'Update'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Profile;
