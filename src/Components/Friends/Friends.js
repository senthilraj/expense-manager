import React, { Component } from 'react';
import { connect} from 'react-redux';
import './Friends.css';
import Moment from 'react-moment';
import Modal from 'Components/Common/Modal';
import Button from 'Components/Common/Button';
import InputField from 'Components/Common/InputField';
import ListSection from 'Components/Common/ListSection';
import ListItem from 'Components/Common/ListItem';
import { AddFriend, AddAdvance} from 'Store/Actions';

class Friends extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showAddFriendModal: false
        };
    }

    
    showaddFriendHandler = (e) => {
        const showModal = this.state.showAddFriendModal;
        this.setState({showAddFriendModal: !showModal});
    }

    closeAddFriendModalHandler = (e) => {
        this.setState({showAddFriendModal: true});
    }

    addFriendHandler = (e) => {
        const friendsListLength = this.props.friendsList.length;
        let advanceMoney = [];
        if(this.state.addFriendAdvanceAmount && this.state.addFriendAdvanceAmount > 0) {
            advanceMoney.push({ 
                amount: parseInt(this.state.addFriendAdvanceAmount),
                date: new Date().getTime()
            })
        }
        const newFriendsList = {
            name: this.state.addFriendName, 
            id: friendsListLength+1
        };
        this.props.addFriend(newFriendsList,advanceMoney);
        this.setState({ 
            showAddFriendModal: false, 
            addFriendAdvanceAmount: '',
            addFriendName: ''
        });
    }
    
    addAdvanceHandler = (id) => {
        if(this.state.advanceAmount) {
            const advanceMoney = {
                amount: parseInt(this.state.advanceAmount),
                date: new Date().getTime()
            };
            this.props.addAdvance(id, advanceMoney);
            this.setState({ advanceAmount: ''});
        }
        
    }

    showFriendDetailsHandler = (data) => {
        const showModal = this.state.showFriendDetailModal;
        this.setState({ currentFriendModalDetail: data, showFriendDetailModal: !showModal});
    }

    inputChangeHandler = (e) => {
        const target = e.target;
        this.setState({ [target.name]: target.value});
    }

    renderAddFriendModal = () => {
        const showAddFriendModal = this.state.showAddFriendModal;
        return (
            <Modal title="Add Friend" onSubmit={this.addFriendHandler} show={showAddFriendModal}>
                <InputField type="text" labelText="Name" value={this.state.addFriendName || ''} name="addFriendName" id="full-name" onChange={this.inputChangeHandler}/>
                <InputField type="number" labelText="Advance" value={this.state.addFriendAdvanceAmount || ''} name="addFriendAdvanceAmount" id="full-name" onChange={this.inputChangeHandler}/>
                <div className="button-container">
                    <Button buttonStyle="primary" type="submit">Create</Button>
                    <Button buttonStyle="secondary" onClick={this.showaddFriendHandler}>Cancel</Button>
                </div>
            </Modal>
        )
    }

    renderFriendDetailModal = () => {
        const showFriendDetailModal = this.state.showFriendDetailModal;
        return (
            <Modal title="Friend Detail" onSubmit={this.addFriendHandler} show={showFriendDetailModal}>
                    {this.state.currentFriendModalDetail &&  
                        <div> 
                            <div className="advance-form-group">
                                <p>{this.state.currentFriendModalDetail.name}</p>
                            </div>
                            <div className="advance-form-group">
                                <h5>Aready gave money</h5>
                                {this.renderModalAdvanceList(this.state.currentFriendModalDetail.id)}
                            </div>
                            <div className="advance-form-group">
                                <input type="number" placeholder="advance amount" value={this.state.advanceAmount || ''} name="advanceAmount" id="advance-amount" onChange={this.inputChangeHandler}/>
                                <Button buttonStyle="primary" onClick={ () => {this.addAdvanceHandler(this.state.currentFriendModalDetail.id)}}>Add</Button>
                            </div>
                            <div className="advance-form-group">
                                <h5>Aready spent money</h5>
                                {this.renderModalSpentMoneyList(this.state.currentFriendModalDetail.id)}
                            </div>
                        </div>
                    }
                <div className="button-container">
                    <Button buttonStyle="secondary" onClick={this.showFriendDetailsHandler}>Close</Button>
                </div>
            </Modal>
        )
    }

    renderModalAdvanceList(id) {
        let totalAdvance = 0;
        if(this.props.advanceMoney[this.state.currentFriendModalDetail.id]) {
            const advanceList = this.props.advanceMoney[id].map( ( data,index)=> {
                totalAdvance += data.amount;
                return (<li key={index}>&#8377;{data.amount} - <Moment fromNow date={data.date}/></li>)
            });
            return (
                <div>
                    <p>Total advance: &#8377;{totalAdvance}</p>
                    <ul>
                        {advanceList}
                    </ul>
                </div>
            );
        }
    }

    renderModalSpentMoneyList(id) {
        let totalSpentMoney = 0;
        const spentMoneyList = Object.keys(this.props.expensesList).map((key)=>{
            const data = this.props.expensesList[key];
            if( data.share.indexOf(id) !== -1 ) {
                const amount = data.amount;
                const length = data.share.length;
                const share = amount/length;
                totalSpentMoney += share;
                const title = data.title;
                const date = data.date;
                return (
                    <li key={key}>{title} - &#8377;{share}   <Moment fromNow date={date}/></li>
                );
            }
        });
        return (
            <div>
                <p>Total spent: &#8377;{totalSpentMoney}</p>
                <ul>{spentMoneyList}</ul>
            </div>
        );
    }

    renderSpentMoney(id) {
        const totalSpentMoney = Object.keys(this.props.expensesList).reduce((totaldata,key,index)=>{
            const data = this.props.expensesList[key];
            if( data.share.indexOf(id) !== -1 ) {
                const amount = data.amount;
                const length = data.share.length;
                const share = amount/length;
                return totaldata + share;
            }
            else {
                return totaldata;
            }
        }, 0);
        return totalSpentMoney;
    }

    renderFriendsListRow() {
        let friendsList = [];
        if(Array.isArray(this.props.friendsList)) {
            friendsList = this.props.friendsList.map((data) => {
                const totalAdvanceMoney = this.props.advanceMoney[data.id].reduce(  ( total, value)=> total + value.amount, 0 );
                const totalSpentMoney= this.renderSpentMoney(data.id);
                const total = totalAdvanceMoney - totalSpentMoney;
                return (
                    <ListItem onClick={() => { this.showFriendDetailsHandler(data) }}  key={data.id} title={data.name} subText={total || ''}/>
                );
            });
        }
        return (<ul className="list">{friendsList}</ul>);
    }

    renderFriends() {
        return (
            <ListSection title="Friends" buttonOnClick={this.showaddFriendHandler} buttonTitle="Add Friend">
                {this.renderFriendsListRow()}
            </ListSection>
        );
    }


    render() {
        return (
            <div>
                {this.renderFriends()}
                {this.renderAddFriendModal()}
                {this.renderFriendDetailModal()}
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        friendsList: state.friendsList,
        advanceMoney: state.advanceMoney,
        expensesList: state.expensesList
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addFriend: (friend, advance) => {
            dispatch(AddFriend(friend, advance))
        },
        addAdvance: (id,advance) => {
            dispatch(AddAdvance(id,advance))
        }
    }
};

export default connect( mapStateToProps, mapDispatchToProps )( Friends );