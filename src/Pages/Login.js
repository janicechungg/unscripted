import React from 'react';
import {Link} from 'react-router-dom'
import './style.css';
import "bootstrap/dist/css/bootstrap.min.css"

export function Login() {
    return (
        <div className = 'login' align = "center">
            <form align = "left">
            <h3 class = "text-center">Login</h3>
                <div class = "mb-3">
                    <label class = "form-label">Email</label>
                    <input type = "email" placeholder = "Enter Email" className = "form-control"/>
                </div>
                <div class = "mb-3">
                    <label class = "form-label">Password</label>
                    <input type = "password" placeHolder = "Enter Password" className = "form-control"/>
                </div>
                <div class = "mb-3">
                    <button type = "submit" class = "btn btn-primary">Sign in</button>
                </div>
                <div>
                    <p>Don't have an account yet? Click <Link to = "/signup">here</Link> to register!</p>
                </div>
            </form>
        </div>
    )
}
