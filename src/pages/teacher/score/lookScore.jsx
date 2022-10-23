import React,{Component} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import LookScoreHome from "./lookScoreHome";
import ScoreChart from "./scoreChart";
import LookCompleteDescExam from "../score/lookCompleteDescExam";
import StudentExam from "../score/studentExam";

export default class LookScore extends Component{
    render() {
        return(
            <Switch>
                <Route path="/teacher/score_manage/look" component={LookScoreHome} exact/>
                <Route path="/teacher/score_manage/look/chart" component={ScoreChart}/>
                <Route path="/teacher/score_manage/look/complete_desc" component={LookCompleteDescExam}/>
                <Route path="/teacher/score_manage/look/student_exam" component={StudentExam}/>
                <Redirect to="/teacher/score_manage/look"/>
            </Switch>
        )
    }

}