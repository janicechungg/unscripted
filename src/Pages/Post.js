import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Navbar } from '../components/NavBar'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';

export function Post() {
    const location = useLocation();

    return (
        <div>
            {location.pathname === '/post' && <Navbar/>}
            <h1>Post</h1>
        </div>
    );
}