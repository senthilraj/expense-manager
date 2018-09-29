import React from 'react';
import './GridSection.css';
import { FaUserFriends, FaHandHoldingUsd, FaMoneyBillAlt  } from 'react-icons/fa';

const GridSection = (props) => {

    const { children, amount} = props;
    
    return (
        <div className="total-details-container">
            <h1>{children}</h1>
            <div className="clearfix"></div>
            <div className="sub-text">&#8377;{amount}</div>
        </div>
    );
}
export default GridSection;