
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Product from "./components/ProductScreen";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import LinkContainer from "react-router-bootstrap/LinkContainer";
import { Badge, Nav } from "react-bootstrap";
import { useContext } from "react";
import { Store } from "./components/Store";
import CartScreen from "./components/CartScreen";
import ProductScreen from "./components/ProductScreen";

function App() {
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>
                  <img src="/images/linkedin_banner_image_2.png" alt="shopping well" />
                </Navbar.Brand>
              </LinkContainer>
              <Nav>
                <Link to="/cart" className="nav-link">
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/cart" element={<CartScreen />}></Route>
              <Route path="/product/:slug" element={<ProductScreen />}></Route>
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All rights reserved &copy;. Code: Petar Kostadinov &#8482; &reg;</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
