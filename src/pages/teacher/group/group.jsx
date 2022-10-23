import React,{Component} from "react";
import {Switch, Route, Redirect} from "react-router-dom"
import GroupHome from "./groupHome";
import StudentManage from "./stu_manage";
/*

 */

export default class Group extends Component{
    render() {

        return(
            <Switch>
                <Route path="/teacher/group" component={GroupHome} exact/>
                <Route path="/teacher/group/stu" component={StudentManage}/>
                <Redirect to="/teacher/group"/>
            </Switch>
        )
    }

}