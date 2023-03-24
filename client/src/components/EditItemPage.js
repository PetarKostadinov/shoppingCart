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
            return { ...state, loadingUpdate: true };
        case 'UPDATE_ITEM_SUCCESS':
            return { ...state, itemToEdit: action.payload, loadingUpdate: false };
        case 'UPDATE_ITEM_FAIL':
            return { ...state, loadingUpdate: false };
        default:
            return state;
    }
}
function EditItemPage() {

    const navigate = useNavigate();

    const { id } = useParams();
    // console.log(id)
    let item = []

    const findById = async () => {
        const data = await axios.get(`/api/products/${id}`)
            .then((res) => {
                //console.log(res.data)
                localStorage.setItem('itemToEdit', JSON.stringify(res.data))
                item.push(JSON.stringify(res.data))
                return JSON.stringify(res.data)
            })

    }
    const curItem = JSON.parse(localStorage.getItem('itemToEdit'))
    findById()
    // console.log(item)

    const [{ loading, error, itemToEdit }, dispatch] = useReducer(reducer, {

        itemToEdit: [],
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
        try {
            const { data } = await axios.put(
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

            ctxDispatch({ type: 'UPDATE_ITEM_SUCCESS', payload: data });
            //console.log(data)
            localStorage.setItem('itemToEdit', JSON.stringify(data))
            navigate(`/product/${curItem.slug}`)
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
                  
                        defaultValue={curItem.name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="slug">
                    <Form.Label>Slug</Form.Label>
                    <Form.Control
                        type="slug"
                        defaultValue={curItem.slug}
                        onChange={(e) => setSlug(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="image">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        defaultValue={curItem.image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="brand">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control
                        defaultValue={curItem.brand}
                        type="brand"
                        onChange={(e) => setBrand(e.target.value)}

                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        defaultValue={curItem.category}
                        type="category"
                        onChange={(e) => setCategory(e.target.value)}

                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        defaultValue={curItem.description}
                        type="description"
                        onChange={(e) => setDescription(e.target.value)}

                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        defaultValue={curItem.price}
                        type="price"
                        onChange={(e) => setPrice(e.target.value)}

                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="countMany">
                    <Form.Label>Count</Form.Label>
                    <Form.Control
                        defaultValue={curItem.countMany}
                        type="countMany"
                        onChange={(e) => setCountMany(e.target.value)}

                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="rating">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                        defaultValue={curItem.rating}
                        type="rating"
                        onChange={(e) => setRating(e.target.value)}

                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="numReviews">
                    <Form.Label>Number of Reviews</Form.Label>
                    <Form.Control
                        defaultValue={curItem.numReviews}
                        type="numReviews"
                        onChange={(e) => setNumReviews(e.target.value)}

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
