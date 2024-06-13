import React from 'react'
import { useState } from 'react';
const request = require('superagent');

export default function FormStep2({ formData, onNext }) {
    const [username,setUsername]=useState(null);
    const [password,setPassword]=useState(null);

    const handleSubmit =async (e) => {
        e.preventDefault();
        try{
            const queryParams = {
                newusername:username,
                action:"isUsernameAvailable"
            };
            const queryString = new URLSearchParams(queryParams).toString();
            const response = await request.post(`http://localhost:5000/apis/signup?${queryString}`);
            if(response.body)
            {
                alert("user exists")
            }else{
                onNext({ ...formData,username,password});
            }
        }catch(error){

        }
       
    };
    return (

        <form  onSubmit={handleSubmit} enctype="multipart/form-data">
            <h2>Create UserID and Password</h2>
              <div className="mb-3">
                <input type="text" name="username" placeholder="Username" onChange={(e)=>setUsername(e.target.value)} className="form-control personalDetails"  required />
            </div>
            <div className="mb-3">
                <input type="text" name="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} className="form-control personalDetails"  required />
            </div>
            <button id="button" type="submit">Next</button>
        </form>
    )
}
