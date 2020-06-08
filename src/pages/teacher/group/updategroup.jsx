import React,{Component} from 'react';
import {Form, Input} from "antd";
import PropTypes from 'prop-types'
const Item = Form.Item
/*
人员更新分类组件
 */
class UpdateGroup extends Component{

    static propTypes = {
        groupName: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        setForm: PropTypes.func.isRequired
    }

    componentWillMount () {
        // 将form对象通过setForm()传递父组件
        this.props.setForm(this.props.form)
    }


    render() {
        const {id, groupName} = this.props;
        const {getFieldDecorator} = this.props.form;
        return(
            <Form>
                <span>群组号</span>
                <Item>
                    {

                        getFieldDecorator("id",{
                            rules: [
                                {required: true, message: '群组号必须输入'}
                            ],
                            initialValue: id
                        })(
                            <Input placeholder="请输入用户名" disabled/>
                        )
                    }
                </Item>
                <span>分组名称</span>
                <Item>
                    {
                        getFieldDecorator("groupName",{
                            rules: [
                                {required: true, message: '分组名称必须输入'}
                            ],
                            initialValue: groupName
                        })(
                            <Input placeholder="请输入分组名称"/>
                        )
                    }
                </Item>
            </Form>
        )
    }
}

export default Form.create()(UpdateGroup)