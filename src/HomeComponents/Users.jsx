import React, { useState, useEffect } from 'react'
import './Users.css'
import NawsomeLoader from './NawsomeLoader';
const request = require('superagent');

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUserDetails = async () => {
        setLoading(false);
        try {
            const response = await request.get(`http://localhost:5000/apis/users`);
            setUsers(response.body);
            setTimeout(() => {
                setLoading(false);
            }, 500)
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    }

    useEffect(() => {
        fetchUserDetails();
    }, []);
    const remove = async (userid) => {
        try {
            const queryParams = {
                _id: userid,
            };
            const queryString = new URLSearchParams(queryParams).toString();
            const response = await request.get(`http://localhost:5000/apis/users?${queryString}`);
            if (response.ok) {
                fetchUserDetails();
            }
        } catch (error) {

        }
    }
    return (
        <>
            <div className="user-container">
                <h1 className="user-heading">User Details</h1>
                {loading && <NawsomeLoader />}
                {!loading &&
                    <table className="user-table">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Firstname</th>
                                <th>Lastname</th>
                                <th>Emails</th>
                                <th>Mobile Number</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id} >
                                    <td>{user.username}</td>
                                    <td>{user.firstname}</td>
                                    <td>{user.lastname}</td> {/* Convert ObjectId to string */}
                                    <td>{user.email}</td>
                                    <td>{user.mobilenumber}</td>
                                    <td onClick={() => { remove(user._id) }}> <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        height="24"
                                        fill="red"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M7.5 7h9a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1zM9 3h6a2 2 0 0 1 2 2h3a1 1 0 0 1 0 2H2a1 1 0 0 1 0-2h3a2 2 0 0 1 2-2z"
                                        />
                                    </svg>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </div>
        </>
    )
}
