import React,{Component} from "react";
import {Button, Card, Icon, List, message, Tag} from "antd";
import LinkButton from "../../../component/link-button";
import {reqLookDescTest} from "../../../api";
import memoryUtils from "../../../utils/memoryUtils";
import {formateDate1} from "../../../utils/dateUtils";
import './lookdescexam.less'
export default class LookDescExam extends Component{
    state = {
        id: this.props.location.state,
        data:[],
        test:{},
        testPaperSubjectVoList:[],
    };

    getDescTest = async () => {
        const request = await reqLookDescTest(memoryUtils.user.userId, this.state.id);
        if (request.code === 200) {
            message.success(request.msg);
            const data1 = request.data;
            const [test1] = data1;
            const {testPaperSubjectVoList} = test1;
            console.log(test1);
            console.log(testPaperSubjectVoList);
            this.setState({
                data : data1,
                test : test1,
                testPaperSubjectVoList,
            });
            // console.log(request.data);
        } else {
            message.error("查询失败")
        }
    };

    componentDidMount() {
        this.getDescTest();
    }
    render() {
        const {id, test, testPaperSubjectVoList} = this.state;
        const title = (
            <div>
                <span>📅&nbsp;{formateDate1(test.testPaperCreateDate)}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span>⏰&nbsp;总分值 &nbsp;{test.testPaperTotalScore}</span>
            </div>
        );
        const extra = (
            <span>
                <span>
                    <span>{id}</span>
                    <Icon type="arrow-right" style={{marginLeft: 5}}/>
                    <LinkButton onClick={() =>
                        this.props.history.goBack()}>返回
                    </LinkButton>
                </span>
            </span>

        );
        return(
            <Card title={title} extra={extra}>
                <List
                    itemLayout="vertical"
                    dataSource={testPaperSubjectVoList}
                    renderItem={(item, index) => (
                        <List.Item>
                            <div className="test_title">
                                <span>{index + 1 + '、'}</span>
                                {item.question + " " +`(${item.subjectScore}分)`}
                            </div><br/>
                            <div className="test_option">
                                <ul>
                                    {
                                        item.optionVoList.map((data, index) => {
                                            return(
                                                <li type="A">{data.content}</li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>

                            <div className="test_answer">
                                <span>
                                    正确答案：{item.answerList.map((data, index) => {
                                    return(
                                        <Tag color='green'>{data}</Tag>
                                    )
                                })}
                                </span>
                            </div>
                        </List.Item>
                    )}
                />
                {/* <List
                    dataSource={testPaperSubjectVoList}
                    renderItem={item => (
                        <List.item>
                            <div className="test_title">{item.question + " " +item.subjectScore + '分'}</div>
                            <ul>
                                {
                                    item.optionVoList.map((data, index) => {
                                        return(
                                            <li datatype="A">{data.content}</li>
                                        )
                                    })
                                }
                            </ul>
                            <div>
                                <span>
                                    正确答案：{item.answerList.map((data, index) => {
                                        return(
                                            <Tag color='green'>{data}</Tag>
                                        )
                                })}
                                </span>
                            </div>
                        </List.item>

                    )}
                />*/}

            </Card>

        )
    }

}