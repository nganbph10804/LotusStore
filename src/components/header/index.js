import React from 'react';
import logo from './../../asset/logo.png';
import './style.scss';
import {auth}  from './../../firebase/ultils'
import { Link, BrowserRouter } from 'react-router-dom';
export const Header = ({ user }) => {
    const unLoged = ()=>(
        
            <div>
           <div className="registration">
           <Link to="/registration"><span>Register</span></Link>
           </div>
           <div className="login">
           <Link to="/login"><span>Login</span></Link>
            </div>
            </div>
      
    );
    const Loged = ()=>(
      <>
        <div className="registration">
        <span onClick={()=>{auth.signOut()}}>Logout</span>
           </div>
      </>
    );
    return (
        <header className="header">
            <div className="wrap">
                <div className="logo">
                    <Link to="/"> <img src={logo} alt="lotus Logo" /></Link>
                </div>
                <div className="title">
                    <Link to="/"> <h2>LOTUS STORE</h2></Link>
                </div>
                {!user ? unLoged() : Loged()  }

            </div>
        </header>
    )
}

export default Header;