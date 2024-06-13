import React, { useEffect, useState } from 'react';
import './RecycleBin.css';
import NawsomeLoader from './NawsomeLoader';
const request = require('superagent');

export default function RecycleBin() {
  const [responseData, setResponseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message,setMessage]=useState(false);

  async function fetchApis() {
    setLoading(true);
    try {
      const response = await request.get(`http://localhost:5000/apis/recyclebin`);
      if (!response.body || Object.keys(response.body).length === 0) {
        setMessage("Recycle Bin is Empty");
      } else {
        setResponseData(response.body);
      }
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchApis();
  }, []);

  const Restore = async (id) => {
    try {
      const queryParams = {
        _id: id,
        action: "restore"
      };
      const queryString = new URLSearchParams(queryParams).toString();
      const response = await request.get(`http://localhost:5000/apis/admin?${queryString}`);
      if (response.ok) {
        fetchApis();
      }
    } catch (e) {
      console.error('Error restoring item:', e);
    }
  };
  const DeletePermanently =async (id) => {
    // eslint-disable-next-line no-restricted-globals
    const confirmation = confirm("Are you sure you want to delete this product?"); 
    if (confirmation) {
      try {
        const queryParams = {
          _id: id,
          action: "deletepermanently"
        };
        const queryString = new URLSearchParams(queryParams).toString();
        const response = await request.get(`http://localhost:5000/apis/admin?${queryString}`);
   
        if (response.ok) {
          fetchApis();
        }
      } catch (e) {

      }
    }
  }
    return (
      <div className="card-container">
        {loading&&<NawsomeLoader/>}
        {!loading&&message&&<div>{message}</div>}
        {!loading&&!message&& responseData.map((item) => (
          <div className="product-card" key={item._id}>
            <img src={item.imageSrc} className="product-img" alt={item.imageAlt} />
            <div className="product-body">
              <h5 className="product-title"><strong>{item.name}</strong></h5>
              <div className="product-stars">Review ★★★★☆</div>
              <small className="product-brand">{item.brand}</small>
              <div className="product-price">
                <sup>₹</sup>{item.price}
              </div>
              <p className="product-price-cut">₹23000</p>
              <p className="product-description">{item.description}</p>
              <button onClick={() => Restore(item._id)} className="Btn restore-button" style={{width:'100%'}}>Restore</button>
              <button onClick={() => DeletePermanently(item._id)} className="delete-Btn delete-button">Delete Permanently</button>
            </div>
          </div>
        ))}
      </div>
    );
  }
