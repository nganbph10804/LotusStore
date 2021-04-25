import React from 'react';
import './style.scss';
import logo from './../../asset/logo.png';

export const Header = () => {
    return (
        <header className="header">
            <div className="wrap">
                <div className="logo">
                    <img  src={logo} alt="lotus Logo"/>
                </div>

            </div>
        </header> 
    )
}
export default Header;