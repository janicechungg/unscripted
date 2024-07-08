import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Navbar } from '../components/NavBar'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';

export function Featured() {
    const location = useLocation();

    return (
        <div>
            {location.pathname === '/featured' && <Navbar/>}
            <h1>Featured</h1>
        </div>
    );
}