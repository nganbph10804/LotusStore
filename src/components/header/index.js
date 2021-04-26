import React from 'react';
import logo from './../../asset/logo.png';
import './style.scss';
import {Link,BrowserRouter} from 'react-router-dom';
export const Header = () => {
    return (
        <header className="header">
            <div className="wrap">
                <div className="logo">
                  <Link to="/"> <img  src={logo} alt="lotus Logo"/></Link>
                </div>
                <div className="title">
                <Link to="/"> <h2>LOTUS STORE</h2></Link>
                </div>
                <div className="registration">
                    <Link to="/registration"><span>Register</span></Link>
                </div>

            </div>
        </header> 
    )
}
export default Header;