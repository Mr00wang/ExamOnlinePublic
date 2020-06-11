import React,{Component} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import LookScoreHome from "./lookScoreHome";
import ScoreChart from "./scoreChart";

/*

 */

export default class LookScore extends Component{
    render() {
        return(
            <Switch>
                <Route path="/teacher/score_manage/look" component={LookScoreHome} exact/>
                <Route path="/teacher/score_manage/look/chart" component={ScoreChart}/>
                <Redirect to="/teacher/score_manage/look"/>
            </Switch>
        )
    }

}