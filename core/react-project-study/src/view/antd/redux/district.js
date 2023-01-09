const districtList = JSON.parse(localStorage.getItem('persist:system'))?.districtList || [];

export default function districtListReducer(
    state = {
        districtList,
    },
    action
) {
    const newState = { ...state };

    switch (action.type) {
        case 'map-districtList':

            const obj = {} // 辅助数组
            /**
             * @param {Array} preArr 上一次调用callback时所计算后的值,reduce的第二个参数为preArr的初始化值。
             * @param {any} current 当前被遍历的数组元素。   
             * */
             newState.districtList = action.payload.reduce((preArr, current) => {

           
                //思路：把value设置成obj的key,并且值为true,({150602: true})当遍历到下一个元素的value时,obj的这个key是有值的,那就会直接返回preArr。
                if (!obj[current.value]) { // 判断当前value是否已经在obj里面
                    // 如果不在,则把这个key的值设置为true
                    obj[current.value] = true // 则将当前value值设置true(可以是其他的)
                    preArr.push(current) // 然后push进当前数组
                }
                return preArr
            }, [])

            return newState;
        default:
            return state;
    }
}
