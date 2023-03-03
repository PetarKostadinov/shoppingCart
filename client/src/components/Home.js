
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
//import { data } from '../data'
import axios from "axios";

function Home() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('/api/products');
            setProducts(result.data);
        };
        
        fetchData();
        
    }, []);

    return (
        <div>
            <h1>Products</h1>
            <div className="products">
                {products.map(x => (
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
                ))}
            </div>
        </div>
    )
}

export default Home;


