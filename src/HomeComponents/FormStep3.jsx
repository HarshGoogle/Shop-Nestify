import React from 'react'
import { useState } from 'react';

export default function FormStep3({ formData, onNext }) {
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Check if a file is selected
        if (!file) {
            alert('Please select a file.');
            return;
        }

        // Extract filename and extension
         // Create a new FormData object
    const updatedFormData = new FormData();
    // Append existing form data fields
    for (const key in formData) {
        updatedFormData.append(key, formData[key]);
    }
    // Append the profile picture file
    updatedFormData.append('profilepicture', file);
    // Call onNext with the updated form data
    onNext(updatedFormData)
    }


    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };
  return (
    <div>
      <form onSubmit={handleSubmit} enctype="multipart/form-data">
            <h2>Choose Profile Picture</h2>
              <div className="mb-3">
                <input type="file" name="profilepicture" placeholder="Upload Picture"  className="form-control personalDetails" onChange={handleFileChange}  required />
            </div>
            <button id="button" type="submit">Submit</button>
        </form>
    </div>
  )
}
