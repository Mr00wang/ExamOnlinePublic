import React, {Component} from "react";
import {Button, Card, message, Table, Input, Modal} from "antd";
import {formateDate1} from "../../../utils/dateUtils";
import {
    reqApplyAddGroup,
    reqDeleteGroup,
    reqLookJoinGroup,
    reqSearchGroup
} from "../../../api";
import memoryUtils from "../../../utils/memoryUtils";
import CommitGroup from "./commitGroup";

const {Search} = Input;

/*

 */

export default class MyGroup extends Component {
    state = {
        loading: false,
        showStatus: 0, // 标识添加/更新的确认框是否显示, 0: 都不显示, 1: 显示添加, 2: 显示更新
        groups: [],
        value: "",
        textAreaValue: "",
        CommitVisible: false
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
                width: 100,
                render: (group) => (
                    <span>
                        <Button type="danger" onClick={() => {
                            this.exitGroup(group)
                        }} disabled>退出</Button>
                    </span>
                )
            },
        ];

        this.columns2 = [
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
                width: 100,
                render: (group) => (
                    <span>
                        <Button type="primary" onClick={() => {
                            this.showModal(group)
                        }}>申请加入</Button>
                    </span>
                )
            },
        ];

    };

    getGroup = async () => {
        //在发请求前显示loading
        this.setState({loading: true});
        const result = await reqLookJoinGroup(memoryUtils.student.userId);
        this.setState({loading: false});
        if (result.code === 200) {
            const groups = result.data;
            //更新状态
            this.setState({
                groups
            })
        } else {
            message.error('获取成员列表失败,正在反馈技术人员！')
        }
    };

    componentDidMount() {
        this.getGroup()
    }

    componentWillMount() {
        this.initColumn();
    }

    exitGroup = async (group) => {
        const request = await reqDeleteGroup(group.id, memoryUtils.student.userId);
        if (request.code === 200) {
            message.success('退出成功！');
        } else {
            message.error(request.msg);
        }
        ;
        this.setState({
            titles: this.state.titles.filter(item => item.id !== group.id)

        })
    };

    showModal = (group) => {
        this.group = group;
        this.setState({
            CommitVisible: true
        })
    };


    CommitGroup = () => {
        this.form.validateFields(async (err, values) => {
            if (!err) {
                // 隐藏确认框
                this.setState({
                    CommitVisible: false
                });
                //准备数据
                const {desc, id} = values;
                //清除
                this.form.resetFields();
                const request = await reqApplyAddGroup(id, memoryUtils.student.userId, desc);
                if (request.code === 200) {
                    message.success("提交成功，等待审核！");
                } else {
                    message.error("提交失败，请稍后再试！");
                }

            }
        })
    };

    /**
     * 响应点击取消: 隐藏确定框
     */
    handleCancel = () => {
        // 清除输入数据
        this.form.resetFields();
        // 隐藏确认框
        this.setState({
            CommitVisible: false
        })
    };


    searchTest = async (value) => {
        const groupMasterId = value === "" ? memoryUtils.student.userId : "";
        const request = await reqSearchGroup(groupMasterId, value);
        if (request.code === 200) {
            const groups = request.data;
            this.setState({
                groups,
                value
            });
            if (groups.length === 0) {
                message.warn("没有该群组！");
                return;
            }
            message.success(request.msg);
        } else {
            message.warn(request.msg);
        }
    };

    render() {
        const {groups, loading, value, CommitVisible} = this.state;

        //读取指定的分类
        const group = this.group || {};
        const title = (
            <span>
                <Search
                    placeholder="输入群组ID搜索添加群组"
                    enterButton="Search"
                    style={{width: 400}}
                    // size="large"
                    onSearch={value => this.searchTest(value)}
                />
            </span>
        );

        return (
            <Card title={title}>
                <Table
                    bordered={true}
                    rowKey='id'
                    loading={loading}
                    dataSource={groups}
                    columns={value === "" ? this.columns : this.columns2}
                    pagination={{defaultPageSize: 5, showQuickJumper: true, pageSizeOptions: [5, 10, 15, 20]}}
                />
                <Modal
                    title="加入群组"
                    visible={CommitVisible}
                    okText="提交申请"
                    cancelText="取消"
                    onOk={this.CommitGroup}
                    onCancel={this.handleCancel}
                >
                    <CommitGroup
                        setForm={(form) => {
                            this.form = form
                        }}
                        id={group.id}
                    />
                </Modal>
            </Card>
        )
    }

}