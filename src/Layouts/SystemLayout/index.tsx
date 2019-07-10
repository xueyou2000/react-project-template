import HeaderBar from "@/Components/HeaderBar";
import SideNavBar from "@/Components/SideNavBar";
import MenuService from "@/Services/MenuService";
import Application from "@/Stores/Application";
import GlobalStoreScheme from "@/Stores/GlobalStoreScheme";
import { useStore } from "@/Utils/Hooks/UseStore";
import Environment from "@/WebApplication/Environment";
import { RedirectPath } from "@/WebApplication/RoutesConfig";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { useMount } from "utils-hooks";
import "./index.scss";
import PageTabs from "./PageTabs";

const menuService = new MenuService();

export interface SystemLayoutProps {
    application?: Application;
}

function SystemLayout({ history }: RouteComponentProps) {
    const [menus] = useStore(GlobalStoreScheme.menus);
    const [pathname] = useStore(GlobalStoreScheme.pathname);

    useMount(() => {
        menuService.findMenus().catch((error) => {
            console.error("获取菜单失败: " + error.message);
            history.replace(RedirectPath);
        });
    });

    return (
        <div className="system-page">
            <div className="system-page__left-sidebar">
                <div className="system-page__login-panel">
                    <p>
                        <img src={require("@/Assets/Images/icon.svg")} alt="logo" />
                        <h1>{Environment.title}</h1>
                    </p>
                </div>
                <SideNavBar url={pathname} menus={menus} />
            </div>
            <div className="system-page__right-content">
                <HeaderBar />
                <PageTabs />
            </div>
        </div>
    );
}

export default React.memo(withRouter(SystemLayout));
