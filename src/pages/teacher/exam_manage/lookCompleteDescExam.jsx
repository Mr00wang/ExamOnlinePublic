import React,{Component} from "react";
import {reqGetCompleteExam} from "../../../api";
import {formateDate1} from "../../../utils/dateUtils";
import {Card, Icon, Table} from "antd";
import LinkButton from "../../../component/link-button";

/*

 */

export default class LookCompleteDescExam extends Component{

    state = {
        data: [],
        loading: false,
        detailName: "",
    };

    initcolumn = () => {
        this.columns = [
            {
                title: '考生备注名',
                dataIndex: 'completeTestPaperUserNoteName', //显示数据对应的属性名
            },
            {
                title: '完成分数',
                dataIndex: 'completeTestPaperScore', //显示数据对应的属性名
            },
            {
                title: '完成时间',
                dataIndex: 'completeTestPaperCreateDate', //显示数据对应的属性名
                render: (completeTestPaperCreateDate) => (
                    <span>
                        {formateDate1(completeTestPaperCreateDate)}
                    </span>
                )
            }
        ]
    };

    getCompletDescExam = async () => {
        const {testPaperId} = this.props.location.state;
        this.setState({loading:true});
        const request = await reqGetCompleteExam(testPaperId);
        if (request.code === 200) {
            const data = request.data;
            this.setState({
                data,
                loading:false
            })
        }
    };

    componentDidMount(): void {
        this.getCompletDescExam();
    }

    componentWillMount(): void {
        this.initcolumn();
    }

    render() {
        const {data, loading} = this.state;
        const {activityName} = this.props.location.state;
        const title = (
            <span>
                <LinkButton onClick={() =>
                    this.props.history.goBack()}>查看考试</LinkButton>
                    <Icon type="arrow-right" style={{marginRight: 5}}/>
                <span>{activityName}</span>
            </span>
        );
        return(
            <Card title={title} >
                <Table
                    bordered={true}
                    rowKey='createCompleteTestPaperUserId'
                    loading={loading}
                    dataSource={data}
                    columns={this.columns}
                    pagination={{defaultPageSize: 5,showQuickJumper: true, pageSizeOptions : [5,10,15,20]}}
                />
            </Card>
        )
    }
}