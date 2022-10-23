import React, {Component} from "react";
import {formateDate1} from "../../../utils/dateUtils";
import {Button, Card, message, Table, Icon} from "antd";
import memoryUtils from "../../../utils/memoryUtils";
import {reqGetScore, reqLookCompleteExam} from "../../../api";
import LinkButton from "../../../component/link-button";

/*

 */

export default class MyScore extends Component {
    state = {
        scores: [],
        loading: false,
        exams: [],
        examName: "",
    };

    initColumn = () => {
        this.columns = [
            {
                title: '考试ID',
                dataIndex: 'id', //显示数据对应的属性名
            },
            {
                title: '考试名称',
                dataIndex: 'activityName', //显示数据对应的属性名
            },
            {
                title: '开始时间',
                dataIndex: 'startTime', //显示数据对应的属性名
                render: (startTime) => (
                    <span>
                        {formateDate1(startTime)}
                    </span>
                )
            },
            {
                title: '结束时间',
                dataIndex: 'endTime', //显示数据对应的属性名
                render: (endTime) => (
                    <span>
                        {formateDate1(endTime)}
                    </span>
                )
            },
            {
                title: '操作',
                width: 300,
                render: (exam) => (
                    <span>
                        <Button onClick={() => {
                            this.showScore(exam)
                        }} type="primary" style={{marginRight: 10}}>查看成绩</Button>
                    </span>
                )
            },
        ];

        this.columns1 = [
            {
                title: '考试备注名',
                dataIndex: 'userNoteName', //显示数据对应的属性名
            },
            {
                title: '考试分数',
                dataIndex: 'finalScore', //显示数据对应的属性名
            },
        ];

    };

    getExams = async () => {
        this.setState({loading: true});
        const request = await reqLookCompleteExam();
        if (request.code === 200) {
            const exams = request.data;
            this.setState({
                exams,
                loading: false
            })
        } else {
            message.error("获取考试失败，正在反馈技术人员！");
        }
    };

    getScore = async (testPaperId) => {
        this.setState({loading: true})
        const request = await reqGetScore(testPaperId, memoryUtils.student.userId);
        if (request.code === 200) {
            const scores = request.data;
            this.setState({
                scores,
                loading: false
            })
        } else {
            message.error("获取分数失败，正在反馈技术人员！");
        }
    };

    componentDidMount() {
        this.getExams()
    }

    componentWillMount(): void {
        this.initColumn();
    }

    showScore = (exam) => {
        this.setState({
            examName: exam.activityName
        }, () => {
            this.getScore(exam.testPaperId)
        })
    };

    showExams = () => {
        //更新为显示一级列表的状态
        this.setState({
            examName: '',
            scores: []
        })
    };

    render() {
        const {loading, scores, examName, exams} = this.state;
        const title = examName === "" ? '我的考试' : (
            <span>
                <LinkButton onClick={this.showExams}>我的考试</LinkButton>
                <Icon type="arrow-left" style={{marginRight: 5}}/>
                <span>{examName}</span>
            </span>
        );
        return (
            <Card title={title}>
                <Table
                    loading={loading}
                    bordered={true}
                    rowKey='id'
                    //loading={true}
                    dataSource={examName === "" ? exams : scores}
                    columns={examName === "" ? this.columns : this.columns1}
                    pagination={{defaultPageSize: 5, showQuickJumper: true, pageSizeOptions: [5, 10, 15, 20]}}
                />
            </Card>
        )
    }
}