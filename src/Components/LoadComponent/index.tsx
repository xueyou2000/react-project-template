import React from "react";
import loadable from "@loadable/component";
import Skeleton from "xy-skeleton";
import "xy-skeleton/assets/index.css";

/**
 * 动态加载路由组件
 * @param loader
 */
export default function LoadComponent(loader: any) {
    return loadable(loader, {
        fallback: <Skeleton loading={true} />
    });
}
