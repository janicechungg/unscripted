import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar } from '../components/NavBar';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';

export function Home() {
    const location = useLocation();
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/posts/all-posts');
                setPosts(data);
            } catch (error) {
                if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                    setError(error.response.data.message);
                }
            }
        };

        fetchPosts();
    }, []);

    const truncateContent = (content) => {
        if (content.length > 150) {
            return content.slice(0, 150) + '...';
        }
        return content;
    };

    return (
        <div>
            {location.pathname === '/' && <Navbar />}
            <div className="container">
                <h1>Home</h1>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="row">
                    {posts.map(post => (
                        <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={post._id}>
                            <Link to={`/post/${post._id}`} className="text-decoration-none">
                                <div className="card h-100 position-relative">
                                    {post.image && (
                                        <img src={`http://localhost:5000/uploads/${post.image}`} className="card-img-top" alt={post.title} />
                                    )}
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title">{post.title}</h5>
                                        <p className="card-text">{post.summary}</p>
                                        <p className="card-text"><small className="text-muted">By {post.author.username}</small></p>
                                        <div className="card-text mt-auto">
                                            <div dangerouslySetInnerHTML={{ __html: truncateContent(post.content) }} />
                                            {post.content.length > 150 && (
                                                <span className="btn btn-primary mt-2">Read More</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
