import React,{Component} from "react";
import {Button, Card, Form, Icon, Input, message, Modal, Table, Tag, Popconfirm} from "antd";
import memoryUtils from "../../../utils/memoryUtils";
import { DndProvider, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import './addPractice.less'
import SelectSubjects from "./selectSubjects";
import CreatePractice from "./createPractice"
import LinkButton from "../../../component/link-button";
import {reqAddTest} from "../../../api";
/*

 */

//单元格编辑
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    state = {
        editing: false,
    };

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({ editing }, () => {
            if (editing) {
                this.input.focus();
            }
        });
    };

    save = async e => {
        const { record, handleSave } = this.props;
        await this.form.validateFields((error, values) => {
            if (error && error[e.currentTarget.id]) {
                return;
            }
            this.toggleEdit();
            handleSave({ ...record, ...values });
        });
    };

    renderCell = form => {
        this.form = form;
        const { children, dataIndex, record, title } = this.props;
        const { editing } = this.state;
        return editing ? (
            <Form.Item style={{ margin: 0 }}>
                {form.getFieldDecorator(dataIndex, {
                    rules: [
                        {
                            required: true,
                            message: `${title} is required.`,
                        },
                    ],
                    initialValue: record[dataIndex],
                })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{ paddingRight: 24 }}
                onClick={this.toggleEdit}
            >
                {children}
            </div>
        );
    };

    render() {
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            children,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editable ? (
                    <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
                ) : (
                    children
                )}
            </td>
        );
    }
}

//表格拖拽
let dragingIndex = -1;

class BodyRow extends React.Component {
    render() {
        const { isOver, connectDragSource, connectDropTarget, moveRow, ...restProps } = this.props;
        const style = { ...restProps.style, cursor: 'move' };

        let { className } = restProps;
        if (isOver) {
            if (restProps.index > dragingIndex) {
                className += ' drop-over-downward';
            }
            if (restProps.index < dragingIndex) {
                className += ' drop-over-upward';
            }
        }

        return connectDragSource(
            connectDropTarget(<tr {...restProps} className={className} style={style} />),
        );
    }
}

const rowSource = {
    beginDrag(props) {
        dragingIndex = props.index;
        return {
            index: props.index,
        };
    },
};

const rowTarget = {
    drop(props, monitor) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }

        // Time to actually perform the action
        props.moveRow(dragIndex, hoverIndex);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex;
    },
};

/*const DragableBodyRow = DropTarget('row', rowTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
}))(
    DragSource('row', rowSource, connect => ({
        connectDragSource: connect.dragSource(),
    }))(BodyRow),
);*/

export default class AddPractice extends Component{
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "试卷题号",
                dataIndex: "id",
                width: 100,
                // fixed: "left"

