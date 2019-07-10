import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { Tabs, TabPanelNode, ScrollableTabBar } from "@/Components/MyComponentTools";
import "./index.scss";
import AntIcon from "@/Components/AntIcon";
import { useStore } from "@/Utils/Hooks/UseStore";
import GlobalStoreScheme from "@/Stores/GlobalStoreScheme";
import withContext from "@/Components/WithContext";
import PageManage from "@/Stores/PageManage";

export interface PageTabsProps {
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
     * 页面管理器
     */
    pageManage?: PageManage;
}

function Tab({ children, onClose }: { children?: React.ReactNode; onClose?: (e: React.MouseEvent<HTMLElement>) => void }) {
    function handleClose(e: React.MouseEvent<HTMLElement>) {
        if (onClose) {
            onClose(e);
        }
    }

    return (
        <div className="page-tabs__tab">
            {children}
            <span className="tab-close" onClick={handleClose}>
                <AntIcon icon="close" />
            </span>
        </div>
    );
}

function PageTabs(props: PageTabsProps) {
    const { prefixCls = "page-tabs", className, style, pageManage } = props;
    const [pageIndex, setPageIndex] = useStore(GlobalStoreScheme.pageIndex);
    const [pages] = useStore(GlobalStoreScheme.pages);

    function selectPage(activeKey: number) {
        if (activeKey === pageIndex) {
            pageManage.refresh(activeKey);
        } else {
            setPageIndex(activeKey);
        }
    }

    function removePage(i: number, e: React.MouseEvent<HTMLElement>) {
        pageManage.remove(i);
        e.stopPropagation();
    }

    return (
        <div className={classNames(prefixCls, className)} style={style}>
            <Tabs activeKey={pageIndex} onChange={selectPage} renderTabBar={() => <ScrollableTabBar />}>
                {pages.map((page, i) => {
                    return (
                        <TabPanelNode key={i} tabKey={i} tab={<Tab onClose={(e) => removePage(i, e)}>{page.name}</Tab>}>
                            {page.isReloading || !page.content ? null : React.createElement(page.content)}
                        </TabPanelNode>
                    );
                })}
            </Tabs>
        </div>
    );
}

export default React.memo(withContext(PageTabs));
