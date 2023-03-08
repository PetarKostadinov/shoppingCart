import React from 'react'
import { Col, Row } from 'react-bootstrap'

function Checkout(props) {
    return (
        <Row className="checkout-steps">
            <Col className={props.step1 ? 'active' : ''}>Login</Col>
            <Col className={props.step2 ? 'active' : ''}>Shipping</Col>
            <Col className={props.step3 ? 'active' : ''}>Payment</Col>
            <Col className={props.step4 ? 'active' : ''}>Order</Col>
        </Row>
    )
}

export default Checkout
