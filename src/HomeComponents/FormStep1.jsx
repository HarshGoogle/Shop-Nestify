import React from 'react'
import { useState } from 'react';
import './SignUp.css'

export default function FormStep1({ onNext }) {
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value, [e.target.name]: e.target.value, [e.target.name]: e.target.value, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext(formData);
    };
    return (
        <form  className="form_main" onSubmit={handleSubmit} enctype="multipart/form-data">
                   <p className="heading">Sign up</p>
            <div className="mb-3">
                <h2>Personal Details</h2>
            </div>
            <div className="inputContainer">
                <svg viewBox="0 0 24 24" fill="#2e2e2e" height="16" width="16" xmlns="http://www.w3.org/2000/svg" className="inputIcon">
                    <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
                <input type="text" name="firstname" placeholder="firstname" onChange={handleChange} className="inputField" required />
            </div>

            <div className="inputContainer">
                <svg viewBox="0 0 24 24" fill="#2e2e2e" height="16" width="16" xmlns="http://www.w3.org/2000/svg" className="inputIcon">
                    <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
                <input type="text" name="lastname" placeholder="lastname" onChange={handleChange} className="inputField" required />
            </div>

            <div className="inputContainer">
                <svg viewBox="0 0 24 24" fill="#2e2e2e" height="16" width="16" xmlns="http://www.w3.org/2000/svg" className="inputIcon">
                    <path d="M17 1H7C5.89 1 5 1.9 5 3v18c0 1.1.89 2 2 2h10c1.11 0 2-.9 2-2V3c0-1.1-.89-2-2-2zm-5 20c-.83 0-1.5-.67-1.5-1.5S11.17 18 12 18s1.5.67 1.5 1.5S12.83 21 12 21zm4.5-4H7.5V4h9v13z" />
                </svg>

                <input type="number" name="mobilenumber" placeholder="mobile number" onChange={handleChange} className="inputField" required />
            </div>

            <div className="inputContainer">
                <svg viewBox="0 0 24 24" fill="#2e2e2e" height="16" width="16" xmlns="http://www.w3.org/2000/svg" className="inputIcon">
                    <path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <input type="email" name="email" placeholder="email" onChange={handleChange} className="inputField" required />
            </div>

            <button id="button" type="submit">Next</button>
        </form>

    )
}
