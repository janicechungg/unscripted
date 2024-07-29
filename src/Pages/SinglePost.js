import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/NavBar';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';

export function SinglePost() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [error, setError] = useState("");
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/posts/${id}`);
                setPost(data);
            } catch (error) {
                if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                    setError(error.response.data.message);
                } else {
                    setError('An unexpected error occurred. Please try again.');
                }
            }
        };

        const fetchCurrentUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found');
                }
        
                const headers = {
                    'Authorization': `Bearer ${token}`
                };
                const response = await axios.get('http://localhost:5000/api/users/me', { headers });
                setCurrentUser(response.data);
            } catch (error) {
                console.error('Error fetching current user:', error);
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.error('Response data:', error.response.data);
                    console.error('Response status:', error.response.status);
                    console.error('Response headers:', error.response.headers);
                    //setError(`Failed to fetch current user information. Status: ${error.response.status}`);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error('No response received:', error.request);
                    //setError('Failed to fetch current user information. No response received from server.');
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.error('Error message:', error.message);
                    //setError(`Failed to fetch current user information. ${error.message}`);
                }
            }
        };

        fetchPost();
        fetchCurrentUser();
    }, [id]);

    const handleDelete = async (postId) => {
        const confirmed = window.confirm('Are you sure you want to delete this post?');
        if (!confirmed) {
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No authorization token found. Please log in again.');
                return;
            }

            const headers = {
                'Authorization': `Bearer ${token}`
            };
            await axios.delete(`http://localhost:5000/api/posts/${postId}`, { headers });
            navigate('/your-posts');
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        }
    };

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Navbar />
            <div className="container-fluid py-4">
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="row justify-content-center">
                    <div className="col-xxl-11 col-xl-12">
                        <div className="card">
                            {post.image && (
                                <img 
                                    src={`http://localhost:5000/uploads/${post.image}`} 
                                    className="card-img-top" 
                                    alt={post.title}
                                    style={{ height: '400px', objectFit: 'cover' }}
                                />
                            )}
                            <div className="card-body p-5">
                                <h2 className="card-title mb-3">{post.title}</h2>
                                <p className="card-text fs-5 mb-3">{post.summary}</p>
                                <p className="card-text text-muted mb-4">By {post.author.username}</p>
                                <div
                                    className="card-text fs-6"
                                    dangerouslySetInnerHTML={{ __html: post.content }}
                                    style={{ minHeight: '300px' }}
                                />
                                {currentUser && currentUser._id === post.author._id && (
                                    <i
                                        className="fas fa-trash-alt trash-icon"
                                        onClick={() => handleDelete(post._id)}
                                        style={{ cursor: 'pointer', position: 'absolute', bottom: '20px', right: '20px', fontSize: '1.2rem' }}
                                    ></i>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}