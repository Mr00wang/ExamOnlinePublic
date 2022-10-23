import React,{Component} from "react";
import {Card, message, Select, Button, Table, Icon, Tag, Input, Modal} from "antd";
import {reqLookTitles} from "../../../api";
import LinkButton from "../../../component/link-button";
import memoryUtils from "../../../utils/memoryUtils";
import ShowTitle from "../../../component/show-title";
const {Option} = Select;
/*

 */
export default class SelectSubjects extends Component{

    state = {
        titleType: '',
        tag:'',
        titles:[],
        loading:false,
        selectedRowKeys: [],
        selectedRows: [],
        modalVisible:false
    };

    initColumns = () => {
        this.columns = [
            {
                title: "试卷题号",
                width: 100,
                render: title => {
                    return(
                        <LinkButton onClick={() => {this.showModal(title)}}>
                            {title.id}
                        </LinkButton>
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
                title: "标准答案",
                render: (record) => (
                    <span>
                     {
                         record.answerList.map(item => {
                             let color ='green';
                             let answerCode = "";
                             /* if (item.answer === 'loser') {
                                  color = 'volcano';
                              }*/
                             if (record.type !== 1) {
                                 answerCode = String.fromCharCode(64 + parseInt(item.answer));
                             } else {
                                 answerCode = item.answer;
                             }
                             return (
                                 <Tag color={color} key={item.answer}>
                                     {answerCode}
                                 </Tag>
                             );
                         })
                     }
                  </span>
                )
            },
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
                titles : titles.filter(item => {
                    return memoryUtils.subject.every(item2 => {
                        return item.id !== item2.id
                    })
                })
            });

        } else {
            message.error(request.error);
        }

    };

    componentDidMount() {
        this.getTitles();
    }

    handleChange = (value) => {
        this.setState({
            titleType: value,
        },() => {})
    };

    TagChange = (e) => {
        this.setState({
            tag: e.target.value,
        },() => {})
    };

    searchTitle = async () => {
        const {tag, titleType} = this.state;
        let type = titleType;
        if (type === '单选题')
            type = 0;
        else if (type === '填空题')
            type = 1;
        else if (type === '多选题')
            type = 3;
        else if (type === '判断题')
            type = 4;
        this.setState({loading:true});
        const request = await reqLookTitles(type, tag);
        this.setState({loading: false});
        if (request.code === 200) {
            const titles = request.data;
            this.setState({
                titles : titles.filter(item => {
                    return memoryUtils.subject.every(item2 => {
                        return item.id !== item2.id
                    })
                })
            }, () => {});
            message.success("查询成功！")

        } else {
            message.error("查询失败！");
        }
    };

    reset = () => {
        this.setState({
            titleType: "",
            tag:"",
        });
    };

    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.setState({
            selectedRowKeys,
            selectedRows
        }, () => {this.props.selectedRows(selectedRows)});
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
        const {titles, loading, titleType, tag, modalVisible} = this.state;
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                this.onSelectChange(selectedRowKeys, selectedRows)
            },
        };

        const title = this.title || {}
        const subject = (
          <div>
              <span>试题类型</span>
              <Select  placeholder="试题类型" onChange={this.handleChange}   style={{width: 150, marginLeft:5}} value={titleType}>
                  <Option value="单选题">单选题</Option>
                  <Option value="多选题">多选题</Option>
                  <Option value="填空题">填空题</Option>
                  <Option value="判断题">判断题</Option>
              </Select>&nbsp;&nbsp;
              <span>试题分类</span>
              <Input
                  placeholder="试题分类"
                  onChange={this.TagChange}
                  value={tag}
                  style={{width:150,marginLeft:5}}
              />
          </div>
        );

        const extra = (
            <div>
                <Button type="primary" onClick={this.searchTitle}>
                    <Icon type="search" />
                    <span>查询</span>
                </Button>&nbsp;&nbsp;&nbsp;&nbsp;
                <Button type="primary" onClick={this.reset}>
                    <Icon type="sync"/>
                    <span>重置</span>
                </Button>
            </div>
        );
        return(
            <Card title={subject} extra={extra}>
                <Table
                    rowSelection={rowSelection}
                    bordered
                    rowKey="id"
                    loading={loading}
                    columns={this.columns}
                    dataSource={titles}
                    pagination={{showSizeChanger:true, showQuickJumper:true, size: "small"}}
                    scroll={{ y: 300 }}
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