import React,{Component} from "react";
import {Button, Form, Input, Select, DatePicker, TimePicker, Switch, Card, message} from "antd";
import {reqAddExam, reqLookTests, reqSearchGroup} from "../../../api";
import memoryUtils from "../../../utils/memoryUtils";
const {RangePicker } = DatePicker;
const Item = Form.Item;
const {Option} = Select

/*

 */


class AddExam extends Component{
    state = {
      disabled: true,
        testPaper:[],
        groups:[],
    };

    handleSubmit =  (e) => {
        e.preventDefault();
        this.props.form.validateFields  ( async (err, fieldsValue) => {
            if (!err) {
                const rangeTimeValue = fieldsValue['examCalendar'];
                const values = {
                    ...fieldsValue,
                    'examCalendar': [
                        Date.parse(rangeTimeValue[0].format('YYYY-MM-DD HH:mm:ss')),
                        Date.parse(rangeTimeValue[1].format('YYYY-MM-DD HH:mm:ss'))
                        // rangeTimeValue[1].format('YYYY-MM-DD HH:mm:ss'),
                    ],
                    'examTime': parseInt(fieldsValue['examTime'].format('HH')) * 60 + parseInt(fieldsValue['examTime'].format('mm')),
                };
                console.log('Received values of form: ', values);
                const {testPaperId, activityName, isPrivate, examAccessGroupList, examCalendar,  examTime} = values;
                this.props.form.resetFields();
                const request = await reqAddExam(testPaperId, activityName, isPrivate, examAccessGroupList, examCalendar[0], examCalendar[1], examTime);
                if (request.code === 200) {
                    message.success("创建成功！")
                }else
                    message.error(request.msg);
            }
        });
    };

    onChange = checked => {
        console.log(`switch to ${checked}`);
        this.setState({
            disabled : !checked
        })
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

     handleChange = (value) => {
       message.success(value)
    };


    render() {
        const {disabled, testPaper, groups} = this.state;
        const {getFieldDecorator} = this.props.form;
      /*  const formItemLayout = {
            labelCol: {
                xs: { span: 12 },
                sm: { span: 2 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
        };*/

        const formItemLayout =
             {
                    labelCol: { span: 4 },
                    wrapperCol: { span: 10 },
             };

        const buttonItemLayout =
            {
                wrapperCol: { span: 14, offset: 4 },
            };


        const config = {
            rules: [{ type: 'object', required: true, message: '请设置考试日期' }],
        };
        const rangeConfig = {
            rules: [{ type: 'array', required: true, message: '请设置答题时间' }],
        };
        return(
            <Card>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Item label="考试名称">
                        {

                            getFieldDecorator("activityName",{
                                rules: [
                                    {required: true, message: '考试名称必须输入'}
                                ]
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
                            })(
                                <Select placeholder="请选择试卷">
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
                                    valuePropName: 'checked'
                                })(
                                    <Switch
                                        checkedChildren="是"
                                        unCheckedChildren="否"
                                        onChange={this.onChange}
                                        defaultChecked={false}
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
                            <RangePicker showTime format="YYYY-MM-DD HH:mm" />,
                        )}
                    </Item>
                    <Item label="答题时间" >
                        {getFieldDecorator('examTime', config)(<TimePicker format="HH:mm"/>)}
                    </Item>
                    <Item {...buttonItemLayout}>
                        <Button type="primary" htmlType="submit">
                            <span>立即创建</span>
                        </Button>
                    </Item>
                </Form>
            </Card>

        )
    }
}
const WrapAddExam = Form.create()(AddExam);
export default WrapAddExam