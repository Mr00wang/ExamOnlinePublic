import React,{Component} from "react";
import {reqGetCompleteExam, reqUpdateCompleteExam} from "../../../api";
import {formateDate1} from "../../../utils/dateUtils";
import {Button, Card, Icon, message, Modal, Table} from "antd";
import LinkButton from "../../../component/link-button";
import UpdateForm from "./updateform";

/*

 */

export default class LookCompleteDescExam extends Component{

    state = {
        data: [],
        loading: false,
        visible: false
    };

    initcolumn = () => {
        this.columns = [
            {
                title: '考生备注名',
                dataIndex: 'completeTestPaperUserNoteName', //显示数据对应的属性名
            },
            {
                title: '完成分数',
                dataIndex: 'completeTestPaperScore', //显示数据对应的属性名
            },
            {
                title: '完成时间',
                dataIndex: 'completeTestPaperCreateDate', //显示数据对应的属性名
                render: (completeTestPaperCreateDate) => (
                    <span>
                        {formateDate1(completeTestPaperCreateDate)}
                    </span>
                )
            },

            {
                title: '操作',
                width: 280,
                render: (Exam) => (
                    <span>
                        <Button type="primary" style={{marginRight: 10 }} onClick={() => {this.props.history.push('/teacher/score_manage/look/student_exam',(Exam))}}>查看试卷详情</Button>
                        <Button  style={{backgroundColor:'orange',color:'white', marginRight: 10}}onClick={() => this.showUpdate(Exam)} >修改成绩</Button>
                    </span>
                )
            },
        ]
    };

    getCompletDescExam = async () => {
        const {testPaperId} = this.props.location.state;
        this.setState({loading:true});
        const request = await reqGetCompleteExam(testPaperId);
        if (request.code === 200) {
            const data = request.data;
            this.setState({
                data,
                loading:false
            })
        }
    };

    /**
     *显示修改的确认框
     */
    showUpdate = (exam) => {
        // 保存分类对象
        this.exam = exam;
        // 更新状态
        this.setState({
            visible: true
        })
    };

    /**
     * 响应点击取消: 隐藏确定框
     */
    handleCancel = () => {
        // 清除输入数据
        this.form.resetFields();
        // 隐藏确认框
        this.setState({
            visible: false
        })
    };

    /*
   修改人员请求
    */
    updateScore= () => {

        this.form.validateFields(async (err,values) => {
            if(!err) {
                //1,隐藏确定框
                this.setState({
                    visible: false
                });
                //准备数据
                const {userNoteName, finalScore} = values;
                const {completeTestPaperId} = this.exam
                //清除
                this.form.resetFields();
                const result = await reqUpdateCompleteExam(completeTestPaperId, userNoteName,finalScore);
                if(result.code === 200){
                    message.success("修改成功");
                    this.getCompletDescExam();
                }else{
                    message.error("修改失败");
                }
            }
        })
    };

    componentDidMount(): void {
        this.getCompletDescExam();
    }

    componentWillMount(): void {
        this.initcolumn();
    }

    render() {
        const {data, loading, visible} = this.state;
        const {activityName} = this.props.location.state;
        //读取指定的分类
        const exam = this.exam || {};
        const title = (
            <span>
                <LinkButton onClick={() =>
                    this.props.history.goBack()}>查看考试</LinkButton>
                    <Icon type="arrow-right" style={{marginRight: 5}}/>
                <span>{activityName}</span>
            </span>
        );
        return(
            <Card title={title} >
                <Table
                    bordered={true}
                    rowKey='createCompleteTestPaperUserId'
                    loading={loading}
                    dataSource={data}
                    columns={this.columns}
                    pagination={{defaultPageSize: 5,showQuickJumper: true, pageSizeOptions : [5,10,15,20]}}
                />
                <Modal
                    title="修改成绩"
                    visible={visible}
                    onOk={this.updateScore}
                    onCancel={this.handleCancel}
                >
                    <UpdateForm
                        userNoteName={exam.completeTestPaperUserNoteName}
                        finalScore={exam.completeTestPaperScore}
                        setForm={(form) => {this.form = form}}
                    />
                </Modal>
            </Card>
        )
    }
}