
import axios from 'axios';
import React, { useContext } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { Store } from './Store';


function Product(props) {
    const { product } = props;

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        cart: { cartItems },
    } = state;


    const addToCartHandler = async (item) => {

        const exists = cartItems.find((x) => x._id === product._id);
        const quantity = exists ? exists.quantity + 1 : 1;
        const { data } = await axios.get(`/api/products/${item._id}`);


        if (data.countMany < quantity) {
            window.alert('Sorry. Product is out of stock')
        }

        ctxDispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
    }


    return (
        <Card>
            <Link to={`/product/${product.slug}`}>
                <img src={product.image} className="card-img-top" alt={product.name}></img>
            </Link>
            <Card.Body>
                <Link to={`/product/${product.slug}`}>
                    <Card.Title>
                        {product.name}
                    </Card.Title>
                </Link>
                <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
                <Card.Text>${product.price}</Card.Text>
                {product.countMany === 0 ? <Button disabled variant="light">Out Of Stock</Button>
                    : <Button onClick={() => addToCartHandler(product)}>Add To Cart</Button>
                }
            </Card.Body>
        </Card>
    )
}

export default Product
