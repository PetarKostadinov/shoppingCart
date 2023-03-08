import React, { useContext, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from './CheckoutSteps';
import { Store } from './Store';

function ShippingInfo() {

    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo, cart: { shippingInfo } } = state;
    const [fullName, setFullName] = useState(shippingInfo.fullName || '');
    const [address, setAddress] = useState(shippingInfo.address || '');
    const [city, setCity] = useState(shippingInfo.city || '');
    const [postCode, setPostCode] = useState(shippingInfo.postCode || '');
    const [country, setCountry] = useState(shippingInfo.country || '');

    useEffect(() => {
        if (!userInfo) {
            navigate('/login?redirect=/shipping')
        }
    })

    const submitHandler = (e) => {
        e.preventDefault();
        ctxDispatch({
            type: 'SAVE_SHIPPING_INFO',
            payload: {
                fullName,
                address,
                city,
                postCode,
                country
            }
        });

        localStorage.setItem(
            'shippingInfo,',
            JSON.stringify({
                fullName,
                address,
                city,
                postCode,
                country
            })
        );
        navigate('/payment');
    }

    return (
        <div>
            <Helmet>
                <title>Shipping Information</title>
            </Helmet>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <div className="container small-container">
                <h1 className="my-3" controlid="fullName">Shipping Information</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlid="fullName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="fullName">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="fullName">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="fullName">
                        <Form.Label>Postcode</Form.Label>
                        <Form.Control
                            value={postCode}
                            onChange={(e) => setPostCode(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="fullName">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <div className="mb-3">
                        <Button variant="primary" type="submit">
                            Continue
                        </Button>
                    </div>
                </Form>
            </div>

        </div>
    )
}

export default ShippingInfo
