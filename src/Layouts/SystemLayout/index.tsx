import React from "react";
import { Link } from "react-router-dom";
import "./index.scss";
import { RedirectPath } from "@/WebApplication/RoutesConfig";

function SystemLayout() {
    return (
        <div className="system-page">
            <p>系统名称</p>
            <ul>
                <a href="#">菜单1</a>
                <a href="#">菜单2</a>
                <a href="#">菜单3</a>
                <a href="#">菜单4</a>
                <a href="#">菜单5</a>
            </ul>

            <Link to={RedirectPath}>回去登录</Link>

            <div>页面xxxxxxxxxxxxxxx</div>
        </div>
    );
}

export default React.memo(SystemLayout);