                render: id => {
                    return(
                        <LinkButton>
                            {id}
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
                             return (
                                 <Tag color="green">
                                     {answer.toUpperCase()}
                                 </Tag>
                             );
                         })
                     }
                  </span>
                )
            },
            {
                title: '试题分数',
                dataIndex: "subjectScore",
                width: 180,
                editable:true,
            },
            {
                title: '操作',
                width: 100,
                // fixed: 'right',
                render: (subject) => (
                    <span>
                          <Popconfirm title="Are you sure？" okText="Yes" cancelText="No" onConfirm={() => this.deleteSelectedSubject(subject)}>
                               <Button  type="danger" >删除</Button>
                          </Popconfirm>

                  </span>
                )
            }
        ];

    }
    state = {
        modalVisible:false,
        createModal:false,
        subject : [],
        selectedRows : [],
        loading : false
    };


   /* initColumns = () => {

    };*/

    getSubjects = () => {
      this.setState({loading:true});
      const subject = memoryUtils.subject;
      subject.map(data => {
          data['subjectScore'] = 2
      });
      this.setState({
          loading:false,
          subject
      })
    };
    componentDidMount() {
        this.getSubjects();
    }

    handleSave = row => {
        const newData = [...this.state.subject];
        const index = newData.findIndex(item => row.id === item.id);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        this.setState({ subject: newData });
        memoryUtils.subject = [...newData];
        console.log(memoryUtils.subject);
        // console.log(this.state.subject)
    };

    moveRow = (dragIndex, hoverIndex) => {
        const { subject } = this.state;
        const dragRow = subject[dragIndex];

        this.setState(
            update(this.state, {
                subject: {
                    $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]],
                },
            }),
        );
    };

    showSubjects = () => {
        this.setState({
            modalVisible:true
        })
    };

    showCreate = () => {
        this.setState({
            createModal:true
        })
    };

    deleteSelectedSubject = title => {
      message.success(1);
      console.log(title.id);
      this.setState({
          subject: this.state.subject.filter(item => item.id !== title.id)
      });
      memoryUtils.subject = this.state.subject;
    };

    /**
     * 响应点击取消: 隐藏题库选择框
     */
    handleCancel = () => {
        // 清除输入数据
        this.setState({
            selectedRows:[]
        });
        // this.form.resetFields()
        // 隐藏确认框
        this.setState({
            modalVisible: false,
            createModal: false

        })
    };

    //试题选项数量的变化
    selectedRows = (data) => {
        data.map(data => {
            data['subjectScore'] = 2
        });
      this.setState({
          selectedRows:data
      },() => {console.log(data)})
    };

    addSubjects = () => {
        const {subject, selectedRows} = this.state;
        this.setState({
            subject: [...subject, ...selectedRows]
        },() => {
            console.log(this.state.subject);
            memoryUtils.subject = this.state.subject;
        });

    };

    addSubjectsAndClose = () => {
        const {subject, selectedRows} = this.state;
        console.log(this.state.subject);
        console.log(this.state.selectedRows);

        this.setState({
            subject: [...subject, ...selectedRows]
        },() => {
            console.log(this.state.subject);
            memoryUtils.subject = this.state.subject;
        });
        memoryUtils.subject = this.state.subject;
        // 清除输入数据
        this.setState({
            selectedRows:[]
        });
        // this.form.resetFields()
        // 隐藏确认框
        this.setState({
            modalVisible: false
        })
    };

    createTest = async () => {
        this.form.validateFields(async (err,values) => {
            if (!err) {
                this.setState({
                    createModal: false
                })
                const {name} = values;
                let subjects = [];
                this.state.subject.map(item => {
                    subjects.push({subjectId:`${item.id}`, subjectScore:item.subjectScore});
                });
                console.log(subjects);
                const request = await reqAddTest(name, subjects);
                if (request.code === 200) {
                    message.success("创建试卷成功");
                    this.setState({
                        subject:[]
                    }, () => {memoryUtils.subject = [];})
                }else {
                    message.error(request.msg);
                }
            }
        })
    };

    render() {
        const {subject, loading, modalVisible, selectedRows, createModal} = this.state;
        const components = {
            body: {
                // row: DragableBodyRow,
                row:EditableFormRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });
        const title = (
          <div>
              <span>请从题库中选取题目并设置<Tag color="red">试题分数</Tag></span>
          </div>
        );
        const extra = (
            <div>
                <Button type="primary" onClick={this.showSubjects}>
                    <Icon type="search"/>
                    <span>从题库中选择</span>
                </Button>&nbsp;&nbsp;&nbsp;&nbsp;
                <Button type="primary" onClick={this.showCreate}>创建试卷</Button>
            </div>
        );
        const count = selectedRows.length;
        return(
            <div>
                <Card title={title} extra={extra}>
                    <DndProvider backend={HTML5Backend}>
                        <Table
                            components={components}
                            bordered={true}
                            rowKey='id'
                            loading={loading}
                            dataSource={subject}
                            rowClassName={() => 'editable-row'}
                            columns={columns}
                            onRow={(record, index) => ({
                                index,
                                moveRow: this.moveRow,
                            })}
                            // scroll={{ x: 1500, y: 400 }}
                            // pagination={{defaultPageSize: 5,showQuickJumper: true}}
                        />
                        <Modal
                            title="从题库中选择"
                            visible={modalVisible}
                            onCancel={this.handleCancel}
                            width="1400px"
                            maskClosable={false}
                            style={{ top: 10 }}
                            destroyOnClose={true}
                            footer={[
                                <Button type="primary" onClick={this.addSubjects}>
                                    <Icon type="check"/>
                                    <span>选择{count ? `(${count})项` : ''}</span>
                                </Button>,
                                <Button type="primary" onClick={this.addSubjectsAndClose}>
                                    <Icon type="check"/>
                                    <span>选择并关闭{count ? `(${count})项` : ''}</span>
                                </Button>,
                                <Button style={{backgroundColor:'orange',color:'white'}} onClick={this.handleCancel}>
                                    <Icon type="close"/>
                                    <span>关闭</span>
                                </Button>
                            ]}
                        >
                            <SelectSubjects
                                deleteRows = {selectedRows}
                                selectedRows = {data => this.selectedRows(data)}
                            />
                        </Modal>
                        <Modal
                            title="创建试卷"
                            visible={createModal}
                            onOk={this.createTest}
                            onCancel={this.handleCancel}
                            okText="创建"
                            cancelText="取消"
                        >
                            <CreatePractice
                                setForm={(form) => {this.form = form}}
                            />
                        </Modal>

                    </DndProvider>
                </Card>
            </div>
        )
    }

}