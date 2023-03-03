
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Product from "./components/ProductScreen";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import LinkContainer from "react-router-bootstrap/LinkContainer";

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>
                  <img src="/images/linkedin_banner_image_2.png" alt="shopping well"/>
                </Navbar.Brand>
              </LinkContainer>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/product/:slug" element={<Product />}></Route>
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
