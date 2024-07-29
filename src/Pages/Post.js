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
    const [titleError, setTitleError] = useState('');
    const [summaryError, setSummaryError] = useState('');

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleTitleChange = (e) => {
        const value = e.target.value;
        if (value.length > 50) {
            setTitleError('Title cannot exceed 50 characters.');
        } else {
            setTitleError('');
            setTitle(value);
        }
    };

    const handleSummaryChange = (e) => {
        const value = e.target.value;
        if (value.length > 100) {
            setSummaryError('Summary cannot exceed 100 characters.');
        } else {
            setSummaryError('');
            setSummary(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            setError('Image is required');
            return;
        }

        if (title.length > 50) {
            setError('Title cannot exceed 50 characters');
            return;
        }

        if (summary.length > 100) {
            setError('Summary cannot exceed 100 characters');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('summary', summary);
        formData.append('content', content);
        formData.append('image', image);

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
        <div>
            {location.pathname === '/post' && <Navbar />}
            <div className="container">
                <div className="row justify-content-center">
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="input-group input-group-lg mb-3">
                            <input
                                type="text"
                                placeholder="Title"
                                className="form-control"
                                aria-label="Title"
                                value={title}
                                onChange={handleTitleChange}
                                required
                            />
                        </div>
                        {titleError && <div className="alert alert-danger">{titleError}</div>}
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                placeholder="Summary"
                                className="form-control"
                                aria-label="Summary"
                                value={summary}
                                onChange={handleSummaryChange}
                                required
                            />
                        </div>
                        {summaryError && <div className="alert alert-danger">{summaryError}</div>}
                        <div className="mb-3">
                            <input
                                type="file"
                                className="form-control"
                                onChange={handleImageChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
    <ReactQuill
        value={content}
        onChange={setContent}
        theme="snow"
        placeholder="Write your content here..."
        style={{height: '400px'}}
        modules={{
            toolbar: [
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['link', 'image'],
                ['clean']
            ],
        }}
    />
</div>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-primary btn-sm" style={{width: '200px'}}type="submit">Post</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
