import React,{Component} from "react";
import {Button, Card, Icon, Table, Tag, Upload, message} from "antd";
import LinkButton from "../../../component/link-button";
import ExportJsonExcel from "js-export-excel";
import titleTemplateList from "../../../config/titleTemplateConfig"
import * as XLSX from 'xlsx';
import './importTitles.less';
const {Dragger} = Upload;
/*

 */

export default class ImportTitles extends Component{
    state = {
      titles:[],
            tableData: [],
            tableHeader: []
    };

    initColumns = () => {
        this.columns = [
            {
                title: "试卷标号",
                dataIndex: "id",
                width: 100,
                // fixed: "left",
                render: id => {
                    return (
                        <LinkButton>{id}</LinkButton>
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
                width : 150
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
           /* {
                title: '操作',
                width: 180,
                // fixed: 'right',
                render: (group) => (
                    <span>
                        <Button  type="primary" style={{marginRight: 10 }}>修改</Button>
                        <Button  type="danger">删除</Button>
                  </span>
                )
            }*/
        ];
    };

    componentWillMount() {
        this.initColumns();
    }

    ExportToExcel = () => {
        const data = titleTemplateList;
        // const {groupName} = this.state.group;
        var option = {};
        let dataTable = [];
        if (data) {
            for (let i in data) {
                if (data) {
                    console.log(data[i]);
                    const optionA = data[i].optionList.filter(item => item.option === 'A');
                    const optionB = data[i].optionList.filter(item => item.option === 'B');
                    const optionC = data[i].optionList.filter(item => item.option === 'C');
                    const optionD = data[i].optionList.filter(item => item.option === 'D');
                    let obj = {
                        '试题题型': data[i].type,  // '列名': 数据
                        '试题分类': data[i].tag,
                        '试题内容': data[i].question,
                        '选项A': optionA.length !== 0 ? optionA[0].content : "",
                        '选项B': optionB.length !== 0 ? optionB[0].content : "",
                        '选项C': optionC.length !== 0 ? optionC[0].content : "",
                        '选项D': optionD.length !== 0 ? optionD[0].content : "",
                        '标准答案': data[i].answerList.map(item => {
                            return(
                                item
                            )
                        }),
                    };
                    dataTable.push(obj);
                }
            }
        }

        option.fileName = '试题导入模板';  //导出的Excel文件名
        option.datas = [
            {
                sheetData: dataTable,
                sheetName: 'sheet',
                sheetFilter: ['试题题型', '试题分类', '试题内容','选项A','选项B','选项C','选项D','标准答案'],
                sheetHeader: ['试题题型', '试题分类', '试题内容','选项A','选项B','选项C','选项D','标准答案'],
                columnWidths : [5,5,15,10,10,10,10,5],
            }
        ];

        let toExcel = new ExportJsonExcel(option);
        toExcel.saveExcel();
    };

    ImportToJSON = (file) => {
        // 获取上传的文件对象
        const { files } = file.target;
        // 通过FileReader对象读取文件
        const fileReader = new FileReader();
        fileReader.onload = event => {
            try {
                const { result } = event.target;
                // 以二进制流方式读取得到整份excel表格对象
                const workbook = XLSX.read(result, { type: 'binary' });
                // 存储获取到的数据
                let data = [];
                // 遍历每张工作表进行读取（这里默认只读取第一张表）
                for (const sheet in workbook.Sheets) {
                    // esline-disable-next-line
                    if (workbook.Sheets.hasOwnProperty(sheet)) {
                        // 利用 sheet_to_json 方法将 excel 转成 json 数据
                        data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                        // break; // 如果只取第一张表，就取消注释这行
                    }
                }
                // 最终获取到并且格式化后的 json 数据
                message.success('上传成功！');
                console.log(data);
            } catch (e) {
                // 这里可以抛出文件类型错误不正确的相关提示
                console.log(e)
                // message.error('文件类型不正确！');
            }
        };
        // 以二进制方式打开文件
        fileReader.readAsBinaryString(files[0]);
    };

    uploadFilesChange(file) {
        // 通过FileReader对象读取文件
        const fileReader = new FileReader();
        fileReader.onload = event => {
            try {
                const {result} = event.target;
                // 以二进制流方式读取得到整份excel表格对象
                const workbook = XLSX.read(result, {type: 'binary'});
                // 存储获取到的数据
                let data = {};
                // 遍历每张工作表进行读取（这里默认只读取第一张表）
                for (const sheet in workbook.Sheets) {

                    let tempData = [];
                    // esline-disable-next-line
                    if (workbook.Sheets.hasOwnProperty(sheet)) {
                        // 利用 sheet_to_json 方法将 excel 转成 json 数据
                        console.log(sheet);
                        data[sheet] = tempData.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                    }
                }
                const excelData = data.Sheet1;
                const excelHeader = [];
                // 获取表头
                for (const headerAttr in excelData[0]) {
                    const header = {
                        title: headerAttr,
                        dataIndex: headerAttr,
                        key: headerAttr
                    };
                    excelHeader.push(header);
                }
                // 最终获取到并且格式化后的 json 数据
                message.success('上传成功！')
                this.setState({
                    tableData: excelData,
                    tableHeader: excelHeader,
                })
                console.log(this.state)
            } catch (e) {
                // 这里可以抛出文件类型错误不正确的相关提示
                console.log(e);
                message.error('文件类型不正确！');
            }
        }
        // 以二进制方式打开文件
        fileReader.readAsBinaryString(file.file);
    }
    render() {
        const {titles} = this.state;
        const title = (
            <div style={{ marginTop: 100 }}>
                <Dragger name="file"
                         beforeUpload={function () {
                             return false;
                         }}
                         onChange={this.uploadFilesChange.bind(this)}
                         showUploadList={false}>
                    <p className="ant-upload-text">
                        <span>点击上传文件</span>
                        或者拖拽上传
                    </p>
                </Dragger>
            </div >
        );
        const extra = (
            <div>
                <Button type="primary" onClick={this.ExportToExcel}>
                    <Icon type="download"/>
                    <span>下载模板</span>
                </Button>
            </div>
        );
        return(
            <Card title={title} extra={extra}>
                <Table
                    bordered={true}
                    rowKey='id'
                    // loading={loading}
                    dataSource={this.state.tableData}
                    columns={this.state.tableHeader}
                    scroll={{ x: 1500, y: 400 }}
                    pagination={{defaultPageSize: 5,showQuickJumper: true}}
                />
            </Card>
        )
    }
}