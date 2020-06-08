import React,{Component} from "react";
import {Card, Input, Button, Select, Icon, message, Tag, Radio, Checkbox, Modal} from "antd";
import titleTemplateList from "../../../config/titleTemplateConfig"
import "./addTitles.less"
import {reqAddTitles} from "../../../api";
import ImportTitles from "./importTitles";
const {Option} = Select;
const {TextArea} = Input;

/*

 */

export default class AddTitles extends Component{
    state = {
      titleType: '单选题',
      titleCategory: "",
      question: "",
      judgeValue: "",
      JudgeTitle: {
          type:4,
          question:"",
          tag:"",
          answerList:[

          ],
          optionList:[
              {
                option:"A",
                content:"正确"
              },
              {
                  option:"B",
                  content:"错误"
              },
          ],
      },

      optionValue:"",
        checkedValues:[],
      Options:[
          "A",
          "B",
          "C",
          "D"
      ],

      OptionsContent:[
        "",
        "",
        "",
        "",
      ],
        OptionTitle: {
            type:0,
            question:"",
            tag: "",
            answerList:[

            ],
            optionList:[

            ],
        },
        modalVisible:false
    };

    //试题类型
    handleChange = (value) => {
        message.success(value);
        this.setState({
            titleType: value,
        },() => {})
    };

    //试题分类
    onChange = e => {
        const titleCategory = e.target.value;
        this.setState({
            titleCategory
        }, () => {})
    };

    //题目
    questionChange = (e) => {
        console.log(e.target.value);
        this.setState({
            question: e.target.value
        })
    };

    //单选答案
    optionTitleChange = (e) => {
        console.log(e.target.value);
        this.setState({
            optionValue: e.target.value
        })
    };

    //单选/多选内容
    optionContentChange = (e) => {
        const index = e.target.id;
        // this.state.OptionsContent[index] = e.target.value;
        this.setState({
            OptionsContent : this.state.OptionsContent[index] = e.target.value,
        });
    };

