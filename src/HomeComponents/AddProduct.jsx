import React, { useState, useEffect } from 'react';
import superagent, { prependListener } from 'superagent';
import './AddProduct.css';

export default function AddProduct(props) {
  const categories = ['phone', 'clothes', 'Toys & Games', 'Jewelry & Watches', 'Sports & Outdoor', 'beauty_personal_care', 'Books & Media', 'home_decor'];
  const [productName, setProductName] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');
  const [reviewCount, setReviewCount] = useState('');
  const [description, setDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [message, setMessage] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();

    const productData = {
      productName,
      brand,
      category,
      price,
      rating,
      reviewCount,
      imageSrc,
      description,
      longDescription,
    };

    try {
      const response = await superagent.post('http://localhost:5000/apis/addproduct').send(productData);
      if (response.ok) {
        console.log('Product added successfully:', response.body);
        setMessage("Successfully Added")
        // You can add further actions here, such as redirecting the user or displaying a success message.
      } else {
        console.error('Error adding product:', response.body);
        setMessage("Some Error Occured")
      }
    } catch (error) {
      console.error('Error during product addition:', error);
    }
  };

  return (
    <div className='addproductform-container'>

      <form className="form" onSubmit={handleSubmit}>
        {
          message && <><p>{message}</p>
            <button className='Btn' onClick={(e) => { e.preventDefault(); setMessage(false); }}>Add more Products</button>          </>
        }
        {!message && <>
          <p className="title">Add Product</p>
          <p className="message">Fill up the required fields</p>
          <div className="flex">
            <label>
              <input className="input" type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required />
              <span>Product Name</span>
            </label>

            <label>
              <input className="input" type="text" value={brand} onChange={(e) => setBrand(e.target.value)} required />
              <span>Brand</span>
            </label>
          </div>
          <div className="flex">
            <label>
              <select className="input" value={category} onChange={(e) => setCategory(e.target.value)} required>
                <option value="">Select Category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
              <span>Category</span>
            </label>

            <label>
              <input className="input" type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
              <span>Price</span>
            </label>
          </div>

          <div className="flex">
            <label>
              <input className="input" type="number" step="0.1" min="0" max="5" value={rating} onChange={(e) => setRating(e.target.value)} required />
              <span>Rating</span>
            </label>

            <label>
              <input className="input" type="number" value={reviewCount} onChange={(e) => setReviewCount(e.target.value)} required />
              <span>Review Count</span>
            </label>
          </div>

          <label>
            <textarea className="input" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
            <span>Description</span>
          </label>

          <label>
            <textarea className="input" value={longDescription} onChange={(e) => setLongDescription(e.target.value)} required></textarea>
            <span>Long Description</span>
          </label>
          <label>
            <textarea className="input" value={imageSrc} onChange={(e) => setImageSrc(e.target.value)} required></textarea>
            <span>PASTE PRODUCT IMAGE LINK FROM GOOGLE </span>
          </label>
          <button className="submit" type="submit">Submit</button>
        </>
        }
      </form>

    </div>
  );
}
