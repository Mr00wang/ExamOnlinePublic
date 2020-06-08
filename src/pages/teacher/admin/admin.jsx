import React,{Component} from "react";
import { Layout} from 'antd';
import {Redirect,Route,Switch} from 'react-router-dom'
import LeftNav from "../../../component/left-nav";
import Header from "../../../component/header";
import Home from "../home/home";
import AddExam from "../exam_manage/addExam";
import LookExam from "../exam_manage/lookExam";
import AddPractice from "../practice_manage/addPractice";
import LookPractice from "../practice_manage/lookPractice";
import AddTitles from "../title_manage/addTitles";
import LookTitles from "../title_manage/lookTitles";
import NotFound from "../waring/notFound";
import Group from "../group/group";
import Inform from "../inform/inform";
import memoryUtils from "../../../utils/memoryUtils";
import LookScore from "../score/lookScore";
const { Footer, Sider, Content } = Layout;
/*
教师端后台界面
 */

export default class Admin extends Component{
    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        const user = memoryUtils.user;
        if(!user){
            return <Redirect to='/login' />
        }
        return (
            <Layout style={{minHeight:'100vh'}}>
                <Sider
                   /* style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                    }}*/
                   /* style={{
                        position: 'fixed'
                    }}*/
                    breakpoint="lg"
                    // collapsedWidth="0"
                    onBreakpoint={broken => {
                        console.log(broken);
                    }}
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <LeftNav/>
                </Sider>
                <Layout >
                    <Header>Header</Header>
                    <Content style={{margin:20,backgroundColor:'#fff'}}>
                        <Switch>
                            <Route path='/teacher/home' component={Home}/>
                            <Route path='/teacher/exam_manage/add' component={AddExam}/>
                            <Route path='/teacher/inform' component={Inform}/>
                            <Route path='/teacher/group' component={Group}/>
                            <Route path='/teacher/exam_manage/look' component={LookExam}/>
                            <Route path='/teacher/title_manage/add' component={AddTitles}/>
                            <Route path='/teacher/title_manage/look' component={LookTitles}/>
                            <Route path='/teacher/practice_manage/add' component={AddPractice}/>
                            <Route path='/teacher/practice_manage/look' component={LookPractice}/>
                            <Route path='/teacher/score_manage/look' component={LookScore}/>
                            <Route component={NotFound}/>
                            {/*<Redirect exact from='/teacher' to='/home'/>*/}
                        </Switch>
                    </Content>
                    {/*<Footer style={{textAlign:'center' , color:'#cccccc'}}>Copyright&copy;2019该版权归郑州轻工业大学软件创新基地所有</Footer>*/}
                    <Footer style={{textAlign:'center' , color:'#cccccc'}}>Copyright&copy;2020 Software Innovation Base Of Zhengzhou University Of Light Industry. All Rights Reserved</Footer>
                </Layout>
            </Layout>

        );
    }

}