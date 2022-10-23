import React,{Component} from "react";
import {formateDate1} from "../../../utils/dateUtils";
import {reqByGroupCommit, reqGetApplyCommitTeacher, reqRefuseGroupCommit, reqSearchGroup} from "../../../api";
import memoryUtils from "../../../utils/memoryUtils";
import {Button, Card, message, Table, Select} from "antd";
const {Option} = Select;
/*

 */

export default class Inform extends Component{
    state = {
        groupsId:[],
        groups:[],
        loading:false,
        selectedRows: [],
        divideGroup:[],
        groupIdValue:'',
    };

    getGroup = async () => {
        let {groupsId} = this.state;
        const request = await reqSearchGroup(memoryUtils.user.userId);
        if (request.code === 200) {
            const data = request.data;
            data.map(item => {
                groupsId.push(item.id);
            });
            this.setState({
                groupsId,
            }, () => {this.getGroupCommit()})
        }

    };

    getGroupCommit =  () => {
        let {groupsId, groups} = this.state;
        groupsId.map(async (item) =>  {
            const request = await reqGetApplyCommitTeacher(item, "");
            if (request.code === 200) {
                const data = request.data;
                groups = groups.concat(data.filter(item => item.status === 0));
                this.setState({
                    groups
                })
            }else if (request.code === 500) {
                message.error("获取申群通知失败，正在联系技术人员！");
            }
        });
    };

    initColumn = () => {
        this.columns = [
            {
                title: '群号',
                dataIndex: 'groupId', //显示数据对应的属性名
            },
            {
                title: '申请人Id',
                dataIndex: 'userId', //显示数据对应的属性名
            },
            {
                title: '昵称',
                dataIndex: 'nickname', //显示数据对应的属性名
            },
            {
                title: '备注',
                dataIndex: 'desc', //显示数据对应的属性名
            },
            {
                title: '申请时间',
                dataIndex: 'createTime', //显示数据对应的属性名
                render: (createTime) => (
                    <span>
                        {formateDate1(createTime)}
                    </span>
                )
            },
            {
                title: '操作',
                width: 200,
                render: (group) => (
                    <span>
                        <Button onClick={() => this.ByGroupCommit(group.userId)} type="primary" style={{marginRight: 10 }}>通过</Button>
                        <Button onClick={() => this.RefuseGroupCommit(group.userId)} type="danger">拒绝</Button>
                    </span>
                )
            },
        ];
    };

    componentDidMount() {
        this.getGroup()
    }

    componentWillMount() {
        this.initColumn();
    }

    onSelectChange = selectedRows => {
        this.setState({ selectedRows });
    };

    SelectChange = (value) => {
        let group = [];
        const {groups} = this.state;
        group = groups.filter(item => item.groupId === value);
        this.setState({
            divideGroup: group,
            groupIdValue: value,
            selectedRows:[]
        },() => {});
    };

    ByGroupCommit = async (userId) => {
        let userList = [];
        const {groupIdValue} = this.state;
      if (userId === 0) {
          const {selectedRows} = this.state;
          userList = [];
          selectedRows.map(item =>{
              userList.push(item.userId);
          });
      }  else {
          userList = [userId];
      }
      const request = await reqByGroupCommit(userList, groupIdValue);
      if (request.code === 200) {
          message.success("批准成功！");
          this.getGroup();
      }else {
          message.error("批准失败！");
      }
    };

    RefuseGroupCommit = async (userId) => {
        let userList = [];
        const {groupIdValue} = this.state;
        if (userId === 0) {
            const {selectedRows} = this.state;
            userList = [];
            selectedRows.map(item =>{
                userList.push(item.userId);
            });
        }  else {
            userList = [userId];
        }
        const request = await reqRefuseGroupCommit(userList, groupIdValue);
        if (request.code === 200) {
            message.success("拒绝成功！");
            this.getGroup();
        }else {
            message.error("拒绝失败！");
        }
    };
    render() {
        const {divideGroup, loading, groupsId} = this.state;
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                this.onSelectChange(selectedRows)
            },
        };
        const title = (
            <div>
                <span>请选择群组</span>&nbsp;&nbsp;
                <Select
                    placeholder="请选择群组"
                    // size="large"
                    style={{width:200}}
                    onChange={this.SelectChange}
                    defaultValue={groupsId.length !== 0 ? groupsId[0] : ""}
                >
                    {
                        groupsId.map(item => {
                            return(
                                <Option value={item}>{item}</Option>
                            )
                        })
                    }
                </Select>
            </div>
        );
        const extra = (
          <div>
              <span>
                  <Button type="primary" onClick={() => {this.ByGroupCommit(0)}}>批量通过</Button>
              </span>&nbsp;&nbsp;&nbsp;&nbsp;
              <span>
                  <Button type="danger" onClick={() => {this.RefuseGroupCommit(0)}}>批量拒绝</Button>
              </span>
          </div>
        );
        return(
            <Card title={title} extra={extra}>
                <Table
                    rowSelection={rowSelection}
                    bordered={true}
                    rowKey='id'
                    loading={loading}
                    dataSource={divideGroup}
                    columns={this.columns}
                    pagination={{defaultPageSize: 5,showQuickJumper: true, pageSizeOptions : [5,10,15,20]}}
                />
            </Card>
        )
    }

}