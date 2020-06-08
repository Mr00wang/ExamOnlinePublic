import React,{Component} from "react";
import {Button, Card, message, Table, Tag, Input, Select, Modal} from "antd";
import {reqLookTitles} from "../../../api";
import LinkButton from "../../../component/link-button";
import ShowTitle from "../../../component/show-title";
const {Search} = Input;
const Option = Select.Option;
/*

 */

export default class LookTitles extends Component{
    state = {
        titles:[],
        loading:false,
        type:'',
        modalVisible: false,
    };

    initColumns = () => {
      this.columns = [
          {
            title: "试卷题号",
            // dataIndex: "id",
            width: 100,
            fixed: "left",
            render: title => {
                return (
                    <LinkButton onClick={() => {this.showModal(title)}}>{title.id}</LinkButton>
                )
            }

          },
          {
              title : "试题题型",
              width: 150,
              dataIndex: "type",
              defaultSortOrder: 'ascend',
              sorter: (a, b) => a.type - b.type,
              render: type => {
                  if (type === 0) {
                      type = '单选题';
                  } else if (type === 1) {
                      type = '填空题'
                  } else if (type === 2) {
                      type = '简答题';
                  } else if (type === 3) {
                      type = '多选题';
                  } else if (type === 4) {
                      type = '判断题'
                  }
                  return(
                      <span>
                          {type}
                      </span>
                  )
              }

          },
          {
             title : "试题分类",
             dataIndex : "tag",
              width : 200
          },
          {
              title : "试卷内容",
              // width: 400,
              dataIndex : "question"
          },
          {
              title: "试题答案",
              dataIndex: "answerList",
              render: answerList => (
                  <span>
                     {
                         answerList.map(answer => {
                             let color = answer.length > 5 ? 'geekblue' : 'green';
                             if (answer === 'loser') {
                                 color = 'volcano';
                             }
                             return (
                                 <Tag color={color} key={answer}>
                                     {answer.toUpperCase()}
                                 </Tag>
                             );
                         })
                     }
                  </span>

              )
          },
          {
              title: '操作',
              width: 180,
              fixed: 'right',
              render: (group) => (
                  <span>
                        <Button  type="primary" style={{marginRight: 10 }}>修改</Button>
                        <Button  type="danger">删除</Button>
                  </span>
              )
          }
      ];
    };

    componentWillMount() {
        this.initColumns();
    }

    getTitles = async () => {
        this.setState({loading: true});
        const request = await reqLookTitles();
        this.setState({loading: false});
        if (request.code === 200) {
            const titles = request.data;
            this.setState({
                titles
            });

        } else {
            message.error(request.error);
        }

    };


    componentDidMount() {
        this.getTitles();
    }

    handleChange = async (value) => {
        let type;
        message.success(value);
        this.setState({
            titleType: value,
        },() => {})
        if (value === '所有') {
            type = "";
        } else if (value === '单选题') {
            type = 0;
        } else if (value === '多选题') {
            type = 3;
        } else if (value === '判断题') {
            type = 4;
        } else if (value === '填空题') {
            type = 1;
        } else if (value === '简答题') {
            type = 2;
        }
        this.setState({loading:true});
        const request = await reqLookTitles(type);

        if (request.code === 200) {
            this.setState({
                titles: request.data,
                loading : false,
                type
            })
        }else {
            message.error(request.msg);
        }
    };

    searchByTag = async (value) => {
        this.setState({loading:true});
        const request = await reqLookTitles(this.state.type, value);

        if (request.code === 200) {
            this.setState({
                titles: request.data,
                loading : false
            })
        }else {
            message.error(request.msg);
        }
    };

    showModal = (title) => {
        this.title = title
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
        const {titles, loading, modalVisible} = this.state;
        const subject = (
            <div>
                <span style={{fontWeight:"bold", fontSize:18}}>试题类型:</span>
                <Select onChange={this.handleChange} placeholder="请选择试题类型" defaultValue="所有" style={{width: 150, marginLeft:5}}>
                    <Option value="所有">所有</Option>
                    <Option value="单选题">单选题</Option>
                    <Option value="多选题">多选题</Option>
                    <Option value="判断题">判断题</Option>
                    <Option value="填空题">填空题</Option>
                    <Option value="简答题">简答题</Option>
                </Select>
            </div>
        );
        const title = this.title || {};
        const extra = (
            <div>
                <Search
                    placeholder="输入试题类型搜索试题"
                    enterButton="Search"
                    // size="large"
                    onSearch={value => this.searchByTag(value)}
                />
            </div>
        );
        return(
            <Card title={subject} extra={extra}>
                <Table
                    bordered={true}
                    rowKey='id'
                    loading={loading}
                    dataSource={titles}
                    columns={this.columns}
                    scroll={{ x: 1500, y: 400 }}
                    pagination={{defaultPageSize: 5,showQuickJumper: true}}
                />
                <Modal
                    title="查看试题"
                    visible={modalVisible}
                    onCancel={this.handleCancel}
                    width="1000px"
                    maskClosable={false}
                    style={{ top: 20 }}
                    destroyOnClose={true}
                >
                    <ShowTitle title={title}/>
                </Modal>
            </Card>
        )
    }

}