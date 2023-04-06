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

        {/* Remove the container if you want to extend the Footer to full width. */}

        {/* End of .container */}

      </div>
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
                        SHOPPING WELL
                      </h6>
                      <p>
                        After both the Prohibition era and COVID-19, the alcohol industry started evolving at a rapid pace. As such, the industry has gained extreme significance recently. The alcoholic beverage industry now has millions of stores around the world. Recently, we've even seen an increase in business owners taking the opportunity to start selling alcohol online. Alcohol sales have even been seen in the same sentence as flat rate shipping.
                      </p>
                    </div>
                    {/* Grid column */}
                    <hr className="w-100 clearfix d-md-none" />
                    {/* Grid column */}
                    <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                      <h6 className="text-uppercase mb-4 font-weight-bold">Products</h6>
                      <p>
                        <a className="text-white" href="https://www.absolut.com/en/">ABSOLUT Vodka</a>
                      </p>
                      <p>
                        <a className="text-white" href="https://www.jackdaniels.com/">JACK DANIEL'S Wiskey</a>
                      </p>
                      <p>
                        <a className="text-white" href="https://www.woodfordreserve.com/">WOODFORD Bourbon</a>
                      </p>
                      <p>
                        <a className="text-white" href="https://www.hennessy.com/en-int/collection/hennessy-paradis">HENNESSY Cognac</a>
                      </p>
                    </div>
                    {/* Grid column */}
                    <hr className="w-100 clearfix d-md-none" />
                    {/* Grid column */}
                    <hr className="w-100 clearfix d-md-none" />
                    {/* Grid column */}
                    <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                      <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
                      <p><i className="fas fa-home mr-3" /> Burgas, Bulgaria</p>
                      <p><i className="fas fa-envelope mr-3" /> petar_vs@outlook.com</p>
                      <p><i className="fas fa-phone mr-3" /> + 01 234 567 88</p>

                    </div>
                    {/* Grid column */}
                    {/* Grid column */}
                    <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                      <h6 className="text-uppercase mb-4 font-weight-bold">Follow us</h6>
                      {/* Facebook */}
                      <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#3b5998' }} href="https://www.facebook.com/profile.php?id=100000562363371" role="button"><i className="fab fa-facebook-f" /></a>
                      {/* Linkedin */}
                      <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#0082ca' }} href="https://www.linkedin.com/in/petar-kostadinov-759ba8213/" role="button"><i className="fab fa-linkedin-in" /></a>
                      {/* Github */}
                      <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#333333' }} href="https://github.com/PetarKostadinov" role="button"><i className="fab fa-github" /></a>
                    </div>
                  </div>
                  {/*Grid row*/}
                </section>
                {/* Section: Links */}
              </div>
              {/* Grid container */}
              {/* Copyright */}
              <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                 
                <p className="text-white">2023 Copyright: Petar Kostadinov &copy;</p>
              </div>
              {/* Copyright */}
            </footer>
            {/* Footer */}
          </div>
    </BrowserRouter>
  );
}

export default App;





