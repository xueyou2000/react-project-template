import classNames from "classnames";
import React, { useEffect, useState } from "react";
import "./index.scss";
import GlobalStoreScheme from '@/Stores/GlobalStoreScheme';
import withContext from "@/Components/WithContext";
import PageManage from "@/Stores/PageManage";
import { FlatRoutes } from '@/Interface/ProjectInterface';
import BreadcrumbItem from './BreadcrumbItem';
import { matchRoutes } from 'react-router-config';
import ProjectRoutesConfig from '@/WebApplication/ProjectRoutesConfig';

export interface PageHeaderLayoutProps {
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
    /**
     * 标题
     */
    title: React.ReactNode;
    /**
     * 右上角扩展内容
     */
    extra?: React.ReactNode;
    /**
     * 头部详情
     */
    content?: React.ReactNode;
    /**
     * 是否卡片样式
     */
    cardType?: boolean;
    /**
     * 页面内容
     */
    children?: React.ReactNode;
    /**
     * 页面管理器
     */
    pageManage?: PageManage;
    /**
     * 扁平路由配置
     */
    routeConfigs?: FlatRoutes;
}

function PageHeaderLayout(props: PageHeaderLayoutProps) {
    const { prefixCls = "page-header-layout", className, style, title, extra, content, cardType, children, pageManage } = props;
    const [breadcrumbs] = useState(matchRoutes(ProjectRoutesConfig, GlobalStoreScheme.pathname.value));

    function renderBreadcrumb() {
        return (
            <div className="breadcrumb">
                {breadcrumbs.map((branch, i) => (
                    <BreadcrumbItem name={branch.route.title} url={branch.route.path} isLinkable={pageManage.valid(branch.route.path)} separator={i != breadcrumbs.length - 1} onClick={url => pageManage.createOrSwitch(branch.route.title, url)} />
                ))}
            </div>
        );
    }

    function renderDetail() {
        return (
            <div className="detail">
                <div className="main">
                    <div className="header-row">
                        <h1 className="header-title">{title}</h1>
                    </div>
                    {
                        content &&
                        <div className="header-row">
                            <div className="content">{content}</div>
                            <div className="extra">{extra}</div>
                        </div>
                    }
                </div>
            </div>
        );
    }

    return (
        <div className={classNames(prefixCls, className)} style={style}>
            <div className="page-header">
                {renderBreadcrumb()}
                {renderDetail()}
            </div>
            <div className="content">
                {cardType ? <div className="page-card-content">{children}</div> : children}
            </div>
        </div>
    );
}

export default React.memo(withContext(PageHeaderLayout));