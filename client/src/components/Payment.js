import React, { useContext, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import Checkout from './CheckoutSteps'
import { Store } from './Store'

function Payment() {
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart: { shippingInfo, paymentMethod } } = state;
    const [paymentName, setPayment] = useState(paymentMethod || 'PayPal');
    
    useEffect(() => {
        if (!shippingInfo.address) {
            navigate('/shipping')
        }
    }, [shippingInfo, navigate]);
    const submitHandler = (e) => {
        e.preventDefault();
        ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentName });
        localStorage.setItem('paymentMethod', paymentName);
        navigate('/order');
    }
    return (
        <div>
            <Checkout step1 step2 step3></Checkout>
            <div className="container small-container"></div>
            <Helmet>
                <title>Payment</title>
            </Helmet>
            <h1 className="my-3">Payment</h1>
            <Form onSubmit={submitHandler}>
                <div className="mb-3">
                    <Form.Check
                        type="radio"
                        id="PayPal"
                        label="PayPal"
                        value="PayPal"
                        checked={paymentName === "PayPal"}
                        onChange={(e) => setPayment(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <Form.Check
                        type="radio"
                        id="Stripe"
                        label="Stripe"
                        value="Stripe"
                        checked={paymentName === "Stripe"}
                        onChange={(e) => setPayment(e.target.value)}
                    />
                </div>
                <div className="mb-3" >
                    <Button type="submit">Continue</Button>
                </div>
            </Form>
        </div>
    )
}

export default Payment
