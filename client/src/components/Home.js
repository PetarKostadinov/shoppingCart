
import React, { useEffect, useReducer, useState } from 'react'
import { Link } from 'react-router-dom'
//import { data } from '../data'
import axios from "axios";
import logger from "use-reducer-logger";
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
    const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
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
            <h1>Products</h1>
            <div className="products">
                {loading ? (
                    <div>
                        Loading...
                    </div>
                ) : error ? (
                    <div>
                        {error}
                    </div>
                ) : (
                products.map(x => (
                    <div className="product" key={x.slug}>
                        <Link to={`/product/${x.slug}`}>
                            <img src={x.image} alt={x.name}></img>
                        </Link>
                        <div className="product-info">
                            <Link to={`/product/${x.slug}`}>
                                <p>
                                    {x.name}
                                </p>
                            </Link>
                            <p>
                                <strong>${x.price}</strong>
                            </p>
                            <button>Add To Cart</button>
                        </div>
                    </div>
                )))}
            </div>
        </div>
    )
}

export default Home;


