import React, { Component } from 'react';
import './App.css';
import Friends from 'Components/Friends';
import Expenses from 'Components/Expenses';
import TotalExpense from 'Components/TotalExpense';
import { FaUserFriends, FaHandHoldingUsd, FaMoneyBillAlt  } from 'react-icons/fa';

class App extends Component {

  render() {
    return (
      <div>
        <header>
          <div className="logo">WeSpendZ</div>  
        </header>  
        <div className="container">
            <TotalExpense></TotalExpense>
            <div className="grid-5">
              <Friends></Friends>
            </div>
            <div className="grid-5">
              <Expenses></Expenses>
            </div>
        </div>
      </div>
    );
  }
}

export default App;
