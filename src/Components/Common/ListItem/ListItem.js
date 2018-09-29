import React, { Component} from 'react';
import './ListItem.css'

const ListItem = (props) => {
    const { title, id, subText, children, onClick} = props;
    const onClickHandler = (e) => {
        if(onClick)
        onClick();
        e.preventDefault();
    }
    return (
        <li className="list-item" onClick={onClickHandler}>
            <strong>{title}</strong> {subText} &#8377;
            {children}
        </li>
    );
}

export default ListItem;