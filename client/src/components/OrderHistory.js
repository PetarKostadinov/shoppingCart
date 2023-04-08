import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import getError from '../util';
import LoadingComponent from '../helpersComponents/LoadingComponent';
import MessageComponent from '../helpersComponents/MessageComponent';
import { Store } from '../helpersComponents/Store';
import { fetchOrderHistory } from '../service/orderService';

function OrderHistory() {
    const { state } = useContext(Store);
    const { userInfo } = state;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await fetchOrderHistory(userInfo.token);
                setOrders(data);
                setLoading(false);
            } catch (err) {
                setError(getError(err));
                setLoading(false);
            }
        };
        fetchData();
    }, [userInfo]);

    return (
        <div>
            <Helmet>
                <title>Order History</title>
            </Helmet>
            <h1>Order History</h1>
            {loading ? (
                <LoadingComponent></LoadingComponent>
            ) : error ? (
                <MessageComponent variant="danger">{error}</MessageComponent>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <tr
                                    className="text-white"
                                    style={{ backgroundColor: 'rgba(53, 50, 50, 0.8)' }}
                                    key={order._id}
                                >
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>{order.totalPrice.toFixed(2)}</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                                    <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'No'}</td>
                                    <td>
                                        <Button
                                            type="button"
                                            variant="light"
                                            onClick={() => {
                                                navigate(`/order/${order._id}`);
                                            }}
                                        >
                                            Details
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <div>
                                <h1>There are no orders yet</h1>
                            </div>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default OrderHistory;
