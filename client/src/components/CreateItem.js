
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Container, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Store } from './Store';
import { toast } from 'react-toastify';
import getError from '../util';

function CreateItem() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [countMany, setCountMany] = useState('');
    const [rating, setRating] = useState('');
    const [numReviews, setNumReviews] = useState('');
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { productsOnList, userInfo} = state;
   
    const submitHandler = async (e) => {
        e.preventDefault();
    
        try {
            const { data } = await axios.post('/api/products/create', {
                name,
                slug,
                image,
                brand,
                category,
                description,
                price,
                countMany,
                rating,
                numReviews
            },
            {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            }
            );

            ctxDispatch({ type: 'PRODUCT_CREATE', payload: data });
            
            navigate(redirect);

        } catch (err) {
            
            toast.error(getError(err));
        }
    }

    useEffect(() => {
        if (!productsOnList) {
            navigate('/create');
        }
    }, [navigate, redirect, productsOnList]);

    return (
        <Container className="small-container">
            <Helmet>
                <title>Create Item</title>
            </Helmet>
            <h1 className="my-3">Create Item</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlid="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlid="slug">
                    <Form.Label>Slug</Form.Label>
                    <Form.Control
                        required
                        onChange={(e) => setSlug(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlid="image">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        required
                        onChange={(e) => setImage(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlid="brand">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control
                        required
                        onChange={(e) => setBrand(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlid="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        required
                        onChange={(e) => setCategory(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlid="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        required
                        onChange={(e) => setDescription(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlid="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        required
                        onChange={(e) => setPrice(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlid="countMany">
                    <Form.Label>Count</Form.Label>
                    <Form.Control
                        required
                        onChange={(e) => setCountMany(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlid="rating">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                        required
                        onChange={(e) => setRating(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlid="numReviews">
                    <Form.Label>Number of Reviews</Form.Label>
                    <Form.Control
                        required
                        onChange={(e) => setNumReviews(e.target.value)}
                    ></Form.Control>
                </Form.Group>


                <div className="mb-3">
                    <Button type="submit">Create</Button>
                </div>
                <div className="mb-3">
                    Changed your mind ?{' '}
                    <Link to={`/?redirect=${redirect}`}>Cansel</Link>
                </div>
            </Form>
        </Container>
    )
}

export default CreateItem
