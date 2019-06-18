import React from "react";

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

            <div>页面xxxxxxxxxxxxxxx</div>
        </div>
    );
}

export default React.memo(SystemLayout);
