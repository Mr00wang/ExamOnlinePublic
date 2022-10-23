import React,{Component} from 'react';
import {Form,Input} from "antd";
import PropTypes from 'prop-types'
const Item = Form.Item;

/*
人员添加分类组件
 */
class AddGroup extends Component{

    static propTypes = {
        setForm: PropTypes.func.isRequired // 用来传递form对象的函数
    };

    componentWillMount () {
        this.props.setForm(this.props.form)
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        return(
            <Form>
                <span>分组名称</span>
                <Item>
                    {

                        getFieldDecorator("groupName",{
                            rules: [
                                {required: true, message: '分组必须输入'}
                            ]
                        })(
                            <Input placeholder="请输入分组名称"/>
                        )
                    }
                </Item>

            </Form>
        )
    }
}

export default Form.create()(AddGroup)