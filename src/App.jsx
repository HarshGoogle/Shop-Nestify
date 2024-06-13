import './App.css';
import React, { useEffect, useState } from 'react'
import './HomeComponents/Product.css';
import './HomeComponents/Structure.css'
import Products from './HomeComponents/Products';
import MiddleBar from './HomeComponents/MiddleBar';
import SideNavBar from './HomeComponents/SideNavBar';
import SignUp from './HomeComponents/SignUp';
import Cart from './HomeComponents/Cart';
import Deals from './HomeComponents/Deals';
import FAQ from './HomeComponents/FAQS';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './Login';
import AddProduct from './HomeComponents/AddProduct';
import Carousel from './HomeComponents/Carousel';
import SearchBar from './HomeComponents/SearchBar'
import NavBar from './HomeComponents/NavBar';
import RecycleBin from './HomeComponents/RecycleBin';
import Orders from './HomeComponents/Orders';
import AboutUs from './HomeComponents/AboutUs';
import Users from './HomeComponents/Users';
import { useHistory } from 'react-router-dom';


function App() {
  const [loginalert, setLoginalert] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const [signoutalert, setSignoutalert] = useState(false);
  const [carousel, setCarousel] = useState(true);
  const [middlebar, setMiddleBar] = useState(false);
  const [sidebar, setSideBar] = useState(true);
  const [searchbar, setSearchBar] = useState(true);
  const [MainContainer, setMainContainer] = useState(true);
  const [currentNavlink, setCurrentNavlink] = useState("Home");
  const [loggedInPerson, setLoggedInPerson] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);
  const [products, setProducts] = useState([]);
  const [reserve,setReserve]= useState("Home");

  const handleLogin = (val, username) => {
    setLoggedIn(val);
    setUsername(username);
    navlink("Home");
  }
  const setPerson = (val) => {
    if (val == "get") {
      return loggedInPerson;
    }
    setLoggedInPerson(val);
  }

  const navlink = (val) => {
    if (val == "get") {
      return currentNavlink;
    }
    setCurrentNavlink(val);
    if (val == "Home") {
      display(true, false, true, true, true)
    }
    if (val == "Categories" || val == "category") {
      display(false, true, true, true, true);
    }
    if (val == "Show") {
      display(false, false, true, true, true);
    }
    if (val == "Search") {
      display(false, false, true, true, true);
    }
    if (val == "Login" || val == "Signup" || val == "Cart" || val == "FAQ" || val == "Deals" || val == "Add Product" || val == "Recycle Bin") {
      display(false, false, true, true, true);
    }
    if (!loggedIn) {
      if (val == "cart") {
        setCurrentNavlink("Login");
      }
    }
  }
  const Reserve =(val)=>{
    if(val=="get"){
      return reserve;
    }
    setReserve(val)
  }

  const display = (val1, val2, val3, val4, val5) => {
    setCarousel(val1);
    setMiddleBar(val2);
    setSideBar(val3);
    setSearchBar(val4);
    setMainContainer(val5);
  }

  useEffect(() => {
    if (loggedIn) {
      setLoginalert(true);
      setLoginStatus(true);
      setTimeout(() => {
        setLoginalert(false);
      }, 2000);
    }
    if (!loggedIn) {
      if (loginStatus) {
        setSignoutalert(true);
        setTimeout(() => {
          setSignoutalert(false);
        }, 2000);
        setLoginStatus(false);
      }
    }
  }, [loggedIn]);
  const routes = [
    { path: '/login', component: <Login setPerson={setPerson} handleLogin={handleLogin} loggedIn={loggedIn} />, redirectTo: '/', condition: loggedIn },
    { path: '/signup', component: <SignUp /> },
    { path: '/cart', component: <Cart username={username} />, redirectTo: '/login', condition: !loggedIn },
    { path: '/deals', component: <Deals /> },
    { path: '/faqs', component: <FAQ /> },
    { path: '/aboutus', component: <AboutUs /> },
    { path: '/phone', category: 'phone' },
    { path: '/homedecor', category: 'home_decor' },
    { path: '/beauty&personalcare', category: 'beauty_personal_care' },
    { path: '/clothes', category: 'clothes' },
    { path: '/', category: '', exact: true },
    { path: '/books&media', category: 'Books & Media' },
    { path: '/toys&games', category: 'Toys & Games' },
    { path: '/sports&outdoors', category: 'Sports & Outdoors' },
    { path: '/jewelry&watches', category: 'Jewelry & Watches' },
    { path: '/addproduct', component: <AddProduct /> },
    { path: '/recyclebin', component: <RecycleBin /> },
    { path: '/orders', component: <Orders /> },
    { path: '/users', component: <Users/> },
  ];
  const renderRoute = (route) => {
    if (route.redirectTo && route.condition) {
      return (
        <Route key={route.path} exact={route.exact} path={route.path}>
          <Redirect to={route.redirectTo} />
        </Route>
      );
    }
    if (route.category !== undefined) {
      return (
        <Route key={route.path} path={route.path} exact={route.exact}>
          <Products
            setPerson={setPerson}
            navlink={navlink}
            category={route.category}
            username={username}
            loggedIn={loggedIn}
            products={products}
            Reserve={Reserve}
          />
        </Route>
      );
    }
    return (
      <Route key={route.path} path={route.path} exact={route.exact}>
        {route.component}
      </Route>
    );
  };

  return (
        <Router>
          <NavBar setPerson={setPerson}  loggedIn={loggedIn} username={username} navlink={navlink}/>
          {carousel && <Carousel loggedIn={loggedIn} />}
          {middlebar && <MiddleBar navlink={navlink} />}
          <div className='structure'>
            <div className='side-navbar'>
              {sidebar && <SideNavBar setPerson={setPerson} loggedIn={loggedIn} handleLogin={handleLogin} username={username} navlink={navlink} />}
            </div>
            <div className='product-container'>
              {searchbar && <SearchBar setPerson={setPerson} username={username} loggedIn={loggedIn} navlink={navlink} Reserve={Reserve}/>}
              {loginalert && <div className="alert alert-success" role="alert">
                Login ! Successfully
              </div>}
              {signoutalert && <div className="alert alert-dark" role="alert">
                Log out !
              </div>}

              {MainContainer && (
                <Switch>
                  {routes.map(renderRoute)}
                </Switch>
              )}
            </div>
          </div>
        </Router>
      
      );
}

export default App;
