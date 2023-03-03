
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Product from "./components/Product";

function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <Link to="/">shoping well</Link>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/product/:slug" element={<Product />}></Route>
          </Routes>

        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
