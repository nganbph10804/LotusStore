import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import logo from './../../asset/logo.png';
import './style.scss';
import { auth } from './../../firebase/ultils'
import { Link, BrowserRouter } from 'react-router-dom';
import { signOut } from '../../redux/User/user.actions';
const Header = () => {
    const currentUser = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();

    const logout= ()=>{
        dispatch(signOut());
    }
    const unLoged = () => (

        <div>
           
            <div className="registration">
                <Link to="/registration"><span>Register</span></Link>
            </div>
            <div className="login">
                <Link to="/login"><span>Login</span></Link>
            </div>
        </div>

    );
    const Loged = () => (
        <>
          <div className="dashboard">
                <Link to="/dashboard"><span>My Account</span></Link>
            </div>
            <div className="registration">
                <span onClick={() => { logout() }}>Logout</span>
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
                <nav>
                    <ul>
                        <li>
                            <Link  to="search">
                                Search
                            </Link>
                        </li>
                    </ul>
                </nav>

                {!currentUser ? unLoged() : Loged()}
                {/* {unLoged()} */}

            </div>
        </header>
    )
}
export default Header