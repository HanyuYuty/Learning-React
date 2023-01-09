import React, { useCallback, useEffect, useState,useMemo } from 'react';
import { Space, Table, Button, Select } from 'antd';

import { connect } from 'react-redux';
import Modal from './components/Modal';
import { useRef } from 'react';

function TableList(props) {
    const {
        cinemasList,
        getList,
        clearList,
        setIsShowModal,
        getCurrentData,
        deleteList,
        getDistrictList,
        districtList,
        isShowModal,
        cityList,
        getCityList
    } = props;

    const [isEdit, setIsEdit] = useState(false);
    const [country,setCountry] = useState('')
    const [district,setDistrict] = useState('');


    const data = useRef('')




    const filterList = useMemo(() => {

        return (
            cinemasList &&
            cinemasList.map(item => {
                return {
                    key: item.cinemaId,
                    address: item.address,
                    name: item.name,
                    businessTime: item.businessTime || '-',
                    district:item?.district?.name || ''
                };
            }).filter(it=>it.district.includes(district))
        );
    },[cinemasList,isShowModal,district]);
    const handleEdit = value => {
        setIsShowModal(true);
        getCurrentData(value);
    };
    const handleDelete = useCallback(
        value => {
            deleteList(value.key);
        },
        [cinemasList]
    );
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
            width: 300,
            editable: true,
        },
        {
            title: 'BusinessTime',
            dataIndex: 'businessTime',
            key: 'businessTime',
            width: 150,
            editable: true,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            editable: true,
        },
        {
          title: 'district',
          dataIndex: 'district',
          key: 'district',
          editable: true,
        },
        {
            title: 'Action',
            key: 'action',
            render: value => (
                <Space size="middle">
                    <a onClick={() => handleEdit(value)}>Edit</a>
                    <a onClick={() => handleDelete(value)}>Delete</a>
                </Space>
            ),
        },
    ];

    const components = props => {
        return !isEdit ? (
            <td>{props.children}</td>
        ) : (
            <td>
                <input type="text" />
            </td>
        );
    };

    useEffect(() => {
        //When jumping from another page, if you already have data, you should read the cache 
        if (cinemasList.length === 0) {
            //When there is no data in the cache, send the request
            getList();
        }
        if(cityList.length ===0){
            getCityList()
        }
        
        // return ()=>{
        //     clearList()
        // }

    }, []);

    useEffect(()=>{
        getDistrictList(cinemasList);
    },[cinemasList])

    // const handleGetList = useCallback(()=>cinemasList.length<0?getList():null,[])

    const AddList = useCallback(() => {
        setIsShowModal(true);
        getCurrentData({
            name: '',
            address: '',
            businessTime: '',
        });
    }, []);

    return (
 
        <div>
            <Select
                options={cityList}
                style={{
                    width: 300,
                }}
                showSearch
                filterOption={(input, option) => {
                    return (option?.label ?? '').includes(input);
                }}
                onSelect={(key,{label}) => {
                    clearList()
                   getList(key);
                   setCountry(label)
                   setDistrict('');
                   data.current = label
                }}
                // defaultValue={cityList[0]}
                value={country}
            ></Select>
            <Select
                options={districtList}
                style={{
                    width: 300,
                }}
                value={district}
                onSelect={(_,{label})=> {
                setDistrict(label)
               }}
                
            ></Select>
            <Button
                onClick={() => {
                    // handleGetList();
                    AddList();
                }}
            >
                Add
            </Button>
            <Table
                columns={columns}
                dataSource={filterList}
                components={{
                    body: {
                        cell: components,
                    },
                }}
                rowClassName="editable-row"
            />
        </div>
    );
}

const mapStateToProps = state => {
    return {
        cinemasList: state?.listReducer?.list || [],
        districtList: state?.districtListReducer.districtList || [],
        cityList:state.cityListReducer.cityList||[]
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getList(values) {
            dispatch({
                type: 'get-List',
                payload: values || '',
            });
        },
        clearList(){
            dispatch({
                type:'clear-List',
            })

        },
        deleteList(key) {
            dispatch({
                type: 'Delete-List',
                payload: key,
            });
        },
        getDistrictList(values) {
            dispatch({
                type: 'get-districtList',
                payload: values,
            });
        },
        getCityList(){
          dispatch({
            type:'get-cityList',
          })
    
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableList);
