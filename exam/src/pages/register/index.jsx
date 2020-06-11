import React,{Component} from "react";
import "./index.less"
import logo from "../../assets/logo2.png";
import {Button, Form, Input, message, Select, Tooltip} from "antd";
import {UserOutlined, InfoCircleOutlined, LockOutlined, MailOutlined, IdcardOutlined} from '@ant-design/icons';
import LinkButton from "../../component/link-button";
import {reqRegister, reqSendCode} from "../../api";
const Option = Select;
const Item = Form.Item; //不能写在import之前
/*
注册组件
 */

class Register extends Component{


    state = {
        code: "",
        btnStatus: false,
        btnText: '发送验证码',
    };



    handleSubmit = (event) =>{
        //阻止事件的默认行为
        event.preventDefault();

        //对所有表单字段进行校验
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                // console.log('提交登陆的ajax请求', values)
                // 请求
                const {username, password1, password2, identity, nickname, email, code} = values;
                let roledata = identity;

                console.log(identity);
                if (password1 !== password2) {
                    message.warn("两次密码输入不一致，请重新输入");
                } else {
                    if (identity === 'Teacher') {
                        roledata = "1";
                    } else {
                        roledata = "0";
                    }
                    console.log(roledata);
                    const request = await reqRegister(username, password1, nickname, email, code, roledata);
                    if (request.code === 200) {
                        message.success("注册成功");
                        this.props.form.resetFields();
                    } else if (request.code === 900) {
                        message.warn(request.msg);
                    } else {
                        message.error(request.msg);
                    }
                }

            }else{
                console.log("校验失败！")
            }
        });

    };

    toLogin = () => {
      this.props.history.push("userlogin");
    };

    SendCode = async () => {
        const username = this.props.form.getFieldValue("username");
        const email = this.props.form.getFieldValue("email");
        if (email ===  undefined || username === undefined) {
            message.warn("用户名和邮箱不能为空");
        } else {
            const request = await reqSendCode(username,email);
            if (request.code === 200) {
                message.success(request.msg);
            } else if (request.code === 1000) {
                message.warn(request.msg);
            } else {
                message.error(request.msg);
            }
            let maxTime = 60;
            const timer = setInterval(  () => {
                if (maxTime > 0) {
                    maxTime--;
                    this.setState({
                        btnText: '重新发送' + maxTime,
                        btnStatus: true
                    })
                }else {
                    this.setState({
                        btnText: '发送验证码',
                        btnStatus: false
                    });
                    //时间到关闭
                    clearInterval(timer);
                }

            }, 1000)
        }


    };
    render() {
        const form = this.props.form;
        const {getFieldDecorator} = form;
        const {btnStatus, btnText} = this.state;
        return(
                <div className="register"
                     style={{
                         backgroundImage:"url("+ require('./bg2.jpg') +")"
                     }}
                >
                    <div className="register-header">
                            <img src={logo} alt="logo"/>
                            <h1>在线考试平台</h1>
                    </div>
                    <div className="register-content">
                        <h2>用户注册</h2>
                        <Form  onSubmit={this.handleSubmit} className="register-form">
                            <Item>
                                {
                                    getFieldDecorator('username', {//配置对象：属性名是特定一些名称
                                        //声明式验证，直接使用别人定义好的验证规则进行验证
                                        rules: [
                                            {required: true, whitespace: true, message: '用户名必须输入'},
                                            {min: 8, message: '用户名至少8位'},
                                            {max: 12, message: '用户名最多12位'},
                                            { pattern: /^[0-9]+$/, message: '用户名必须数字' },
                                        ],
                                        // initialValue: 'admin' //指定初始值
                                    })(
                                        <Input
                                            placeholder="用户名（只能是数字，并不能修改）"
                                            prefix={<UserOutlined className="site-form-item-icon" />}
                                            suffix={
                                                <Tooltip title="用户名只能是数字，并不能修改">
                                                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                                </Tooltip>
                                            }
                                        />
                                    )
                                }

                            </Item>
                            <Item>
                                {
                                    getFieldDecorator('password1', {//配置对象：属性名是特定一些名称
                                        //声明式验证，直接使用别人定义好的验证规则进行验证
                                        rules: [
                                            {required: true, whitespace: true, message: '密码必须输入'},
                                            {min: 8, message: '密码至少8位字母和数字组合，'},
                                            {max: 12, message: '密码最多16位'},
                                            { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/, message: '密码必须是英文和数字组成' },
                                        ],
                                        // initialValue: 'admin' //指定初始值
                                    })(
                                        <Input
                                            prefix={<LockOutlined />}
                                            type="password"
                                            placeholder="密码（八位以上，不能是纯数字）"
                                            suffix={
                                                <Tooltip title="八位以上，不能是纯数字">
                                                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                                </Tooltip>
                                            }
                                        />
                                    )
                                }

                            </Item>
                            <Item>
                                {
                                    getFieldDecorator('password2', {//配置对象：属性名是特定一些名称
                                        //声明式验证，直接使用别人定义好的验证规则进行验证
                                        rules: [
                                            {required: true, whitespace: true, message: '密码必须输入'},
                                            {min: 8, message: '密码至少8位字母和数字组合'},
                                            {max: 12, message: '密码最多16位'},
                                            { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/, message: '密码必须是英文和数字组成' },
                                        ],
                                        // initialValue: 'admin' //指定初始值
                                    })(
                                        <Input
                                            prefix={<LockOutlined />}
                                            type="password"
                                            placeholder="确定密码"
                                            suffix={
                                                <Tooltip title="八位以上，不能是纯数字">
                                                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                                </Tooltip>
                                            }
                                        />
                                    )
                                }

                            </Item>
                            <Item>
                                {
                                    getFieldDecorator('nickname', {//配置对象：属性名是特定一些名称
                                        //声明式验证，直接使用别人定义好的验证规则进行验证
                                        rules: [
                                            {required: true, whitespace: true, message: '昵称必须输入'},
                                            {min: 1, message: '昵称至少1位'},
                                            {max: 5, message: '昵称最多5位'},
                                            // { pattern: /^[a-zA-Z0-9]+$/, message: '用户名必须是英文和数字组成' },
                                        ],
                                        // initialValue: 'admin' //指定初始值
                                    })(
                                        <Input
                                            prefix={<IdcardOutlined />}
                                            placeholder="昵称"
                                            suffix={
                                                <Tooltip title="昵称">
                                                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                                </Tooltip>
                                            }
                                        />
                                    )
                                }

                            </Item>
                            <Item>
                                {
                                    getFieldDecorator('email', {//配置对象：属性名是特定一些名称
                                        //声明式验证，直接使用别人定义好的验证规则进行验证

                                        rules: [
                                            {required: true, whitespace: true, message: '邮箱必须输入'},
                                            { pattern:  /^([a-zA-Z]|[0-9])(\w|-|\.)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/, message: '请输入正确的邮箱格式' },
                                        ],
                                        // initialValue: 'admin' //指定初始值
                                    })(
                                        <Input
                                            placeholder="请输入邮箱"
                                            prefix={<MailOutlined className="site-form-item-icon" />}
                                            suffix={
                                                <Tooltip title="邮箱">
                                                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                                </Tooltip>
                                            }
                                        />
                                    )
                                }

                            </Item>
                            <Item>
                                {
                                    getFieldDecorator('code', {//配置对象：属性名是特定一些名称
                                        //声明式验证，直接使用别人定义好的验证规则进行验证

                                        rules: [
                                            {required: true, whitespace: true, message: '验证码必须输入'},
                                            { pattern:  /^([0-9]){6}$/, message: '请输入6位验证码' },
                                        ],
                                        // initialValue: 'admin' //指定初始值
                                    })(
                                        <Input
                                            placeholder="请输入验证码"
                                            // prefix={<UserOutlined className="site-form-item-icon" />}
                                            suffix={
                                                <Tooltip title="验证码">
                                                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                                </Tooltip>
                                            }
                                            style={{width: "60%"}}
                                        />
                                    )
                                }

                                <Button type="primary" style={{marginLeft: 23}} onClick={this.SendCode} disabled={btnStatus}>
                                    {btnText}
                                </Button>
                            </Item>
                            <Item>
                                {
                                    getFieldDecorator("identity",{
                                        rules: [
                                            {required: true, message: '注册身份必须选择'}
                                        ],
                                    })(
                                        <Select placeholder="请选择注册身份">
                                            <Option value="Teacher" >Teacher</Option>
                                            <Option value="Student">Student</Option>
                                        </Select>
                                    )
                                }

                            </Item>
                            <Item>
                                <Button type="primary" htmlType="submit" className="register-form-button">
                                    注   册
                                </Button>
                                <LinkButton onClick={this.toLogin}>
                                    有账号，去登录
                                </LinkButton>

                            </Item>
                        </Form>
                    </div>
                    <div className="register-bottom">
                        <div>Copyright&copy;2020 Software Innovation Base Of Zhengzhou University Of Light Industry. All Rights Reserved</div>
                    </div>
                </div>
        )
    }

}

const WrapRegister = Form.create()(Register)
export default WrapRegister

