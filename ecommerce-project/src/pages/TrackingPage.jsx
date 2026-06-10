import { Link } from 'react-router'
import './TrackingPage.css'
import Header from '../components/Header'
import { useParams } from 'react-router'
import axios from 'axios'
import { useState, useEffect } from 'react'
import dayjs from 'dayjs'

export default function TrackingPage({ cart }) {
    const params = useParams();
    console.log(params)
    const { orderId, productId } = params;

    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrderTrackingData = async () => {
            const response = await axios.get(`/api/orders/${orderId}?expand=products`)
            setOrder(response.data)
            console.log(response.data)
        }
        fetchOrderTrackingData();
        
    }, [orderId])




    if (!order) {
        return <div className='loading-div'><span>Loading tracking details...</span></div>; // Or return null
    }

    const matchingProduct = order.products.find((orderProduct) => {
        return orderProduct.productId === productId
    })

    //Calculating the progress

    const totalDurationMs = matchingProduct.estimatedDeliveryTimeMs - order.orderTimeMs
    const elapsedTimeMs = dayjs().valueOf() - order.orderTimeMs
    let progressPercentage = (elapsedTimeMs / totalDurationMs) * 100

    if (progressPercentage > 100) {
        progressPercentage = 100
    }

    const isPreparing = progressPercentage < 33
    const isShipped = progressPercentage >= 33 && progressPercentage < 100
    const isDelivered = progressPercentage === 100

    return (
        <>
            <title>Track Your Order</title>
            <link rel="icon" type="image/svg+xml" href="/tracking-favicon.png" />

            <Header
                cart={cart}
            />

            <div className="tracking-page">

                <div className="order-tracking">
                    <Link className="back-to-orders-link link-primary" to="/orders">
                        View all orders
                    </Link>

                    <div className="delivery-date">
                        {progressPercentage >= 100
                            ? `Delivered on - ${dayjs(matchingProduct.estimatedDeliveryTimeMs).format('MMMM D')}`
                            : `Arrivingdd on - ${dayjs(matchingProduct.estimatedDeliveryTimeMs).format('MMMM D')}`
                        }
                    </div>

                    <div className="product-info">
                        {matchingProduct.product.name}
                    </div>

                    <div className="product-info">
                        Quantity: {matchingProduct.quantity}
                    </div>

                    <img className="product-image" src={matchingProduct.product.image} />

                    <div className="progress-labels-container">
                        <div className={`progress-label ${isPreparing && "current-status"}`}>
                            Preparing
                        </div>
                        <div className={`progress-label ${isShipped && "current-status"}`}>
                            Shipped
                        </div>
                        <div className={`progress-label ${isDelivered && "current-status"}`}>
                            Delivered
                        </div>
                    </div>

                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
                    </div>
                </div>


            </div>
        </>
    )
}