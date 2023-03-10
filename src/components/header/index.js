import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOut } from '../../redux/User/user.actions';
import logo from './../../asset/logo.png';
import cartIcon from './../../asset/shopping-cart.png';
import userIcon from './../../asset/user.png';
import { selectCartItemsCount } from './../../redux/Cart/cart.selectors';
import './style.scss';

const mapState = (state) => ({
    totalNumCartItems: selectCartItemsCount(state)
});

const Header = () => {
    // const totalNumbersCart = useSelector(state=>state.cartData.cartItems);
    const currentUser = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();
    const { totalNumCartItems } = useSelector(mapState);

    const logout = () => {
        const cnf = window.confirm('Are you want to logout?');
        if(cnf==false){
            return;
        }else{
            dispatch(signOut());
        }
        
    }
    const unLoged = () => (

        <ul>
            <li className="search">
                <Link to="/admin">
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
                    <img className="img-cart" style={{width:'55%'}} src={cartIcon} /><span style={{ color: "red" }}>({totalNumCartItems})</span>
                </Link>
            </li>
        </ul>

    );
    const Loged = () => (
        <ul>
            <li className="search" >
                <Link to="/admin">
                    <span>Search</span>
                </Link>
            </li>
            <li className="cart">
                <Link to="/cart" >
                    <img className="img-cart" style={{width:'40%'}} src={cartIcon} /><span >({totalNumCartItems})</span>
                </Link>
            </li>
            <li className="dashboard">
                <Link to="/dashboard"><img style={{width:'60%'}} className="img-user" src={userIcon} /> 
                </Link>
               
            </li>
            <li className="logout">
            <span   onClick={() => logout()}>(Logout)</span>
            </li>
        </ul>
    );
    return (
        <header className="header">
            <div className="home">
                <div className="logo">
                    <Link to="/"> <img style={{width:'100%',height:'auto', paddingBottom: '10px', paddingTop: '10px'}} src={logo} alt="lotus Logo" /></Link>
                </div>
                <div className="title">
                    <Link to="/"> <h2>HUST STORE</h2></Link>
                </div>
            </div>
            <nav className="menu">
                {!currentUser ? unLoged() : Loged()}
            </nav>
        </header>
    )
}
export default Header