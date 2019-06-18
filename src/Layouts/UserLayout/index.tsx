import React from "react";
import { Link, Switch, Route, Redirect } from "react-router-dom";
import "./index.scss";
import Environment from "@/WebApplication/Environment";
import { UserRoutesConfig, RedirectPath } from "@/WebApplication/RoutesConfig";

function UserLayout() {
    return (
        <div className="user-page">
            <div className="user-page_hd">
                <div className="user-page_hd_nav">
                    <div className="fl">
                        <Link to={RedirectPath}>
                            <img className="logo" src="https://file.365wifi.com.cn/yl/images/logo.png" alt="project logo" />
                        </Link>
                        <span className="separation-line" />
                        <p className="desc">{Environment.title}</p>
                    </div>
                </div>
            </div>
            <div className="user-page_bd">
                <div className="user-page_hd_offset">
                    <div className="landing-plane">
                        <div className="landing-paper">
                            <div className="landing-inner">
                                <Switch>
                                    {UserRoutesConfig.map((config) => (
                                        <Route key={config.path} {...config} />
                                    ))}
                                    <Redirect exact={true} from="/user" to={RedirectPath} />
                                    <Redirect to={RedirectPath} />
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="user-page-footer">
                <p>技术支持: 央联数据有限公司</p>
                <p>COPYRIGHT © 2018 - 2020 京ICP备18044266号-1</p>
            </div>
        </div>
    );
}

export default React.memo(UserLayout);
