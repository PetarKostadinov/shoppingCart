import axios from 'axios';
import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import getError from '../util';
import { Store } from './Store';

const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_ITEM_REQUEST':
            return { ...state, loadingUpdate: true, itemToEditDb: action.payload };
        case 'UPDATE_ITEM_SUCCESS':
            return { ...state, itemToEditDb: action.payload, loadingUpdate: false };
        case 'GET_ITEM_SUCCESS':
            return { ...state, currItem: action.payload, loadingUpdate: false };
        case 'UPDATE_ITEM_FAIL':
            return { ...state, loadingUpdate: false };
        default:
            return state;
    }
}
function EditItemPage() {

    const navigate = useNavigate();

    const { id } = useParams();

    const currItem = JSON.parse(localStorage.getItem('itemToEditDb'))

    const [{ loadingUpdate, itemToEditDb }, dispatch] = useReducer(reducer, {

        itemToEditDb: [],
        loading: true,
        error: ''
    });

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
    const { userInfo } = state;

    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch({ type: 'UPDATE_ITEM_REQUEST' });
        try {
          

            const result = await axios.put(
                `/api/products/${id}/editItem`,
                {
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

            if(isNaN(result.data.price) || Number(result.data.price) < 1) {
                throw new Error('Price should be a Positive Number')
            }else if(isNaN(result.data.countMany) || Number(result.data.countMany) < 0){
                throw new Error('Count should be a Positive Number or 0')
            }else if(isNaN(result.data.rating) || Number(result.data.rating) < 0){
                throw new Error('Rating should be a Positive Number or 0')
            }else if(isNaN(result.data.numReviews) || Number(result.data.numReviews) < 0){
                throw new Error('Number of Reviews should be a Positive Number or 0')
            }
            ctxDispatch({ type: 'UPDATE_ITEM_SUCCESS', payload: result.data });
            navigate(`/product/${result.data._id}`)
            toast.success('The Item has been updated successfully');
           
           
        } catch (err) {
            dispatch({ type: 'FETCH_FAIL' });
            toast.error(getError(err));
        }
    }
    
    return (
        <div className="container small-container">
            <Helmet>
                <title>Edit Item</title>
            </Helmet>
            <h1 className="my-3">Edit Item</h1>
            <form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control

                        defaultValue={currItem.name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="slug">
                    <Form.Label>Slug</Form.Label>
                    <Form.Control
                       
                        defaultValue={currItem.slug}
                        onChange={(e) => setSlug(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="image">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        defaultValue={currItem.image}
                        onChange={(e) => setImage(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="brand">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control
                        defaultValue={currItem.brand}
                        
                        onChange={(e) => setBrand(e.target.value)}
                        required

                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        defaultValue={currItem.category}
                     
                        onChange={(e) => setCategory(e.target.value)}
                        required

                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        defaultValue={currItem.description}
                       
                        onChange={(e) => setDescription(e.target.value)}
                        required

                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        defaultValue={currItem.price}
                        
                        onChange={(e) => setPrice(e.target.value)}
                        required

                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="countMany">
                    <Form.Label>Count</Form.Label>
                    <Form.Control
                        defaultValue={currItem.countMany}
                      
                        onChange={(e) => setCountMany(e.target.value)}
                        required

                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="rating">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                        defaultValue={currItem.rating}
                      
                        onChange={(e) => setRating(e.target.value)}
                        required

                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="numReviews">
                    <Form.Label>Number of Reviews</Form.Label>
                    <Form.Control
                        defaultValue={currItem.numReviews}
                       
                        onChange={(e) => setNumReviews(e.target.value)}
                        required

                    />
                </Form.Group>

                <div className="mb-3">
                    <Button type="submit">
                        Edit
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default EditItemPage;
