import React,{Component} from "react";
import {Button, Layout, List, Tag, Divider, Radio, Checkbox, message, Modal} from 'antd'
import LinkButton from "../../component/link-button";
import './index.less'
import {reqCommitExam, reqEnterExam} from "../../api";
import memoryUtils from "../../utils/memoryUtils";
import CommitExam from "./commitExam";
import {formateDate} from "../../utils/dateUtils";
// import storageUtils from "../../utils/storageUtils";
const { Footer, Sider, Content, Header } = Layout;
const {confirm} = Modal;
/*

 */

export default class Exam extends Component{

    state = {
        testPaperSubjectVoList: [],
        optionTitle: [],
        optionsTitle: [],
        judgeTitle: [],
        fillTitle:[],
        titleType: 0,   //0单选，1填空， 2简答， 3多选， 4判断
        index: 1, //全局题目序号
        AllIndex: 1, //全局下标
        titleContent: "",
        titleCount : 0,
        optionTitleCount: 0,
        optionsTitleCount: 0,
        judgeTitleCount: 0,
        fillTitleCount: 0,
        clickShow: 1,  //点击显示
        testPaperTotalScore: 20,
        testPaperId: 0,
        examId: 0,
        examName: '',
        endTime: "2020-6-30 15:39:22",
        subjectScore:'2',
        subjectList:[], //试卷总答案
        radio:[], //单选题答案
        radios:[], //多选题答案
        judge:[], //判断题答案
        CommitVisible: false,
        minutes: '',
        seconds: 0
    };

    getTitle = async () => {
        const examId = this.props.location.state.examId;
        const request =  await reqEnterExam(examId);
        if (request.code === 200) {
            const {testPaper, examEndTime, examDuration} = request.data
            const {testPaperSubjectVoList, testPaperTotalScore, testPaperId} = testPaper;
            this.setState({
                testPaperSubjectVoList,
                testPaperTotalScore,
                examName: this.props.location.state.name,
                examId,
                endTime: examEndTime,
                minutes: examDuration,
                // minutes: 16,
                testPaperId
            }, () => {this.getTime()})
        }

      const  optionTitle =  this.state.testPaperSubjectVoList.filter(item => item.type === 0);
      const  optionsTitle =  this.state.testPaperSubjectVoList.filter(item => item.type === 3);
      const  judgeTitle =  this.state.testPaperSubjectVoList.filter(item => item.type === 4);
      const  fillTitle =  this.state.testPaperSubjectVoList.filter(item => item.type === 1);
      let index = 1;
        let index1 = 0;
        let index2 = 0;
        let index3 = 0;
        let index4 = 0;
      optionTitle.map(item => {
          item['index'] = index1;
          index1++;
          item['AllIndex'] = index;
          item['bg'] = "";
          index++;
      });
      optionsTitle.map(item => {
          item['index'] = index2;
          index2++;
          item['AllIndex'] = index;
          item['bg'] = "";
          index++;
        });
        judgeTitle.map(item => {
            item['index'] = index3;
            index3++;
            item['AllIndex'] = index;
            item['bg'] = "";
            index++;
        });

      this.setState({
          optionTitle,
          optionsTitle,
          judgeTitle,
          titleContent: optionTitle[0].question,
          titleCount: this.state.testPaperSubjectVoList.length,
          optionTitleCount: optionTitle.length,
          optionsTitleCount: optionsTitle.length,
          judgeTitleCount: judgeTitle.length,
      });
        // console.clear();
        console.log(optionTitle);
        console.log(optionsTitle);
        console.log(judgeTitle);

    };

    componentDidMount() {
        this.getTitle();
    }

    componentWillUnmount(): void {
        clearInterval(this.timer);
    }

    selectTitle = (index, titleType, AllIndex) => {
        if (titleType === 0) {
            this.setState({
                clickShow: AllIndex,
                AllIndex,
                titleType,
                index : index + 1,
                titleContent: this.state.optionTitle[index].question,
                subjectScore: this.state.optionTitle[index].subjectScore,
            })
        }else if (titleType === 3) {
            this.setState({
                clickShow: AllIndex,
                AllIndex,
                titleType,
                index : index + 1,
                titleContent: this.state.optionsTitle[index].question,
                subjectScore: this.state.optionsTitle[index].subjectScore,
            })
        }else if (titleType === 4) {
            this.setState({
                clickShow: AllIndex,
                AllIndex,
                titleType,
                index : index + 1,
                titleContent: this.state.judgeTitle[index].question,
                subjectScore: this.state.judgeTitle[index].subjectScore,
            })
        }

    };

