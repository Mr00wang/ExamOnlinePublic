import React,{Component} from "react";
import {Card, Input, List, message, Icon} from "antd";
import {reqLookTests} from "../../../api";
import memoryUtils from "../../../utils/memoryUtils";
import {formateDate1} from "../../../utils/dateUtils";

const { Search } = Input;
/*

 */
/*
[
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
            "testPaperSubjectVoList": null
        },
 */

export default class LookPracticeHome extends Component{

    state = {
      tests:[],

      loading: false,
    };

    //获取试卷
    getTests = async () => {
        this.setState({loading: true});
        const request = await reqLookTests(memoryUtils.user.userId);
        this.setState({loading: false});
        if (request.code === 200) {
            const tests = request.data;
            this.setState({
                tests
            })
        } else {
            message.error("获取试卷失败！")
        }
    };

    //搜索
    searchTest = async (value) => {
        console.log(value);
        if (value === "") {
            this.setState({loading: true});
            const request = await reqLookTests(memoryUtils.user.userId);
            this.setState({loading: false});
            if (request.code === 200) {
                const tests = request.data;
                this.setState({
                    tests
                })
            } else {
                message.error("获取试卷失败！")
            }
        } else {
            this.setState({loading: true});
            const request = await reqLookTests(memoryUtils.user.userId, value);
            this.setState({loading: false});
            if (request.code === 200) {
                const tests = request.data;
                this.setState({
                    tests
                })
            } else {
                message.error("获取试卷失败！")
            }
        }
    };



    //异步加载
    componentDidMount() {
        this.getTests();
    }

    //查看详细信息
    lookdescTest = async (id) => {
        this.props.history.push('/teacher/practice_manage/look/desc',id);
    };


    render() {
        const {tests, loading} = this.state;
        const title = "试卷列表";
        const extra = (
          <div>
              <Search
                  placeholder="输入试卷名称搜索试卷"
                  enterButton="Search"
                  // size="large"
                  onSearch={value => this.searchTest(value)}
              />
          </div>
        );
        return(
            <Card title={title} extra={extra}>
                <List
                    grid={{ gutter: 16, column: 4 }}
                    dataSource={tests}
                    // pagination={{defaultPageSize: 12,showQuickJumper: true}}
                    loading={loading}
                    renderItem={item => (
                        <List.Item>
                            <Card title={item.name} hoverable style={{fontSize: 16}} onClick={() => this.lookdescTest(item.testPaperId)}>
                                    <span>
                                        <Icon type="calendar" theme="twoTone" twoToneColor="#eb2f96"/>&nbsp;&nbsp;
                                        <span>
                                            {formateDate1(item.testPaperCreateDate)}
                                        </span>
                                    </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span>
                                        <Icon type="profile" theme="twoTone" twoToneColor="#eb2f96"/>&nbsp;&nbsp;
                                        <span>
                                            总分值 &nbsp;{item.testPaperTotalScore}
                                        </span>
                                    </span>
                            </Card>
                        </List.Item>
                    )}
                />
            </Card>
        )
    }

}