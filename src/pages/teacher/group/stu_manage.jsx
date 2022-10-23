import React,{Component} from "react";
import {Card, Table, Icon, Button, Modal, message} from "antd";
import AddForm from "./addform";
import UpdateForm from "./updateform";
import ExportJsonExcel from 'js-export-excel'
import LinkButton from "../../../component/link-button";
import {reqApplyAddGroup, reqDeleteGroupUser, reqGetGroupUser} from "../../../api";

/*

 */

export default class StudentManage extends Component{
    //读取传过来的状态属性
    state = {
        loading: false,
        showStatus: 0, // 标识添加/更新的确认框是否显示, 0: 都不显示, 1: 显示添加, 2: 显示更新
        detailName: '',
        users: [],
        group: this.props.location.state.group,
    };

    initColumn = () => {
      this.columns = [
          {
              title: 'ID',
              dataIndex: 'id', //显示数据对应的属性名
          },
          {
              title: '用户名',
              dataIndex: 'username', //显示数据对应的属性名
          },
          {
              title: '昵称',
              dataIndex: 'nickname', //显示数据对应的属性名
          },
          {
              title: '操作',
              width: 200,
              render: (user) => (
                  <span>
                      {/*<Button type="primary" onClick={() => this.showUpdate(user)} style={{marginRight: 10 } }>修改</Button>*/}
                      <Button onClick={() => this.deleteUser(user)} type="danger">删除</Button>
                  </span>
              )
          },
      ];
    };

    getUsers = async () => {
        const {id} = this.state.group;
        this.setState({loading:true});
        const request = await reqGetGroupUser(id);
        if (request.code === 200) {
            this.setState({
                users: request.data
            })
        }else
            message.error(request.msg);
        this.setState({loading:false});
    };


    /**
     * 第一次加载
     */
    componentWillMount() {
        this.initColumn();
    }

    /**
     * 获取信息
     */
    componentDidMount() {
        this.getUsers();
    }
    /**
     * 响应点击取消: 隐藏确定框
     */
    handleCancel = () => {
        // 清除输入数据
        this.form.resetFields();
        // 隐藏确认框
        this.setState({
            showStatus: 0
        })
    };

    /**
     *显示人员添加的确认框
     */
    showAdd = () => {
        this.setState({
            showStatus: 1
        })
    };

    /**
     *添加成员请求
     */
    addUser = () => {
        this.form.validateFields(async (err,values) => {
            if(!err) {
                // 隐藏确认框
                this.setState({
                    showStatus: 0
                });
                const {groupId, userId} = values;
                this.form.resetFields();
                const request = await reqApplyAddGroup(groupId, userId);
                if (request.code === 200) {
                    message.success("邀请成功！");
                    this.getUsers();

                } else
                    message.error(request.msg);
            }
        })
    };

    /*
    修改人员请求
     */
    updateUser = () => {

        this.form.validateFields(async (err,values) => {
            if(!err) {
                //1,隐藏确定框
                this.setState({
                    showStatus: 0
                })
                message.success("修改成功")
            }
        })
    };

    /**
     *显示修改的确认框
     */
    showUpdate = (user) => {
        // 保存分类对象
        this.user = user
        // 更新状态
        this.setState({
            showStatus: 2
        })
    };

    /**
     *删除指定用户
     */
    deleteUser = async (user) => {
        const {id} = this.state.group;
        Modal.confirm({
            title: `确认删除${user.nickname}吗?`,
            onOk: async () => {
                //发送请求
                const request = await reqDeleteGroupUser(id, user.id);
                if (request.code === 200) {
                    message.success("删除成功");
                    this.getUsers();
                } else
                    message.error(request.msg);
            }
        })
    };

    ExportToExcel = () => {
        const data = this.state.users;
        const {groupName} = this.state.group;
        var option = {};
        let dataTable = [];
        if (data) {
            for (let i in data) {
                if (data) {
                    let obj = {
                        '用户名': data[i].username,  // '列名': 数据
                        '昵称': data[i].nickname,
                        '分组': groupName,
                        // 'totalTime': moment(data[i].stockDate).format('DD/MM/YYYY')
                    };
                    dataTable.push(obj);
                }
            }
        }

        option.fileName = '考生信息';  //导出的Excel文件名
        option.datas = [
            {
                sheetData: dataTable,
                sheetName: 'sheet',
                sheetFilter: ['用户名', '昵称', '分组'],
                sheetHeader: ['用户名', '昵称', '分组'],
                columnWidths : [10,10,10],
            }
        ];

        let toExcel = new ExportJsonExcel(option);
        toExcel.saveExcel();
    };


    render() {
        const {users, loading, showStatus} = this.state;
        const {groupName, id} = this.state.group;
        //读取指定的分类
        const user = this.user || {};
        const title = (
            <span>
                <LinkButton onClick={() =>
                    this.props.history.goBack()}>群组</LinkButton>
                    <Icon type="arrow-right" style={{marginRight: 5}}/>
                <span>{groupName}</span>
            </span>
        );
        const extra = (
            <span>
                 <Button type="primary" style={{marginRight: 10}} onClick={this.showAdd}>
                    <Icon type="plus"/>
                    <span>添加</span>
                </Button>
                <Button type="primary" onClick={this.ExportToExcel}>
                    <Icon type="download"/>
                    <span>导出Excel</span>
                </Button>
            </span>

        );

        return(
            <Card title={title} extra={extra}>
                <Table
                    bordered={true}
                    rowKey='index'
                    loading={loading}
                    dataSource={users}
                    columns={this.columns}
                    pagination={{defaultPageSize: 5,showQuickJumper: true, showSizeChanger: true,pageSizeOptions : [5,10,15,20,30,50]}}
                />
                <Modal
                    title="人员添加"
                    visible={showStatus===1}
                    onOk={this.addUser}
                    onCancel={this.handleCancel}
                >
                    <AddForm
                        setForm={(form) => {this.form = form}}
                        groupName = {groupName}
                        groupId = {id}
                    />
                </Modal>

                <Modal
                    title="修改人员"
                    visible={showStatus===2}
                    onOk={this.updateUser}
                    onCancel={this.handleCancel}
                >
                    <UpdateForm
                        username={user.username}
                        nickname={user.nickname}
                        groupName={user.groupName}
                        setForm={(form) => {this.form = form}}
                    />
                </Modal>
            </Card>
        )
    }

}