import './OrdersPage.css'
import Header from '../../components/Header'
import { Link } from 'react-router'
import axios from 'axios'
import { useState, useEffect, Fragment } from 'react'
import dayjs from 'dayjs'
import formatMoney from '../../utils/money'
import OrderDetails from './OrderDetails'

function OrdersPage({ cart }) {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        axios.get('/api/orders?expand=products')
            .then((response) => {
                setOrders(response.data)
            })
    }, [])

    return (
        <>
            <title>Orders</title>
            <link rel="icon" type="image/svg+xml" href="/orders-favicon.png" />
            <Header cart={cart} />

            <div className="orders-page">
                <div className="page-title">Your Orders</div>

                <div className="orders-grid">
                    {orders.map((order) => {
                        return (
                            <div key={order.id} className="order-container">

                                <div className="order-header">
                                    <div className="order-header-left-section">
                                        <div className="order-date">
                                            <div className="order-header-label">Order Placed:</div>
                                            <div>{dayjs(order.orderTimeMs).format('MMMM D')}</div>
                                        </div>
                                        <div className="order-total">
                                            <div className="order-header-label">Total:</div>
                                            <div>{formatMoney(order.totalCostCents)}</div>
                                        </div>
                                    </div>

                                    <div className="order-header-right-section">
                                        <div className="order-header-label">Order ID:</div>
                                        <div>{order.id}</div>
                                    </div>
                                </div>

                                <OrderDetails
                                    order={order}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default OrdersPage