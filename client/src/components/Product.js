import React, { useContext } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from '../helpersComponents/Rating';
import { Store } from '../helpersComponents/Store';
import { getProduct } from '../service/productService';

function Product(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart: { cartItems } } = state;

  const addToCartHandler = async (item) => {
    const exists = cartItems.find((x) => x._id === product._id);
    const quantity = exists ? exists.quantity + 1 : 1;

    const data = await getProduct(item._id);

    if (data.countMany < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }

    ctxDispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
  };

  return (
    <Card className="card h-100">
      <Link to={`/product/${product._id}/${product.slug}`}>
        <img src={product.image} className="card-img-top" alt={product.name}></img>
      </Link>
      <Card.Body>
        <Link className="link-none-underline hov" to={`/product/${product._id}/${product.slug}`}>
          <Card.Title>
            {product.name}
          </Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
        <Card.Text className="price">${product.price}</Card.Text>
        {product.countMany === 0
          ? <Button disabled variant="light">Out Of Stock</Button>
          : <Button onClick={() => addToCartHandler(product)}>Add To Cart</Button>
        }
      </Card.Body>
    </Card>
  );
}

export default Product;
