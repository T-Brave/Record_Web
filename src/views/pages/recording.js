import React from 'react';
import { getFilesList, deleteFile, editfile, getFileFloder } from '../../api/getRecordingData';
import { Card, Avatar, Tooltip, Col, Row, Modal, Button, message, Input, Empty, Radio, Table, Select, DatePicker  } from 'antd';
import { EditOutlined, ProfileOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import locale from 'antd/es/date-picker/locale/zh_CN';
const { confirm } = Modal;
const { Meta } = Card;
const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Search } = Input;
class Recording extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recordingData: [],
            playwav_modal: false,
            wav_src: '',
            detail_modal:false,
            edit_modal: false,
            id: "",
            server_id: "",
            filename: "",
            detail: "",
            time: "",
            serveridData:[],
            total:0,

            serachId:"",
            rectype: "0",
            startEndTime:[],
            searchTxt:""
        };
    }

    componentDidMount() {
        this.getFileFloderData();
        this.getFilesData();
    }

    getFilesData = () => {
        let _this = this;
        getFilesList()
        .then(response => {
            if (response.data.data.filelist) {
                _this.setState({
                    recordingData: response.data.data.filelist,
                    total: response.data.total
                });
            }else{
                _this.setState({
                    recordingData: [],
                    total: 0
                });
            }
        })
        .catch(error => {
            _this.error("axios error!")
        });
    };

    getFileFloderData = () => {
        let _this = this;
        getFileFloder()
        .then(response => {
            if (response.data.data.serverid) {
                _this.setState({
                    serveridData:response.data.data.serverid
                })
            }
        })
        .catch(error => {
            _this.error("axios error!")
        });
    };

    deletefile = (id) => {
        let _this = this;
        let data = {
            "id" : id
        }
        confirm({
            title: '是否删除该文件?',
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk() {
                deleteFile(data).then(response => {
                    if(response.data.success){
                        _this.success("删除成功!")
                        _this.getFilesData();
                    }else{
                        _this.error("删除失败: " + response.data.data)
                    }
                }).catch(error => {
                    _this.error("axios error!")
                })
            },
            onCancel() {
            //   console.log('Cancel');
            },
        });
    }

    detailfile = (item) => {
        let _this = this;
        _this.setState({
            detail_modal:true,
            id: item["id"],
            server_id: item["server_id"],
            filename: item["filename"],
            detail: item["detail"],
            time: item["uploadtime"]
        })
    }

    editfileshow = (item) => {
        let _this = this;
        _this.setState({
            edit_modal:true,
            id: item["id"],
            server_id: item["server_id"],
            filename: item["filename"],
            detail: item["detail"],
            time: item["uploadtime"]
        })
    }

    saveEditfile = () => {
        let _this = this;
        let data = {
            "id": _this.state.id,
            "filename": _this.state.filename,
            "detail": _this.state.detail
        }
        editfile(data).then(response => {
            if(response.data.success){
                _this.success("修改成功!");
                _this.getFilesData();
            }else{
                _this.error("修改失败: " + response.data.data)
            }
        }).catch(error => {
            _this.error("axios error!")
        });
        
        _this.setState({
            edit_modal: false
        });
    }

    success = (mes) => {
        message.success(mes);
    };
  
    error = (mes) => {
        message.error(mes);
    };
    
    warning = (mes) => {
        message.warning(mes);
    };

    renderNotdata = () => {
        return(
            <Empty style={{margin: "0 auto"}}/>
        )
    }

    playwav = path => {
        this.setState({
        wav_src: path,
        playwav_modal: true,
        audioRef:'audio'
        });
    };

    handleOk = e => {
        this.setState({
            playwav_modal: false
        });
    };

    handleCancel = (e, modal) => {
        let _this = this;
        switch (modal) {
            case "wav":
                _this.setState({
                    playwav_modal: false
                });
                _this.audioRef.current.pause();
                break;
            case "detail":
                _this.setState({
                    detail_modal: false
                });
                break;
            case "editfile":
                _this.setState({
                    edit_modal:false
                });
                break;
            default:
                break;
        }

    };

    onChange = (e, name) => {
        switch (name) {
            case "filename":
                this.setState({
                    edit_modal:true,
                    filename: e.target.value
                })
                break;
            case "filedetail":
                this.setState({
                    edit_modal:true,
                    detail: e.target.value
                })
                break;
            case "display":
                this.setState({
                    show: true,
                    display: e.target.value
                })
                break;
            default:
                break;
        }
    };

    renderFloder = (item) => {
        return(
            <Row key={item.server_id}>
                <Radio.Button value={item.server_id}  style={{ width:"100%" }} onClick={e => this.serverUpfiles(item.server_id)}>
                    <span>{item.server_id}</span>
                    <span style={{ position:"absolute",right:"10px" }}>{item.total}</span>
                </Radio.Button>
            </Row>
        )
    }

    serverUpfiles = (serverid) => {
        let _this = this;
        _this.setState({
            serachId:serverid
        });
        let data = {
            "serverId":serverid
        }
        getFilesList(data)
        .then(response => {
            if (response.data.data.filelist) {
                _this.setState({
                    recordingData: response.data.data.filelist
                });
            }else{
                _this.setState({
                    recordingData: [],
                    total: 0
                });
            }
        })
        .catch(error => {
            _this.error("axios error!")
        });
    }

    handleChange = (value) => {
        this.setState({
            rectype: value
        })
    }

    inputSearch = (value) => {
        let _this = this;
        _this.setState({
            searchTxt:value
        },function(){
            let data = {
                "serverId": _this.state.serachId,
                "rectype": _this.state.rectype,
                "starttime": (_this.state.startEndTime[0] == undefined || _this.state.startEndTime[0] == "") ? "" : _this.state.startEndTime[0] +" 00:00:00",
                "endtime": (_this.state.startEndTime[1] == undefined || _this.state.startEndTime[1] == "") ? "" : _this.state.startEndTime[1] +" 23:59:59",
                "searchTxt": _this.state.searchTxt
            };
            getFilesList(data).then(response => {
                if (response.data.data.filelist) {
                    _this.setState({
                        recordingData: response.data.data.filelist,
                        total: response.data.total
                    });
                }else{
                    _this.setState({
                        recordingData: [],
                        total: 0
                    });
                }
            }).catch(error => {
                _this.error("axios error!")
            });
        })
    }

    changeRangePicker = (dates, date) => {
        this.setState({
            startEndTime:date
        })
    }

    render() {
        this.audioRef = React.createRef();
        const columns = [
            {
              title: '编号',
              dataIndex: 'index',
              key: 'index',
              align:'center',
              render: (val, row, index) => <a>{ index + 1 }</a>,
            },{
                title: '文件名',
                dataIndex: 'filename',
                key: 'filename',
            },{
                title: '类型',
                dataIndex: 'rectype',
                key: 'rectype',
                align:'center',
                render: (val, row, index) => {
                    let value = "";
                    switch (val) {
                        case "1":
                              value = "对讲";
                              break;
                        case "2":
                              value = "监听"
                              break;
                        case "3":
                              value = "广播"
                              break;
                        case "4":
                              value = "会议"
                              break;
                          default:
                            break;
                    }
                    return value;
                },
            },{
                title: '发起方',
                align:'center',
                dataIndex: 'source',
                key: 'source',
            },{
                title: '接收方',
                align:'center',
                dataIndex: 'target',
                key: 'target',
            },{
                title: '开始时间',
                dataIndex: 'starttime',
                key: 'starttime',
            },{
                title: '文件大小',
                align:'center',
                dataIndex: 'filesize',
                key: 'filesize',
            },{
              title: '操作',
              key: 'action',
              render: (val, row) => (
                <span>
                  <a style={{ marginRight: 16 }}onClick={e => this.playwav(row.filepath)}>试听</a>
                  <a style={{ marginRight: 16 }}onClick={e => this.detailfile(row)}>详情</a>
                  <a style={{ marginRight: 16 }}onClick={e => this.editfileshow(row)} >修改</a>
                  {/* <a style={{ color: "red" }} onClick={e => this.deletefile(row.id)}>删除</a> */}
                </span>
              ),
            },
          ];
        return (
        <div className="recording">
            <Row gutter={16}>
                <Col className="gutter-row" span={4}>
                <Row style={{ marginBottom:"15px" }}>
                    <h3>文件来源(服务器ID)</h3>
                </Row>
                <Radio.Group defaultValue="0" size="default" style={{ width:"100%" }}>
                    <Row>
                        <Radio.Button value="0"  style={{ width:"100%" }} onClick={e => this.serverUpfiles("")}>
                            <span>全部</span>
                            <span style={{ position:"absolute",right:"10px" }}>{this.state.total}</span>
                        </Radio.Button>
                    </Row>
                    {this.state.serveridData.map(item => {
                        return this.renderFloder(item);
                    })}
                </Radio.Group>
                </Col>
                <Col className="gutter-row" span={20}>
                    <Row style={{ marginBottom:"15px" }} gutter={16}>
                        <Col>
                            <Select defaultValue="0" style={{ width: 120 }} onChange={this.handleChange}>
                                <Option value="0">全部</Option>
                                <Option value="1">对讲</Option>
                                <Option value="2">监听</Option>
                                <Option value="3">广播</Option>
                                <Option value="4">会议</Option>
                            </Select>
                        </Col>
                        <Col>
                            <RangePicker locale={locale} onChange={(dates, date) => this.changeRangePicker(dates, date)}/>
                        </Col>
                        <Col>
                            <Search placeholder="输入名称查询" onSearch={value => this.inputSearch(value)} enterButton />
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={24}>
                            <Table columns={columns} dataSource={this.state.recordingData} rowKey={recordingData => recordingData.id}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Modal title="wav播放" visible={this.state.playwav_modal} onOk={this.handleOk} onCancel={e => this.handleCancel(e, "wav")} footer={null}>
                <audio src={this.state.wav_src} ref={this.audioRef} autoPlay controls style={{ width:'100%' }}/>
            </Modal>
            <Modal
                title="文件详情"
                visible={this.state.detail_modal}
                onOk={this.adduser}
                onCancel={e => this.handleCancel(e, "detail")}
                cancelText="取消"
                okText="确定"
                footer={null}
                >
                    <Row>
                        <Col span={24}>
                            <span>文件ID:  {this.state.id}</span>
                        </Col>
                        <Col span={24} style={{ marginTop:"15px" }}>
                            <span>文件来源(服务器ID):  {this.state.server_id}</span>
                        </Col>
                        <Col span={24} style={{ marginTop:"15px" }}>
                            <span>文件名称:  {this.state.filename}</span>
                        </Col>
                        <Col span={24} style={{ marginTop:"15px" }}>
                            <span>文件详情描述:  {this.state.detail == "" ? "空" : this.state.detail}</span>
                        </Col>
                        <Col span={24} style={{ marginTop:"15px" }}>
                            <span>文件上传时间:  {this.state.time}</span>
                        </Col>
                    </Row>
            </Modal>

            <Modal
                title="修改文件信息"
                visible={this.state.edit_modal}
                onOk={this.saveEditfile}
                onCancel={e => this.handleCancel(e, "editfile")}
                cancelText="取消"
                okText="确定"
                >
                    <Row>
                        <Col span={24}>
                            <span>文件ID</span>
                            <Input value={this.state.id} disabled={true}/>
                        </Col>
                        <Col span={24} style={{ marginTop:"15px" }}>
                            <span>文件来源(服务器ID)</span>
                            <Input value={this.state.server_id} disabled={true}/>
                        </Col>
                        <Col span={24} style={{ marginTop:"15px" }}>
                            <span>文件名称</span>
                            <Input onChange={e => this.onChange(e, "filename")} value={this.state.filename}/>
                        </Col>
                        <Col span={24} style={{ marginTop:"15px" }}>
                            <span>文件详情描述</span>
                            <TextArea rows={4} onChange={e => this.onChange(e, "filedetail")} value={this.state.detail}/>
                        </Col>
                        <Col span={24} style={{ marginTop:"15px" }}>
                            <span>文件上传时间</span>
                            <Input  value={this.state.time} disabled={true}/>
                        </Col>
                    </Row>
            </Modal>
        </div>
        );
    }
}

export default Recording;
