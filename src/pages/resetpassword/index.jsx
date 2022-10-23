import React,{Component} from "react";
import logo from "../../assets/logo2.png";

import "./index.less"
import {Steps, Button, message, Input, Tooltip, Form,} from 'antd';
import {InfoCircleOutlined, LockOutlined} from "@ant-design/icons";
const { Step } = Steps;
const Item = Form.Item; //不能写在import之前



/*
修改密码
 */

class ResetPassword extends Component{
   /* constructor(props) {
        super(props);
        this.state = {

        };
    }*/


    state = {
        code: "",
        current: 0,
        btnText: '发送验证码',
        btnStatus: false,
    };

    /**
     * 初始化
     */
    /*initSteps = () => {
        const steps = [
            {
                title: 'First',
                content: (
                    <div>
                        <Form>
                            <Item>
                                {
                                this.props.form.getFieldDecorator("email", {
                                    rules: [
                                        {required: true, whitespace: true, message: '邮箱必须输入'},
                                        { pattern:  /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/, message: '请输入正确的邮箱格式' },
                                    ]
                                })(
                                <Input
                                    prefix={<LockOutlined />}
                                    placeholder="请输入注册邮箱"
                                    suffix={
                                        <Tooltip title="邮箱">
                                            <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                        </Tooltip>
                                    }
                                    style={{ width: '40%' }}
                                />
                                )
                                }

                            </Item>
                            <Item>
                                 {
                                     this.props.form.getFieldDecorator("code", {
                                         rules: [
                                             {required: true, whitespace: true, message: '验证码必须输入'},
                                             { pattern:  /^([0-9]){6}$/, message: '请输入6位验证码' },
                                         ]
                                     })(
                                         <Input
                                             placeholder="请输入验证码"
                                             suffix={
                                                 <Tooltip title="验证码">
                                                     <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                                 </Tooltip>
                                             }
                                             style={{ width: '30%' }}
                                         />
                                   )
                                 }

                                <Button type="primary" style={{ marginLeft: "35px" }} onClick={this.SendCode} disabled={this.state.btnStatus}>
                                    {this.state.btnText}
                                </Button>
                            </Item>
                        </Form>
                    </div>

                )
            },
            {
                title: 'Second',
                content: (
                    <div>
                        <Form>
                            <Item>
                                <Input
                                    prefix={<LockOutlined />}
                                    type="password"
                                    placeholder="请输入修改的密码（八位以上，不能是纯数字）"
                                    suffix={
                                        <Tooltip title="八位以上，不能是纯数字">
                                            <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                        </Tooltip>
                                    }
                                    style={{ width: '40%' }}
                                />
                            </Item>
                            <Item>
                                <Input
                                    prefix={<LockOutlined />}
                                    type="password"
                                    placeholder="请确定新密码（八位以上，不能是纯数字）"
                                    suffix={
                                        <Tooltip title="八位以上，不能是纯数字">
                                            <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                        </Tooltip>
                                    }
                                    style={{ width: '40%' }}
                                />
                            </Item>
                        </Form>
                    </div>
                )
            },
            {
                title: 'Last',
                content: '修改成功！',
            },
        ];
    };*/

    /**
     * 第一次加载数据
     */
    /*componentDidMount() {
        this.initSteps();
    }*/

    handleSubmit = (event) =>{
        //阻止事件的默认行为
        event.preventDefault();

        //对所有表单字段进行校验
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                // console.log('提交登陆的ajax请求', values)
                // 请求登陆
                // const {email, code} = values;
                message.success("验证成功!")

            }else{
                console.log("校验失败！")
            }
        });

    };




    SendCode =  () => {
        let maxTime = 60;
        const timer = setInterval(() => {
            /* const result =  await reqSendCode();
       if (result.status === 0) {
           message.success("验证码发送成功！");
       } else {
           message.error(result.msg);
       }*/
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
                })
                //时间到关闭
                clearInterval(timer);
            }

        }, 1000)

    };
    next() {
        if (this.state.current === 0) {

        }
        const current = this.state.current + 1;
        this.setState({ current });
    }

    prev = () => {
        const current = this.state.current - 1;
        this.setState({ current });
    };

    steps = [
        {
            title: 'First',
            content: (
                // <div>
                    <Form>
                        <Item>
                            <Input
                                prefix={<LockOutlined />}
                                placeholder="请输入注册邮箱"
                                suffix={
                                    <Tooltip title="邮箱">
                                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                    </Tooltip>
                                }
                                style={{ width: '40%' }}
                            />
                        </Item>
                        <Item>
                            <Input
                                placeholder="请输入验证码"
                                suffix={
                                    <Tooltip title="验证码">
                                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                    </Tooltip>
                                }
                                style={{ width: '30%' }}
                            />
                            <Button type="primary" style={{ marginLeft: "35px" }} onClick={() => this.SendCode()} disabled={this.state.btnStatus}>
                                {this.state.btnText}
                            </Button>
                        </Item>
                    </Form>
                // </div>
            )
        },
        {
            title: 'Second',
            content: (
                <div>
                    <Form>
                        <Item>
                            <Input
                                prefix={<LockOutlined />}
                                type="password"
                                placeholder="请输入修改的密码（八位以上，不能是纯数字）"
                                suffix={
                                    <Tooltip title="八位以上，不能是纯数字">
                                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                    </Tooltip>
                                }
                                style={{ width: '40%' }}
                            />
                        </Item>
                        <Item>
                            <Input
                                prefix={<LockOutlined />}
                                type="password"
                                placeholder="请确定新密码（八位以上，不能是纯数字）"
                                suffix={
                                    <Tooltip title="八位以上，不能是纯数字">
                                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                    </Tooltip>
                                }
                                style={{ width: '40%' }}
                            />
                        </Item>
                    </Form>
                </div>
            )
        },
        {
            title: 'Last',
            content: '修改成功！',
        },
    ];
    render() {
        const { current } = this.state;
        return(
            <div className="resetpwd"
                 style={{
                     backgroundImage:"url("+ require('./bg1.jpg') +")"
                 }}
            >
                <div className="resetpwd-header">
                    <img src={logo} alt="logo"/>
                    <h1>在线考试平台-修改密码</h1>
                </div>
                <div className="resetpwd-content">
                    <Steps current={current} style={{ color: "white", fontSize: 20}}>
                        {this.steps.map(item => (
                            <Step key={item.title} title={item.title} style={{ color: "white", fontSize: 20}}/>
                        ))}
                    </Steps>
                    <div className="steps-content">{this.steps[current].content}</div>
                    <div className="steps-action">
                        {current < this.steps.length - 1 && (
                            <Button type="primary" onClick={() => this.next()}>
                               下一步
                            </Button>
                        )}
                        {current === this.steps.length - 1 && (
                            <Button type="primary" onClick={() => this.props.history.push("login")}>
                                去登录
                            </Button>
                        )}
                        {current > 0 && (
                            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                               上一步
                            </Button>
                        )}
                    </div>
                </div>
                <div className="resetpwd-bottom">
                    <div>Copyright&copy;2020 Software Innovation Base Of Zhengzhou University Of Light Industry. All Rights Reserved</div>
                </div>
            </div>
        )
    }

}
const WrapResetPwd = Form.create()(ResetPassword);
export default WrapResetPwd;