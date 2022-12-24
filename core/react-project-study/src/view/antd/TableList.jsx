import React, { useCallback, useEffect, useState } from 'react'
import { Space, Table,Button } from 'antd';
import {connect} from 'react-redux';
import Modal from './components/Modal'

function TableList(props) {

    const {cinemasList,getList,setIsShowModal,getCurrentData,deleteList} = props;
  

    const [isEdit,setIsEdit] = useState(false);

    const filterList = ()=>{
        return cinemasList&&cinemasList.map(item=>{
            return {
                key:item.cinemaId,
                address:item.address,
                name:item.name,
                businessTime:item.businessTime || '-'
            }
           
        })
    };
    const handleEdit = (value)=>{
      setIsShowModal(true)
      getCurrentData(value);

    }
    const handleDelete = useCallback((value)=>{
      
      deleteList(value.key);
     
    },[cinemasList])
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: (text) => <a>{text}</a>,
          width:300,
          editable: true,
        },
        {
          title: 'BusinessTime',
          dataIndex: 'businessTime',
          key: 'businessTime',
          width:150,
          editable: true,
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
          editable: true,
        },
        {
          title: 'Action',
          key: 'action',
          render: (value) => (
            <Space size="middle">
              <a onClick={()=>handleEdit(value)}>Edit</a>
              <a onClick={()=>handleDelete(value)}>Delete</a>
            </Space>
          ),
        },
      ];

      const components = (props)=>{

          return (
            !isEdit?
              <td>
                  { props.children}
              </td>
            :
              <td>
                <input type="text" />
              </td>
            
          )

    }


    useEffect(()=>{
      if(cinemasList.length===0){
        getList()
      }
    },[])

    // const handleGetList = useCallback(()=>cinemasList.length<0?getList():null,[])

    const AddList = useCallback(()=>{
      setIsShowModal(true);
      getCurrentData({
        name:'',
        address:'',
        businessTime:''
      })

    },[])



    return (

        <div>
            <Button onClick={()=>{
                      // handleGetList();
                      AddList()
                      
            }}>Add</Button>
            <Table columns={columns} dataSource={filterList()} components={{
                    body: {
                        cell: components,
                   },
        }} rowClassName="editable-row"/>
        </div>
    )
}


const mapStateToProps = (state)=>{
    return {
        cinemasList:state?.listReducer?.list||[]
    }

}

const mapDispatchToProps = (dispatch)=>{

    return {
        getList(values){
            dispatch({
                type:'get-List',
                payload:values||''
            })
        },
        deleteList(key){
          dispatch({
            type:'Delete-List',
            payload:key
          })

        }

    }

}

export default connect(mapStateToProps,mapDispatchToProps)(TableList);
