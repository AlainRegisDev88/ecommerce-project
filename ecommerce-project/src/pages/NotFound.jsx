import Header from "../components/Header"
import './NotFound.css'

export default function NotFound() {
    return (
        <>
            <Header />
            <div className="not-found-page">
                <h2>404</h2>
                <p>Page Not Found</p>
            </div>
        </>
    )
}