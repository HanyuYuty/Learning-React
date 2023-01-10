import { SHOWMENU,HIDEMENU } from "../actionCreator/actionCreator";

export default function menuReducer (state={
    showMenu:true,

},action){
    const newState = {...state};

    switch (action.type) {
        case SHOWMENU:
        newState.showMenu = true;
        return newState
        case HIDEMENU:
        newState.showMenu = false;
        return newState
        default:
        return state
    }

}