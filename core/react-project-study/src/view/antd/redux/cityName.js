
const cityList = JSON.parse(localStorage.getItem('persist:system'))?.cityListReducer || [];

export default function cityListReducer(state={
    cityList
},action) {
    const newState =  {...state};
 
    switch (action.type) {
        case 'set-List':
        newState.cityList = action.payload.map(item=>({value:item.cityId,label:item.name,pinyin:item.pinyin}))
        return newState;
        default:
        return state;
    }
    
}


