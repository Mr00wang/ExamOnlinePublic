import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
// import App from './App';
import App from './App';
import storageUtils from "./utils/storageUtils";
import memoryUtils from "./utils/memoryUtils";
import 'core-js/es'
import 'react-app-polyfill/ie9'
import 'react-app-polyfill/stable'
//读取local中保存user，保存到内存
const user = storageUtils.getUser();
const student = storageUtils.getStudent();
memoryUtils.user = user;
memoryUtils.student = student;
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
