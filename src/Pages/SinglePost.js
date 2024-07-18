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

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/posts/${id}`);
                setPost(data);
            } catch (error) {
                if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                    setError(error.response.data.message);
                }
            }
        };

        fetchPost();
    }, [id]);

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
            <div className="container mt-4">
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="card">
                    {post.image && (
                        <img src={`http://localhost:5000/uploads/${post.image}`} className="card-img-top" alt={post.title} />
                    )}
                    <div className="card-body">
                        <h3 className="card-title">{post.title}</h3>
                        <p className="card-text">{post.summary}</p>
                        <p className="card-text"><small className="text-muted">By {post.author.username}</small></p>
                        <div
                            className="card-text"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                        <i
                            className="fas fa-trash-alt trash-icon"
                            onClick={() => handleDelete(post._id)}
                            style={{ cursor: 'pointer', position: 'absolute', bottom: '10px', right: '10px' }}
                        ></i>
                    </div>
                </div>
            </div>
        </div>
    );
}
