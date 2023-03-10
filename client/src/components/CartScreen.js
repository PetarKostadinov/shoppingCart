import axios from 'axios';
import React, { useContext } from 'react'
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import MessageComponent from './MessageComponent';
import { Store } from './Store'

function CartScreen() {
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        cart: { cartItems },
    } = state;

    const updateCartHandler = async (item, quantity) => {
        const { data } = await axios.get(`/api/products/${item._id}`);


        if (data.countMany < quantity) {
            window.alert('Sorry. Product is out of stock')
        }

        ctxDispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
    }

    const removeItemHandler = (item) => {
        ctxDispatch({type: 'CART_REMOVE_ITEM', payload: item});
    }

    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping');
    }

    return (
        <div>
            <Helmet>
                <title>Shopping Cart</title>
            </Helmet>
            <h1>Shopping Cart</h1>
            <Row>
                <Col md={8}>
                    {cartItems.length === 0 ? (
                        <MessageComponent>
                            Cart is empty. <Link to="/">Go Shoping</Link>
                        </MessageComponent>
                    ) : (
                        <ListGroup>
                            {cartItems.map((x) => (
                                <ListGroup.Item key={x._id}>
                                    <Row className="align-items-cebtre">
                                        <Col md={4}>
                                            <img
                                                src={x.image}
                                                alt={x.name}
                                                className="img-fluid rounded img-thumbnail"
                                            ></img>{' '}
                                            <Link to={`/product/${x.slug}`}>{x.name}</Link>
                                        </Col>
                                        <Col md={3}>
                                            <Button
                                                variant="light"
                                                onClick={() => updateCartHandler(x, x.quantity - 1)}
                                                disabled={x.quantity === 1}
                                            >
                                                <i className="fas fa-minus-circle"></i>
                                            </Button>{' '}
                                            <span>{x.quantity}</span>{' '}
                                            <Button
                                                variant="light"
                                                onClick={() => updateCartHandler(x, x.quantity + 1)}
                                                disabled={x.quantity === x.countMany}
                                            >
                                                <i className="fas fa-plus-circle"></i>
                                            </Button>{' '}
                                        </Col>
                                        <Col md={3}>${x.price}</Col>
                                        <Col md={2}>
                                            <Button
                                                onClick={() => removeItemHandler(x)}
                                                variant="light">
                                                <i className="fas fa-trash"></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )
                    }
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h3>
                                        Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                                        items) : $
                                        {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                                    </h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className="d-grid">
                                        <Button 
                                        variant="primary" 
                                        type="button" 
                                        onClick={checkoutHandler}
                                        disabled={cartItems.length === 0}
                                        >
                                            Proceed To Checkout
                                        </Button>
                                    </div>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default CartScreen;
