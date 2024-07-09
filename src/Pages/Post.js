import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Navbar } from '../components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

export function Post() {
    const location = useLocation();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('summary', summary);
        formData.append('content', content);
        if (image) {
            formData.append('image', image);
        }

        try {
            const url = 'http://localhost:5000/api/posts/create';
            const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
            const headers = {
                'Authorization': `Bearer ${token}`
            };
            await axios.post(url, formData, { headers });
            navigate('/');
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            }
        }
    };

    return (
        <div align = "center">
            {location.pathname === '/post' && <Navbar />}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="input-group input-group-lg mb-3">
                    <input
                        type="text"
                        placeholder="Title"
                        className="form-control"
                        aria-label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        placeholder="Summary"
                        className="form-control"
                        aria-label="Summary"
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="file"
                        className="form-control"
                        onChange={handleImageChange}
                    />
                </div>
                <div className="mb-3">
                    <ReactQuill
                        value={content}
                        onChange={setContent}
                        theme="snow"
                        placeholder="Write your content here..."
                    />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="d-grid gap-2">
                    <button className="btn btn-primary" type="submit">Post</button>
                </div>
            </form>
        </div>
    );
}
