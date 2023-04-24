import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import {Button} from 'antd';
import Home from '@/pages/Home';
import About from '@/pages/About';

function Page(props) {

    const {apis} = props
    return (
        <>
        <Button type='primary' >按钮</Button>
            <ul>
                <li>
                    <Link to="/home">home</Link>
                </li>
                <li>
                    <Link to="/about">about</Link>
                </li>
            </ul>

            <Routes>
                <Route element={<Home {...apis}/>} path='/home' ></Route>
                <Route element={<About  {...apis}/>} path="/about"></Route>
            </Routes>
        </>
    );
}

export default Page;
