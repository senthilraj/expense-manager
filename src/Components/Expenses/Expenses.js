import React, { Component } from 'react';
import { connect} from 'react-redux';
import './Expenses.css';
import Modal from 'Components/Common/Modal';
import Button from 'Components/Common/Button';
import InputField from 'Components/Common/InputField';
import ListSection from 'Components/Common/ListSection';
import ListItem from 'Components/Common/ListItem';
import Moment from 'react-moment';
import { AddExpense} from 'Store/Actions';

class Expenses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shareExpenseAmount: [],
            shareSeletedFriends: []
        };
    }

    renderspendMoneyListRow() {
        const expensesList = this.props.expensesList ? this.props.expensesList : {};
        const expensesListRow = Object.keys(expensesList).map((data) => {
            return (
            <ListItem key={data} title={expensesList[data].title} subText={expensesList[data].amount || ''}>
                <span className="pull-right"><Moment fromNow date={expensesList[data].date}/></span>
            </ListItem>
            )
        });
        return (<ul className="list">{expensesListRow}</ul>);
    }

    renderSpendMoneyList() {
        return (
            <ListSection title="Expenses" buttonOnClick={this.showExpenseHandler} buttonTitle="Add Expense">
                {this.renderspendMoneyListRow()}
            </ListSection>
        );
    }
    
    
    showExpenseHandler = (e) => {
        const showExpenseModal = this.state.showExpenseModal;
        this.setState({showExpenseModal: !showExpenseModal});
    }
    
    addExpenseHandler = (e) => {
        e.preventDefault();
        const expensesListLength = Object.keys(this.props.expensesList).length;
        const newExpensesList = {
            id: [expensesListLength+1],
            values: {
                title: this.state.addExpenseTitle,
                amount: parseInt(this.state.addExpenseAmount),
                share: this.state.shareExpenseAmount,
                date: new Date().getTime()
            }
        }
        this.props.addExpense(newExpensesList);
        this.setState({ showExpenseModal:false});
    }
    
    inputChangeHandler = (e) => {
        const target = e.target;
        this.setState({ [target.name]: target.value});
    }
    
    selectChangeHandler = (e) => {
        const target = e.target;
        let selectedValues = [];
        let shareSeletedFriends = []
        for(let i=0; i<target.options.length ; i++) {
          if(target.options[i].selected) {
            selectedValues.push(parseInt(target.options[i].value));
            shareSeletedFriends.push(target.options[i].innerText)
          }        
        }
    
        this.setState({ shareExpenseAmount: selectedValues, shareSeletedFriends});
    }
    
    
      
    
    renderExpenseModal = () => {
        const showExpenseModal = this.state.showExpenseModal;
        return (
            <Modal title="Add Expense" onSubmit={this.addExpenseHandler} show={showExpenseModal}>
                <InputField type="text" labelText="Title" value={this.state.addExpenseTitle || ''} name="addExpenseTitle" id="expense-title" onChange={this.inputChangeHandler}/>
                <InputField type="number" labelText="Advance" value={this.state.addExpenseAmount || ''} name="addExpenseAmount" id="expense-amount" onChange={this.inputChangeHandler}/>
                <div className="form-group">
                    <label htmlFor="share-amount">Shares</label>
                    <select className="pull-left  multi-select" value={this.state.shareExpenseAmount} name="shareExpenseAmount" multiple={true} id="share-amount" onChange={this.selectChangeHandler}>
                        {
                        this.props.friendsList && this.props.friendsList.map((data,index) => {
                            return (
                            <option key={data.id} value={data.id}>
                                {data.name}
                            </option>
                            );
                        })
                        }
                    </select>
                    <div className="pull-left selected-friends">
                        <div>Selected</div>
                        {this.state.shareSeletedFriends && 
                        this.state.shareSeletedFriends.map( (value, index)=> {
                            return (<span key={index}>{value}</span>)
                        })
                        }
                    </div>
                    <div className="clearfix"></div>
                </div>
                <div className="button-container">
                    <Button buttonStyle="primary" type="submit">Create</Button>
                <   Button buttonStyle="secondary" onClick={this.showExpenseHandler}>Cancel</Button>
                </div>
            </Modal>
        )
    }

    render() {
        return (
            <div>
                {this.renderSpendMoneyList()}
                {this.renderExpenseModal()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        friendsList: state.friendsList,
        expensesList: state.expensesList
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addExpense: (expense) => {
            dispatch(AddExpense(expense))
        }
    }
};

export default connect( mapStateToProps, mapDispatchToProps )( Expenses );