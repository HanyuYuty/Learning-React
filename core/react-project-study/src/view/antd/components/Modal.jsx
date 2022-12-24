import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button, Checkbox, Form, Input } from 'antd';
import styles from './Modal.module.css';
import {connect} from 'react-redux';
import {cloneDeep} from 'lodash';



function Modal(props) {
    const { setIsShowModal, currentData,cinemasList,EditList,AddList } = props;

    // const [currentKey] = useState(currentData.key);
    const currentKey = useRef(currentData.key);
    const [form] = Form.useForm();


   const deepCurrentData = useMemo(()=>cloneDeep(currentData),[currentData]);

    const onFinish = (values) => {
       if(currentKey.current){
           const currentIndex =  cinemasList.findIndex(item=>item.cinemaId===currentKey.current);
           cinemasList[currentIndex] = {...cinemasList[currentIndex],...values};
           EditList(cinemasList)

       }else{
        AddList(values)

       }
        
        setIsShowModal(false);
        
    };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };


    const renderComponent = useCallback(()=>{
       

      return  Object.keys(deepCurrentData).map((item,index)=>{
                return  (
                    <React.Fragment key={index}>
                        {item==='key'?
                        null
                        :
                        <Form.Item
                            label={item}
                            name={item}
                            rules={[
                                {
                                    required: true,
                                    message: `Please input your ${item}!`,
                                },
                                {
                                    validator:(rule,value)=>{
                                        switch (rule.field) {
                                            case 'name':
                                                return   value.length>15? Promise.reject(new Error('overlength')):Promise.resolve()
                                            case 'address':
                                                return value.length>30?Promise.reject(new Error('overlength')):Promise.resolve()
                                            default:
                                                return value&&value.includes('-')?Promise.resolve():Promise.reject(new Error('please input '))
                                        }
                                    }
                                        
                                }
                            ]}
                            // key={index}
                        >
                            <Input />
                    </Form.Item>}
                </React.Fragment>
                )
        })

    },[currentData])

   
  


    return createPortal(
        <div className={styles.modal}>
           <div className={styles.backBorad}>
          
            <Form
                name="basic"
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={currentData}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                // onValuesChange={handleValue}
            >
                {renderComponent()}
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType='submit'>
                        Submit
                    </Button>
                    <Button
                        onClick={() => {
                            setIsShowModal(false);
                        }}
                    >
                Click
            </Button>
                </Form.Item>
            </Form>
           </div>
        </div>,
        document.body
    );
}

const mapStateToProps = state=>{
    return {
        cinemasList:state?.listReducer?.list
    }

}

const mapDispatchToProps = dispatch=>{
    return {
        EditList(value){
            dispatch({
                type:'Edit-List',
                payload:value
            })

        },
        AddList(value){
            dispatch({
                type:'Add-List',
                payload:value
            })
        }
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(Modal);