    previousTitle = () => {
        const {AllIndex, index, titleType, optionTitleCount, optionsTitleCount} = this.state;
        if (AllIndex !== 1) {
            if(titleType === 0) {
                this.setState({
                    AllIndex: AllIndex-1,
                    clickShow: AllIndex-1,
                    index: index-1,
                    titleContent: this.state.optionTitle[index-1].question,
                    subjectScore: this.state.optionTitle[index-1].subjectScore,
                }, () => {})
            } else if (titleType === 3) {
                if (index === 1) {
                    this.setState({
                        AllIndex: AllIndex - 1,
                        clickShow: AllIndex-1,
                        index: optionTitleCount,
                        titleType: optionTitleCount === 0 ? null : 0,
                        titleContent: this.state.optionsTitle[index-1].question,
                        subjectScore: this.state.optionsTitle[index-1].subjectScore,
                    }, () => {

                    })
                } else {
                    this.setState({
                        AllIndex: AllIndex - 1,
                        clickShow: AllIndex-1,
                        index: index - 1,
                        titleContent: this.state.optionsTitle[index-1].question,
                        subjectScore: this.state.optionsTitle[index-1].subjectScore,
                    }, () => {

                    })
                }
            }else if (titleType === 4) {
                if (index === 1) {
                    this.setState({
                        AllIndex: AllIndex - 1,
                        clickShow: AllIndex-1,
                        index: optionsTitleCount === 0 ? optionTitleCount : optionsTitleCount,
                        titleType: optionsTitleCount === 0 ? null : 3,
                        titleContent: this.state.judgeTitle[index-1].question,
                        subjectScore: this.state.judgeTitle[index-1].subjectScore,
                    }, () => {

                    })
                } else {
                    this.setState({
                        AllIndex: AllIndex - 1,
                        clickShow: AllIndex-1,
                        index: index - 1,
                        titleContent: this.state.judgeTitle[index-1].question,
                        subjectScore: this.state.judgeTitle[index-1].subjectScore,
                    }, () => {

                    })
                }
            }
        }else {
            message.success("已到达第一题")
        }
    };

