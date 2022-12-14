import React,{Component} from "react";
import {Button, Card, message, Table} from "antd";
import memoryUtils from "../../../utils/memoryUtils";
import {reqLookExams} from "../../../api";
import {formateDate1} from "../../../utils/dateUtils";

/*

 */

export default class LookScoreHome extends Component{
    state = {
        exams:[],
        exam : {},
        loading:false
    };

    initColumn = () => {
        this.columns = [
            {
                title: 'ID',
                dataIndex: 'id', //显示数据对应的属性名
            },
            {
                title: '考试名称',
                dataIndex: 'activityName', //显示数据对应的属性名
            },
           /* {
                title: '总分',
                dataIndex: 'testPaperTotalScore', //显示数据对应的属性名
            },*/
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
                width: 260,
                render: (exam) => (
                    <span>
                        <Button onClick={() => {this.lookScore(exam)}} type="primary" style={{marginRight: 10 }} >查看成绩</Button>
                        <Button onClick={() => this.props.history.push("/teacher/score_manage/look/chart", {exam})}  style={{backgroundColor:'orange',color:'white', marginRight: 10}} >可视化成绩</Button>
                    </span>
                )
            },
        ];

    };

    getExams = async () => {
        let exam = this.state.exam;
        exam['createUserId'] = memoryUtils.user.userId;
        this.setState({loading:true});
        const request = await reqLookExams(exam);
        if (request.code === 200) {
            const exams = request.data;
            this.setState({
                exams,
                loading:false
            })
        }else {
            message.error(request.msg);
        }
    };

    lookScore = (exam) => {
        const {testPaperId, activityName} = exam;
        const test = {testPaperId, activityName};
        this.props.history.push('/teacher/score_manage/look/complete_desc',(test));
    };

    componentDidMount() {
        this.getExams();
    }

    componentWillMount(): void {
        this.initColumn();
    }

    render() {
        const {exams, loading} = this.state
        return(
            <Card>
                <Table
                    loading={loading}
                    rowKey="id"
                    bordered={true}
                    columns={this.columns}
                    dataSource={exams}
                    pagination={{defaultPageSize: 6,showQuickJumper: true}}
                />
            </Card>
        )
    }

}