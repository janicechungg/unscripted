import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from '../components/NavBar';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';

export function YourPosts() {
    const location = useLocation();
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem('token');
                const headers = {
                    'Authorization': `Bearer ${token}`
                };
                const { data } = await axios.get('http://localhost:5000/api/posts/user-posts', { headers });
                setPosts(data);
            } catch (error) {
                if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                    setError(error.response.data.message);
                }
            }
        };

        fetchPosts();
    }, []);

    const handleDelete = async (postId) => {
        const confirmed = window.confirm('Are you sure you want to delete this post?');
        if (!confirmed) {
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`
            };
            await axios.delete(`http://localhost:5000/api/posts/${postId}`, { headers });
            setPosts(posts.filter(post => post._id !== postId));
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        }
    };

    return (
        <div>
            {location.pathname === '/your-posts' && <Navbar />}
            <div className="container">
                <h1>Your posts</h1>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="row">
                    {posts.map(post => (
                        <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={post._id}>
                            <div className="card h-100 position-relative">
                                {post.image && (
                                    <img src={`http://localhost:5000/uploads/${post.image}`} className="card-img-top" alt={post.title} />
                                )}
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{post.title}</h5>
                                    <p className="card-text">{post.summary}</p>
                                    <div
                                        className="card-text mt-auto"
                                        dangerouslySetInnerHTML={{ __html: post.content }}
                                    />
                                    <i 
                                        className="fas fa-trash-alt trash-icon" 
                                        onClick={() => handleDelete(post._id)}
                                    ></i>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
