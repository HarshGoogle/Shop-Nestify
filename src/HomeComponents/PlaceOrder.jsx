import React, { useEffect, useState } from 'react'
import './PlaceOrder.css';
import SmallSpinner from './SmallSpinner'
import paymentMethodsImg from './paymentMethods.jpg'
const request = require('superagent');

export default function PlaceOrder(props) {
    const [selectedState, setSelectedState] = useState('');
    const [cities, setCities] = useState([]);
    const [cartItem, setCartItem] = useState(props.cartItem);
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(true)
    const [selectedpaymentmode, setSelectedpaymentmode] = useState([]);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [serverMessage, setServerMessage] = useState(false);
    const [orderId,setOrderId]=useState(null);

    const clearCart = async () => {
        try {
            let queryParams = {
                username: props.username,
                action:"clearcart"
            };
            let queryString = new URLSearchParams(queryParams).toString();
            let response = await fetch(`http://localhost:5000/apis/cart?${queryString}`);
        } catch (error) {

        }
    }
    const [formData, setFormData] = useState({
        username:props.username,
        address: '',
        landmark: '',
        state: '',
        city: '',
        zipcode: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    // Define city options for each state
    const citiesByState = {
        "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool"],
        "Arunachal Pradesh": ["Itanagar", "Naharlagun"],
        "Assam": ["Guwahati", "Dibrugarh", "Silchar", "Jorhat", "Nagaon"],
        "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Bihar Sharif"],
        "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba", "Durg"],
        "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda"],
        "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"],
        "Haryana": ["Faridabad", "Gurgaon", "Panipat", "Ambala", "Yamunanagar"],
        "Himachal Pradesh": ["Shimla", "Mandi", "Dharamshala", "Solan", "Kullu"],
        "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro Steel City", "Deoghar"],
        "Karnataka": ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum"],
        "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Kollam", "Thrissur"],
        "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain"],
        "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
        "Manipur": ["Imphal", "Thoubal"],
        "Meghalaya": ["Shillong", "Tura"],
        "Mizoram": ["Aizawl", "Lunglei"],
        "Nagaland": ["Kohima", "Dimapur", "Mokokchung"],
        "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur"],
        "Punjab": ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar", "Patiala"],
        "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner"],
        "Sikkim": ["Gangtok", "Namchi"],
        "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"],
        "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam"],
        "Tripura": ["Agartala", "Udaipur"],
        "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Meerut", "Varanasi"],
        "Uttarakhand": ["Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rudrapur"],
        "West Bengal": ["Kolkata", "Asansol", "Siliguri", "Durgapur", "Bardhaman"]
    };
    const paymentMethodsByPaymentMode = {
        "Offline": ["Cash On Delivery"],
        "Online": ["paytm", "phonepe", "upi"]
    }

    // Function to handle state selection
    const handleStateChange = (event) => {
        const state = event.target.value;
        setSelectedState(state);
        setFormData({ ...formData, state });
        setCities(citiesByState[state] || []); // Set cities based on selected state
    };
    const handlePaymentModeChange = (event) => {
        const paymentmode = event.target.value;
        setSelectedpaymentmode(paymentmode);
        setFormData({ ...formData, paymentmode });
        setPaymentMethods(paymentMethodsByPaymentMode[paymentmode] || []);
    }
    const removePlaceOrderProduct = (id) => {
        const updatedCartItem = cartItem.filter(item => item._id !== id);
        setCartItem(updatedCartItem);
    }
    const increaseCount = (productId, count) => {
        count++;
        const updatedCart = cartItem.map(item => {
            if (item._id === productId) {
                return {
                    ...item,
                    count: count // Update the specific field with the updated value
                };
            }
            return item;
        });
        setCartItem(updatedCart);
        document.getElementById(`count-${productId}`).innerHTML = count;
    }
    const decreaseCount = (productId, count) => {
        if (parseInt(count) == 1) {
            return;
        }
        count--;
        const updatedCart = cartItem.map(item => {
            if (item._id === productId) {
                return {
                    ...item,
                    count: count // Update the specific field with the updated value
                };
            }
            return item;
        });
        setCartItem(updatedCart);
        document.getElementById(`count-${productId}`).innerHTML = count;
    }
    useEffect(() => {
        props.setSummary(cartItem);
    }, [cartItem])
    const handleCityChange = (event) => {
        const city = event.target.value;
        setFormData({ ...formData, city }); // Update the city field in formData
    };
    const handleSubmitStep1 = async (e) => {
        e.preventDefault();
        setStep(prevStep => prevStep + 1);
        setTimeout(() => {
            setLoading(false);
        }, 1000)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStep(3);
        const items=cartItem.map((item)=>{
            return(
                {
                    productId:item._id,
                    count:item.count
                }
            )
        })

        try {
            const data = {
                ...formData,items
            }
            const response = await fetch('http://localhost:5000/apis/placeorder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });
            const responseData = await response.json();
            setServerMessage(responseData.message); // Set server message state
            setOrderId(responseData.orderId)
            clearCart();
        } catch (error) {

        }
        props.setSummary([]);
        setTimeout(() => {
            setLoading(false);
        }, 1000)
    }
    const getInvoice = async () => {
        try {
            let queryParams = {
                username: props.username,
                orderId: orderId
            };
            let queryString = new URLSearchParams(queryParams).toString();
            let invoiceUrl = `http://localhost:5000/apis/generate-invoice?${queryString}`;
            console.log('Invoice URL:', invoiceUrl); // Log the invoice URL
    
            // Set window location to the PDF URL to initiate download
            window.location.href = invoiceUrl;
        } catch (error) {
            console.error('Error fetching invoice:', error);
        }
    };
    return (<>
    {!(step==3)&&
    <>
        <h2>Place Order</h2>
        <div className='cart-product-list'>
            {!cartItem &&!(step==3)&& <div>No item </div>}
            {cartItem && cartItem.map((item, index) => (
                <div className="cardd" >
                    <button className='btn btn-danger remove-btn' onClick={() => removePlaceOrderProduct(item._id)}>Remove X</button>
                    <img src={item.imageSrc} className="card-img-top" alt="..." style={{ width: '100px', height: '100px' }} />
                    <h5 className="card-title">{item.name}</h5>
                    <span className='qty'>Qty :</span><button className='btn countBtn' onClick={() => decreaseCount(item._id, item.count)}>-</button> <p id={`count-${item._id}`} className='count'> {item.count} </p><button className='btn countBtn' onClick={() => increaseCount(item._id, item.count)}>+</button>
                    <p className="card-text">{item.price}</p>
                    <p className='review'>★★★★☆</p>
                </div>
            ))}
        </div>
        </>
}
        <div className='form-container'>
            {(step == 1) && <>
                <h4 >Shipping Details</h4>
                <form className="row g-3" onSubmit={handleSubmitStep1}>
                    <div className="col-12">
                        <label for="inputAddress" className="form-label">Complete Address</label>
                        <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" name='address' value={formData.address} onChange={handleChange} required />
                    </div>
                    <div className="col-12">
                        <label for="inputAddress2" className="form-label">Landmark</label>
                        <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" name="landmark" value={formData.landmark} onChange={handleChange} required />
                    </div>
                    <div className="col-md-4">
                        <label for="inputState" className="form-label" >State</label>
                        <select id="inputState" className="form-select" value={selectedState} onChange={handleStateChange} required>
                            <option value="" selected>Choose...</option>
                            {Object.keys(citiesByState).map(state => (
                                <option key={state} value={state}>{state}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label for="inputCity" className="form-label">City</label>
                        <select id="inputCity" className="form-select" value={formData.city} onChange={handleCityChange} required>
                            <option value="" selected>Choose...</option>
                            {cities.map(city => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-2">
                        <label for="inputZip" className="form-label" >Zip</label>
                        <input type="text" className="form-control" id="inputZip" name="zipcode" value={formData.zip} onChange={handleChange} required />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-success">Proceed</button>
                    </div>
                </form>
            </>
            }
            {loading && (step == 2) && <SmallSpinner />}
            {!loading && (step == 2) &&
                <>
                    <h4 >Payment Details</h4>
                    <form className="row g-3" onSubmit={handleSubmit}>
                        <img src={paymentMethodsImg} className='paymentMethodsImg' />
                        <div className="col-md-6">
                            <label for="inputpaymentmode" className="form-label" >Payment Mode</label>
                            <select id="inputpaymentmode" className="form-select" value={selectedpaymentmode} onChange={handlePaymentModeChange} required>
                                <option value="" selected>Choose...</option>
                                {Object.keys(paymentMethodsByPaymentMode).map(paymentmode => (
                                    <option key={paymentmode} value={paymentmode}>{paymentmode}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label for="inputpaymentmethod" className="form-label" >Payment by</label>
                            <select id="inputpaymentmethod" className="form-select" name='paymentmethod' value={formData.paymentMethod} onChange={handleChange} required>
                                <option value="" selected>Choose...</option>
                                {paymentMethods.map(paymentMethod => (
                                    <option key={paymentMethod} value={paymentMethod}>{paymentMethod}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn btn-success">Place Order</button>
                        </div>
                    </form>
                </>
            }
            {loading && (step == 3) &&<SmallSpinner />}
            {
                !loading &&(step == 3) && (serverMessage)&&
                <div className='server-message'>
                    <p>{serverMessage}</p>
                    <p>Your OrderID is <span className='orderid'>{orderId}</span></p>
                    <button className='btn btn-primary' onClick={getInvoice}>Download Invoice</button>
                </div>
            }
        </div>
    </>
    )
}
