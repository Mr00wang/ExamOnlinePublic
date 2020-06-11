import React,{Component} from "react";
import {Statistic, Card, Row, Col, Icon, Button, message} from 'antd';
import {
    reqByAllGroupCommit,
    reqGetApplyCommit,
    reqLookExams,
    reqLookTests,
    reqLookTitles,
    reqSearchGroup
} from "../../../api";
import memoryUtils from "../../../utils/memoryUtils";
import './index.less'
/*

 */

export default class Home extends Component{
    state = {
        examCount:0,
        groupsId:[],
        groupsName:[],
        groupCommit:[],
        testCount:0,
        subjectCount: 0,

    };

    getExamCount = async () => {
        const exam = {"createUserId": memoryUtils.user.userId};

        const request = await reqLookExams(exam);
        if (request.code === 200) {
            const examCount = request.data.length;
            this.setState({
                examCount
            })
        }
    };

    getTestCount = async () => {
      const request = await reqLookTests(memoryUtils.user.userId);
      if (request.code === 200) {
          const testCount = request.data.length;
          this.setState({
              testCount
          })
      }
    };

    getSubjectCount = async () => {
        const request = await reqLookTitles();
        if (request.code === 200) {
            const subjectCount = request.data.length;
            this.setState({
                subjectCount
            })
        }
    };

    getGroup = async () => {
        let {groupsId, groupsName} = this.state;
        const request = await reqSearchGroup(memoryUtils.user.userId);
        if (request.code === 200) {
            const data = request.data;
            data.map(item => {
                groupsId.push(item.id);
                groupsName.push(item.groupName);
            });
            this.setState({
                groupsId,
                groupsName
            }, () => {this.getGroupCommit()})
        }

        console.log(this.state.groupsId);
        console.log(this.state.groupsName)

    };

    getGroupCommit =  () => {
        let {groupsId, groupCommit, groupName} = this.state;
        groupsId.map(async (item,index) =>  {
            const request = await reqGetApplyCommit(item);

            if (request.code === 200) {
                const group = request.data;
                const groupCommitCount = group.filter(item => item.status === 0).length;
                // console.log(`group`)
                    groupCommit.push({groupId: item, groupCommitCount:groupCommitCount})
            }
            this.setState({
                groupCommit
            })
        });
        console.log(this.state.groupCommit)
    };

    componentDidMount(): void {
        this.getGroup();
        this.getTestCount();
        this.getExamCount();
        this.getSubjectCount()
        // this.getGroupCommit();
    }

    byGroupCommit = async (groupId) => {
        const request = await reqByAllGroupCommit(groupId);
        if (request.code === 200) {
            message.success("已批准");
            this.setState({
                groupsId:[],
                groupCommit:[],
            },() => {this.getGroup()});

        }else {
            message.error(request.msg);
        }
    };

    render() {
        const {examCount, groupCommit, testCount, subjectCount} = this.state;
        return(
            // <Card style={{ background: '#ECECEC'}}>
            <Card style={{ background: '#F0F2F5'}}>
            {/*<Card>*/}
                <Row gutter={16}>
                        <Col span={6}>
                            <div className="quick-path" style={{background: '#1890FF'}} onClick={() => {this.props.history.push('/teacher/exam_manage/add')}}>
                                {/*<div style={{paddingLeft: '50%'}}>*/}
                                {/*    <Icon type='profile'/>*/}
                                {/*</div><br/>*/}

                                <div className="quick-path-span">
                                    <Icon type='plus'/>&nbsp;
                                    <span>添加考试</span>
                                </div>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div className="quick-path" style={{background: '#87d068'}} onClick={() => {this.props.history.push('/teacher/practice_manage/add')}}>
                                <div className="quick-path-span">
                                    <Icon type='plus'/>&nbsp;
                                    <span>添加试卷</span>
                                </div>

                            </div>
                        </Col>
                        <Col span={6}>
                            <div className="quick-path" style={{background: '#13C2C2'}} onClick={() => {this.props.history.push('/teacher/title_manage/add')}}>
                                <div className="quick-path-span">
                                   <Icon type='plus'/>&nbsp;
                                   <span>添加试题</span>
                               </div>
                            </div>
                        </Col>
                    <Col span={6}>
                        <div className="quick-path" style={{background: '#FBD437'}} onClick={() => {this.props.history.push('/teacher/inform')}}>
                            <div className="quick-path-span">
                                <Icon type='eye'/>&nbsp;
                                <span>查看通知</span>
                            </div>
                        </div>
                    </Col>
                </Row>
                <br/>
                <Row gutter={16}>
                    {
                        groupCommit.map(item => {

                            return(
                                item.groupCommitCount !== 0 ?
                                    <Col span={6}>
                                        <Card>
                                            <Statistic
                                                title={`${item.groupId}号群组有`}
                                                value={item.groupCommitCount}
                                                suffix="个加群请求"
                                            />
                                            <Button style={{ marginTop: 16 }} type="primary" onClick={() => {this.byGroupCommit(item.groupId)}}>
                                                通过申请
                                            </Button>
                                        </Card>
                                    </Col>
                                :null
                            )
                        })
                    }
                </Row>
                <br/>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                title="您共创建了"
                                value={examCount}
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<Icon type="profile" />}
                                suffix="次考试"
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                title="您共创建了"
                                value={testCount}
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<Icon type="project" />}
                                suffix="次试卷"
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                title="题库里一共有"
                                value={subjectCount}
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<Icon type="database" />}
                                suffix="道试题"
                            />
                        </Card>

                    </Col>
                </Row>
            </Card>
        )
    }

}