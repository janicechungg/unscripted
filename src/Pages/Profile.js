import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/NavBar';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';

export function Profile() {
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUserData();
        fetchUserPosts();
    }, []);

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/users/me', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setUser(response.data);
            setEditedUser(response.data);
        } catch (error) {
            setError('Failed to fetch user data');
            console.error('Error fetching user data:', error);
        }
    };

    const fetchUserPosts = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/posts/user', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching user posts:', error);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.put('http://localhost:5000/api/users/update', editedUser, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setUser(editedUser);
            setIsEditing(false);
        } catch (error) {
            setError('Failed to update user data');
            console.error('Error updating user data:', error);
        }
    };

    const handleChange = (e) => {
        setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div>
            {location.pathname === '/profile' && <Navbar />}
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title">Profile</h2>
                                {error && <div className="alert alert-danger">{error}</div>}
                                {isEditing ? (
                                    <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                                        <div className="mb-3">
                                            <label htmlFor="username" className="form-label">Username</label>
                                            <input type="text" className="form-control" id="username" name="username" value={editedUser.username} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <input type="email" className="form-control" id="email" name="email" value={editedUser.email} onChange={handleChange} />
                                        </div>
                                        <button type="submit" className="btn btn-primary">Save</button>
                                    </form>
                                ) : (
                                    <div>
                                        <p><strong>Username:</strong> {user.username}</p>
                                        <p><strong>Email:</strong> {user.email}</p>
                                        <button className="btn btn-secondary" onClick={handleEdit}>Edit Profile</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <h3>Your Posts</h3>
                        {posts.map(post => (
                            <div key={post._id} className="card mb-3">
                                <div className="card-body">
                                    <h5 className="card-title">{post.title}</h5>
                                    <p className="card-text">{post.summary}</p>
                                    <button className="btn btn-primary" onClick={() => navigate(`/post/${post._id}`)}>View Post</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}