import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from '../components/NavBar';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';

export function Profile() {
    const location = useLocation();
    return (
        
        <div>{location.pathname === '/profile' && <Navbar />}</div>

    );
}
