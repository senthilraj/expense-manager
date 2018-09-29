const demoData = {
    friendsList: [
        {
            name: 'Jenny',
            id: 1
        },
        {
            name: 'Ashok',
            id: 2
        }    
    ],
    expensesList: {
        1: {
            title: 'Break Fast',
            amount: 300,
            share: [ 1, 2],
            date: 1538084123010
        },
        2: {
            title: 'lunch',
            amount: 500,
            share: [ 1,2],
            date: 1535837834638
        }
    },
    advanceMoney: {
        1: [
            {
                amount: 1000,
                date: 1538084123010
            },
            {
                amount: 2000,
                date: 1538084123010
            }
        ],
        2: [
            {
                amount: 500,
                date: 1538084123010
            },
            {
                amount: 1500,
                date: 153808412301
            }
        ]
    }
}


//Setting for demo purpose
if(!localStorage.getItem('initialStates')) {
    localStorage.setItem('initialStates', JSON.stringify(demoData));
}

const initialStates = JSON.parse(localStorage.getItem('initialStates'));

const Reducers = ( state=initialStates, action) => {
    let localStore;
    switch(action.type) {
        case "ADD_FRIEND":
            localStore = { ...state, advanceMoney:  { ...state.advanceMoney, [action.payload.id]: action.advanceMoney}, friendsList: [ ...state.friendsList, action.payload]};
            localStorage.setItem('initialStates', JSON.stringify(localStore));
            console.log(localStore)
            return localStore;
        case "ADD_ADVANCE":
            localStore =  { ...state, advanceMoney: { ...state.advanceMoney, [action.id]: [ ...state.advanceMoney[action.id], action.payload]}};
            localStorage.setItem('initialStates', JSON.stringify(localStore));
            return localStore;
        case "ADD_EXPENSE":
            localStore =  { ...state, expensesList: { ...state.expensesList, [action.payload.id]: action.payload.values}};
            localStorage.setItem('initialStates', JSON.stringify(localStore));
            return localStore
        default:
            return state;
    }
}

export default Reducers;