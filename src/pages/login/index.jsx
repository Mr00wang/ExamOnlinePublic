import React,{Component} from "react";
import logo from "../../assets/logo2.png"
import {Input, Form, Button, Tooltip, message} from "antd";
import {UserOutlined, InfoCircleOutlined, LockOutlined} from '@ant-design/icons';
import LinkButton from "../../component/link-button";
import {reqLogin} from "../../api"
import "./index.less"
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
const Item = Form.Item; //不能写在import之前

/*
登陆组件
 */

class Login extends Component{

    handleSubmit = (event) =>{
        //阻止事件的默认行为
        event.preventDefault();

        //对所有表单字段进行校验
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                // 请求登陆
                const {username, password} = values;
                const request = await reqLogin(username, password);
                if (request.code === 200) {
                    // 提示登陆成功
                    message.success(request.msg);
                    const user = request.data;
                    const {role} = user;

                    console.log(storageUtils.getUser());
                    if (role === 1 || role === "1") {
                        memoryUtils.user = user;
                        storageUtils.saveUser(user);
                        this.props.history.replace("/teacher/home");
                    } else {
                        memoryUtils.student = user;
                        storageUtils.saveStudent(user);
                        this.props.history.replace("/student/myExam");
                    }
                }else {
                    // 提示错误信息
                    message.error(request.msg)
                }


            }else{
                console.log("校验失败！")
            }
        });
    };



    resetPassword = () => {
        this.props.history.push("reset_pwd");
    };
    register = () => {
        this.props.history.push("register");
    };

    render() {

        const form = this.props.form;
        const {getFieldDecorator} = form;
        return(
            <div className="login">
                <div className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>在线考试平台</h1>
                </div>
                <div className="login-content">
                    <h2>用户登陆</h2>
                    <Form  onSubmit={this.handleSubmit} className="login-form">
                        <Item>
                            {
                                getFieldDecorator('username', {//配置对象：属性名是特定一些名称
                                    //声明式验证，直接使用别人定义好的验证规则进行验证
                                    /* rules:[
                                         {
                                             validator: this.validateUser
                                         }
                                     ],*/
                                    rules: [
                                        {required: true, whitespace: true, message: '用户名必须输入'},
                                        {min: 3, message: '用户名至少3位'},
                                        {max: 12, message: '用户名最多12位'},
                                        //{ pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' },
                                    ],
                                    // initialValue: 'admin' //指定初始值
                                })(
                                    <Input
                                        placeholder="用户名"
                                        prefix={<UserOutlined className="site-form-item-icon"/>}
                                        suffix={
                                            <Tooltip title="Extra information">
                                                <InfoCircleOutlined style={{color: 'rgba(0,0,0,.45)'}}/>
                                            </Tooltip>
                                        }
                                    />
                                )
                            }
                        </Item>
                        <Item>
                            {
                                getFieldDecorator('password', {//配置对象：属性名是特定一些名称
                                    //声明式验证，直接使用别人定义好的验证规则进行验证
                                    rules: [
                                        {required: true, whitespace: true, message: '密码必须输入'},
                                        {min: 8, message: '密码至少8位'},
                                        // {max: 12, message: '用户名最多12位'},
                                        //{ pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' },
                                    ],
                                    // initialValue: 'admin' //指定初始值
                                })(
                                    <Input
                                        prefix={<LockOutlined/>}
                                        type="password"
                                        placeholder="密码"
                                        suffix={
                                            <Tooltip title="Extra information">
                                                <InfoCircleOutlined style={{color: 'rgba(0,0,0,.45)'}}/>
                                            </Tooltip>
                                        }
                                    />
                                )
                            }
                        </Item>
                        {/*<Item>
                            {
                                getFieldDecorator("identity", {
                                    rules: [
                                        {required: true, message: '登陆身份必须选择'}
                                    ],
                                    // initialValue: '338'
                                })(
                                    <Select placeholder="请选择登陆身份">
                                        <Option value="Teacher">Teacher</Option>
                                        <Option value="Student">Student</Option>
                                    </Select>
                                )
                            }
                        </Item>*/}
                        <Item>
                            <div>
                                <LinkButton onClick={this.resetPassword}>忘记密码？</LinkButton>
                                <LinkButton onClick={this.register}>没有账号？</LinkButton>
                            </div>

                        </Item>
                        <Item>
                            <Button type="primary" onClick={this.handleSubmit} className="login-form-button">
                                登  陆
                            </Button>
                        </Item>
                    </Form>
                </div>
                <div className="login-bottom">
                    <div>Copyright&copy;2020 Software Innovation Base Of Zhengzhou University Of Light Industry. All Rights Reserved</div>
                </div>
            </div>
        )
    }
}
// export default Form.create(Login);
const  WrapLogin = Form.create()(Login);
export default WrapLogin


