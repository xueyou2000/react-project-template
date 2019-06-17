import Authorization from "@/Stores/Authorization";
import React from "react";
import { RouteConfigComponentProps } from "react-router-config";
import { Redirect, Route } from "react-router-dom";
import withContext from "../WithContext";
import { RedirectPath } from "@/WebApplication/RoutesConfig";

export interface AuthorizedRouteProps {
    /**
     * 匹配路径
     */
    path: string;
    /**
     * 匹配显示组件
     */
    component?: React.ComponentType<RouteConfigComponentProps<any>> | React.ComponentType;
    /**
     * 是否严格匹配
     */
    exact?: boolean;
    /**
     * 授权认证
     */
    authorization?: Authorization;
}

function AuthorizedRoute({ path, component, exact, authorization }: AuthorizedRouteProps) {
    if (authorization.exist()) {
        return <Route path={path} exact={exact} component={component} />;
    } else {
        return <Redirect to={RedirectPath} />;
    }
}

export default withContext(AuthorizedRoute);
