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
import Order from "./components/Order";
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

function App() {

  const [sideBarIsOpen] = useState(false);


  return (
    <BrowserRouter>
      <div className={sideBarIsOpen ?
        "d-flex flex-column site-container active-cont"
        : "d-flex flex-column site=container"
      }>
        <ToastContainer position="bottom-center" limit={1}/>
        <Header />
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
              <Route path="/order" element={<Order />} />
              <Route path="/order/:id" element={<Protected><OrderSummary /></Protected>} />
              <Route path="/orderhistory" element={<Protected><OrderHistory /></Protected>} />
              <Route path="/product/:id" element={<DetailsPage />} />
              {/* Admin Routes */}
              <Route path="/admin/dashboard"
                element={<AdminRoute>
                  <DashboardPage></DashboardPage>
                </AdminRoute>}
              />
              <Route path="/create"
                element={
                  <CreateItem></CreateItem>
                }
              />
               <Route path="/:id/editItem"
                element={
                  <EditItemPage></EditItemPage>
                }
              />
              
              <Route path="/" element={<Home />} />
            </Routes>
          </Container>
        </main>

        {/* Remove the container if you want to extend the Footer to full width. */}
        <div className="pt-5">
          {/* Footer */}
          <footer className="text-center text-lg-start text-white" style={{ backgroundColor: 'rgba(53, 50, 50, 0.8)' }}>
            {/* Grid container */}
            <div className="container p-4 pb-0">
              {/* Section: Links */}
              <section className>
                {/*Grid row*/}
                <div className="row">
                  {/* Grid column */}
                  <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                    <h6 className="text-uppercase mb-4 font-weight-bold">
                      Company name
                    </h6>
                    <p>
                      Here you can use rows and columns to organize your footer
                      content. Lorem ipsum dolor sit amet, consectetur adipisicing
                      elit.
                    </p>
                  </div>
                  {/* Grid column */}
                  <hr className="w-100 clearfix d-md-none" />
                  {/* Grid column */}
                  <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                    <h6 className="text-uppercase mb-4 font-weight-bold">Products</h6>
                    <p>
                      <a className="text-white">MDBootstrap</a>
                    </p>
                    <p>
                      <a className="text-white">MDWordPress</a>
                    </p>
                    <p>
                      <a className="text-white">BrandFlow</a>
                    </p>
                    <p>
                      <a className="text-white">Bootstrap Angular</a>
                    </p>
                  </div>
                  {/* Grid column */}
                  <hr className="w-100 clearfix d-md-none" />
                  {/* Grid column */}
                  <hr className="w-100 clearfix d-md-none" />
                  {/* Grid column */}
                  <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                    <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
                    <p><i className="fas fa-home mr-3" /> New York, NY 10012, US</p>
                    <p><i className="fas fa-envelope mr-3" /> info@gmail.com</p>
                    <p><i className="fas fa-phone mr-3" /> + 01 234 567 88</p>
                    <p><i className="fas fa-print mr-3" /> + 01 234 567 89</p>
                  </div>
                  {/* Grid column */}
                  {/* Grid column */}
                  <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                    <h6 className="text-uppercase mb-4 font-weight-bold">Follow us</h6>
                    {/* Facebook */}
                    <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#3b5998' }} href="#!" role="button"><i className="fab fa-facebook-f" /></a>
                    {/* Twitter */}
                    <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#55acee' }} href="#!" role="button"><i className="fab fa-twitter" /></a>
                    {/* Google */}
                    <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#dd4b39' }} href="#!" role="button"><i className="fab fa-google" /></a>
                    {/* Instagram */}
                    <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#ac2bac' }} href="#!" role="button"><i className="fab fa-instagram" /></a>
                    {/* Linkedin */}
                    <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#0082ca' }} href="#!" role="button"><i className="fab fa-linkedin-in" /></a>
                    {/* Github */}
                    <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#333333' }} href="#!" role="button"><i className="fab fa-github" /></a>
                  </div>
                </div>
                {/*Grid row*/}
              </section>
              {/* Section: Links */}
            </div>
            {/* Grid container */}
            {/* Copyright */}
            <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
              © 2020 Copyright:
              <a className="text-white" href="https://mdbootstrap.com/">MDBootstrap.com</a>
            </div>
            {/* Copyright */}
          </footer>
          {/* Footer */}
        </div>
        {/* End of .container */}

      </div>
    </BrowserRouter>
  );
}

export default App;





