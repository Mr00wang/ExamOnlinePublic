import React,{Component} from "react";
import {Icon, Tabs, Card, List, message, Modal, Button} from 'antd';
import {formateDate} from "../../../utils/dateUtils";
import {reqLookCompleteExam} from "../../../api";
const {TabPane} = Tabs;
const { confirm } = Modal;
/*

 */


export default class MyExam extends Component{
    state = {
        loading : false,
        exams : [],
        visible: false,

    };

    getExams = async () => {
        this.setState({loading:true});
        const request = await reqLookCompleteExam();
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
    ConfirmJoinExam = (examId, name) => {

        confirm({
            title: '确定参加考试',
            content: (
                <div>
                    <div>1、请自觉遵守考试纪律</div>
                    <div>2、在考试期间请不要随意切换页面</div>
                    <div>3、请在规定时间内完成试卷</div>
                </div>
            ),
            okText: '确定',
            okType: 'primary',
            cancelText: '取消',
            onOk: () => {this.props.history.push(`/exam/${examId}`, {examId, name})},
            onCancel: () => {}
        })
    };

    render() {
        const {loading, exams} = this.state;
        // const exam = this.exam || {};
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
                                            <Button type="primary" onClick={() => {this.ConfirmJoinExam(item.id, item.activityName)}}>开始考试</Button>
                                            // <Icon type="eye" key="eye" theme="twoTone" twoToneColor="#eb2f96" onClick={() => {this.lookdescTest(item.testPaperId)}}/>,
                                            // <Icon type="edit" key="edit" theme="twoTone" twoToneColor="#eb2f96" onClick={() => {this.showModal(item)}}/>,
                                            // <Icon type="ellipsis" key="ellipsis" />,
                                        ]}
                                    >
                                        <span>
                                            <Icon type="calendar" theme="twoTone"/>
                                            <span>
                                                开始时间：{formateDate(item.startTime)}
                                            </span>
                                        </span><br/>
                                        <span>
                                            <Icon type="calendar" theme="twoTone"/>
                                            <span>
                                                截至时间：{formateDate(item.endTime)}
                                            </span>
                                        </span>
                                    </Card>
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
