
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
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useLocation } from 'react-router-dom';

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
        };

        fetchData();

    }, []);


   

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
                        <Row className="row pt-4 gy-4">
                            {products.map(x => (
                                <Col key={x._id} sm={6} md={5} lg={4} className="md-4">
                                    <Product product={x}></Product>
                                </Col>
                            ))}
                        </Row>
                    )}
                </div>
            </div>
            {/* <div>
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
            </div> */}
        </>
    )
}

export default Home;


