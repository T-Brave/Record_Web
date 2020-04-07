import React from 'react';
import { Table, message, Modal, Button, Input, Row, Col  } from 'antd';
import { getUserList, deleteUser, adduser } from '../../api/getUserData';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;
class User extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userList:[],
            add_modal: {
                title: "添加用户",
                show: false
            },
            useranme:"",
            password:"",
            display:"",
            current_id:""
        }
    }

    componentDidMount(){
        this.getUserData();
    }

    getUserData = () => {
        let _this = this;
        getUserList().then(response => {
            if(response.data.data.userlist){
                _this.setState({
                    userList:response.data.data.userlist
                })
            }
        }).catch(error => {
            _this.error("axios error!")
        })
    }

    adduser_modal = () => {
        this.setState({
            add_modal:{
                title: "添加用户",
                show: true
            },
            useranme:"",
            password:"",
            display:"",
            current_id:""
        })
    }

    delete = (id) => {
        let _this = this;
        if(id == "1") {
            _this.warning("管理员不允许被删除!");
            return;
        }else{
            let data = {
                "id" : id
            }
            confirm({
                title: '是否删除该用户?',
                icon: <ExclamationCircleOutlined />,
                content: '',
                okText: '是',
                okType: 'danger',
                cancelText: '否',
                onOk() {
                    deleteUser(data).then(response => {
                        if(response.data.success){
                            _this.success("删除成功!")
                            _this.getUserData();
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
    }

    handleOk = e => {
        this.setState({
          visible: false,
        });
    };
    
    handleCancel = e => {
        this.setState({
            add_modal:{
                show: false
            }
        });
    };

    onChange = (e, name) => {
        switch (name) {
            case "username":
                this.setState({
                    useranme: e.target.value
                })
                break;
            case "password":
                this.setState({
                    password: e.target.value
                })
                break;
            case "display":
                this.setState({
                    display: e.target.value
                })
                break;
            default:
                break;
        }
    };

    adduser = () => {
        let _this = this;
        let data = {}
        if(this.state.current_id == ""){
            data = {
                "username":this.state.useranme,
                "password":this.state.password,
                "display":this.state.display
            }
        }else{
            data = {
                "id": this.state.current_id,
                "username":this.state.useranme,
                "password":this.state.password,
                "display":this.state.display
            }
        }
        
        adduser(data).then(response => {
            if(response.data.success){
                if(this.state.current_id == ""){
                    _this.success("添加成功!");
                }else{
                    _this.success("修改成功!");
                }
               
                _this.getUserData();
                _this.setState({
                    add_modal:{
                        show: false
                    }
                })
            }else{
                if(this.state.current_id == ""){
                    _this.success("添加失败: " + response.data.data);
                }else{
                    _this.success("修改失败: " + response.data.data);
                }
            }
        }).catch(error => {
            _this.error("axios error!")
        })
    }

    edit = (item) => {
        let _this = this;
        if(item["id"] != "1"){
            this.setState({
                add_modal:{
                    title: "修改用户",
                    show: true
                },
                useranme: item["username"],
                password:item["password"],
                display:item["display"],
                current_id:item["id"]
            })
        }else{
            _this.warning("管理员不允许修改!");
        }
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

    render(){
        const columns = [
            {
              title: '编号',
              dataIndex: 'index',
              key: 'index',
              render: (text,row,index) => <a>{ index + 1 }</a>,
            },
            {
              title: '用户名',
              dataIndex: 'username',
              key: 'username',
            },
            {
              title: '显示名',
              dataIndex: 'display',
              key: 'display',
            },
            {
              title: '操作',
              key: 'action',
              render: (text, userList) => (
                <span>
                  <a style={{ marginRight: 16 }} onClick={e => this.edit(userList)}>修改</a>
                  <a style={{ color: "red" }} onClick={e => this.delete(userList.id)}>删除</a>
                </span>
              ),
            },
          ];
        return(
            <div>
                <Button type="primary" style={{ marginBottom:"15px" }} onClick={e => this.adduser_modal()}>添加用户</Button>
                <Table columns={columns} dataSource={this.state.userList} rowKey={userList => userList.id}/>

                <Modal
                    title={this.state.add_modal.title}
                    visible={this.state.add_modal.show}
                    onOk={this.adduser}
                    onCancel={this.handleCancel}
                    cancelText="取消"
                    okText="确定"
                    >
                        <Row>
                            <Col span={24}>
                                <span>用户名</span>
                                <Input placeholder="用户名" onChange={e => this.onChange(e, "username")} value={this.state.useranme}/>
                            </Col>
                            <Col span={24} style={{ marginTop:"15px" }}>
                                <span>密码</span>
                                <Input type="password" placeholder="密码" onChange={e => this.onChange(e, "password")} value={this.state.password}/>
                            </Col>
                            <Col span={24} style={{ marginTop:"15px" }}>
                                <span>显示名</span>
                                <Input placeholder="显示名" onChange={e => this.onChange(e, "display")} value={this.state.display}/>
                            </Col>
                        </Row>
                </Modal>
            </div>
        )
    }
}

export default User;