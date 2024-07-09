import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import '../style.css';

export function Login() {
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:5000/api/auth";
            const { data: res } = await axios.post(url, data);
            localStorage.setItem("token", res.data);
            navigate("/");
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
                setShowPopup(true);
            }
        }
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className="login" align="center">
            <form align="left" onSubmit={handleSubmit}>
                <h3 className="text-center">Login</h3>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        placeholder="Enter Email"
                        name="email"
                        onChange={handleChange}
                        value={data.email}
                        required
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        name="password"
                        onChange={handleChange}
                        value={data.password}
                        required
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <button type="submit" className="btn btn-primary">Sign in</button>
                </div>
                <div>
                    <p>Don't have an account yet? Click <Link to="/signup">here</Link> to register!</p>
                </div>
            </form>
            {showPopup && (
                <div className="popup">
                    <div className="popup-inner">
                        <h4>Error</h4>
                        <p>{error}</p>
                        <button className="btn btn-secondary" onClick={closePopup}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}
