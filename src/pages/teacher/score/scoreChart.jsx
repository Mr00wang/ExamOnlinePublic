import React,{Component} from "react";
import {Card, Icon} from "antd";
import LinkButton from "../../../component/link-button";
import {reqGetScore} from "../../../api";
import ReactEcharts from "echarts-for-react"
/*

 */

export default class ScoreChart extends Component{
    state = {
      examName: "",
      // scores:[2, 2, 2, 4, 6, 4, 6, 4, 4, 4, 4, 6],
      // userNoteName:["测试学生3", "测试学生4", "13145202", "汪京龙1", "测试学生1", "测试学生2", "测试试卷测试1", "测试试卷测试2", "测试考试测试3", "测试试卷测试4", "测试考试测试5", "测试试卷测试6"],
      scores:[],
      userNoteName:[],
    };

    getScore = async () => {
        const {exam} = this.props.location.state;
        let {scores, userNoteName} = this.state;
        const {testPaperId, activityName} = exam;
        this.setState({
            examName: activityName
        },() => {});
        const request = await reqGetScore(testPaperId);
        if (request.code === 200) {
            const score = request.data;
            console.log(request.data);
            score.map(item => {
                userNoteName.push(item.userNoteName);
                scores.push(item.finalScore);
            });
            this.setState({
                userNoteName,
                scores
            })
        }
        console.log(this.state.userNoteName);
        console.log(this.state.scores)
    };

    componentDidMount(): void {
        this.getScore();
    }

    getOption = (scores) => {
        return {
            title: {
                text: `考试成绩线型图`
            },
            tooltip: {
            },
            legend: {
                data:['成绩']
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                boundaryGap: false,
                data: this.state.userNoteName
            },
            yAxis: {
            },
            series: [{
                name: '成绩',
                type: 'line',
                stack: '分',
                data: scores,
            }],
           /* axisLabel: {
                interval: 0,
                formatter:function(value)
                {
                    return value.split("").join("\n");
                }
            }*/
            axisLabel: {
                interval: 0,
                formatter:function(value)
                {
                    debugger
                    var ret = "";//拼接加\n返回的类目项
                    var maxLength = 3;//每项显示文字个数
                    var valLength = value.length;//X轴类目项的文字个数
                    var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
                    if (rowN > 1)//如果类目项的文字大于3,
                    {
                        for (var i = 0; i < rowN; i++) {
                            var temp = "";//每次截取的字符串
                            var start = i * maxLength;//开始截取的位置
                            var end = start + maxLength;//结束截取的位置
                            //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                            temp = value.substring(start, end) + "\n";
                            ret += temp; //凭借最终的字符串
                        }
                        return ret;
                    }
                    else {
                        return value;
                    }
                }
            }
        }
    };

    getOption2 = (scores) => {
        return {
            title: {
                text: `考试成绩柱形图`
            },
            tooltip:{
                trigger: 'axis'
            },
            legend: {
                data:['成绩']
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },

            xAxis: {
                data: this.state.userNoteName
            },
            yAxis: {
            },
            series: [{
                name: '成绩',
                type: 'bar',
                stack: '分',
                barWidth: '50%',
                data: scores,
                color: "#1890FF"
            }],
            axisLabel: {
                interval: 0,
                formatter:function(value)
                {
                    debugger
                    var ret = "";//拼接加\n返回的类目项
                    var maxLength = 3;//每项显示文字个数
                    var valLength = value.length;//X轴类目项的文字个数
                    var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
                    if (rowN > 1)//如果类目项的文字大于3,
                    {
                        for (var i = 0; i < rowN; i++) {
                            var temp = "";//每次截取的字符串
                            var start = i * maxLength;//开始截取的位置
                            var end = start + maxLength;//结束截取的位置
                            //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                            temp = value.substring(start, end) + "\n";
                            ret += temp; //凭借最终的字符串
                        }
                        return ret;
                    }
                    else {
                        return value;
                    }
                }
            }
        }
    };


    render() {
        const {examName, scores} = this.state;
        const title = (
            <span>
                <span>
                    <LinkButton onClick={() =>
                        this.props.history.goBack()}>考试</LinkButton>
                        <Icon type="arrow-right" style={{marginRight: 5}}/>
                    <span>{examName}</span>
                </span>
            </span>
        );
        const extra = (
            <span>

            </span>
        )
        return(
            <Card title={title}>
                <ReactEcharts option={this.getOption(scores)} />
                <ReactEcharts option={this.getOption2(scores)} />
            </Card>
        )
    }

}