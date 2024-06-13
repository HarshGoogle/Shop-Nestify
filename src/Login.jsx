import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import './Login.css';
import { useHistory } from 'react-router-dom';

export default function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [modal, setModal] = useState(false);
    const [person, setPerson] = useState("user");
    const handleModalClose = () => setModal(false);
    const history = useHistory();
    const Signup = (val) => {
        history.push('/signup');
    }
    useEffect(() => {
        const selected = document.getElementById(person);
        selected.classList.add('selected-person');
        const unselected = document.getElementById(person === 'user' ? 'admin' : 'user');
        unselected.classList.remove('selected-person');
    }, [person]);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const { username } = JSON.parse(userData);
            setUsername(username);
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const payload = {
            username: username,
            password: password,
            person:person
        };

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const userData = { username };
                localStorage.setItem('user', JSON.stringify(userData));
                setModal(true);
                setMessage("Login Successfully!");
                props.handleLogin(true,username);
                props.setPerson(person);
            } else {
                setModal(true);
                setMessage("Login Failed!");
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <>
            <div className="login-container">
                <div className="Container">
                    <form className="form_main" onSubmit={handleSubmit}>
                        <div className='select-person-btn'> <button id="user" className='user-btn' onClick={(e)=>{e.preventDefault();setPerson("user");}}>User</button><button id="admin" className='admin-btn' onClick={(e)=>{setPerson("admin");e.preventDefault()}}>Admin</button></div>

                        <p className="heading">Login</p>
                        <div className="inputContainer">
                            <svg viewBox="0 0 16 16" fill="#2e2e2e" height="16" width="16" xmlns="http://www.w3.org/2000/svg" className="inputIcon">
                                <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
                            </svg>
                            <input
                                placeholder="Username"
                                id="username"
                                className="inputField"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="inputContainer">
                            <svg viewBox="0 0 16 16" fill="#2e2e2e" height="16" width="16" xmlns="http://www.w3.org/2000/svg" className="inputIcon">
                                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
                            </svg>
                            <input
                                placeholder="Password"
                                id="password"
                                className="inputField"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button id="button" type="submit">Submit</button>

                        <div className="signupContainer">
                            <p>Don't have any account?</p>
                            <a href="#" onClick={(e) => { e.preventDefault(); Signup() }}>Sign up</a>
                        </div>
                    </form>
                </div>
            </div>

            <Modal show={modal} onHide={handleModalClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{message}</Modal.Title>
                </Modal.Header>
            </Modal>
        </>
    );
}
