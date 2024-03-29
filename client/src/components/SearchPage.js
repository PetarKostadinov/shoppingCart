
import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import getError from '../util';
import LoadingComponent from '../helpersComponents/LoadingComponent';
import MessageComponent from '../helpersComponents/MessageComponent';
import Product from './Product';
import Rating from '../helpersComponents/Rating';
import { getProducts } from '../service/searchService';
import { getCategories } from '../service/searchService';

const prices = [
    {
        name: '$1 to $50',
        value: '1-50'
    },
    {
        name: '$51 to $200',
        value: '51-200'
    },
    {
        name: '$201 to $1000',
        value: '201-1000'
    }
];

const ratings = [
    {
        name: '4stars & up',
        rating: 4
    },
    {
        name: '3stars & up',
        rating: 3
    },
    {
        name: '2stars & up',
        rating: 2
    },
    {
        name: '1stars & up',
        rating: 1
    }
];

function SearchPage() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const sp = new URLSearchParams(search);

    const category = sp.get('category') || 'all';
    const query = sp.get('query') || 'all';
    const price = sp.get('price') || 'all';
    const rating = sp.get('rating') || 'all';
    const order = sp.get('order') || 'newest';
    const page = sp.get('page') || 1;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [products, setProducts] = useState([]);
    const [pages, setPages] = useState(0);
    const [countProducts, setCountProducts] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const data = await getProducts({ page, category, query, price, rating, order });
                setProducts(data.products);
                setPages(data.page);
                setCountProducts(data.countProducts);
                setLoading(false);
            } catch (err) {
                setError(getError(err));
                setLoading(false);
            }
        };

        fetchData();
    }, [category, error, order, page, price, query, rating]);

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categories = await getCategories();
                setCategories(categories);
            } catch (err) {
                toast.error(getError(err));
            }
        };
        fetchCategories();
    }, []);

    const getFilterUrl = (filter) => {
        const filterPage = filter.page || 1;
        const filterCategory = filter.category || category;
        const filterQuery = filter.query || query;
        const filterRating = filter.rating || rating;
        const filterPrice = filter.price || price;
        const sortOrder = filter.order || order;

        return `/search?category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`;
    }

    return (
        <div className="h-100">
            <Row>
                <Helmet>
                    <title>Search Products</title>
                </Helmet>
                <Col md={3}>
                    <h3>Department</h3>
                    <div>
                        <ul className="list-unstyled">
                            <li>
                                <Link
                                    className={'all' === category ? 'text-bold' : ''}
                                    to={getFilterUrl({ category: 'all' })}
                                >
                                    Any
                                </Link>
                            </li>
                            {categories.map((c) => (
                                <li key={c}>
                                    <Link
                                        className={c === category ? 'text-bold' : ''}
                                        to={getFilterUrl({ category: c })}
                                    >
                                        {c}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3>Price</h3>
                        <ul className="list-unstyled">
                            <li>
                                <Link
                                    className={'all' === price ? 'text-bold' : ''}
                                    to={getFilterUrl({ price: 'all' })}
                                >
                                    Any
                                </Link>
                            </li>
                            {prices.map((p) => (
                                <li key={p.value}>
                                    <Link
                                        to={getFilterUrl({ price: p.value })}
                                        className={p.value === price ? 'text-bold' : ''}
                                    >
                                        {p.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3>Avg. Customer Review</h3>
                        <ul className="list-unstyled">
                            {ratings.map((r) => (
                                <li key={r.name}>
                                    <Link
                                        to={getFilterUrl({ rating: r.rating })}
                                        className={`${r.rating}` === `${rating}` ? 'text-bold' : ''}
                                    >
                                        <Rating caption={' & up'} rating={r.rating}></Rating>
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link
                                    to={getFilterUrl({ rating: 'all' })}
                                    className={`${rating}` === `all` ? 'text-bold' : ''}
                                >
                                    <Rating caption={' & up'} rating={0}></Rating>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </Col>
                <Col md={9}>
                    {loading ? (
                        <LoadingComponent></LoadingComponent>
                    ) : error ? (
                        <MessageComponent variant="danger"></MessageComponent>
                    ) : (
                        <>
                            <h1>Searched Products</h1>
                            <Row className="justify-content-btween mb-3">
                                <Col md={6}>
                                    <div>
                                        {countProducts === 0 ? 'No' : countProducts} Results
                                        {query !== 'all' && ' : ' + query}
                                        {category !== 'all' && ' : ' + category}
                                        {price !== 'all' && ' : Price ' + price}
                                        {rating !== 'all' && ' : Rating ' + rating + ' & up'}
                                        {query !== 'all'
                                            || category !== 'all'
                                            || rating !== 'all' ||
                                            price !== 'all' ? (
                                            <Button
                                                variant="light"
                                                onClick={() => navigate('/search')}
                                            >
                                                <i className="fas fa-times-circle"></i>
                                            </Button>
                                        ) : null
                                        }
                                    </div>
                                </Col>
                                <Col className="text-end">
                                    Select by{' '}
                                    <select
                                        value={order}
                                        onChange={(e) => {
                                            navigate(getFilterUrl({ order: e.target.value }));
                                        }}>
                                        <option value="newest">Newest Arrivals</option>
                                        <option value="lowest">Price: Low to High</option>
                                        <option value="highest">Price: High to Low</option>
                                        <option value="toprated">Avg. Customer Reviews</option>
                                    </select>
                                </Col>
                            </Row>
                            {products.length === 0 && (
                                <MessageComponent>No Products Found</MessageComponent>
                            )}
                            <Row>
                                {products.map((product) => (
                                    <Col sm={6} lg={4} className="mb-3 popup pb-5 pt-5" key={product._id}>
                                        <Product product={product}></Product>
                                    </Col>
                                ))}
                            </Row>
                            <div>
                                {[...Array(pages).keys()].map((x) => (
                                    <LinkContainer
                                        key={x + 1}
                                        className="mx-1"
                                        to={getFilterUrl({ page: x + 1 })}
                                    >
                                        <Button
                                            className={Number(page) === x + 1 ? 'text-bold' : ''}
                                            variant="light"
                                        >
                                            {x + 1}
                                        </Button>
                                    </LinkContainer>
                                ))}
                            </div>
                        </>
                    )}
                </Col>
            </Row>
        </div>
    )
}

export default SearchPage;
