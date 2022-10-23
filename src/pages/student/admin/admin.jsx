import React,{Component} from "react";
import {Layout, Menu, Icon, Modal, message} from 'antd';
import "./index.less"
import {Link, Redirect, Route, Switch} from "react-router-dom";
import {MessageOutlined, ProfileOutlined, FontColorsOutlined} from '@ant-design/icons';
import logo from "../../../assets/logo3.png";
import MyExam from "../myExam/myExam";
import MyScore from "../myScore/myScore";
import MyGroup from "../myGroup/myGroup";
import MyInform from "../myInform/myInform";
import NotFound from "../../teacher/waring/notFound";
import LinkButton from "../../../component/link-button";
import memoryUtils from "../../../utils/memoryUtils";
import storageUtils from "../../../utils/storageUtils";
const { Header, Content, Footer } = Layout;


/*
学生端界面
 */

export default class Admin extends Component{

    layout = () => {
        Modal.confirm({
            title: '确定退出吗？',
            //content: '确定退出吗？',
            onOk: () => {
                //删除保存的user数据
                memoryUtils.student = {};
                storageUtils.removeStudent();
                //跳转到Login
                message.success('退出成功');
                this.props.history.replace('/userlogin')
            }

        });
    };
    render() {
        const {username} = memoryUtils.student;
        if (!memoryUtils.student) {
            return <Redirect to='/userlogin'/>
        }
        return(
            <Layout className="layout">
                <Header>
                    {/*<Link to="/student/exam" className="left-nav-header">
                        <img src={logo} alt="logo"/>
                        <h1>在线考试平台</h1>
                    </Link>*/}
                    {/*<img src={logo} alt="logo"/>*/}
                    <div className="logo">
                        <img src={logo} alt="img"/>
                        <h1>在线考试平台</h1>
                    </div>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultOpenKeys={this.props.location.pathname}
                        selectedKeys={this.props.location.pathname}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="/student/myExam">
                            <Link to="/student/myExam">
                            <ProfileOutlined />
                            <span style={{marginLeft: 8}}>我的考试</span>
                        </Link>
                        </Menu.Item>
                       {/* <Menu.Item key="/student/myPractice">
                            <Link to="/student/myPractice">
                                <ReadOutlined/>
                                <span style={{marginLeft: 8}}>我的练习</span>
                            </Link>
                        </Menu.Item>*/}
                        <Menu.Item key="/student/myScore">
                            <Link to="/student/myScore">
                                <FontColorsOutlined />
                                <span style={{marginLeft: 8}}>我的成绩</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/student/myGroup">
                            <Link to="/student/myGroup">
                                <Icon type="apartment"/>
                                <span style={{marginLeft: 8}}>我的分组</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/student/myInform">
                            <Link to="/student/myInform">
                                <MessageOutlined />
                                <span style={{marginLeft: 8}}>我的通知</span>
                            </Link>
                        </Menu.Item>
                        <div className="header-user">
                            <span>欢迎，{username}</span>
                            <LinkButton onClick={this.layout}>
                                <span>退出</span>
                            </LinkButton>
                        </div>

                    </Menu>


                </Header>
                <Content style={{ padding: '0 80px', margin:50,backgroundColor:'#fff', minHeight: 480}} >
                    <Switch>
                        <Route path='/student/myExam' component={MyExam}/>
                        {/*<Route path='/student/myPractice' component={MyPractice}/>*/}
                        <Route path='/student/myScore' component={MyScore}/>
                        <Route path='/student/myGroup' component={MyGroup}/>
                        <Route path='/student/myInform' component={MyInform}/>
                        <Route component={NotFound}/>
                        {/*<Redirect exact from='/teacher' to='/home'/>*/}
                    </Switch>
                </Content>
                <Footer style={{textAlign:'center' , color:'#cccccc'}}>Copyright&copy;2020 Software Innovation Base Of Zhengzhou University Of Light Industry. All Rights Reserved</Footer>
            </Layout>
        )
    }

}