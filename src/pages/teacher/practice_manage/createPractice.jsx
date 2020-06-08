import React,{Component} from 'react';
import {Form,Input} from "antd";
import PropTypes from 'prop-types'
const Item = Form.Item;

/*
人员添加分类组件
 */
class CreatePractice extends Component{

    static propTypes = {
        setForm: PropTypes.func.isRequired, // 用来传递form对象的函数
    };

    componentWillMount () {
        this.props.setForm(this.props.form)
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        return(
            <Form>
                <span>试卷名称</span>
                <Item>
                    {
                        getFieldDecorator("name",{
                            rules: [
                                {required: true, message: '试卷名称必须输入'}
                            ]
                        })(

                            <Input placeholder="请输入试卷名称"/>
                        )
                    }
                </Item>
            </Form>
        )
    }
}

export default Form.create()(CreatePractice)