import React from "react";
import loadable from "@loadable/component";

/**
 * 动态加载路由组件
 * @param loader
 */
export default function LoadComponent(loader: any) {
    return loadable(loader, {
        fallback: <p>加载中</p>
    });
}
