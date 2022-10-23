import React,{Component} from "react";
import PropTypes from "prop-types";
import {Card, message, Tag} from "antd";
import './index.less'
/*

 */

export default class ShowTitle extends Component{

    static propTypes = {
        title: PropTypes.object.isRequired
    };
    render() {
        const {title} = this.props;
        let type;
        if (title.type === 0) {
            type = '单选题'
        } else if (title.type === 1) {
            type = '填空题';
        } else if (title.type === 3) {
            type = '多选题';
        } else if (title.type === 4) {
            type = '判断题';
        }

        const titles = (
            <div>
                <span><b>试题类型：</b>{type}</span>
                <span style={{paddingLeft: 20}}><b>试题分类：</b>{title.tag}</span>
            </div>
        );
        return(
            <Card title={titles}>
                <div className="test_title">
                    <span>{title.id + '、'}</span>
                    {`(${type})`+ " "+title.question}
                </div><br/>
                <div className="test_option">
                    {
                        title.type !== 1 ? (
                            <ul>
                                {
                                    title.optionList.map((data, index) => {
                                        return(
                                            <li type="A">{data.content}</li>
                                        )
                                    })
                                }
                            </ul>
                        ):null
                    }
                </div>

                <div className="test_answer">
                    <span>
                        正确答案：{title.answerList.map((item, index) => {
                        let color ='green';
                        let answerCode = "";
                        /* if (item.answer === 'loser') {
                             color = 'volcano';
                         }*/
                        if (title.type !== 1) {
                            answerCode = String.fromCharCode(64 + parseInt(item.answer));

                        } else {
                            answerCode = item.answer;
                            answerCode = `${item.option}、${answerCode}`
                        }
                        return (
                            <Tag color={color} key={item.answer}>
                               {answerCode}
                            </Tag>
                        );
                    })}
                    </span>
                </div>
            </Card>
        )
    }
}