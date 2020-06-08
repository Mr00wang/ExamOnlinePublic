import React,{Component} from 'react';
import {Form, Input, Select} from "antd";
import PropTypes from 'prop-types'
const Item = Form.Item;
const { Option } = Select;
/*
人员更新分类组件
 */
class UpdateForm extends Component{

    state = {
        categories: [
            {
                "id" : 1,
                "groupName" : "郑州轻工业大学软件学院1801班"
            },
            {
                "id" : 2,
                "groupName" : "河南省教育"
            },
        ],
    };

    static propTypes = {
        username: PropTypes.string.isRequired,
        nickname: PropTypes.string.isRequired,
        groupName: PropTypes.string.isRequired,
        setForm: PropTypes.func.isRequired
    };

    getGroup = async () => {
        /* //在发请求前显示loading
         this.setState({loading: true})
         const result = await reqUsers()
         this.setState({loading: false})
         if (result.error_code===7){
             const users = result.data
             //更新状态
             this.setState({
                 users
             })
         }else{
             message.error('获取成员列表失败')
         }*/
    };


    componentDidMount() {
        this.getGroup()
    }

    componentWillMount () {
        // 将form对象通过setForm()传递父组件
        this.props.setForm(this.props.form)
    }


    render() {
        const {username, nickname, groupName} = this.props;
        const {getFieldDecorator} = this.props.form;
        const {categories} = this.state;

        return(
            <Form>
                <span>用户名</span>
                <Item>
                    {

                        getFieldDecorator("username",{
                            rules: [
                                {required: true, message: '用户名必须输入'}
                            ],
                            initialValue: username
                        })(
                            <Input placeholder="请输入用户名"/>
                        )
                    }
                </Item>
                <span>昵称</span>
                <Item>
                    {
                        getFieldDecorator("nickname",{
                            rules: [
                                {required: true, message: '昵称必须输入'}
                            ],
                            initialValue: nickname
                        })(
                            <Input placeholder="昵称"/>
                            /* <Select>
                                 <Option value="338" >338</Option>
                                 <Option value="339">339</Option>
                                 <Option value="351" disabled>351</Option>
                             </Select>*/
                        )
                    }
                </Item>
                <span>分组</span>
                <Item>
                    {
                        getFieldDecorator("groupName",{
                            rules:[
                                {required: true, message: '分组必须选择'}
                            ],
                            initialValue: groupName
                            /* <Select>
                                <Option value="338" >338</Option>
                                <Option value="339">339</Option>
                                <Option value="351" disabled>351</Option>
                            </Select>*/
                        })(
                            <Select placeholder="请选择分组">
                                {
                                    categories.map( item => <Option value={item.id} >{item.groupName}</Option>)
                                }
                            </Select>
                        )
                    }
                </Item>
            </Form>
        )
    }
}

export default Form.create()(UpdateForm)