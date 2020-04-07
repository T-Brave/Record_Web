import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getCookieValue } from '../../utils/cookieutils';
class AuthRouter extends React.Component{
    render() {
        const { component: Component, ...rest } = this.props;
        let username = getCookieValue("username");
        let password = getCookieValue("password");
        const isLogged = username && username != "" && password  && password != ""  ? true : false;
        return (
            <Route
                {...rest}
                render = {
                    props => {
                         if (isLogged) {
                             if ({ ...rest }.path === "/login") {
                                 return <Redirect to="/home" />
                             } else {
                                return <Component {...props} />
                             }
                         } else {
                             if ({...rest}.path === "/login") {
                                 return <Component {...props} />
                             } else {
                                 return <Redirect to="/login"/>
                             }
                         }
                    }
                }
            />
        )
    }
}
export default AuthRouter;