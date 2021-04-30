import React from 'react';
import { connect, useSelector } from 'react-redux';
import logo from './../../asset/logo.png';
import './style.scss';
import { auth } from './../../firebase/ultils'
import { Link, BrowserRouter } from 'react-router-dom';
const Header = props => {
    //   const { currentUser } = props;
    const currentUser = useSelector(state => state.user.currentUser);
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
                <span onClick={() => { auth.signOut() }}>Logout</span>
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
                {!currentUser ? unLoged() : Loged()}
                {/* {unLoged()} */}

            </div>
        </header>
    )
}
// Header.defaultProps = {
//     currentUser: null
//   };

//   const mapStateToProps = ({ user }) => ({
//     currentUser: user.currentUser
//   });

//   export default connect(mapStateToProps, null)(Header);
export default Header