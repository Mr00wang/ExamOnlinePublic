import React,{Component} from "react";
import PropTypes from "prop-types";
import {Form, Input} from "antd";
const Item = Form.Item;
/*

 */

class CommitExam extends Component{

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
                <span>备注名</span>
                <Item>
                    {

                        getFieldDecorator("userNoteName",{
                            rules: [
                                {required: true, message: '备注名必须输入'}
                            ]
                        })(
                            <Input placeholder="请输入备注名"/>
                        )
                    }
                </Item>
            </Form>
        )
    }
}

export default Form.create()(CommitExam)