import React,{Component} from "react";
import {Card, message, Table} from "antd";
import {formateDate1} from "../../../utils/dateUtils";
import {reqGetApplyCommit} from "../../../api";
import memoryUtils from "../../../utils/memoryUtils";

/*

 */

export default class MyInform extends Component{

    state = {
        groups:[],
        loading:false,
    };

    initColumn = () => {
        this.columns = [
            {
                title: '群号',
                dataIndex: 'groupId', //显示数据对应的属性名
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
        ];
    };

    getGroup = async () => {
      const request = await reqGetApplyCommit('',memoryUtils.student.userId);
      this.setState({loading:true});
      if (request.code === 200) {
          const groups = request.data;
          this.setState({
              groups,
              loading:false
          })
      }else {
          message.error(request.msg);
      }
    };
    componentDidMount() {
        this.getGroup()
    }

    componentWillMount() {
        this.initColumn();
    }
    render() {
        const {groups, loading} = this.state;
        return(
            <Card>
                <Table
                    bordered={true}
                    rowKey='id'
                    loading={loading}
                    dataSource={groups}
                    columns={this.columns}
                    pagination={{defaultPageSize: 5,showQuickJumper: true, pageSizeOptions : [5,10,15,20]}}
                />
            </Card>
        )
    }

}