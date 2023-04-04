import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Store } from './Store';
import { toast } from 'react-toastify';
import { createProduct } from '../service/productService';

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
  const { productsOnList, userInfo } = state;

  const [url, setUrl] = useState('');
  const [isValidUrl, setIsValidUrl] = useState(false);

  
  const submitHandler = async (e) => {
    e.preventDefault();

        const newUrl = image;
        const regex = /^(http|https):\/\//; // regex to check for http or https at the start of the URL
    
        setIsValidUrl(regex.test(newUrl)); // set isValidUrl to true if the newUrl matches the regex
        setUrl(newUrl); // update the URL state
      
    try {
        if(!isValidUrl){
            throw new Error('Please enter a valid URL starting with http:// or https://');
        }


        if (isNaN(price) === true || price < 1) {
            throw new Error('Price should be a Positive Number')
          } else if (isNaN(countMany) === true || countMany < 0) {
            throw new Error('Count should be a Positive Number or 0')
          } else if (isNaN(rating) === true || rating < 0) {
            throw new Error('Rating should be a Positive Number or 0')
          } else if (isNaN(numReviews) === true || numReviews < 0) {
            throw new Error('Number of Reviews should be a Positive Number or 0')
          }
      
      const item = {
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
      };
      const data = await createProduct(userInfo, item);
      ctxDispatch({ type: 'PRODUCT_CREATE', payload: data });
      navigate(redirect);

    } catch (err) {
      toast.error(err.message);
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
                    placeholder="Name of the product"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlid="slug">
                <Form.Label>Slug</Form.Label>
                <Form.Control
                    placeholder="Short name of the product, which will be included at the end of the URL"
                    required
                    onChange={(e) => setSlug(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlid="image">
                <Form.Label>Image</Form.Label>
                <Form.Control
                placeholder="Image URL address, should starts with http/https"
                    required
                    type="text"
                    //value={image}
                    onChange={(e) => setImage(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlid="brand">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                placeholder="Brand name"
                    required
                    onChange={(e) => setBrand(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlid="category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                placeholder="Category"
                    required
                    onChange={(e) => setCategory(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlid="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                placeholder="Description"
                    required
                    onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlid="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                placeholder="Price"
                    required
                    onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlid="countMany">
                <Form.Label>Count</Form.Label>
                <Form.Control
                placeholder="Count"
                    required
                    onChange={(e) => setCountMany(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlid="rating">
                <Form.Label>Rating</Form.Label>
                <Form.Control
                placeholder="Rating"
                    required
                    onChange={(e) => setRating(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlid="numReviews">
                <Form.Label>Number of Reviews</Form.Label>
                <Form.Control
                placeholder="Number of reviews"
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
