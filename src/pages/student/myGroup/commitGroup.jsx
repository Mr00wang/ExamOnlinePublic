import React,{Component} from "react";
import PropTypes from "prop-types";
import {Form, Input} from "antd";
const Item = Form.Item;
/*

 */

class CommitGroup extends Component{

    static propTypes = {
        setForm: PropTypes.func.isRequired, // 用来传递form对象的函数
        id: PropTypes.string.isRequired,
    };

    componentWillMount () {
        this.props.setForm(this.props.form)
    }
    render() {
        const {id} = this.props;
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
                            <Input placeholder="请输入群组号" disabled/>
                        )
                    }
                </Item>
                <span>验证消息</span>
                <Item>
                    {

                        getFieldDecorator("desc",{

                        })(
                            <Input placeholder="请输入备注"/>
                        )
                    }
                </Item>
            </Form>
        )
    }
}

export default Form.create()(CommitGroup)