import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from './Product';
import { Helmet } from 'react-helmet-async';
import LoadingComponent from './LoadingComponent';
import MessageComponent from './MessageComponent';
import { fetchProducts } from '../service/productService';
import { useLocation } from 'react-router-dom';
import { generatePaginationLinks } from '../service/paginationService';

const productsToShow = 6;

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Home() {
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(productsToShow);

    const query = useQuery();
    const page = parseInt(query.get("page")) || 1;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await fetchProducts(currentPage, productsPerPage);
                setProducts(data);
                setTotalPages(Math.ceil(data.length / productsToShow));
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        setCurrentPage(page);
        fetchData();
    }, [currentPage, productsPerPage, page]);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginationLinks = generatePaginationLinks(currentPage, totalPages);

    const handleNextPageClick = () => {
        setCurrentPage(currentPage + 1);
        window.scrollTo(0, 0); // Scroll to top of window
    }

    return (
        <>
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
                    <div className="btn-group" onClick={() => handleNextPageClick()}>{paginationLinks}</div>
                </div>
            </div>
        </>
    );
}

export default Home;
