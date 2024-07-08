import React from 'react';
import {Link} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import '../style.css';

export function Signup() {
    return (
        <div className = 'signup' align = "center">
            <form align = "left">
            <h3 class = "text-center">Create a New Account</h3>
                <div class = "mb-3">
                    <label class = "form-label">Email</label>
                    <input type = "email" placeholder = "Enter Email" className = "form-control"/>
                </div>               
                <div class = "mb-3">
                    <label class = "form-label">Username</label>
                    <input type = "username" placeholder = "Enter Username" className = "form-control"/>
                </div>
                <div class = "mb-3">
                    <label class = "form-label">Password</label>
                    <input type = "password" placeHolder = "Enter Password" className = "form-control"/>
                </div>
                <div class = "mb-3">
                    <button type = "submit" class = "btn btn-primary">Sign up</button>
                </div>
                <div>
                    <p>Already have an account? Click <Link to = "/login">here</Link> to sign in</p>
                </div>
            </form>
        </div>
    )
}