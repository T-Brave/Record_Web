import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import AuthRouter from "./AuthRouter";
import '../../router/routers';
class ContentMain extends React.Component{
     render() {
        return (
            <div>
                <Switch>
                    <AuthRouter exact path='/recording' component={ global.Recording }/>
                    <AuthRouter path='/advance' component={global.Advance }/>
                    <AuthRouter path='/user' component={global.User }/>
                    <Redirect from='/login' to='/recording'/>
                    <Redirect from='/' to='/home' />
                    <Route component={ global.Error_404 } />
                </Switch>
            </div>
        );
    }
}
export default ContentMain;