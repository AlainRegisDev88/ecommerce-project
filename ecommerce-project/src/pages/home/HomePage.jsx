import axios from 'axios'
import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import './HomePage.css'
import ProductsGrid from './ProductsGrid'

function HomePage({ cart }) {
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get('/api/products')
            .then((response) => {
                setProducts(response.data)
            })
    }, []) // dependency arrat: helps to control when useEffect runs; with the empty array, useEffect only runs once

    return (
        <>
            <title>E-commerce Project</title>
            <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />

            <Header
                cart={cart}
            />

            <div className="home-page">
                <ProductsGrid products={products} />
            </div>
        </>
    )

}

export default HomePage