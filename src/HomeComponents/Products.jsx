import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import phone from './classic (1).gif';
import home_decor from './homedecor.gif';
import clothes from './clothes.gif';
import beauty_personal_care from './beauty.gif';
import Books_Media from './books.gif';
import toysgames from './toysss.gif';
import sports from './sportss.gif';
import jewellery from './jewellery.gif';
import NawsomeLoader from './NawsomeLoader';

import './Product.css';
const request = require('superagent');

export default function Products(props) {
    const [responseData, setResponseData] = useState([]);
    const [productData, setProductData] = useState(false);
    const [loading, setLoading] = useState(true);
    const [length, setLength] = useState(0);
    const [message, setMessage] = useState(false);
    const [modal, setModal] = useState(false);
    const [searchProducts, setSearchProducts] = useState([]);
    const [reserve, setReserve] = useState({});
    const [item, setItem] = useState(false);

    async function fetchApis() {
        setResponseData([]);
        setLoading(true);
        try {
            const queryString = new URLSearchParams({
                category: props.category || '',
            }).toString();

            const response = await request.get(`http://localhost:5000/apis?${queryString}`);
            setResponseData(response.body);
            setLength(response.body.length);
            setTimeout(() => {
                setLoading(false);
            }, 500);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
            fetchApis();
    }, [props.loggedIn, props.category,props.navlink("get")]);

    useEffect(() => {
        if (props.navlink("get") === "Search") {
            setSearchProducts(props.products);
        }
    }, [props.products]);

    const product = async (id) => {
        setItem(id);
        try {
            const response = await request.get(`http://localhost:5000/apis?_id=${id}`);
            setProductData(response.body);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleModalClose = () => setModal(false);
    const handleShow = () => {
        setReserve(props.navlink("get"));
        props.navlink("Show");
    };

    const handleClose = () => {
        props.navlink(reserve);
    };

    const addToCart = async (productId) => {
        if (props.loggedIn) {
            try {
                const queryString = new URLSearchParams({
                    username: props.username,
                    productId,
                }).toString();

                const response = await request.post(`http://localhost:5000/apis/cart?${queryString}`);
                setModal(true);
                setMessage(response.body.message);
            } catch (error) {
                setModal(true);
                setMessage('Error fetching data:', error);
            }
        } else {
            setModal(true);
            setMessage("Please Login to ADD Item in Cart ");
        }
    };

    function getImageForCategory() {
        switch (props.category) {
            case 'phone': return phone;
            case 'home_decor': return home_decor;
            case 'clothes': return clothes;
            case 'beauty_personal_care': return beauty_personal_care;
            case 'Books & Media': return Books_Media;
            case 'Toys & Games': return toysgames;
            case 'Sports & Outdoors': return sports;
            case 'Jewelry & Watches': return jewellery;
            default: return false;
        }
    }

    const Delete = async () => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("Are you sure you want to delete this product?")) {
            try {
                const response = await request.get(`http://localhost:5000/apis/admin?_id=${item}&action=delete`);
                if (response.ok) {
                    handleClose();
                    fetchApis();
                }
            } catch (e) {
                console.error('Error deleting product:', e);
            }
        }
    };

    return (
        <>
            { props.navlink("get") === "Search" && props.products && (
                <><div className='complete-searched-product-list-container'>
                    <Button className="delete-Btn close-search" variant="danger" onClick={(e) => { e.preventDefault();props.navlink(props.Reserve("get")); setSearchProducts([]); }}>
                        Close Search
                    </Button>
                    <div className="search-result">Result for "{props.keyword}"</div>
                    <div className="search-product-list-container  ">
                        {!loading && searchProducts.map((item) => (
                            <a href="#" className="search-Product " onClick={(e) => {
                                e.preventDefault();
                                handleShow();
                                product(item._id);
                            }}>
                                <img src={item.imageSrc} alt={item.imageAlt} className="image" />
                                <div className="product-right-container">
                                    <h3 className="mt-4 text-sm search-product-name">{item.name}</h3>
                                    <p className="search-product-description">{item.description}</p>
                                    <table className='table-short'>
                                        <tr className='td-short'><th className='th-short'>Brand</th><td>{item.brand}</td></tr>
                                        <tr className='td-short'><th className='th-short'>Price</th><td><span>₹</span>{item.price} <span className='original-price'>₹23000</span></td></tr>
                                        <tr className='td-short'><th className='th-short'>Review</th><td><div>★★★★☆ <span>({item.reviewCount})</span></div></td></tr>
                                    </table>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
                </>
            )}

            {loading && !props.search && <NawsomeLoader />}
            {props.navlink("get") === "Categories" && getImageForCategory() && <img src={getImageForCategory()} alt="Category" />}
            {responseData && !loading && (props.navlink("get") === "Home" || props.navlink("get") === "Categories") && (
                   
                <div className='product-list'>
                    {(props.navlink("get")!="Search")&&responseData&&responseData.map((item) => (
                        <div key={item._id} className="product-Card" onClick={(e) => { e.preventDefault(); handleShow(); product(item._id); }}>
                            <img className='product-image' src={item.imageSrc} alt={item.name} />
                            <h3 className='product-name'>{item.name}</h3>
                            <p className='product-description'>{item.description}</p>
                            <p className='price'> <span className='original-price'>30000</span><span className='product-price'>{item.price}</span> <span>{item.discount}</span></p>
                            <p className='product-review'>⭐⭐⭐⭐({item.reviewCount})</p>
                        </div>
                    ))}
                </div>
            )}
            {props.navlink("get") === "Show" && (productData)&&(
                <>
                    <div className='show-container'>
                        <div className='left-show-container'>
                            <h2>{productData.name} <Button variant="outline-danger" onClick={handleClose}>X</Button></h2>
                            <img src={productData.imageSrc} alt={productData.imageAlt} className='show-image' />
                        </div>

                        <div className='right-show-container'>
                            <div class="show-product-info">
                                <span class="show-label">Brand:</span>
                                <span class="show-brand">{productData.brand}</span>
                            </div>
                            <div class="show-product-info">
                                <span class="show-label">Brand:</span>
                                <span class="show-brand">{productData.category}</span>
                            </div>
                            <p class="show-description">{productData.longdescription}</p>
                            <div class="show-product-info">
                                <span class="show-label">Price:</span>
                                <span class="show-price">₹{productData.price}</span>
                            </div>
                            <div class="show-product-info show-rating">
                                <span class="show-label">Rating:</span>
                                <div class="show-stars">★★★★☆ <span class="show-reviews">({productData.reviews})</span></div>
                            </div>

                            <div>
                               {props.setPerson("get")!='admin'&& <Button variant="warning" onClick={() => addToCart(productData._id)} className='addtocart'>Add to Cart</Button>}
                               {props.setPerson("get")=='admin'&& <Button variant="danger" onClick={Delete} className='delete-Btn'>Delete</Button>}
                            </div>
                        </div>
                    </div>


                    <Modal show={modal} onHide={handleModalClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Cart Message</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{message}</Modal.Body>
                    </Modal>
                </>
            )}
        </>
    );
}    
