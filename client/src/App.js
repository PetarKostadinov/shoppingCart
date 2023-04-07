import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Container from "react-bootstrap/Container";
import CartScreen from "./components/CartScreen";
import DetailsPage from "./components/DetailsPage";
import Login from "./components/Login";
import ShippingInfo from "./components/ShippingInfo";
import Register from "./components/Register";
import Payment from "./components/Payment";
import OrderPage from "./components/OrderPage";
import OrderSummary from "./components/OrderSummary";
import OrderHistory from "./components/OrderHistory";
import Profile from "./components/Profile";
import SearchPage from "./components/SearchPage";
import Protected from "./components/Protected";
import DashboardPage from "./components/DashboardPage";
import AdminRoute from "./components/AdminRoute";
import Header from "./components/Header";
import { useState } from "react";
import CreateItem from "./components/CreateItem";
import EditItemPage from "./components/EditItemPage";
import CarouselComponent from "./components/Carousel";
import Footer from "./components/Footer";

function App() {

  const [sideBarIsOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className={sideBarIsOpen ?
        "d-flex flex-column site-container active-cont"
        : "d-flex flex-column site=container"
      }>
        <ToastContainer position="bottom-center" limit={1} />
        <Header />
        <CarouselComponent />
        <main>
          <Container className="mt-3 expand">
            <Routes>
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Protected><Profile /></Protected>} />
              <Route path="/register" element={<Register />} />
              <Route path="/shipping" element={<ShippingInfo />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/order" element={<OrderPage />} />
              <Route path="/order/:id" element={<Protected><OrderSummary /></Protected>} />
              <Route path="/orderhistory" element={<Protected><OrderHistory /></Protected>} />
              <Route path="/product/:id/:slug" element={<DetailsPage />} />
              {/* Admin Routes */}
              <Route path="/admin/dashboard"
                element={<AdminRoute>
                  <DashboardPage></DashboardPage>
                </AdminRoute>}
              />
              <Route path="/create"
                element={<AdminRoute>
                  <CreateItem></CreateItem>
                </AdminRoute>}
              />
              <Route path="/:id/editItem/:slug"
                element={<AdminRoute>
                  <EditItemPage></EditItemPage>
                </AdminRoute>}
              />
              <Route path="/" element={<Home />} />
            </Routes>
          </Container>
        </main>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;





