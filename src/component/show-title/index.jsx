import React,{Component} from "react";
import PropTypes from "prop-types";
import {Card, Tag} from "antd";
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
        } else if (title.type === 2) {
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
                    <ul>
                        {
                            title.optionList.map((data, index) => {
                                return(
                                    <li type="A">{data.content}</li>
                                )
                            })
                        }
                    </ul>
                </div>

                <div className="test_answer">
                    <span>
                        正确答案：{title.answerList.map((data, index) => {
                        return(
                            <Tag color='green'>{data}</Tag>
                        )
                    })}
                    </span>
                </div>
            </Card>
        )
    }
}