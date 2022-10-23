import React,{Component} from "react";
import {Card, Icon, List, message, Tag, BackTop} from "antd";
import LinkButton from "../../../component/link-button";
import {reqLookDescTest} from "../../../api";
import memoryUtils from "../../../utils/memoryUtils";
import {formateDate1} from "../../../utils/dateUtils";
import './lookdescpractice.less'
/*

 */
/*
 {
            "testPaperId": 4,
            "createTestPaperUserId": 13,
            "createCompleteTestPaperUserId": null,
            "completeTestPaperId": null,
            "testPaperTotalScore": 20.0,
            "completeTestPaperScore": null,
            "testPaperCreateDate": 1588809600000,
            "completeTestPaperCreateDate": null,
            "completeTestPaperStatus": null,
            "completeTestPaperUserNoteName": null,
            "testPaperSubjectVoList": [
                {
                    "testPaperSubjectId": 5,
                    "completeTestPaperSubjectId": null,
                    "subjectId": 5,
                    "subjectScore": 10.0,
                    "question": "抽象行政行为又称为行政立法行为",
                    "type": 0,
                    "optionVoList": [
                        {
                            "content": "正确",
                            "option": "A"
                        },
                        {
                            "content": "错误",
                            "option": "B"
                        }
                    ],
                    "answerList": [
                        "B"
                    ],
                    "userAnswerList": null,
                    "rightOrNot": null
                },
                {
                    "testPaperSubjectId": 7,
                    "completeTestPaperSubjectId": null,
                    "subjectId": 7,
                    "subjectScore": 10.0,
                    "question": "二审程序中,上诉人撤回上诉后,二审程序终结",
                    "type": 0,
                    "optionVoList": [
                        {
                            "content": "正确",
                            "option": "A"
                        },
                        {
                            "content": "错误",
                            "option": "B"
                        }
                    ],
                    "answerList": [
                        "B"
                    ],
                    "userAnswerList": null,
                    "rightOrNot": null
                }
            ]
        }
 */
export default class LookDescPractice extends Component{
    state = {
        id: this.props.location.state,
        data:[],
        test:{},
        testPaperSubjectVoList:[],
        name:""
    };

    getDescTest = async () => {
        const request = await reqLookDescTest(memoryUtils.user.userId, this.state.id);
        if (request.code === 200) {
            message.success(request.msg);
            const data1 = request.data;
            const [test1] = data1;
            const {testPaperSubjectVoList, name} = test1;
            this.setState({
                name,
                data : data1,
                test : test1,
                testPaperSubjectVoList,
            });
        } else {
            message.error("查询失败")
        }
    };

    componentDidMount() {
        this.getDescTest();
    }
    render() {
        const {test, testPaperSubjectVoList,name} = this.state;
        const title = (
          <div>
              <span>📅&nbsp;{formateDate1(test.testPaperCreateDate)}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span>⏰&nbsp;总分值 &nbsp;{test.testPaperTotalScore}</span>
          </div>
        );
        const extra = (
            <span>
                <span>
                    <span>{name}</span>
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
                    renderItem={(item, index) => {
                        let type = "";
                        if (item.type === 0) {
                            type = '单选题';
                        } else if (item.type === 1) {
                            type = '填空题'
                        } else if (item.type === 2) {
                            type = '简答题';
                        } else if (item.type === 3) {
                            type = '多选题';
                        } else if (item.type === 4) {
                            type = '判断题'
                        }
                        return (
                        <List.Item>
                        <div className="test_title">
                        <span>{index + 1 + '、'}</span>
                        {`(${type})`+item.question + " " +`(${item.subjectScore}分)`}
                        </div><br/>
                        <div className="test_option">
                        {
                            item.type !== 1 ? (
                                <ul>
                                    {
                                        item.optionVoList.map((data, index) => {
                                            return(
                                                <li type="A">{data.content}</li>
                                            )
                                        })
                                    }
                                </ul>
                            ):null
                        }
                        </div>
                        <div className="test_answer">
                        <span>
                        标准答案：{item.answerVoList.map((data, index) => {
                            let color ='green';
                            let answerCode = "";
                            /* if (item.answer === 'loser') {
                                 color = 'volcano';
                             }*/
                            if (item.type !== 1) {
                                answerCode = String.fromCharCode(64 + parseInt(data.answer));
                            } else {
                                answerCode = data.answer;
                            }
                            return (
                                <Tag color={color} key={data.answer}>
                                    {answerCode}
                                </Tag>
                            );
                        })}
                        </span>
                            <BackTop/>
                        </div>
                        </List.Item>

                        )
                    }}
                />
            </Card>

        )
    }

}