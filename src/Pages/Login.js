import React from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import '../style.css';

export function Login() {
    return (
        <div className="login" align="center">
            <form align="left">
                <h3 className="text-center">Login</h3>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" placeholder="Enter Email" className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" placeholder="Enter Password" className="form-control" />
                </div>
                <div className="mb-3">
                    <button type="submit" className="btn btn-primary">Sign in</button>
                </div>
                <div>
                    <p>Don't have an account yet? Click <Link to="/signup">here</Link> to register!</p>
                </div>
            </form>
        </div>
    );
}
