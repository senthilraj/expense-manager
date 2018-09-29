import React from 'react';
import './Button.css';

const Button = (props) => {
    
    const { name, children, buttonStyle, type, onClick, className} = props;
    const classNameType = (buttonStyle === 'secondary') ? 'button-secondary' : 'button-primary';
    const buttonTye = (type === 'submit') ? 'submit' : 'button'; 

    const onClickHandler = (e) => {
        if(onClick) {
            onClick(e);
            e.preventDefault();
        }
    }

    return (
        <button type={buttonTye} name={name} className={classNameType+' '+className} onClick={onClickHandler}>
            {children}
        </button>
    );
}

export default Button;