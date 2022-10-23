import React,{Component} from 'react';
import {Form, Input} from "antd";
import PropTypes from 'prop-types'
const Item = Form.Item;
/*
人员更新分类组件
 */
class UpdateForm extends Component{


    static propTypes = {
        userNoteName: PropTypes.string.isRequired,
        finalScore: PropTypes.string.isRequired,
        setForm: PropTypes.func.isRequired
    };


    componentWillMount () {
        // 将form对象通过setForm()传递父组件
        this.props.setForm(this.props.form)
    }


    render() {
        const {userNoteName, finalScore} = this.props;
        const {getFieldDecorator} = this.props.form;
        return(
            <Form>
                <span>备注名</span>
                <Item>
                    {

                        getFieldDecorator("userNoteName",{
                            rules: [
                                {required: true, message: '备注名必须输入'}
                            ],
                            initialValue: userNoteName
                        })(
                            <Input placeholder="请输入备注名"/>
                        )
                    }
                </Item>
                <span>分数</span>
                <Item>
                    {
                        getFieldDecorator("finalScore",{
                            rules: [
                                {required: true, message: '分数必须输入'}
                            ],
                            initialValue: finalScore
                        })(
                            <Input placeholder="请输入分数"/>
                        )
                    }
                </Item>
            </Form>
        )
    }
}

export default Form.create()(UpdateForm)