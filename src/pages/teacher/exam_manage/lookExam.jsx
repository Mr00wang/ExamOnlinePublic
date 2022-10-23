import React,{Component} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import LookExamHome from "./lookExamHome";
import LookDescExam from "./lookDescExam";
import LookCompleteDescExam from "./lookCompleteDescExam";
/*

 */


export default class LookExam extends Component{
    render() {

        return(
            <Switch>
                <Route path="/teacher/exam_manage/look" component={LookExamHome} exact/>
                <Route path="/teacher/exam_manage/look/desc" component={LookDescExam}/>
                <Route path="/teacher/exam_manage/look/complete_desc" component={LookCompleteDescExam}/>
                <Redirect to="/teacher/exam_manage/look"/>
            </Switch>
        )
    }

}