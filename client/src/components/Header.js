import React, { useContext, useEffect, useState } from 'react'
import { Badge, Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import { Store } from './Store';
import SearchInput from "./SearchInput";
import axios from 'axios';
import { toast } from 'react-toastify';
import getError from '../util';

function Header() {


    const [sideBarIsOpen, setSideBarIsOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;


    const logoutHandler = () => {
        ctxDispatch({ type: 'USER_LOGOUT' });
        localStorage.removeItem('userInfo');
        localStorage.removeItem('shippingInfo');
        localStorage.removeItem('paymentMethod');
        window.location.href = '/login';
    };

    useEffect(() => {
        const fetchCategories = async () => {
          try {
            const { data } = await axios.get(`/api/products/categories`);
            setCategories(data);
          } catch (err) {
            toast.error(getError(err));
          }
        };
        fetchCategories();
      }, [])

    return (
        <>
            <header>
                <Navbar  variant="dark" expand="lg" style={{ backgroundColor: 'rgba(53, 50, 50, 0.8)' }}>
                    <Container>
                        <Button
                            variant="dark"
                            onClick={() => setSideBarIsOpen(!sideBarIsOpen)}
                        >
                            <i className="fas fa-bars"></i>
                        </Button>
                        <LinkContainer to="/">
                            <Navbar.Brand>
                                <img src="/images/linkedin_banner_image_2.png" alt="shopping well" />
                            </Navbar.Brand>
                        </LinkContainer>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <SearchInput />
                            <Nav className="me-auto w-100 justify-content-end" >
                                <Link to="/cart" className="nav-link">
                                    Cart
                                    {cart.cartItems.length > 0 && (
                                        <Badge pill bg="danger">
                                            {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                                        </Badge>
                                    )}
                                </Link>
                                {userInfo ? (
                                    <NavDropdown title={userInfo.username} id="basic-nav-dropdown">
                                        <LinkContainer to="/profile">
                                            <NavDropdown.Item>User Profile</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/orderhistory">
                                            <NavDropdown.Item>Order History</NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Divider />
                                        <Link
                                            className="dropdown-item"
                                            to="#logout"
                                            onClick={logoutHandler}
                                        >
                                            Logout
                                        </Link>
                                    </NavDropdown>
                                ) : (
                                    <Link className="nav-link" to="/login">
                                        Login
                                    </Link>
                                )}
                                {userInfo && userInfo.isAdmin && (
                                    <NavDropdown title="Admin" id="admin-nav-dropdown">
                                        <LinkContainer to="/admin/dashboard">
                                            <NavDropdown.Item>Dashboard</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/admin/productlist">
                                            <NavDropdown.Item>Products</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/admin/orderlist">
                                            <NavDropdown.Item>Orders</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/admin/userlist">
                                            <NavDropdown.Item>Users</NavDropdown.Item>
                                        </LinkContainer>
                                    </NavDropdown>
                                )}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
            <div
                className={
                    sideBarIsOpen ?
                        'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
                        : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
                }
            >
                <Nav className="flex-column text-white w-100 p-2">
                    <Nav.Item>
                        <strong>Categories</strong>
                    </Nav.Item>
                    {categories.map((category) => (
                        <Nav.Item  key={category}>
                            <LinkContainer to={`/search?category=${category}`} onClick={() => setSideBarIsOpen(false)}>
                                <Nav.Link className="nav-link-class">{category}</Nav.Link>
                            </LinkContainer>
                        </Nav.Item>
                    ))}
                </Nav>

            </div>
        </>


    )
}

export default Header
