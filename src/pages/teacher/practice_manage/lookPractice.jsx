import React,{Component} from "react";
import {Switch, Route, Redirect} from "react-router-dom"
import LookPracticeHome from "./lookPracticeHome";
import LookDescPractice from "./LookDescPractice";
/*

 */

export default class LookPractice extends Component{
    render() {

        return(
            <Switch>
                <Route path="/teacher/practice_manage/look" component={LookPracticeHome} exact/>
                <Route path="/teacher/practice_manage/look/desc" component={LookDescPractice}/>
                <Redirect to="/teacher/practice_manage/look"/>
            </Switch>
        )
    }

}