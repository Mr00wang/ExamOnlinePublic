import React,{Component} from "react";
import {Icon, Tabs, Card, List, message, Modal} from 'antd';
import {formateDate} from "../../../utils/dateUtils";
import {reqLookExams, reqUpdateExam} from "../../../api";
import memoryUtils from "../../../utils/memoryUtils";
import UpdateExam from "./updateExam";
const {TabPane} = Tabs;
/*

 */


export default class LookExamHome extends Component{
    /*
     [
        {
            "id": 9,
            "testPaperId": null,
            "createUserId": 13,
            "activityName": "龙龙的考试",
            "createDate": 1589241600000,
            "isPrivate": false,
            "status": null,
            "privateCode": null,
            "examAccessGroupList": null
        },
     */
    state = {
        loading : false,
        exams : [],
        exam : {},
        visible: false,

    };

    getExams = async () => {
        let exam = this.state.exam;
        exam['createUserId'] = memoryUtils.user.userId;
        console.log(exam);
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

    componentDidMount() {
        this.getExams();
    }

    //查看详细信息
    lookdescTest = async (testPaperId) => {
        this.props.history.push('/teacher/exam_manage/look/desc',testPaperId);
        message.success(testPaperId);
    };

    showModal = (exam) => {
        this.exam = exam;
        console.log(exam);
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        this.form.validateFields  ( async (err, fieldsValue) => {
            if (!err) {
                this.setState({
                    visible: false,
                });
                const rangeTimeValue = fieldsValue['examCalendar'];
                const values = {
                    ...fieldsValue,
                    'examCalendar': [
                        Date.parse(rangeTimeValue[0].format('YYYY-MM-DD HH:mm:ss')),
                        Date.parse(rangeTimeValue[1].format('YYYY-MM-DD HH:mm:ss'))
                        // rangeTimeValue[1].format('YYYY-MM-DD HH:mm:ss'),
                    ],
                    'examTime': parseInt(fieldsValue['examTime'].format('HH')) * 60 + parseInt(fieldsValue['examTime'].format('mm')),
                };
                console.log('Received values of form: ', values);
                const {id, testPaperId, activityName, isPrivate, examAccessGroupList, examCalendar,  examTime} = values;
                this.form.resetFields();
                const request = await reqUpdateExam(id, testPaperId, activityName, isPrivate, examAccessGroupList, examCalendar[0], examCalendar[1], examTime);
                if (request.code === 200) {
                    message.success("修改成功！")
                }else
                    message.error(request.msg);
            }
        });

    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render() {
        const {loading, exams} = this.state;
        const exam = this.exam || {};
        return(
            <Card
                style={{ width: '100%' }}
            >
                <Tabs
                    defaultActiveKey="1"

                >
                    <TabPane
                        tab={
                            <span>
                                <Icon type="check-circle" />
                              全部
                            </span>
                        }
                        key="1"
                    >
                        <List
                            grid={{ gutter: 16, column: 4 }}
                            dataSource={exams}
                            // pagination={{defaultPageSize: 12,showQuickJumper: true}}
                            loading={loading}
                            renderItem={item => (
                                <List.Item>
                                    <Card
                                        title={item.activityName}
                                        hoverable
                                        style={{fontSize: 16}}
                                        actions={[
                                            <Icon type="eye" key="eye" theme="twoTone" twoToneColor="#eb2f96" onClick={() => {this.lookdescTest(item.testPaperId)}}/>,
                                            <Icon type="edit" key="edit" theme="twoTone" twoToneColor="#eb2f96" onClick={() => {this.showModal(item)}}/>,
                                            // <Icon type="ellipsis" key="ellipsis" />,
                                        ]}
                                    >
                                        <span>
                                            <Icon type="calendar" theme="twoTone"/>&nbsp;
                                            <span>
                                                开始时间：{formateDate(item.startTime)}
                                            </span>
                                        </span><br/>
                                        <span>
                                            <Icon type="calendar" theme="twoTone"/>&nbsp;
                                            <span>
                                                截至时间：{formateDate(item.endTime)}
                                            </span>
                                        </span>
                                    </Card>
                                    <Modal
                                        title="设置考试信息"
                                        visible={this.state.visible}
                                        onOk={this.handleOk}
                                        onCancel={this.handleCancel}
                                        width="800px"
                                        // maskClosable={false}
                                        // style={{ top: 10 }}
                                        destroyOnClose={true}
                                    >
                                        <UpdateExam
                                            exam={exam}
                                            setForm={(form) => {this.form = form}}
                                        />
                                    </Modal>
                                </List.Item>
                            )}
                        />
                    </TabPane>
                    <TabPane
                        tab={
                            <span>
                              <Icon type="info-circle" />
                              已开始
                            </span>
                        }
                        key="2"
                    >
                        已开始
                    </TabPane>
                    <TabPane
                        tab={
                            <span>
                              <Icon type="clock-circle" />
                              未开始
                            </span>
                        }
                        key="3"
                    >
                        未开始
                    </TabPane>
                    <TabPane
                        tab={
                            <span>
                              <Icon type="close-circle" />
                              已结束
                            </span>
                        }
                        key="4"
                    >
                        已结束
                    </TabPane>

                </Tabs>
            </Card>

        )
    }

}