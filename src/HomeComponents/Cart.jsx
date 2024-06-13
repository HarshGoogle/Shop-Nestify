import React, { useEffect, useState } from 'react'
import './Cart.css';
import SmallSpinner from './SmallSpinner';
import PlaceOrder from './PlaceOrder';
const request = require('superagent');

export default function Cart(props) {
    const [cartItem, setCartItem] = useState(false);
    const [summaryCartItem, setSummaryCartItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [itemShow, setItemShow] = useState(true);
    const [isPlaceOrder, setIsPlaceOrder] = useState(false);
    const [isPlaceOrderbtn, setIsPlaceOrderbtn] = useState(false);
    
    const cartDetails = async () => {
        try {
            let queryParams = {
                username: props.username
            };
            let queryString = new URLSearchParams(queryParams).toString();
            let response = await request.get(`http://localhost:5000/apis/cart?${queryString}`);
            if(response.body){
                const itemsData = await Promise.all(response.body.map(async (item) => {
                    queryParams = {
                        _id: item.productId
                    };
                    queryString = new URLSearchParams(queryParams).toString();
                    const res = await request.get(`http://localhost:5000/apis?${queryString}`);
                    const productDetails = res.body; // Assuming the API returns only one item per productId
                    return {
                        ...productDetails,
                        count: item.count
                    };
                }));
                setTimeout(() => {
                    setLoading(false);
                }, 300);     
                setIsPlaceOrderbtn(true)
                changeTotals(itemsData);
                setCartItem(itemsData);
                setSummaryCartItem(itemsData);
            }else{
                setCartItem([]);
                setTotalItems(0);
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    useEffect(() => {
        cartDetails();
    }, []);
    const showItem = () => {
        const items = document.getElementsByClassName("item");
        if (itemShow) {
            for (let i = 0; i < items.length; i++) {
                items[i].style.display = "none";
            }
            document.getElementById('updown').innerHTML = '^';
            setItemShow(false);
        } else {
            for (let i = 0; i < items.length; i++) {
                items[i].style.display = "block";
            }
            document.getElementById('updown').innerHTML = '&#x2B9B;';
            setItemShow(true);
        }
    }
    const updateCount = async (productId, count) => {
        try {
            let queryParams = {
                username: props.username,
                productId: productId,
                count: count
            };
            let queryString = new URLSearchParams(queryParams).toString();
            let response = await request.post(`http://localhost:5000/apis/cart?${queryString}`);
            cartDetails();
        } catch (error) {

        }
    }
    const increaseCount = (productId, count) => {
        count++;
        document.getElementById(`count-${productId}`).innerHTML = count;
        updateCount(productId, count);
    }
    const decreaseCount = (productId, count) => {
        if (parseInt(count) == 1) {
            return;
        }
        count--;
        document.getElementById(`count-${productId}`).innerHTML = count;
        updateCount(productId, count);
    }
    const removeFromCart = async (productId, productName) => {
        const confirmation = window.confirm("Are you sure you want to remove '" + productName + "' from Cart?");
        if (confirmation) {
            try {
                let queryParams = {
                    username: props.username,
                    productId: productId,
                    action: "remove"
                };
                let queryString = new URLSearchParams(queryParams).toString();
                let response = await request.post(`http://localhost:5000/apis/cart?${queryString}`);
                cartDetails();
            } catch (error) {

            }
        }
    }
    const placeOrder = () => {
        setIsPlaceOrder(true);
        setIsPlaceOrderbtn(false)
    }
    const setSummary = (summarydata) => {
        setSummaryCartItem(summarydata)
        changeTotals(summarydata);
    }
    const changeTotals = (data) => {
        const totalItems = data.reduce((total, item) => total + parseInt(item.count), 0);
        setTotalItems(totalItems);
        const totalPrice = data.reduce((total, item) => total + parseFloat(item.price) * parseFloat(item.count), 0);
        setTotalPrice(totalPrice);
    }
    return (
        <div className='cards-container'>
            <div className="card-groups">
                {
                    loading && <SmallSpinner />
                }
                {
                    !loading && (totalItems == 0) && <div className='emptyDisplay'>No item in cart</div>
                }
                {
                    !loading && isPlaceOrder && <PlaceOrder username={props.username} cartItem={cartItem} setSummary={setSummary}  />
                }
                {(!loading && !isPlaceOrder && cartItem )&&
                    cartItem.map((item, index) => (
                        <div key={index}>
                            <div className="Card">
                                <img className="card-img-left" src={item.imageSrc} alt='s' />
                                <div className="card-body-right">
                                    <h5 className="card-title">{item.name}</h5><button className='btn remove' onClick={() => removeFromCart(item._id, item.name)}>X</button>
                                    <p className="card-text">{item.category}<small className="text-muted"></small></p>
                                    <p className="cart-item-description">{item.description}</p>
                                    <p className="card-text">{item.price}</p>
                                    <p className='review'> ★★★★☆</p>
                                    <span className='qty'>Qty :</span><button className='btn countBtn' onClick={() => decreaseCount(item._id, item.count)}>-</button> <p id={`count-${item._id}`} className='count'> {item.count} </p><button className='btn countBtn' onClick={() => increaseCount(item._id, item.count)}>+</button>
                                </div>
                            </div>
                        </div>
                    ))}
                
            </div>

            <div className='summary'>
                {loading && <SmallSpinner />}
                {!loading && <>
                    <h2 className='summaryTitle' style={{ display: 'inline' }}>Summery</h2><button className='btn' id='updown' onClick={showItem} style={{ display: 'inline' }}>^</button>
                    <p className='totalItems' >Total Numbers of Products : {totalItems}</p>
                    {summaryCartItem && summaryCartItem.map((item, index) => (
                        <div className='item'>{index + 1 + ". "}{item.name}<span className='qty'>  (Qty{item.count})</span></div>
                    ))}
                    <p className='totalPrice'>Total Price of {totalItems} Items : {totalPrice}</p>
                    {summaryCartItem && summaryCartItem.map((item, index) => (
                        <div className='item'>{index + 1 + ". "}{item.name}  <span className='count'>X {item.count}</span> : {item.price * item.count}</div>
                    ))}
                </>}
                {!(totalItems == 0) && isPlaceOrderbtn && <button className='btn btn-warning place-order-btn' onClick={placeOrder}>Place Order</button>}
            </div>
        </div>
    )
}
