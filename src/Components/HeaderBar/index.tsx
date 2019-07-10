import classNames from "classnames";
import React, { useEffect, useState } from "react";
import "./index.scss";
import OperatorService from "@/Services/OperatorService";
import { useMount } from "utils-hooks";
import { useStore } from "@/Utils/Hooks/UseStore";
import GlobalStoreScheme from "@/Stores/GlobalStoreScheme";

import { Trigger } from "@/Components/MyComponentTools";
import DropdownMenu from "../DropdownMenu";
import Menu from "../DropdownMenu/Menu";
import MenuGroup from "../DropdownMenu/MenuGroup";

const operatorService = new OperatorService();

export interface HeaderBarProps {
    /**
     * 附加类名
     */
    prefixCls?: string;
    /**
     * 根节点的附加类名
     */
    className?: string;
    /**
     * 内联样式
     */
    style?: React.CSSProperties;
}

function HeaderBar(props: HeaderBarProps) {
    const { prefixCls = "header-bar", className, style } = props;
    const [operator] = useStore(GlobalStoreScheme.operator);

    useMount(() => {
        operatorService.findOperator().catch((error) => {
            console.error("获取用户信息失败: " + error.message);
        });
    });

    function renderUserDropdownMenu() {
        return (
            <DropdownMenu>
                <MenuGroup label="账户">
                    <Menu icon="user" name="profile" disabled={true}>
                        个人中心
                    </Menu>
                    <Menu icon="setting" name="setting" disabled={true}>
                        设置
                    </Menu>
                    <Menu icon="lock" name="lock">
                        修改密码
                    </Menu>
                </MenuGroup>
                <Menu icon="logout" name="lock" divided={true}>
                    退出登录
                </Menu>
            </DropdownMenu>
        );
    }

    return (
        <div className={classNames(prefixCls, className)} style={style}>
            <div className={`${prefixCls}-inner`}>
                <div className={`${prefixCls}-right-panel`}>
                    <Trigger popup={renderUserDropdownMenu()} popupAlign={{ targetOffset: [-5, 0] }}>
                        <div className={`${prefixCls}-user-controll-panel`}>
                            <span className={`${prefixCls}-user-avatar`}>
                                <img src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" alt="" />
                            </span>
                            <span className={`${prefixCls}-user-name`}>{operator && operator.userName}</span>
                        </div>
                    </Trigger>
                </div>
            </div>
        </div>
    );
}

export default React.memo(HeaderBar);
