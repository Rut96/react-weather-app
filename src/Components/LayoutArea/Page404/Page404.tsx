import { Link } from "react-router-dom";
import "./Page404.css";
import notFound from "../../../assets/images/default.jpg"

export function Page404(): JSX.Element {
    return (
        <div className="Page404">
            <img src={notFound} alt="Not Found" className="not-found-gif" />
            <h1>404</h1>
            <h2>City not found</h2>
            <p>Oops! The city you're looking for doesn't seem to exist in our database.</p>
            <Link to="/" className="home-link">Go back to search</Link>
        </div>
    );
}
