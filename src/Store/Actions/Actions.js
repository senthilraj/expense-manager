const AddFriend = (friend, advanceMoney) => {
    return {
        type: 'ADD_FRIEND',
        payload: friend,
        advanceMoney
    }
};

const AddExpense = (expense) => {
    return {
        type: 'ADD_EXPENSE',
        payload: expense
    }
};

const AddAdvance = (id,advance) => {
    return {
        type: 'ADD_ADVANCE',
        payload: advance,
        id
    }
}


export { AddFriend, AddExpense, AddAdvance};