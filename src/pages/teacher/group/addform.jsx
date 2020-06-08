import React,{Component} from 'react';
import {Form,Input} from "antd";
import PropTypes from 'prop-types'
const Item = Form.Item;

/*
人员添加分类组件
 */
class AddForm extends Component{

    static propTypes = {
        setForm: PropTypes.func.isRequired, // 用来传递form对象的函数
        groupName: PropTypes.string.isRequired,
        groupId: PropTypes.string.isRequired,
    };

    componentWillMount () {
        this.props.setForm(this.props.form)
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        const {groupName, groupId} = this.props;
        return(
            <Form>
                <span>群组名</span>
                <Item>
                    {
                        getFieldDecorator("groupName",{
                            initialValue: groupName
                        })(
                            <Input disabled/>
                        )
                    }
                </Item>
                <span>群组号</span>
                <Item>
                    {
                        getFieldDecorator("groupId",{
                            initialValue: groupId
                        })(
                            <Input disabled/>
                        )
                    }
                </Item>
                <span>用户ID</span>
                <Item>
                    {

                        getFieldDecorator("userId",{
                            rules: [
                                {required: true, message: '用户ID必须输入'}
                            ]
                        })(
                            <Input placeholder="请输入用户ID"/>
                        )
                    }
                </Item>
            </Form>
        )
    }
}

export default Form.create()(AddForm)