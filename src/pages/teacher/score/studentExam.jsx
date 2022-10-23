import React,{Component} from "react";
import LinkButton from "../../../component/link-button";
import {Icon, Card, List, Tag, BackTop} from "antd";
/*

 */

export default class StudentExam extends Component{
    state = {
        studentName:"",
        testPaperSubjectVoList:[],
        completeTestPaperScore: "",
    };
    getExam = () => {
      const {completeTestPaperUserNoteName,
          completeTestPaperScore,
          testPaperSubjectVoList}  = this.props.location.state;
      this.setState({
          studentName: completeTestPaperUserNoteName,
          completeTestPaperScore,
          testPaperSubjectVoList
      })
    };

    componentDidMount(): void {
        this.getExam();
    }

    render() {
        const {studentName, testPaperSubjectVoList} = this.state;
        const title = (
            <span>
                <LinkButton onClick={() =>
                    this.props.history.goBack()}>返回考生试卷详情</LinkButton>
                    <Icon type="arrow-right" style={{marginRight: 5}}/>
                <span>{studentName}</span>
                <span></span>
            </span>
        );
        return(
            <Card title={title}>
                <BackTop>
                    <div className="ant-back-top-inner">UP</div>
                </BackTop>
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
                        })}<br/>
                        你的答案：{item.userAnswerList.map((data, index) => {
                            let color ='';
                            let result = "";
                            if (data.rightOrNot) {
                                color = "blue";
                                result = "√";
                            }else {
                                color = "red";
                                result = "×";
                            }
                            return (
                                <Tag color={color}>
                                    {result}
                                </Tag>
                            );
                        })}
                        </span>
                                </div>
                            </List.Item>
                        )
                    }}
                />

            </Card>

        )
    }

}