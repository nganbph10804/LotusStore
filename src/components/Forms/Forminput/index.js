import React from 'react'
import './style.scss';


const FormInput = ({handleChange,label,...otherProps}) => {
    const labeled =()=>(
        <>
        <label>
            {label}
        </label>
        </>
    );

    return (
        <div className="formRow">
            {label?labeled:''}

            <input className="formInput" onChange={handleChange} {...otherProps}/>
        </div>
    )
}

export default FormInput
