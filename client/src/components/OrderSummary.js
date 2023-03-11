
import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { Card, Col, ListGroup, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useParams } from 'react-router-dom';
import getError from '../util';

import LoadingComponent from './LoadingComponent';
import MessageComponent from './MessageComponent';
import { Store } from './Store';
import { toast } from 'react-toastify';

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, order: action.payload, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'PAY_REQUEST':
            return { ...state, loadingPay: true };
        case 'PAY_SUCCESS':
            return { ...state, loadingPay: false, errorPay: action.payload };
        case 'PAY_FAIL':
            return { ...state, loadingPay: false, errorPay: action.payload };
        case 'PAY_RESET':
            return { ...state, loadingPay: false, successPay: false };

        default:
            return state;
    }
};

function OrderSummary() {
    const params = useParams();
    const { id: orderId } = params;
    const navigate = useNavigate();
    const { state } = useContext(Store);
    const { userInfo } = state;

    const [{ loading, error, order, successPay, loadingPay }, dispatch] = useReducer(reducer, {
        loading: true,
        order: {},
        error: '',
        successPay: false,
        loadingPay: false
    });
    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

    function createOrder(data, actions) {
        return actions.order
            .create({ purchase_units: [{ amount: { value: order.totalPrice } }] })
            .then((orderId) => {
                return orderId;
            });
    }

    function onApprove(data, actions) {
        return actions.order.capture().then(async function (details) {
            try {
                dispatch({ type: 'PAY_REQUEST' });
                const { data } = await axios.put(`/api/orders/${order._id}/pay`,
                    details,
                    { headers: { authorization: `Bearer ${userInfo.token}` } }
                );
                dispatch({ type: "PAY_SUCCESS", payload: data });
                toast.success('Order is paid');
            } catch (err) {
                dispatch({ type: 'PAY_FAIL', payload: getError(err) });
                toast.error(getError(err));
            }
        })
    }

    function onError(err) {
        toast.error(getError(err));
    }

    useEffect(() => {

        const fetchOrder = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' });
                const { data } = await axios.get(`/api/orders/${orderId}`, {
                    headers: { authorization: `Bearer ${userInfo.token}` }
                });
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
            }
        }

        if (!userInfo) {
            return navigate('/login')
        }
        if (!order._id || successPay || (order._id && order._id !== orderId)) {
            fetchOrder();
            if (successPay) {
                dispatch({ type: 'PAY_RESET' });
            }
        } else {
            const loadPaypalScript = async () => {
                const { data: clientId } = await axios.get('/api/keys/paypal', {
                    headers: { authorization: `Bearer ${userInfo.token}` }
                });
                paypalDispatch({
                    type: 'resetOptions',
                    value: { 'client-id': clientId, currency: 'USD' }
                });
                paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
            }
            loadPaypalScript();
        }
    }, [order, userInfo, orderId, navigate, paypalDispatch, successPay]);

    return (
        loading ? (<LoadingComponent></LoadingComponent>)
            : error ? (<MessageComponent variant="danger">{error}</MessageComponent>)
                : (<div>
                    <Helmet>
                        <title>Order {orderId}</title>
                    </Helmet>
                    <h1 className="my-3">Order {orderId}</h1>
                    <Row>
                        <Col md={8}>
                            <Card className="mb-3">
                                <Card.Body>
                                    <Card.Title>Shipping</Card.Title>
                                    <Card.Text>
                                        <strong>Name:</strong> {order.shippingInfo.fullName} <br />
                                        <strong>Address: </strong> {order.shippingInfo.address},
                                        {order.shippingInfo.city}, {order.shippingInfo.postCode},
                                        {order.shippingInfo.country}
                                    </Card.Text>
                                    {order.isDelivered ? (
                                        <MessageComponent variant="success">
                                            Delivered at {order.deliveredAt}
                                        </MessageComponent>
                                    ) : (
                                        <MessageComponent variant="danger">Not Delivered</MessageComponent>
                                    )}
                                </Card.Body>
                            </Card>
                            <Card className="mb-3">
                                <Card.Body>
                                    <Card.Title>Payment</Card.Title>
                                    <Card.Text>
                                        <strong>Method:</strong> {order.paymentMethod}
                                    </Card.Text>
                                    {order.isPaid ? (
                                        <MessageComponent variant="success">
                                            Paid at {order.paidAt}
                                        </MessageComponent>
                                    ) : (
                                        <MessageComponent variant="danger">Not Paid</MessageComponent>
                                    )}
                                </Card.Body>
                            </Card>
                            <Card className="mb-3">
                                <Card.Body>
                                    <Card.Title>Items</Card.Title>
                                    <ListGroup variant="flush">
                                        {order.orderItems.map((item) => (
                                            <ListGroup.Item key={item._id} >
                                                <Row className="align-items-center">
                                                    <Col md={6}>
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className="img-fluid rounded img-thumbnail"
                                                        ></img>{' '}
                                                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                                    </Col>
                                                    <Col md={3}>
                                                        <span>{item.quantity}</span>
                                                    </Col>
                                                    <Col md={3}>${item.price}</Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="mb-3">
                                <Card.Body>
                                    <Card.Title>Order Summary</Card.Title>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Items</Col>
                                                <Col>${order.itemsPrice.toFixed(2)}</Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Shipping</Col>
                                                <Col>${order.shippingPrice.toFixed(2)}</Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Tax</Col>
                                                <Col>${order.taxPrice.toFixed(2)}</Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col><strong>Total</strong></Col>
                                                <Col><strong>${order.totalPrice.toFixed(2)}</strong></Col>
                                            </Row>
                                        </ListGroup.Item>
                                        {!order.isPaid && (
                                            <ListGroup.Item>
                                                {isPending ? (
                                                    <LoadingComponent />
                                                ) : (
                                                    <div>
                                                        <PayPalButtons
                                                            createOrder={createOrder}
                                                            onApprove={onApprove}
                                                            onError={onError}
                                                        >
                                                        </PayPalButtons>
                                                    </div>
                                                )}

                                            </ListGroup.Item>
                                        )}
                                        {loadingPay && <LoadingComponent></LoadingComponent>}
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>)
    );
}

export default OrderSummary;
