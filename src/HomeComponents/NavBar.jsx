import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css';
import User from './Untitled design.png'
import { useHistory } from 'react-router-dom';
const request = require('superagent');

function NavBar(props) {
  const history = useHistory();
  const [userDetail, setUserDetail] = useState(null)

  const goToLoginPage = () => {
    props.navlink("Login");
    history.push('/login');
  }

  const goToSignupPage = () => {
    props.navlink("Signup");
    history.push('/signup');
  }
  const userDetails = async () => {
    try {
      const queryParams = {
        username: props.username,
        person: props.setPerson("get")
      };
      const queryString = new URLSearchParams(queryParams).toString();
      const response = await request.get(`http://localhost:5000/apis/userDetails?${queryString}`);
      setUserDetail(response.body);
    } catch (e) {
      console.error(e);
    }
  }
  useEffect(() => {
    if (props.loggedIn) {
      userDetails();
    }
  }, [props.loggedIn])
  return (
    <nav className="navbar navbar-expand-lg navbar-top">
      <div className="nava-container">
        {!props.loggedIn && <>
          <button className='nav-Btn signup-btn' onClick={goToSignupPage}>Sign Up</button>
          <span className='mediator'> / </span>
          <button className='nav-Btn' onClick={goToLoginPage}>Login</button>
        </>
        }
        {
          props.loggedIn && userDetail && <><img src={User} className='user-profile' /> <div className='username'> {userDetail.firstname}</div><div className='welcome'>Welcome ! </div>
          </>
        }
      </div>
    </nav>
  );
}
export default NavBar;
