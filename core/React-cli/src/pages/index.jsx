import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import {Button} from 'antd';
import Home from '@/pages/Home';
import About from '@/pages/About';

function Page() {
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
                <Route element={<Home />} path='/home'></Route>
                <Route element={<About />} path="/about"></Route>
            </Routes>
        </>
    );
}

export default Page;
