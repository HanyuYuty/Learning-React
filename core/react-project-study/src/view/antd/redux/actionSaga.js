import { takeLatest,put,takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import Mock from 'mockjs'


export default function *actionSaga() {

    yield takeLatest('get-List',getList)
    yield takeEvery('clear-List',clearList)
    yield takeEvery('Edit-List',EditCurrentList)
    yield takeEvery('Add-List',AddNewList)
    yield takeEvery('Delete-List',DeleteList)
    yield takeEvery('get-cityList',getCityList)
    yield takeEvery('get-districtList',setDistrictList)





    
}


function *getList(params) {

    const cinemas = yield getCinemasList(params);

    yield put({
        type:'change-list',
        payload:cinemas
    })
   
}

function *clearList() {
    yield put({
        type:'clear-list',
    })
    
}


const getCinemasList = async (key)=>{
    const {payload} = key;
        const res = await axios({
            url:`https://m.maizuo.com/gateway?cityId=${payload||110100}&ticketFlag=1&k=7406159`,
            method:"get",
            headers:{
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16395416565231270166529","bc":"110100"}',
                'X-Host': 'mall.film-ticket.cinema.list'
            }
        })
        return res.data.data.cinemas
}
    


function *EditCurrentList(params) {
   
    yield put({
        type:'edit-list',
        payload:params?.payload
    })

    
}


function *AddNewList(params) {
    let key = yield getKey()
    
    yield put({
        type:'add-list',
        payload:{...params?.payload,...key}
    })
    
}


function getKey() {
   return Promise.resolve(Mock.mock({
    "cinemaId|1000-2000": 1
  }))
   
    
}


function *DeleteList(params) {
  yield put({
        type:'delete-list',
        payload:params.payload
    })
    
}


function *getCityList() {
    const res = yield getCityListByApi();

    

    yield put({
        type:'set-List',
        payload:res
    })
    
}

async function getCityListByApi(params) {
    const res = await axios({
        url:"https://m.maizuo.com/gateway?k=1171248",
        method:"get",
        headers:{
            'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"1645865382277390462812161"}',
            'X-Host': 'mall.film-ticket.city.list'
        }
    })
    return res.data.data.cities
}




function *setDistrictList(params) {

    yield put({
        type:'map-districtList',
        payload:params?.payload.map(item =>{
            return ({ value: item?.district?.districtId,label:item?.district?.name })
         })

    })
    
}