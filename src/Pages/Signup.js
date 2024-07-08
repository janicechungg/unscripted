import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import '../style.css';

export function Signup() {
    const [data, setData] = useState({
        email: "",
        username: "",
        password: ""
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:5000/api/users";
            const { data: res } = await axios.post(url, data);
            console.log(res.message);
            navigate("/login");
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            }
        }
    };

    return (
        <div className='signup' align='center'>
            <form align='left' onSubmit={handleSubmit}>
                <h3 className='text-center'>Create a New Account</h3>
                <div className='mb-3'>
                    <label className='form-label'>Email</label>
                    <input
                        type='email'
                        placeholder='Enter Email'
                        name='email'
                        onChange={handleChange}
                        value={data.email}
                        required
                        className='form-control'
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Username</label>
                    <input
                        type='text'
                        placeholder='Enter Username'
                        name='username'
                        onChange={handleChange}
                        value={data.username}
                        required
                        className='form-control'
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Password</label>
                    <input
                        type='password'
                        placeholder='Enter Password'
                        name='password'
                        onChange={handleChange}
                        value={data.password}
                        required
                        className='form-control'
                    />
                </div>
                {error && <div className='alert alert-danger'>{error}</div>}
                <div className='mb-3'>
                    <button type='submit' className='btn btn-primary'>Sign up</button>
                </div>
                <div>
                    <p>Already have an account? Click <Link to='/login'>here</Link> to sign in</p>
                </div>
            </form>
        </div>
    );
}
