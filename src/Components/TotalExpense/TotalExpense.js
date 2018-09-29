import React, { Component } from 'react';
import { connect} from 'react-redux';
import { FaUserFriends, FaHandHoldingUsd, FaMoneyBillAlt  } from 'react-icons/fa';
import GridSection from 'Components/Common/GridSection';
class TotalExpense extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        
        const totalCollected = Object.keys(this.props.advanceMoney).reduce( (totalFriendAmount, dataId) => {
            return totalFriendAmount + this.props.advanceMoney[dataId].reduce(  ( total, value)=> total + value.amount, 0 );
        }, 0);
        const totalSpent = Object.keys(this.props.expensesList).reduce( (totalSpentAmount, data) => {
            return totalSpentAmount + this.props.expensesList[data].amount;
        }, 0);
        const available = totalCollected - totalSpent;
        return (
            <div>
                <div className="grid-3">
                    <GridSection amount={totalCollected}>
                        <FaUserFriends className="icon"/> 
                        <span className="title-text">Collected</span>
                    </GridSection>
                </div>
                <div className="grid-3">
                    <GridSection amount={totalSpent}>
                        <FaMoneyBillAlt className="icon"/> 
                        <span className="title-text">Spent</span>
                    </GridSection>
                </div>
                <div className="grid-3">
                    <GridSection amount={available}>
                        <FaHandHoldingUsd className="icon"/> 
                        <span className="title-text">Available</span>
                    </GridSection>
                </div>
            </div>
        );
    }
} 

const mapStateToProps = (state) => {
    return {
        friendsList: state.friendsList,
        expensesList: state.expensesList,
        advanceMoney: state.advanceMoney
    }
};

export default connect( mapStateToProps )( TotalExpense );