    nextTitle = () => {
        const {AllIndex, titleCount, index, titleType, optionTitleCount, optionsTitleCount, judgeTitleCount} = this.state;
        if (AllIndex !== titleCount) {
            if(titleType === 0) {
                if (index === optionTitleCount) {
                    this.setState({
                        AllIndex: AllIndex+1,
                        clickShow: AllIndex+1,
                        index: 1,
                        titleType: optionsTitleCount === 0 ? 2 : 3,
                        titleContent: this.state.optionsTitle[index+1].question,
                        subjectScore: this.state.optionsTitle[index+1].subjectScore,
                    }, () => {})
                }else {
                    this.setState({
                        AllIndex: AllIndex+1,
                        clickShow: AllIndex+1,
                        index: index+1,
                        titleContent: this.state.optionTitle[index+1].question,
                        subjectScore: this.state.optionTitle[index+1].subjectScore,
                    }, () => {})
                }
            } else if (titleType === 3) {
                if (index === optionsTitleCount) {
                    this.setState({
                        AllIndex: AllIndex + 1,
                        clickShow: AllIndex+1,
                        index: 1,
                        titleType: judgeTitleCount === 0 ? 2 : 4,
                        titleContent: this.state.optionsTitle[index+1].question,
                        subjectScore: this.state.optionsTitle[index+1].subjectScore,
                    }, () => {

                    })
                } else {
                    this.setState({
                        AllIndex: AllIndex + 1,
                        clickShow: AllIndex+1,
                        index: index + 1,
                        titleContent: this.state.optionsTitle[index+1].question,
                        subjectScore: this.state.optionsTitle[index+1].subjectScore,
                    }, () => {

                    })
                }
            } else if (titleType === 4) {
                this.setState({
                    AllIndex: AllIndex + 1,
                    clickShow: AllIndex+1,
                    index: index + 1,
                    titleContent: this.state.judgeTitle[index+1].question,
                    subjectScore: this.state.judgeTitle[index+1].subjectScore,
                }, () => {


                })
            }

        } else {
            message.success("已是最后一题")
        }
    };
    optionAnswerChange = (e) => {
        let {radio, optionTitle, AllIndex, subjectList} = this.state;
        let testPaperSubjectId;
        let flag = true;
        radio[this.state.index] = e.target.value;
        optionTitle[this.state.index-1].bg = '#2db7f5';
        optionTitle.filter(item => {
                if (item.AllIndex === AllIndex){
                    testPaperSubjectId = item.testPaperSubjectId
                }
            }
        );
        subjectList.filter(item => {
            if (item.testPaperSubjectId === testPaperSubjectId) {
                item.userAnswer = [e.target.value]
                flag = false
            }
        });
        if (flag) {
            subjectList.push({userAnswer: [e.target.value], testPaperSubjectId:testPaperSubjectId});
        }
        this.setState({
            radio,
            optionTitle,
            subjectList
        });
        // storageUtils.saveAnswer({radio: radio, radios: this.state.radios, judge: this.state.judge, subjectList: subjectList});
        console.log(this.state.subjectList)
    };
    optionsAnswerChange = (checkedValues) => {
        let {radios, optionsTitle, AllIndex, subjectList} = this.state;
        let testPaperSubjectId;
        let flag = true;
        radios[this.state.index] = checkedValues;
        optionsTitle[this.state.index-1].bg = '#2db7f5';
        optionsTitle.filter(item => {
                if (item.AllIndex === AllIndex){
                    testPaperSubjectId = item.testPaperSubjectId
                }
            }
        );
        subjectList.filter(item => {
            if (item.testPaperSubjectId === testPaperSubjectId) {
                item.userAnswer = checkedValues;
                flag = false
            }
        });
        if (flag) {
            subjectList.push({userAnswer: checkedValues, testPaperSubjectId:testPaperSubjectId});
        }
        this.setState({
            radios,
            optionsTitle,
        });
        // console.log(this.state.radios)
        console.log(this.state.subjectList)
        // storageUtils.saveAnswer({radio: this.state.radio, radios: radios, judge: this.state.judge, subjectList: subjectList});

    };
    judgeAnswerChange = (e) => {
        let {judge, judgeTitle, AllIndex, subjectList} = this.state;
        let testPaperSubjectId;
        let flag = true;
        judge[this.state.index] = e.target.value;
        judgeTitle[this.state.index-1].bg = '#2db7f5';
        judgeTitle.filter(item => {
                if (item.AllIndex === AllIndex){
                    testPaperSubjectId = item.testPaperSubjectId
                }
            }
        );
        subjectList.filter(item => {
            if (item.testPaperSubjectId === testPaperSubjectId) {
                item.userAnswer = [e.target.value]
                flag = false
            }
        });
        if (flag) {
            subjectList.push({userAnswer: [e.target.value], testPaperSubjectId:testPaperSubjectId});
        }
        this.setState({
            judge,
            judgeTitle,
            subjectList
        });
        // console.log(this.state.judge)
        console.log(this.state.subjectList)
        // storageUtils.saveAnswer({radio: this.state.radio, radios: this.state.radios, judge: judge, subjectList: subjectList});

    };

    showConfirm = () => {
        if (this.state.subjectList.length < this.state.titleCount) {
            confirm({
                title: '提示',
                content: '您还有试题没做答，确定提交交卷吗？',
                okText: "确定",
                cancelText: "继续作答",
                onOk: () => {this.showModal()},
                onCancel() {
                },
            });
        }else {
            this.setState({
                CommitVisible: true
            })
        }
    };
    showModal = () => {
        this.setState({
            CommitVisible: true
        })
    };
    //提交考试
    CommitExam =  () => {
        this.form.validateFields(async (err,values) => {
            if(!err) {
                // 隐藏确认框
                this.setState({
                    CommitVisible: false
                });
                //准备数据
                const {userNoteName} = values;
                const {testPaperId, examId, subjectList} = this.state;
                console.log(userNoteName);
                console.log(testPaperId);
                console.log(examId);
                console.log(subjectList);
                //清除
                this.form.resetFields();
                const request = await reqCommitExam(examId, subjectList, userNoteName, testPaperId);
                if (request.code === 200) {
                    message.success("提交成功");
                    this.props.history.push('/student/myExam');
                }else {
                    message.error(request.msg);
                }
                // storageUtils.removeAnswer();
            }
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
            CommitVisible: false
        })
    };

    TimeOut = () => {
      message.success("时间已到！");
      this.CommitExam();
    };

