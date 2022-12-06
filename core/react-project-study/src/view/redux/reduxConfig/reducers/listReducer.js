export default function listReducer(state={
    list:[]
},action) {
    const newState = {...state};

    switch (action.type) {
        case 'getList':
        newState.list = action.payload;
        return newState
        default:
        return state
    }

}