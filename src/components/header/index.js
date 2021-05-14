import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import logo from './../../asset/logo.png';
import './style.scss';
import { auth } from './../../firebase/ultils'
import { Link, BrowserRouter } from 'react-router-dom';
import { signOut } from '../../redux/User/user.actions';
import { selectCartItemsCount } from './../../redux/Cart/cart.selectors'
import cartIcon  from './../../asset/shopping-cart.png'
import userIcon from './../../asset/user.png'

const mapState = (state) => ({
    totalNumCartItems: selectCartItemsCount(state)
});

const Header = () => {
    // const totalNumbersCart = useSelector(state=>state.cartData.cartItems);
    const currentUser = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();
    const { totalNumCartItems } = useSelector(mapState);

    const logout = () => {
        dispatch(signOut());
    }
    const unLoged = () => (

        <ul>
            <li className="search">
                <Link to="/search">
                    <span>Search</span>
                </Link>
            </li>

            <li className="registration">
                <Link to="/registration"><span>Register</span></Link>
            </li>
            <li className="login">
                <Link to="/login"><span>Login</span></Link>
            </li>
            <li>
            <Link to="/cart" >
                   <img className="img-cart" src={cartIcon}/><span style={{color:"red"}}>({totalNumCartItems})</span>
                </Link>
            </li>
        </ul>

    );
    const Loged = () => (
        <ul>
            <li style={{paddingTop: '25px'}}>
                <Link to="/search">
                    <span>Search</span>
                </Link>
            </li>
            <li>
            <Link to="/cart" >
                   <img className="img-cart" src={cartIcon}/><span style={{color:"red", fontSize:'20px'}}>({totalNumCartItems})</span>
                </Link>
            </li>
            <li className="dashboard">
                <Link to="/dashboard"><img className="img-user" src={userIcon}/> <span style={{fontSize: '15px'}} onClick={()=>logout()}>(Logout)</span>
                </Link>
            </li>
            {/* <li className="logout">
                <span onClick={() => { logout() }}>Logout</span>
            </li> */}
            {/* <li class="dropdown">
                <button class="dropbtn">
                    dropdown
                </button>
                <div class="dropdown-content">
                    <a href="/dashboard"><Link to="/dashboard">My Account</Link></a>
                    <a href="" onClick={() => { logout() }}>Logout</a>   
                </div>
            </li> */}
        </ul>
    );
    return (
        <header className="header">
            <div className="wrap">
                <div className="home">
                    <div className="logo">
                        <Link to="/"> <img src={logo} alt="lotus Logo" /></Link>
                    </div>
                    <div className="title">
                        <Link to="/"> <h2>LOTUS STORE</h2></Link>
                    </div>
                </div>
                <nav>
                    {!currentUser ? unLoged() : Loged()}
                </nav>


                {/* {unLoged()} */}

            </div>
        </header>
    )
}
export default Header