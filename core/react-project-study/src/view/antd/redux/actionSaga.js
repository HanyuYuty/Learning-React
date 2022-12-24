import { takeLatest,put,takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import Mock from 'mockjs'


export default function *actionSaga() {

    yield takeLatest('get-List',getList)
    yield takeEvery('Edit-List',EditCurrentList)
    yield takeEvery('Add-List',AddNewList)
    yield takeEvery('Delete-List',DeleteList)




    
}


function *getList(params) {
    const cinemas = yield getCinemasList();

    yield put({
        type:'change-list',
        payload:cinemas
    })


}




const getCinemasList = async ()=>{
        const res = await axios({
            url:"https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1&k=7406159",
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