    getTime = () => {
        let {minutes, seconds} = this.state;
        this.timer = setInterval(() => {
            if (minutes > 0) {
                if (seconds === 0) {
                    minutes--;
                    seconds = 59;
                    this.setState({
                        minutes,
                        seconds
                    }, () => {})
                } else {
                    seconds--;
                    this.setState({
                        seconds
                    },() => {});
                }
                if (minutes === 14 && seconds === 59) {
                    message.success("还剩15分钟，请注意答题时间");
                }
            } else if (minutes === 0){
                this.TimeOut();
                clearInterval(this.timer);
            }
        },1000)
    };

    render() {
        const {optionTitle, optionsTitle,
            judgeTitle, fillTitle, titleType, index,
            titleContent, AllIndex, titleCount,
            clickShow,testPaperTotalScore, endTime,
            examName, subjectScore,
            radio, judge, radios, CommitVisible,
            minutes, seconds
        } = this.state;

        return(
            <Layout style={{minHeight:'100vh'}}>
                <Header style={{height:'16vh', background: '#1890ff'}} >
                    <div className="exam-header">
                        <div className="exam-header-top">
                            <div className="exam-header-top-left">
                                <span>{examName}</span>
                            </div>
                            <div className="exam-header-top-right">
                                <span>{`欢迎，${memoryUtils.student.username}`}</span>
                                <LinkButton onClick={this.layout} style={{color: 'orange'}}>
                                    <span>退出</span>
                                </LinkButton>
                            </div>
                        </div>

                        <div className="exam-header-bottom">
                            <div className="exam-header-bottom-left">
                                <span>{`题量：${titleCount}`}</span>
                                <span>{`满分：${testPaperTotalScore}`}</span>
                                <span>{`截止日期：${formateDate(endTime)}`}</span>
                            </div>
                            <div className="exam-header-bottom-right">
                                <span>{`剩余答题时间：${minutes}'${seconds < 10 ? "0" + seconds : seconds}'`}</span>
                            </div>
                        </div>
                    </div>
                </Header>
                <Layout style={{marginLeft:330}}>
                    <Sider
                        theme='light'
                        style={{
                            overflow: 'auto',
                            height: '76vh',
                            position: 'fixed',
                            left: 0,
                            marginLeft: 20,
                            marginTop: 20
                        }}
                        width={300}

                    >
                        {
                            optionTitle.length !==0 ? (
                                <div className="exam-item">
                                    <span>单选题</span>
                                    <List
                                        className='exam-List'
                                        grid={{column:5}}
                                        dataSource={optionTitle}
                                        renderItem={item => (
                                            <List.Item>
                                                <Tag color={clickShow === item.AllIndex ? '#87d068' : item.bg} >
                                                    <LinkButton onClick={() => {this.selectTitle(item.index, 0, item.AllIndex)}}>
                                                        <span style={{color : `${clickShow === item.AllIndex ? 'white' : "black"}`}}>{item.index+1}</span>
                                                    </LinkButton>
                                                </Tag>
                                            </List.Item>
                                        )}
                                    />
                                </div>
                            ):null
                        }
                        {
                            optionsTitle.length !== 0 ? (
                                <div className="exam-item">
                                    <span>多选题</span>
                                    <List
                                        className='exam-List'
                                        grid={{column:5}}
                                        dataSource={optionsTitle}
                                        renderItem={item => (
                                            <List.Item>
                                                <Tag color={clickShow === item.AllIndex ? '#87d068' : item.bg}>
                                                    <LinkButton onClick={() => {this.selectTitle(item.index, 3, item.AllIndex)}}>
                                                        <span style={{color : `${clickShow === item.AllIndex ? 'white' : "black"}`}}>{item.index+1}</span>
                                                    </LinkButton>
                                                </Tag>
                                            </List.Item>
                                        )}
                                    />
                                </div>
                            ):null
                        }
                        {
                            fillTitle.length !== 0 ? (
                                <div className="exam-item">
                                    <span>填空题</span>
                                    <List
                                        className='exam-List'
                                        grid={{column:5}}
                                        dataSource={fillTitle}
                                        renderItem={item => (
                                            <List.Item>
                                                <Tag color={clickShow === item.AllIndex ? '#87d068' : item.bg}>
                                                    <LinkButton onClick={() => {this.selectTitle(item.index, 2, item.AllIndex)}}>
                                                        <span style={{color : `${clickShow === item.AllIndex ? 'white' : "black"}`}}>{item.index+1}</span>
                                                    </LinkButton>
                                                </Tag>
                                            </List.Item>
                                        )}
                                    />
                                </div>
                            ):null
                        }
                        {
                            judgeTitle.length !== 0 ? (
                                <div className="exam-item">
                                    <span>判断题</span>
                                    <List
                                        className='exam-List'
                                        grid={{column:6}}
                                        dataSource={judgeTitle}
                                        renderItem={item => (
                                            <List.Item>
                                                <Tag color={clickShow === item.AllIndex ? '#87d068' : item.bg}>
                                                    <LinkButton onClick={() => {this.selectTitle(item.index, 4, item.AllIndex)}}>
                                                        <span style={{color : `${clickShow === item.AllIndex ? 'white' : "black"}`}}>{item.index+1}</span>
                                                    </LinkButton>
                                                </Tag>
                                            </List.Item>
                                        )}
                                    />
                                </div>
                            ):null
                        }
                    </Sider>
                    <Layout  style={{ padding: '20px 24px 24px'}}>
                        <Header style={{height:'16vh', background: '#fff'}}>
                            <div className="exam-title">
                                <span style={{color: "green", fontSize: "1.5em", paddingRight: 10}}>
                                    {index}
                                </span>
                                <span>
                                    {`${titleContent}(${subjectScore}分)`}
                                </span>
                            </div>
                        </Header>
                        {/*<Divider />*/}
                        <Content style={{ background: '#fff'}}>
                            <Divider />
                            {
                                titleType === 0 ? (
                                    <div className="exam-option">
                                        <Radio.Group
                                            size="large"
                                            onChange={this.optionAnswerChange}
                                            value={radio[index]}
                                            style={{width:'100%'}}
                                        >
                                            {
                                                optionTitle.length === 0 ? null : optionTitle[index-1].optionVoList.map((data, index) => {
                                                    return(
                                                        <div style={{paddingTop:12}}>
                                                            <Radio key={index} value={data.option}><Tag color="blue" style={{fontSize:18, height:28, paddingTop:3, marginLeft: 16}}>{data.option}</Tag></Radio>
                                                            <span>{data.content}</span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </Radio.Group>
                                    </div>
                                ):null
                            }
                            {
                                titleType === 3 ? (
                                        <div className="exam-option">
                                            <Checkbox.Group
                                                size="large"
                                                onChange={this.optionsAnswerChange}
                                                style={{width:'100%'}}
                                                value={radios[index]}
                                            >
                                                {
                                                    optionsTitle.length === 0 ? null : optionsTitle[index-1].optionVoList.map((data, index) => {
                                                        return(
                                                            <div style={{paddingTop:12}}>
                                                                <Checkbox key={index} value={data.option}><Tag color="blue" style={{fontSize:18, height:28, paddingTop:3, marginLeft: 16}}>{data.option}</Tag></Checkbox>
                                                                <span>{data.content}</span>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </Checkbox.Group>
                                        </div>
                                ) : null
                            }
                            {
                                titleType === 4 ? (
                                    <div className="exam-judge-option">
                                        <Radio.Group
                                            name="judge-title" s
                                            ize="large"
                                            onChange={this.judgeAnswerChange}
                                            value={judge[index]}
                                        >
                                            <Radio value="A"><Tag color="blue" style={{fontSize:18, width: 25, height:28, paddingTop:3, marginLeft: 16}}>A</Tag></Radio>
                                            <span>正确</span>
                                            <br/><br/>
                                            <Radio value="B"><Tag color="blue" style={{fontSize:18, width: 25, height:28, paddingTop:3, marginLeft: 16}}>B</Tag></Radio>
                                            <span>错误</span>
                                        </Radio.Group>
                                    </div>
                                ):null
                            }
                            <Divider />
                        </Content>
                        <Footer style={{ marginTop:8, background: '#fff'}}>
                            <span style={{width: '1840px'}}>
                                <Button type='primary' onClick={this.previousTitle}>上一题</Button>
                                <span style={{marginLeft:12, marginRight: 12}}>{`当前第${AllIndex}题/共${titleCount}题`}</span>
                                <Button type='primary' onClick={this.nextTitle}>下一题</Button>
                            </span>
                           <span style={{marginLeft: 440}}>
                               <Button type="primary" onClick={this.showConfirm}>提交试卷</Button>
                           </span>
                            <Modal
                                title="提交试卷"
                                visible={CommitVisible}
                                okText="确定交卷"
                                cancelText="取消"
                                onOk={this.CommitExam}
                                onCancel={this.handleCancel}
                            >
                                <CommitExam
                                    setForm={(form) => {this.form = form}}
                                />
                            </Modal>
                        </Footer>
                    </Layout>

                </Layout>
            </Layout>
        )
    }
}