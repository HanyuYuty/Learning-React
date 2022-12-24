
const list = JSON.parse(localStorage.getItem('persist:system'))?.listReducer || [];


export default function listReducer(state={
    list
},action) {
    const newState =  {...state};
 
    switch (action.type) {
        case 'change-list':
        newState.list = action.payload
        return newState;
        case 'edit-list':
        newState.list = action.payload;
        return newState;
        case 'add-list':
            // newState.list.unshift(action.payload)
        newState.list = [action.payload,...newState.list]
        return newState;
        case 'delete-list':
            // newState.list.splice(action.payload,1)
        newState.list  = newState.list.filter(item=>item.cinemaId!==action.payload)      
        return newState
        default:
        return state;
    }
    
}