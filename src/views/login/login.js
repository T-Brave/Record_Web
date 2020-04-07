import React from 'react';
import { Form, Input, Button, Checkbox, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '../../asset/styles/App.css';
import { login } from '../../api/UserLogin';
import { CSSTransition } from 'react-transition-group';
import { addCookie } from '../../utils/cookieutils';
class LoginForm extends React.Component {
    constructor(props) {
        super(props);
    }

    success = (mes) => {
        message.success(mes);
    };
  
    error = (mes) => {
        message.error(mes);
    };

    render() {
        const onFinish = values => {
            this.setState(
                {
                username: values.username,
                password: values.password
                },
                function() {
                    let _this = this;
                    let data = {
                        "username": values.username,
                        "password": values.password
                    }
                    login(data).then(response => {
                        if(response.data.data != "1") {
                            _this.error("登录失败!");
                        }else{
                            addCookie("username", values.username, 0);
                            addCookie("password", values.password, 0);
                            _this.success("登录成功!");
                            _this.props.history.replace('/recording');
                        }
                    }).catch(error => {
                        _this.error("axios error!")
                    })
                }
            );
        };
        return (
            <div className="login">
                <CSSTransition
                in={true} // 如果this.state.show从false变为true，则动画入场，反之out出场
                timeout={1000} //动画执行1秒
                classNames="fade" //自定义的class名
                //unMountOnExit //可选，当动画出场后在页面上移除包裹的dom节点
                appear={true}
                onEntered={el => {
                    el.style.color = 'blue'; //可选，动画入场之后的回调，el指被包裹的dom，让div内的字体颜色等于蓝色
                }}
                onExited={el => {
                    //同理，动画出场之后的回调，也可以在这里来个setState啥的操作
                }}
                >
                <Card className="box" style={{ background: 'rgba(0, 0, 0, 0.5)', border: 'none' }}>
                    <React.Fragment>
                    <div style={{ margin: '20px', textAlign: 'center' }}>
                        <img src={require('../../asset/images/login.png')} alt="" />
                        <p style={{ color: 'white' }}>AI录音服务器</p>
                    </div>
                    <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
                        <Form.Item name="username" rules={[{ required: true, message: '请输入用户名!' }]}>
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                        </Form.Item>
                        <Form.Item name="password" rules={[{ required: true, message: '请输入密码!' }]}>
                        <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="密码" />
                        </Form.Item>
                        <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>记住我</Checkbox>
                        </Form.Item>
                        </Form.Item>

                        <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                        </Form.Item>
                    </Form>
                    </React.Fragment>
                </Card>
                </CSSTransition>
            </div>
        );
    }
}

// const Login = Form.create({ name: 'normal_login' })(LoginForm); //创建Form表单

export default LoginForm; //登录页面
