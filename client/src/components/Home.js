import React, { useEffect, useReducer, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from './Product';
import { Helmet } from 'react-helmet-async';
import LoadingComponent from './LoadingComponent';
import MessageComponent from './MessageComponent';
import { fetchProducts } from '../service/productService';
import { useLocation } from 'react-router-dom';
import { generatePaginationLinks } from '../service/paginationService';
import { Carousel, Image } from 'react-bootstrap';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, products: action.payload, totalPages: Math.ceil(action.payload.length / 6), loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Home() {
    const [currentPage, setCurrentPage] = useState(1);
    const [{ loading, error, products, totalPages, productsPerPage }, dispatch] = useReducer(reducer, {
        products: [],
        totalPages: 1,
        loading: true,
        error: '',
        productsPerPage: 6,
    });

    const query = useQuery();
    const page = parseInt(query.get("page")) || 1;

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

        setCurrentPage(page);

        fetchData();
    }, [currentPage, productsPerPage, page]);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginationLinks = generatePaginationLinks(currentPage, totalPages)

    return (
        <>
            <Carousel>
                <Carousel.Item>
                    <Image className="d-block w-100" src="https://vida.bg/wp-content/uploads/2021/10/VIDA_Banner_BG.jpg" alt="Home Page" />
                </Carousel.Item>
                <Carousel.Item>
                    <Image className="d-block w-100" src="https://vida.bg/wp-content/uploads/2021/10/Spirits_Banner-BG.jpg" alt="Home Page" />
                </Carousel.Item>
                <Carousel.Item>
                    <Image className="d-block w-100" src="http://vida.bg/wp-content/uploads/2022/10/Jim-Beam-EN.jpg" alt="Home Page" />
                </Carousel.Item>
                <Carousel.Item>
                    <Image className="d-block w-100" src="https://vida.bg/wp-content/uploads/2021/09/kraken-category-header.png" alt="Home Page" />
                </Carousel.Item>
                <Carousel.Item>
                    <Image className="d-block w-100" src="https://cdn-ccnlk.nitrocdn.com/FagQESmbWOQjOsPKkgdiNUYIEZTBiuRg/assets/images/optimized/rev-56322ca/wp-content/uploads/2022/10/Beluga-Category-Banner-1920x314-V1-1920x314.jpg" alt="Home Page" />
                </Carousel.Item>
            </Carousel>
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
                        </>
                    )}
                </div>
                <div className="d-flex justify-content-center mt-5">
                    <div className="btn-group">{paginationLinks}</div>
                </div>
            </div>
        </>
    );
}

export default Home;