import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const NotFoundPage = () => {

    let navigate = useNavigate();

    return (
        <div className="not-found-container">
            <h1>Oops! Page Not Found (404)</h1>
            <p>Looks like the page you're looking for isn't here.</p>
            <button
                onClick={() => {
                    navigate("/");
                    window.location.reload();
                }}>Go Back Home</button>
        </div>
    )
}

export default NotFoundPage
