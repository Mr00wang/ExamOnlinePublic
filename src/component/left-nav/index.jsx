import React,{Component} from 'react';

import './index.less'
import logo from '../../assets/logo3.png'
import {Link,withRouter} from 'react-router-dom'
import {Menu,Icon} from "antd";
import menuList from "../../config/menuConfig";
import PropTypes from "prop-types";
const SubMenu = Menu.SubMenu;
/*
左侧导航的组件
 */
class LeftNav extends Component{

    static propTypes = {
        collapsed: PropTypes.string.isRequired,
    };

    getMenuNodes = (menuList) => {
        return menuList.map(item => {
            if(!item.children){
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            }else{
                const path = this.props.location.pathname;

                //查找一个与当前请求路径匹配的子Item
                const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0);
                //如果存在，说明当前item的子列表需要打开
                if(cItem){
                    this.openKey = item.key
                }

                return(
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                             <Icon type={item.icon} />
                             <span>{item.title}</span>
                            </span>
                        }
                    >
                        {
                            this.getMenuNodes((item.children))
                        }
                    </SubMenu>
                )
            }
        })

    };

    /*
    在第一次render()之前执行一次
    为第一个render()准备数据(必须同步的)
     */
    componentWillMount() {
        this.menuNodes = this.getMenuNodes(menuList)
    }

    render() {
        //得到当前的请求路径
        let path = this.props.location.pathname;
        const {collapsed} = this.props;
        //得到需要打开菜单项的key
        const openKey = this.openKey;
        if (path.indexOf("/teacher/group") === 0) {
            path = "/teacher/group";
        }
        if (path.indexOf("/teacher/practice_manage/look") === 0) {
            path = "/teacher/practice_manage/look";
        }
        if (path.indexOf("/teacher/exam_manage/look") === 0) {
            path = "/teacher/exam_manage/look";
        }
        if (path.indexOf("/teacher/score_manage/look") === 0) {
            path = "/teacher/score_manage/look";
        }
        return(
            <div  className="left-nav">
                <Link to="/teacher/home" className="left-nav-header">
                    <img src={logo} alt="logo"/>
                    <h1>{collapsed === true ? "" : "Exam"}</h1>
                </Link>

                <Menu
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}
                    //defaultOpenKeys={['/charts']}
                    mode="inline"
                    theme="dark"

                >
                    {
                        this.menuNodes
                    }

                </Menu>
            </div>
        )
    }
}
/*
withRouter高阶组件：
包装非路由组件，返回一个新的组件
新的组件会向非路由组件传递三个属性： history/location/math
 */
export default withRouter(LeftNav)