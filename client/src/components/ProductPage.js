import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react'
import { Badge, Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom'
import getError from '../util';
import LoadingComponent from './LoadingComponent';
import MessageComponent from './MessageComponent';
import Rating from './Rating';
import { Store } from './Store';


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, product: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

function ProductScreen() {
    const navigate = useNavigate();

    const params = useParams();
    const { slug } = params;

    const [{ loading, error, product, allProducts }, dispatch] = useReducer(reducer, {
        allProducts: [],
        product: [],
        loading: true,
        error: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`/api/products/slug/${slug}`);
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
            }
        };

        fetchData();

    }, [slug]);

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;

    const addToCartHandler = async () => {
        const exists = cart.cartItems.find((x) => x._id === product._id);
        const quantity = exists ? exists.quantity + 1 : 1;
        const { data } = await axios.get(`/api/products/${product._id}`);

        if (data.countMany < quantity) {
            window.alert('Sorry. Product is out of stock')
        }

        ctxDispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });

        navigate('/cart');
    };

/////DELETE   -   EDIT

    const deleteHandler = async () => {
        
       await axios.delete(`/api/products/${product._id}`)
       ctxDispatch({type: 'CART_REMOVE_ITEM', payload: product});
       navigate('/');
    }

    const editHandler = async () => {

    }

    return loading ? (<LoadingComponent />)
        : error ? (<MessageComponent variant="danger">{error}</MessageComponent>)
            : (<div>
                <Row>
                    <Col md={6}><img className="img-large" src={product.image} alt={product.name} /></Col>
                    <Col md={3}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Helmet>
                                    <title>{product.name}</title>
                                </Helmet>
                                <h1>{product.name}</h1></ListGroup.Item>
                            <ListGroup.Item><Rating rating={product.rating} numReviews={product.numReviews}></Rating></ListGroup.Item>
                            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                            <ListGroup.Item>Description: <p>{product.description}</p></ListGroup.Item>
                            {userInfo && userInfo.isAdmin && (
                                <ListGroup.Item className="align-center">
                                    <Button onClick={editHandler}>Edit</Button>{' '}

                                    <Button className="button-delete" onClick={deleteHandler}>Delete</Button>
                                </ListGroup.Item>
                            )}
                        </ListGroup>

                    </Col>
                    <Col md={3}>
                        <Card>
                            <Card.Body>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col>${product.price}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>
                                                {product.countMany > 0 ?
                                                    (<Badge bg="success">In Stock</Badge>)
                                                    : (<Badge bg="danger">Unavailable</Badge>)}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {product.countMany > 0
                                        && (<ListGroup.Item>
                                            <div className="d-grid">
                                                <Button onClick={addToCartHandler} variant="primary">
                                                    AddTo Cart
                                                </Button>
                                            </div>
                                        </ListGroup.Item>)}
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div >);


}

export default ProductScreen;
