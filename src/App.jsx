/*
应用的根组件
 */

import React,{Component} from 'react';
import {BrowserRouter, Route,Switch} from 'react-router-dom'
import Login from "./pages/login";
import Register from "./pages/register"
import ResetPassword from "./pages/resetpassword"
import Home from "./pages/Home";
import Teacher from "./pages/teacher/admin/admin";
import Student from "./pages/student/admin/admin"
import Exam from "./pages/exam/Exam";
export default class App extends Component{
    render() {
        return(
            <BrowserRouter>
                <Switch>{/*只匹配其中的一个*/}
                    <Route path='/userlogin' component={Login}/>
                    <Route path='/register' component={Register}/>
                    <Route path='/reset_pwd' component={ResetPassword}/>
                    <Route path='/teacher' component={Teacher}/>
                    <Route path='/student' component={Student}/>
                    <Route path='/exam/:examId' component={Exam}/>
                    <Route path='/' component={Home}/>
                </Switch>
            </BrowserRouter>
        )
    }
}