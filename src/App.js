import React from 'react';
import Index from "./views"; //主体框架
import Login from './views/login/login'  //引入登录界面
import AuthRouter from "./components/ContentMian/AuthRouter";  //路由拦截
import { Route, Switch } from 'react-router-dom';
class App extends React.Component{
    constructor(props) {
        super(props);
    }


    render() {
        return(
            <div className="App">
                <Switch>
                    <AuthRouter exact path='/login' component={ Login } />
                    <AuthRouter path='/' component={ Index } />
                </Switch>
            </div>
        )
  }
}

export default App;
