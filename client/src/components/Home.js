
import React, { useEffect, useReducer } from 'react'

//import { data } from '../data'
import axios from "axios";
//import logger from "use-reducer-logger";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from './Product';
import { Helmet } from 'react-helmet-async';
import LoadingComponent from './LoadingComponent';
import MessageComponent from './MessageComponent';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, products: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

function Home() {
    //const [products, setProducts] = useState([]);
    const [{ loading, error, products }, dispatch] = useReducer(reducer, {
        products: [],
        loading: true,
        error: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/products');
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message })
            }

            //setProducts(result.data);
        };

        fetchData();

    }, []);

    return (
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
                    <Row>
                        {products.map(x => (
                            <Col key={x.slug} sm={6} md={4} lg={4} className="md-3">
                                <Product product={x}></Product>
                            </Col>
                        ))}
                    </Row>
                )}
            </div>
        </div>
    )
}

export default Home;


