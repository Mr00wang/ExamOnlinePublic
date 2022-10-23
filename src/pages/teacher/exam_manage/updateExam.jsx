import React,{Component} from "react";
import {DatePicker, Form, Input, message, Select, Switch, TimePicker} from "antd";
import PropTypes from 'prop-types'
import {reqLookTests, reqSearchGroup} from "../../../api";
import memoryUtils from "../../../utils/memoryUtils";
import moment from 'moment';
import {formateDate, formateDate2} from "../../../utils/dateUtils";
const {RangePicker } = DatePicker;
const Item = Form.Item;
const {Option} = Select;

/*

 */

class UpdateExam extends Component{
    state = {
        disabled: false,
        testPaper:[],
        groups:[],
    };

    static propTypes = {
        exam: PropTypes.object.isRequired,
    };

    getTestPaperId = async () => {
        const request = await reqLookTests(memoryUtils.user.userId);
        if (request.code === 200) {
            this.setState({
                testPaper: request.data
            })
        }else {
            message.error(request.msg);
        }
    };

    getGroup = async () => {
        const request = await reqSearchGroup(memoryUtils.user.userId);
        if (request.code === 200) {
            this.setState({
                groups: request.data
            })
        }else
            message.error(request.msg);
    };

    componentDidMount(): void {
        this.getTestPaperId();
        this.getGroup();
    }

    componentWillMount () {
        // 将form对象通过setForm()传递父组件
        this.props.setForm(this.props.form)
    }


    onChange = checked => {
        this.setState({
            disabled : !checked
        })
    };

    render() {
        const {exam} = this.props;
        const {disabled, testPaper, groups} = this.state;
        const {getFieldDecorator} = this.props.form;
        const config = {
            rules: [{ type: 'object', required: true, message: '请设置答题时间' }],
            initialValue: moment(formateDate2(exam.examDuration), 'HH:mm')
        };
        const rangeConfig = {
            rules: [{ type: 'array', required: true, message: '请设置考试日期' }],
            initialValue:  [moment(formateDate(exam.startTime), 'YYYY-MM-DD HH:mm:ss'), moment(formateDate(exam.endTime), 'YYYY-MM-DD HH:mm:ss')]
        };
        const formItemLayout =
            {
                labelCol: { span: 4 },
                wrapperCol: { span: 10 },
            };
        return(
            <div>
                <Form {...formItemLayout}>
                    <Item label="考试名称">
                        {

                            getFieldDecorator("activityName",{
                                rules: [
                                    {required: true, message: '考试名称必须输入'}
                                ],
                                initialValue: exam.activityName
                            })(
                                <Input placeholder="考试名称"/>
                            )
                        }
                    </Item>
                    <Item label="试卷ID">
                        {
                            getFieldDecorator("testPaperId",{
                                rules: [
                                    {required: true, message: '试卷ID'}
                                ],
                                initialValue: exam.testPaperId
                            })(
                                <Select placeholder="请选择试卷" defaultValue={exam.testPaperId}>
                                    {
                                        testPaper.map(item => {
                                            return (
                                                <Option value={item.testPaperId}>{item.name}</Option>
                                            )
                                        })
                                    }
                                </Select>

                            )
                        }
                    </Item>
                    <Item label="是否私密">
                        {
                            getFieldDecorator('isPrivate',
                                {
                                    valuePropName: 'checked',
                                    initialValue: exam.isPrivate
                                })(
                                <Switch
                                    checkedChildren="是"
                                    unCheckedChildren="否"
                                    onChange={this.onChange}
                                />
                            )
                        }
                    </Item>
                    <Item label="参加群组">
                        {
                            getFieldDecorator("examAccessGroupList",{
                                rules: [
                                    {required: !disabled, message: '参加群组'}
                                ],
                                initialValue: exam.examAccessGroupList
                            })(
                                <Select
                                    mode="multiple"
                                    placeholder="请选择可参加的群组"
                                    onChange={this.handleChange}
                                    disabled={disabled}
                                    // style={{ width: '100%' }}
                                >
                                    {
                                        groups.map(item => {
                                            return (
                                                <Option value={item.id}>{item.groupName}</Option>
                                            )
                                        })
                                    }
                                </Select>

                            )
                        }
                    </Item>
                    <Item label="考试日期">
                        {getFieldDecorator('examCalendar', rangeConfig)(
                            <RangePicker
                                showTime
                                format="YYYY-MM-DD HH:mm"

                            />,
                        )}
                    </Item>
                    <Item label="答题时间">
                        {getFieldDecorator('examTime', config)(<TimePicker format="HH:mm"/>)}
                    </Item>
                </Form>
            </div>
        )
    }
}

export default Form.create()(UpdateExam)