    //多选答案
    checkboxTitleChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
        this.setState({
            checkedValues: checkedValues
        })
    };

    //判断答案
    judgeTitleChange = (e) => {
        this.setState({
            judgeValue: e.target.value
        })
    };

    /*
    * 0为单选选择题，1为填空题，2为简答题，3为多选选择题，4位判断题
    * */

    changeTitleType() {
        // console.log(this.state.titleType);
        if (this.state.titleType === '单选题') {
            return (
                <div className="addQuestion" style={{backgroundColor: '#27dfb52b', marginTop: 20}}>

                    <div className="title">
                        <Tag color="green" style={{fontSize:18, width: 50, height:28, paddingTop:3}}>题目</Tag>
                        <span>请输入题目内容</span>
                    </div>
                    <div className="content">
                        <TextArea
                            value={this.state.question}
                            onChange={this.questionChange}
                            placeholder="请输入题目内容"
                            autoSize={{ minRows: 5, maxRows: 7 }}
                        />
                    </div>
                    <div className="title">
                        <Tag color="green" style={{fontSize:18, width: 50, height:28, paddingTop:3}}>选项</Tag>
                        <span>请勾选正确选项</span>
                    </div>
                    <div className="option">
                        <Radio.Group
                           size="large"
                           onChange={this.optionTitleChange}
                           value={this.state.optionValue}
                           style={{width:'100%'}}
                        >
                            {
                                this.state.Options.map((data, index) => {
                                    return(
                                        <div style={{paddingTop:12}}>
                                            <Radio key={index} value={data}><Tag color="blue" style={{fontSize:18, height:28, paddingTop:3, marginLeft: 16}}>{data}</Tag></Radio>
                                            <Input id={index} value={this.state.OptionsContent[index]} style={{width: '87%', height: 48, paddingLeft:5}} placeholder={`请输入${data}选项内容`} onChange={this.optionContentChange}/>
                                        </div>
                                    )
                                })
                            }
                        </Radio.Group>
                        <div className="optionButton">
                            <Button type="primary" onClick={this.addOption}>
                                <Icon type="plus"/>
                                <span>增加选项</span>
                            </Button>
                            <Button type="danger" style={{marginLeft: 16}} onClick={this.deleteOption}>
                                <Icon type="minus" />
                                <span>减少选项</span>
                            </Button>
                        </div>
                    </div>
                    <div className="title">
                        <Tag color="green" style={{fontSize:18, width: 50, height:28, paddingTop:3}}>解析</Tag>
                        <span>请输入解析内容</span>
                    </div>
                    <div className="content">
                        <TextArea
                           /* value={this.state.question}
                            onChange={this.questionChange}*/
                            placeholder="请输入解析"
                            autoSize={{ minRows: 5, maxRows: 7 }}
                        />
                    </div>
                    <div className="button">
                        <Button type="primary" onClick={this.addOptionTitles}>
                            添加
                        </Button>
                    </div>
                    <br/>

                </div>
            )
        } else if (this.state.titleType === '多选题') {
            return (
                <div className="addQuestion" style={{backgroundColor: '#27dfb52b', marginTop: 20}}>

                    <div className="title">
                        <Tag color="green" style={{fontSize:18, width: 50, height:28, paddingTop:3}}>题目</Tag>
                        <span>请输入题目内容</span>
                    </div>
                    <div className="content">
                        <TextArea
                            value={this.state.question}
                            onChange={this.questionChange}
                            placeholder="请输入题目内容"
                            autoSize={{ minRows: 5, maxRows: 7 }}
                        />
                    </div>
                    <div className="title">
                        <Tag color="green" style={{fontSize:18, width: 50, height:28, paddingTop:3}}>选项</Tag>
                        <span>请勾选正确选项</span>
                    </div>
                    <div className="option">
                        <Checkbox.Group
                            size="large"
                            onChange={this.checkboxTitleChange}
                            style={{width:'100%'}}
                            value={this.state.checkedValues}
                        >
                            {
                                this.state.Options.map((data, index) => {
                                    return(
                                        <div style={{paddingTop:12}}>
                                            <Checkbox key={index} value={data}><Tag color="blue" style={{fontSize:18, height:28, paddingTop:3, marginLeft: 16}}>{data}</Tag></Checkbox>
                                            <Input id={index} value={this.state.OptionsContent[index]} style={{width: '87%', height: 48, paddingLeft:5}} placeholder={`请输入${data}选项内容`} onChange={this.optionContentChange}/>
                                        </div>
                                    )
                                })
                            }
                        </Checkbox.Group>
                        <div className="optionButton">
                            <Button type="primary" onClick={this.addOption}>
                                <Icon type="plus"/>
                                <span>增加选项</span>
                            </Button>
                            <Button type="danger" style={{marginLeft: 16}} onClick={this.deleteOption}>
                                <Icon type="minus" />
                                <span>减少选项</span>
                            </Button>
                        </div>

                    </div>
                    <div className="title">
                        <Tag color="green" style={{fontSize:18, width: 50, height:28, paddingTop:3}}>解析</Tag>
                        <span>请输入解析内容</span>
                    </div>
                    <div className="content">
                        <TextArea
                            // value={value}
                            // onChange={this.onChange}

                            placeholder="请输入解析"
                            autoSize={{ minRows: 5, maxRows: 7 }}
                        />
                    </div>
                    <div className="button">
                        <Button type="primary" onClick={this.addOptionTitles}>
                            添加
                        </Button>
                    </div>
                    <br/>

                </div>
            )
        } else  if (this.state.titleType === '填空题') {
            return (
                <div className="addQuestion" style={{backgroundColor: '#27dfb52b', marginTop: 20}}>

                    <div className="title">
                        <Tag color="green" style={{fontSize:18, width: 50, height:28, paddingTop:3}}>题目</Tag>
                        <span>请输入题目内容</span>
                    </div>
                    <div className="content">
                        <TextArea
                            // value={value}
                            // onChange={this.onChange}

                            placeholder="请输入题目内容"
                            autoSize={{ minRows: 5, maxRows: 7 }}
                        />
                    </div>
                    <div className="fill-black">
                        <Tag  color="green" style={{fontSize:18, width: 100, height:40, paddingTop:8}}>正确答案</Tag>
                        <Input placeholder="请输入正确答案" style={{width: 500, height: 55}}/>
                    </div>
                    <div className="title">
                        <Tag color="green" style={{fontSize:18, width: 50, height:28, paddingTop:3}}>解析</Tag>
                        <span>请输入解析内容</span>
                    </div>
                    <div className="content">
                        <TextArea
                            // value={value}
                            // onChange={this.onChange}

                            placeholder="请输入解析"
                            autoSize={{ minRows: 5, maxRows: 7 }}
                        />
                    </div>
                    <div className="button">
                        <Button type="primary">
                           添加
                        </Button>
                    </div>
                    <br/>

                </div>
            )
        } else  if (this.state.titleType === '判断题') {
            return (
                <div className="addQuestion" style={{backgroundColor: '#27dfb52b', marginTop: 20}}>

                    <div className="title">
                        <Tag color="green" style={{fontSize:18, width: 50, height:28, paddingTop:3}}>题目</Tag>
                        <span>请输入题目内容</span>
                    </div>
                    <div className="content">
                        <TextArea
                            value={this.state.question}
                            onChange={this.questionChange}
                            placeholder="请输入题目内容"
                            autoSize={{ minRows: 5, maxRows: 7 }}
                        />
                    </div>
                    <div className="title">
                        <Tag color="green" style={{fontSize:18, width: 50, height:28, paddingTop:3}}>选项</Tag>
                        <span>请勾选正确选项</span>
                    </div>
                    <div className="judgeOption">
                        <Radio.Group name="judgetitle" size="large" onChange={this.judgeTitleChange} value={this.state.judgeValue}>
                            <Radio value="A"><Tag color="blue" style={{fontSize:18, width: 25, height:28, paddingTop:3, marginLeft: 16}}>A</Tag></Radio>
                            <span>正确</span>
                            <br/><br/>
                            <Radio value="B"><Tag color="blue" style={{fontSize:18, width: 25, height:28, paddingTop:3, marginLeft: 16}}>B</Tag></Radio>
                            <span>错误</span>
                        </Radio.Group>
                    </div>
                    <div className="title">
                        <Tag color="green" style={{fontSize:18, width: 50, height:28, paddingTop:3}}>解析</Tag>
                        <span>请输入解析内容</span>
                    </div>
                    <div className="content">
                        <TextArea
                            // value={value}
                            // onChange={this.onChange}

                            placeholder="请输入解析"
                            autoSize={{ minRows: 5, maxRows: 7 }}
                        />
                    </div>
                    <div className="button">
                        <Button type="primary" onClick={this.addJudgeTitles}>
                            添加
                        </Button>
                    </div>
                    <br/>

                </div>
            )
        }
    };

    addOption = () => {
        const length = this.state.Options.length;

        this.setState({
            // eslint-disable-next-line no-undef
            Options: [...this.state.Options, String.fromCharCode(65 + length)],
            OptionsContent: [...this.state.OptionsContent, ""]
        });
        console.log(this.state.Options);
        console.log(this.state.OptionsContent);
    };

    deleteOption = () => {
        this.state.Options.pop();
        this.state.OptionsContent.pop();
        console.log(this.state.Options);
        console.log(this.state.OptionsContent);
         this.setState({
             // eslint-disable-next-line no-undef
             Options: this.state.Options,
             OptionsContent: this.state.OptionsContent
         })
    };

    //单选/多选
    addOptionTitles = async () => {
        let {type, question, answerList, optionList} = this.state.OptionTitle;
        const {Options, optionValue, OptionsContent, checkedValues, titleType, titleCategory} = this.state;
        let flag = false;
        if (titleType === '单选题')
            flag = true;
        if (flag && optionValue === '')
            message.error("请勾选答案");
        else if (!flag && checkedValues.length === 0)
            message.error("请勾选答案");
        else if (this.state.question === "")
            message.error("请输入题目");
        else {
            if (flag) {
                answerList.push(this.state.optionValue);
            } else {
                checkedValues.map((data) => {
                    return(
                        answerList.push(data)
                    )
                });
                type = 3;
            }
            question = this.state.question;
            Options.map((data, index) => {
                optionList.push({"option":`${data}`, "content":`${OptionsContent[index]}`})
            });
            console.log(this.state.OptionTitle);
            const request = await reqAddTitles(type, titleCategory, question, answerList, optionList);
            if (request.code === 200) {
                message.success(request.msg);
            }else {
                message.error(request.msg);
            }
            this.setState({
                question:"",
                optionValue:"",
                titleCategory: "",
                checkedValues:[],
                Options:[
                    "A",
                    "B",
                    "C",
                    "D"
                ],

                OptionsContent:[
                    "",
                    "",
                    "",
                    "",
                ],
                OptionTitle:{
                    type:0,
                    tag: "",
                    question:"",
                    answerList:[],
                    optionList:[],
                }

            })
        }
    };


    //判断
    addJudgeTitles = async () => {

        if (this.state.judgeValue === "")
            message.error("请勾选正确答案");
        else if (this.state.question === "")
            message.error("请输入题目");
        else {
            this.state.JudgeTitle.answerList.push(this.state.judgeValue);
            this.state.JudgeTitle.question = this.state.question;
            const {titleCategory} = this.state;
            const {type, question, answerList, optionList} = this.state.JudgeTitle;
            console.log(this.state.JudgeTitle);
            const request = await reqAddTitles(type, titleCategory, question, answerList, optionList);
            if (request.code === 200) {
                message.success(request.msg);
            }else {
                message.error(request.msg);
            }
            this.setState({
                question:"",
                judgeValue:"",
                titleCategory: "",
                JudgeTitle:{
                    type:0,
                    tag: "",
                    question:"",
                    answerList:[],
                    optionList:[
                        {
                            option:"A",
                            content:"正确"
                        },
                        {
                            option:"B",
                            content:"错误"
                        },
                    ],
                }

            })
        }
    };

    showModal = () => {
        this.setState({
            modalVisible:true
        })
    };
    /**
     * 响应点击取消: 隐藏题库选择框
     */
    handleCancel = () => {
        // this.form.resetFields();
        // 隐藏确认框
        this.setState({
            modalVisible: false,
        })
    };
    render() {
        const {titleCategory,modalVisible} = this.state;
        console.clear();
        const extra = (
            <Button type="primary" onClick={this.showModal}>
                <Icon type="import"/>
                <span>批量导入试题</span>
            </Button>
        );
        return(
            <Card extra={extra}>
                <div>
                    <span style={{fontWeight:"bold", fontSize:18}}>试题类型:</span>
                    <Select onChange={this.handleChange} placeholder="请选择试题类型" defaultValue="单选题" style={{width: 150, marginLeft:5}}>
                        <Option value="单选题">单选题</Option>
                        <Option value="多选题">多选题</Option>
                        <Option value="判断题">判断题</Option>
                        <Option value="填空题">填空题</Option>
                        <Option value="简答题">简答题</Option>
                    </Select>
                    <span style={{fontWeight:"bold", fontSize:18, marginLeft:32}}>试题分类:</span>
                    <Input placeholder="请输入试题分类" value={titleCategory} style={{width: 150,marginLeft  :5}} onChange={this.onChange}/>
                </div>
                <div>
                    {this.changeTitleType()}
                </div>
                <Modal
                    title="批量导入试题"
                    visible={modalVisible}
                    onCancel={this.handleCancel}
                    width="1400px"
                    maskClosable={false}
                    style={{ top: 20 }}
                    destroyOnClose={true}
                    footer={[
                        <Button type="primary" onClick={this.addSubjects}>
                            <Icon type="import"/>
                            <span>导入试题</span>
                        </Button>,
                        <Button style={{backgroundColor:'orange',color:'white'}} onClick={this.handleCancel}>
                            <Icon type="close"/>
                            <span>关闭</span>
                        </Button>
                    ]}
                >
                    <ImportTitles/>
                </Modal>
            </Card>
        )
    }
}