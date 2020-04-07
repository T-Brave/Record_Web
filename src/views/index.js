import React from "react";
import SubMenu from "../components/SubMenu";
import { DownOutlined } from '@ant-design/icons';
import { getCookieValue, delCookie } from '../utils/cookieutils';
import ContentMain from "../components/ContentMian";
import { editpassword } from '../api/UserLogin';
import { Layout, Breadcrumb, Menu, Dropdown, Row, Col, Modal, Input, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;
const { Header, Content, Footer, Sider } = Layout;


class Index extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            title: "录音文件",
            user:"",
            edit_modal:false,
            username:"",
            oldpassword:"",
            newpassword:"",
            newpassword_ok:""
        }
    };

    onCollapse = collapsed => {
        this.setState({ collapsed });
    };

    componentDidMount() {
        this.props.history.replace('/recording');
        let username = getCookieValue("username");
        this.setState({
            user:username,
            username:username,
        })
    }

    title_Value = (data) =>{
        this.setState({
            title: data //把父组件中的parentText替换为子组件传递的值
        });
    }

    editPassword = () => {
        this.setState({
            edit_modal:true
        });
    }

    exit = () => {
        let _this = this;
        confirm({
            title: '是否退出?',
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk() {
                delCookie("username");
                delCookie("password");
                _this.props.history.replace('/login');
            },
            onCancel() {
                // console.log('Cancel');
            },
        });
    }

    handleCancel = e => {
        this.setState({
            edit_modal:false
        });
    };

    savePassword = () => {
        let data = {
            "username":this.state.username,
            "oldpassword":this.state.oldpassword,
            "newpassword":this.state.newpassword,
            "newpassword_ok":this.state.newpassword_ok
        }
        if (this.state.username == "" || this.state.oldpassword == "" || this.state.newpassword == "" || this.state.newpassword_ok == ""){
            this.error("请填写完整数据!");
            return;
        }

        if (this.state.username == "admin"){
            this.error("管理员不允许修改!");
            return;
        }

        if (this.state.newpassword != this.state.newpassword_ok){
            this.error("请重新确认密码!");
            return;
        }

        editpassword(data).then(response => {
            if(response.data.data == "0"){
                this.error("新密码和旧密码相同，请重新输入!");
            }

            if(response.data.data == "-1"){
                this.error("用户名、密码验证失败，请重新输入!");
            }

            if(response.data.data == "1"){
                delCookie("username");
                delCookie("password");
                this.setState({
                    edit_modal:false
                });
                this.success("修改成功，请重新登录!");
                this.props.history.replace('/login');
            }
        }).catch(error => {
            this.error("axios error!")
        })
    }

    onChange = (e, type) => {
        let _this = this;
        switch (type) {
            case "username":
                _this.setState({
                    username:e.target.value
                })
                break;
            case "oldpassword":
                _this.setState({
                    oldpassword:e.target.value
                })
                break;
            case "newpassword":
                _this.setState({
                    newpassword:e.target.value
                })
                break;
            case "newpassword_ok":
                _this.setState({
                    newpassword_ok:e.target.value
                })
                break;
            default:
                break;
        }
    }

    success = (mes) => {
        message.success(mes);
    };

    error = (mes) => {
        message.error(mes);
    };

    render() {
        const menu = (
            <Menu>
              <Menu.Item key="0">
                <a onClick={e => this.editPassword()}>修改密码</a>
              </Menu.Item>
              <Menu.Item key="1">
                <a onClick={e => this.exit()}>退出</a>
              </Menu.Item>
            </Menu>
          );
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="logo">
                        <img src={require('../asset/images/spon.png')}  style={{ width:"100%", verticalAlign: "bottom" }}/>
                    </div>
                    <SubMenu titleData={this.title_Value.bind(this)}/>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Row>
                            <Col span={6} offset={20} style={{ textAlign:"center" }}>
                                <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
                                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                        {this.state.user} <DownOutlined />
                                    </a>
                                </Dropdown>
                            </Col>
                        </Row>
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>{this.state.title}</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ padding: 24, background: '#fff', height: 'calc(100vh - 190px)' }}>
                            <ContentMain/>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>AI Recording server ©2020 Provide recording server for XC-9000 platform</Footer>
                </Layout>
                <Modal
                    title="修改密码"
                    visible={this.state.edit_modal}
                    onOk={this.savePassword}
                    onCancel={this.handleCancel}
                    cancelText="取消"
                    okText="确定"
                    >
                        <Row>
                            <Col span={24}>
                                <span>用户名</span>
                                <Input placeholder="用户名" onChange={e => this.onChange(e, "username")} value={this.state.username} disabled={true}/>
                            </Col>
                            <Col span={24} style={{ marginTop:"15px" }}>
                                <span>旧密码</span>
                                <Input type="password" placeholder="密码" onChange={e => this.onChange(e, "oldpassword")} value={this.state.oldpassword}/>
                            </Col>
                            <Col span={24} style={{ marginTop:"15px" }}>
                                <span>新密码</span>
                                <Input type="password" onChange={e => this.onChange(e, "newpassword")} value={this.state.newpassword}/>
                            </Col>
                            <Col span={24} style={{ marginTop:"15px" }}>
                                <span>确认密码</span>
                                <Input type="password" onChange={e => this.onChange(e, "newpassword_ok")} value={this.state.newpassword_ok}/>
                            </Col>
                        </Row>
                </Modal>
            </Layout>
        )
    }
}

export default Index;