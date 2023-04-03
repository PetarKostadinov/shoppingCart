
import React, { useEffect, useReducer, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from './Product';
import { Helmet } from 'react-helmet-async';
import LoadingComponent from './LoadingComponent';
import MessageComponent from './MessageComponent';
import Button from 'react-bootstrap/Button';
import { fetchProducts } from '../service/productService';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, products: action.payload, totalPages: Math.ceil(action.payload.length / state.productsPerPage), loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function Home() {
    const [currentPage, setCurrentPage] = useState(1);
    const [{ loading, error, products, totalPages, productsPerPage }, dispatch] = useReducer(reducer, {
        products: [],
        totalPages: 1,
        loading: true,
        error: '',
        productsPerPage: 3,
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const data = await fetchProducts(currentPage, productsPerPage);
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message });
            }
        };

        fetchData();
    }, [currentPage, productsPerPage]);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
        <>
            <div>
                <img className="mw-100" src="/images/Homepage-Hero-Desktop-Slot-9.jpg" alt="Home Page" />
            </div>
            <div>
                <Helmet>
                    <title>shopping well</title>
                </Helmet>

                <h1>Products</h1>
                <div className="products">
                    {loading ? (
                        <LoadingComponent />
                    ) : error ? (
                        <MessageComponent variant="danger">{error}</MessageComponent>
                    ) : (
                        <>
                            <Row className="row pt-4 gy-4">
                                {currentProducts.map((x) => (
                                    <Col key={x._id} sm={6} md={5} lg={4} className="md-4">
                                        <Product product={x}></Product>
                                    </Col>
                                ))}
                            </Row>
                            <div className="d-flex justify-content-center my-4">
                                <Button variant="light" onClick={handlePrevPage} disabled={currentPage === 1}>
                                    Previous
                                </Button>
                                <Button className="mx-1" variant="light" disabled>
                                    Page {currentPage} of {totalPages}
                                </Button>
                                <Button variant="light" onClick={handleNextPage} disabled={currentPage === totalPages}>
                                    Next
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default Home;