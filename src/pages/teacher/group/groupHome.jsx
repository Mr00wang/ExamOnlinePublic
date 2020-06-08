import React,{Component} from "react";
import {Card, Button, Table, message, Icon, Modal} from "antd";
import AddGroup from "./addgroup";
import UpdateGroup from "./updategroup";
import {formateDate1} from "../../../utils/dateUtils";
import {reqAddGroup, reqDeleteGroup, reqSearchGroup, reqUpdateGroup} from "../../../api";
import memoryUtils from "../../../utils/memoryUtils";
/*

 */

export default class GroupHome extends Component{

    state = {
        loading: false,
        showStatus: 0, // 标识添加/更新的确认框是否显示, 0: 都不显示, 1: 显示添加, 2: 显示更新
        groups:[],
    };

    initColumn = () => {
        this.columns = [
            {
                title: '群号',
                dataIndex: 'id', //显示数据对应的属性名
            },
            {
                title: '分组名称',
                dataIndex: 'groupName', //显示数据对应的属性名
            },
            {
                title: '创建时间',
                dataIndex: 'createTime', //显示数据对应的属性名
                render: (createTime) => (
                    <span>
                        {formateDate1(createTime)}
                    </span>
                )
            },

            {
                title: '操作',
                width: 300,
                render: (group) => (
                    <span>
                        <Button onClick={() => this.props.history.push("/teacher/group/stu", {group})} type="primary" style={{marginRight: 10 }} >管理</Button>
                        <Button onClick={() => this.showUpdate(group)} type="primary" style={{marginRight: 10 }}>修改</Button>
                        <Button onClick={() => this.deleteGroup(group)} type="danger">删除</Button>
                    </span>
                )
            },
        ];

    };

    getGroup = async () => {
         //在发请求前显示loading
         this.setState({loading: true});
         const result = await reqSearchGroup(memoryUtils.user.userId);
         this.setState({loading: false});
         if (result.code === 200){
             const groups = result.data;
             //更新状态
             this.setState({
                 groups
             })
         }else{
             message.error('获取成员列表失败')
         }
    };


    componentDidMount() {
        this.getGroup()
    }

    componentWillMount() {
        this.initColumn();
    }

    /**
     * 响应点击取消: 隐藏确定框
     */
    handleCancel = () => {
        // 清除输入数据
        this.form.resetFields()
        // 隐藏确认框
        this.setState({
            showStatus: 0
        })
    };

    /**
     *显示人员添加的确认框
     */
    showGroup = () => {
        this.setState({
            showStatus: 1
        })
    };

    /**
     *添加成员请求
     */
    addGroup = () => {
        this.form.validateFields(async (err,values) => {
            if(!err) {
                // 隐藏确认框
                this.setState({
                    showStatus: 0
                });
                //准备数据
                const {groupName} = values
                //清除
                this.form.resetFields();
                const result = await reqAddGroup(groupName);
                if(result.code === 200){
                    this.getGroup();
                    message.success("创建成功");
                }else{
                    message.error(result.msg)
                }
            }
        })
    };

    /*
    修改人员请求
     */
    updateGroup= () => {

        this.form.validateFields(async (err,values) => {
            if(!err) {
                //1,隐藏确定框
                this.setState({
                    showStatus: 0
                });
                message.success("测试：修改成功")
                //准备数据
                const {id, groupName} = values;
                //清除
                this.form.resetFields();
                const result = await reqUpdateGroup(id, groupName, memoryUtils.user.userId);
                if(result.code === 200){
                    message.success("修改成功");
                    this.getGroup();
                }else{
                    message.error("修改失败");
                }
            }
        })
    };

    /**
     *显示修改的确认框
     */
    showUpdate = (group) => {
        // 保存分类对象
        this.group = group;
        //console.log(user)
        //console.log(user.memberName)
        // 更新状态
        this.setState({
            showStatus: 2
        })
    };

    deleteGroup = (group) => {
        //console.log(user)
        Modal.confirm({
            title: `确认删除${group.groupName}吗?`,
            onOk: async () => {
                //发送请求
                message.success("测试：删除成功")
                const result = await reqDeleteGroup(group.id);
                if(result.code === 200) {
                    message.success(result.msg)
                    this.getGroup();
                }else{
                    message.error(result.msg)
                }
            }
        })
    };
    render() {
        const {groups, showStatus, loading} = this.state;

        //读取指定的分类
        const group = this.group || {};
        const title =  (
            <Button type="primary" onClick={this.showGroup}>
                <Icon type="plus"/>
                <span>添加群组</span>
            </Button>
        );
        return(
            <Card title={title} >
                <Table
                    bordered={true}
                    rowKey='id'
                    loading={loading}
                    dataSource={groups}
                    columns={this.columns}
                    pagination={{defaultPageSize: 5,showQuickJumper: true, pageSizeOptions : [5,10,15,20]}}
                />
                <Modal
                    title="创建群组"
                    visible={showStatus===1}
                    onOk={this.addGroup}
                    onCancel={this.handleCancel}
                >
                    <AddGroup
                        setForm={(form) => {this.form = form}}
                    />
                </Modal>

                <Modal
                    title="修改群组"
                    visible={showStatus===2}
                    onOk={this.updateGroup}
                    onCancel={this.handleCancel}
                >
                    <UpdateGroup
                        id={group.id}
                        groupName={group.groupName}
                        setForm={(form) => {this.form = form}}
                    />
                </Modal>
            </Card>
        )
    }

}