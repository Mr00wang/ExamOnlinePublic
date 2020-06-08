import React,{Component} from 'react';
import './index.less'
import {withRouter} from 'react-router-dom'
import {formateDate} from "../../utils/dateUtils";
import menuList from "../../config/menuConfig";
import storageUtils from "../../utils/storageUtils";
import { Modal,message} from 'antd';
import LinkButton from "../link-button";
import memoryUtils from "../../utils/memoryUtils";

class Header extends Component{

    state = {
        currentTime: formateDate(Date.now()),//当前时间字符串
    };

    getTime = () => {
        this.intervalId = setInterval(() => {
            const currentTime = formateDate(Date.now())
            this.setState({currentTime})
        },1000)

    };

    getTitle = () => {
        let path = this.props.location.pathname;
        let title;
        if (path.indexOf("/teacher/group") === 0) {
            path = "/teacher/group";
        }
        menuList.forEach(item => {
            if(item.key===path) {
                title = item.title
            }else if(item.children){
                const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0);
                if (cItem){
                    title = cItem.title
                }

            }
        });
        return title
    };
    /*
    第一次render（）之后执行一次
    一般在此执行异步操作： 发ajax请求启动定时器
     */
    componentDidMount() {
        this.getTime()
    }
    componentWillUnmount () {
        // 清除定时器
        clearInterval(this.intervalId)
    }

    /*
    退出登陆
     */

    layout = () => {
        Modal.confirm({
            title: '确定退出吗？',
            //content: '确定退出吗？',
            onOk: () => {
                //console.log('OK');
                storageUtils.removeUser()
                memoryUtils.user = {}
                //删除保存的user数据
                //console.log("header"+memoryUtils.user)
                //跳转到Login
                message.success('退出成功');
                this.props.history.replace('/login')
            }

        });
    };

    render() {
        const {currentTime} = this.state;
        const {username} = memoryUtils.user;
        const title = this.getTitle();
        return(
            <div className="header">
                <div className="header-top">
                    <span>欢迎，{username}</span>
                    <LinkButton onClick={this.layout}>
                        <span>退出</span>
                    </LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left" >{title}</div>
                    <div className="header-bottom-right">
                        {/*<span>{currentTime}</span>*/}

                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)