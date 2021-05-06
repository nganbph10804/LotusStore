import React from 'react'
import shopmen from './../../asset/shopmen.jpg';
import shopwomen from './../../asset/shopwomen.jpg';
import './style.scss';
export const Directory = () => {
    return (
        <div className="directory">
            <div className="wrap"> 
            <div 
            className='item'
            style={{
                backgroundImage: `url(${shopwomen})`
            }}>
                <a>Shop Womens</a>
            </div>

            <div 
            className='item'
            style={{
                backgroundImage: `url(${shopmen})`
            }}>
                <a>Shop Mens</a>
            </div>
            </div>
        </div>
    )
}

export default Directory;