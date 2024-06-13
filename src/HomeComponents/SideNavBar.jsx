import { NavLink } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SideNavBar.css';
import smartshop from './Smart Online Shop Chart Logo.gif'
const request = require('superagent');

function SideNavBar(props) {
    const [userDetail, setUserDetail] = useState(false);
    const signout = () => {
        props.navlink("Home")
        props.handleLogin(false,null)
    }
    const commonLinks = [
        { path: "/", text: "Home", emoji: "🏠 " },
        { path: "/", text: "Categories", emoji: "📚 " },
        { path: "/cart", text: "Cart", emoji: "🛒 " },
        { path: "/deals", text: "Deals", emoji: "🏷️ " },
        { path: "/faqs", text: "FAQ", emoji: "💬 " },
        { path: "/aboutus", text: "About us", emoji: "❤️‍🔥 " },
       
    ];
    const adminCommonLinks = [
        { path: "/", text: "Home", emoji: " 🏠" },
        { path: "/", text: "Categories", emoji: "📚 " },
        { path: "/addproduct", text: "Add Product", emoji: "👗 " },
        { path: "/users", text: "Users", emoji: "👥 " },
        { path: "/orders", text: "Orders", emoji: "📦 " },
        { path: "/recyclebin", text: "Recycle Bin", emoji: "🗑️ " },
    ];
    const loggedInLinks = [
        ...commonLinks,
        { path: "/", text: "Sign out", emoji: "👋 ", onClick: signout },
    ];
    const AdminloggedInLinks = [
        ...adminCommonLinks,
        { path: "/", text: "Sign out", emoji: "👋 ", onClick: signout },
    ];

    const notLoggedInLinks = [
        ...commonLinks,
        { path: "/login", text: "Login", emoji: "👤" },
        { path: "/signup", text: "Signup", emoji: "📝 " }
    ];

    const linksToDisplay = props.loggedIn ? (props.setPerson("get") == "user") ? loggedInLinks : AdminloggedInLinks : notLoggedInLinks;

    const userDetails = async () => {
        try {
            const queryParams = {
                username: props.username,
                person: props.setPerson("get")
            };
            const queryString = new URLSearchParams(queryParams).toString();
            const response = await request.get(`http://localhost:5000/apis/userDetails?${queryString}`);
            setUserDetail(response.body)
        } catch {
        }
    }
    useEffect(() => {
        if (props.loggedIn) {
            userDetails();
        }
    }, [props.loggedIn])


    useEffect(() => {
        linksToDisplay.map((link) => {
            if (link.text == props.navlink("get")) {
                const element = document.getElementById(props.navlink("get"));
                element.classList.add('current-link');
            } else {
                const element = document.getElementById(link.text);
                element.classList.remove('current-link');
            }
        })
    }, [props.navlink("get")])
    // Function to render navbar content
    const renderNavBarContent = () => {
        return (
            <div className="container-fluid">
                <NavLink className="navbar-brand " to="/">
                    Shop
                    <img src={smartshop} width="100" height="80" alt="Your Company" />
                </NavLink>
                <div className=" navbar-collapse" id="navbarSupportedContent">

                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {props.loggedIn && userDetail &&
                            <li className="nav-item dropdown">
                                <NavLink className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src="https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-512.png" width="30" height="30" className="rounded-circle" alt="User Profile" />
                                </NavLink>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                    <li><NavLink className="dropdown-Item" to="#">{userDetail.firstname + " " + userDetail.lastname}</NavLink></li>
                                    <li><NavLink className="dropdown-Item" to="#">{userDetail.email}</NavLink></li>
                                    <li><NavLink className="dropdown-Item" to="#">{userDetail.mobilenumber}</NavLink></li>
                                    <li><hr className="dropdown-divider" /></li>
                                </ul>
                            </li>}
                        <ul className="navbar-nav">

                            {linksToDisplay.map((link, index) => (
                                <li key={index} className="nav-item">
                                    {link.onClick ? (
                                        <NavLink
                                            className="nav-link"
                                            to={link.path}
                                            id={link.text}
                                            aria-current={link.path === "/" ? "page" : undefined}
                                            onClick={(e) => {
                                                props.navlink(link.text);
                                                link.onClick();
                                            }}
                                        >
                                            {link.emoji} {link.text}
                                        </NavLink>
                                    ) : (
                                        <NavLink
                                            className="nav-link"
                                            to={link.path}
                                            id={link.text}
                                            aria-current={link.path === "/" ? "page" : undefined}
                                            onClick={(e) => {                      
                                                    props.navlink(link.text);
                                            }}
                                        >
                                            {link.emoji} {link.text} 
                                        </NavLink>
                                    )}
                                </li>
                            ))}

                        </ul>
                    </ul>

                </div>
            </div>
        );
    };

    return (
        <nav className={`navbar side-nav flex-column`} >
            <div className="container-fluid">
                {/* Render full navbar content on screens larger than 576px */}
                {window.innerWidth > 576 ? renderNavBarContent() : (
                    <NavLink className="navbar-brand" to="/">
                        <div className="navbar-toggler-icon"></div>
                        <div className="navbar-toggler-icon"></div>
                        <div className="navbar-toggler-icon"></div>
                    </NavLink>
                )}
            </div>
        </nav>
    );
}

export default SideNavBar;
