
import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import getError from "../util";
import Checkout from "./CheckoutSteps";
import LoadingComponent from "../helpersComponents/LoadingComponent";
import { Store } from "../helpersComponents/Store";
import { createOrder } from "../service/orderService";
import { calculateCartTotals } from "../service/calculateCartTotals";

function PreviewOrder() {
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;

    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
    cart.itemsPrice = round2(
        cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
    );

    cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
    cart.taxPrice = round2(0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    const [loading, setLoading] = useState(false);
    const [loadingOrder, setLoadingOrder] = useState(false);

    useEffect(() => {
        calculateCartTotals(cart);
    }, [cart]);

    const placeOrderHandler = async () => {
        try {
            setLoadingOrder(true);
            const data = await createOrder(cart, userInfo);
            ctxDispatch({ type: "CART_CLEAR" });
            setLoading(false);
            localStorage.removeItem("cartItems");
            navigate(`/order/${data.order._id}`);
        } catch (err) {
            setLoading(false);
            toast.error(getError(err));
        } finally {
            setLoadingOrder(false);
        }
    };

    useEffect(() => {
        if (!cart.paymentMethod) {
            navigate("/payment");
        }
    }, [cart, navigate]);
    return (
        <div>
            <Checkout step1 step2 step3 step4></Checkout>
            <Helmet>
                <title>Preview Order</title>
            </Helmet>
            <h1 className="my-3">Preview Order</h1>
            <Row className="text-white">
                <Col md={8}>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Shipping</Card.Title>
                            <Card.Text>
                                <strong>Name:</strong> {cart.shippingInfo.fullName} <br />
                                <strong>Address:</strong> {cart.shippingInfo.address},
                                {cart.shippingInfo.city}, {cart.shippingInfo.postCode},
                                {cart.shippingInfo.country}
                            </Card.Text>
                            <Link className="hov" to="/shipping">Edit</Link>
                        </Card.Body>
                    </Card>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Payment</Card.Title>
                            <Card.Text>
                                <strong>Method:</strong> {cart.paymentMethod}
                            </Card.Text>
                            <Link className="hov" to="/payment">Edit</Link>
                        </Card.Body>
                    </Card>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Items</Card.Title>
                            <ListGroup variant="flush">
                                {cart.cartItems.map((item) => (
                                    <ListGroup.Item style={{ backgroundColor: 'rgba(53, 50, 50, 0.8)' }} key={item._id}>
                                        <Row className="align-items-center">
                                            <Col md={6}>
                                                <img src={item.image} alt={item.name}
                                                    className="img-fluid rounded img-thumbnail"
                                                ></img>{' '}
                                                <Link className="hov" to={`/product/${item._id}/${item.slug}`}>{item.name}</Link>
                                            </Col>
                                            <Col className="text-white" md={3}><span>{item.quantity}</span></Col>
                                            <Col className="text-white" md={3}>{item.price}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                            <Link className="hov" to="/cart">Edit</Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Order Summary</Card.Title>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${cart.itemsPrice.toFixed(2)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${cart.shippingPrice.toFixed(2)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${cart.taxPrice.toFixed(2)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col><strong>Order Total</strong></Col>
                                    <Col><strong>${cart.totalPrice.toFixed(2)}</strong></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <div className="d-grid">
                                    <Button
                                        type="button"
                                        onClick={placeOrderHandler}
                                        disabled={cart.cartItems.length === 0}
                                    >
                                        Place Order
                                    </Button>
                                </div>
                                {loading && <LoadingComponent></LoadingComponent>}
                            </ListGroup.Item>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default PreviewOrder;