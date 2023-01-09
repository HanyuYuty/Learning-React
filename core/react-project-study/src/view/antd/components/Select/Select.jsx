import React, { useCallback, useState, useRef ,useMemo} from 'react';

import { Input } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

import List from './List'

import PropTypes from 'prop-types';

import styles from './Select.module.css';




function Select(props) {
    const { options, onChange } = props;


    //const [renderOption, setRenderOption] = useState(options);
    const [iconState, setInconState] = useState('up');
    const [isShowOptions, setIsShowOptions] = useState('none');
    const [inputValue, setInputValue] = useState('');
    const [isOriginOptions,setIsOriginOptions] = useState('');
    const [count,setCount] = useState(1);
    const domRef = useRef();
    const ulRef = useRef();
    const domTopRef = useRef();
    const liData = useRef()


    // useEffect(()=>{
    //     if(isShowOptions){
    //         liData.current = [...ulRef.current.children].map(el=>{
    //             //console.log('el',el);
    //             return ({id:el.value,top:el.offsetTop})
    //         })
    //     }
    //     console.log('liData',liData.current);

    // },[isShowOptions])

    /*
    1、useState只能初始化一次，options是通过异步获得数据,当数据还没回来时,options为空,所以useState的状态也为空,并且useState只能初始化一次。因此使用useMemo可以依赖options数据回来发生改变后,重新计算。
    2、为什么是判断isOriginOptions,因为想要达到即使点击选中其中一个选项，但是重新在点击input时，所有数据都还成列。而不是input填了什么，options都被过滤了。

    */
    const initalOptions = useMemo(()=>{
        //⭐⭐input的value为空时,空字符串在includes为true,所以返回所有item
        return options.filter(item => {
            return (
                item.label.includes(isOriginOptions) || item.pinyin.includes(isOriginOptions)
            );
        })

    },[inputValue,options,isShowOptions,isOriginOptions])


    const handleInputClick = useCallback((e) => {
        setCount((pre)=>pre+=1);

        if(count%2!==0){
            setIsShowOptions('block');
        }else{
            setIsShowOptions('none');
        }
        setInconState('down');
    }, [count]);

    const handleInputChange = useCallback(evt => {
        //⭐⭐input的value为空时,空字符串在includes为true,所以返回所有item
        // setRenderOption(
        //     options.filter(item => {
        //         return (
        //             item.label.includes(evt.target.value) || item.pinyin.includes(evt.target.value)
        //         );
        //     })
        // );
        setInputValue(evt.target.value);
        setIsOriginOptions(evt.target.value)
    }, []);

    const handleSelectValue = useCallback((label, option, e) => {
        const { target } = e;
     
        setInputValue(label);
        target.classList.add(styles.activeName);
        domRef.current = target;
        setIsShowOptions('none');


        //这里set一个空值，是为了想要达到即使点击选中其中一个选项，但是重新在点击input时，所有数据都还成列。
        setIsOriginOptions('');
        setCount((pre)=>pre+=1);
        onChange && onChange(e, option);
    }, []);



    const renderOptions = useMemo(() => {
       
        
       
        if (domRef.current) {
            [...ulRef.current.children].forEach(el => {
                el.classList?.remove(styles.activeName);
            });
            domRef.current.classList.add(styles.activeName);
        
        }
        return (

            <ul style={{ display: isShowOptions }} ref={ulRef}>
                {initalOptions.length > 0 ? (
                    initalOptions.map(option => (
                        <li
                            key={option.value}
                            value={option.value}
                            //⭐改用onMouseDown是因为input失焦时,下拉框应该关上,input的blur事件早执行于onClick事件,会导致还没点击就已经被合上。onMouseDown事件早执行于onBlur事件。
                            onMouseDown ={e => handleSelectValue(option.label, option, e)}
                        >
                            {option.label}
                        </li>
                    ))
                ) : (
                    <p>无相关搜索</p>
                )}
            </ul>
        );
    }, [isShowOptions, options, inputValue]);



    return (
        <div className={styles.select} onClick={handleInputClick}>
            <Input
                // onClick={handleInputClick}
                onBlur={() => {
                    setInconState('up');
                    setIsShowOptions('none');
                }}
                onChange={evt => handleInputChange(evt)}
                value={inputValue}
            ></Input>
            {iconState === 'down' ? <DownOutlined /> : <UpOutlined />}
            {renderOptions}
           {/* { isShowOptions&&<List initalOptions={initalOptions} onChange={handleSelectValue}></List>} */}
           {/* {isShowOptions&&<div className={styles.placeholder}>{inputValue}</div>} */}
        </div>
    );
}

Select.propTypes = {
    options: PropTypes.array.isRequired,
    onChange:PropTypes.func
};

export default Select;
