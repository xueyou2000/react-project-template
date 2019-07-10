import React from "react";
import classNames from "classnames";
import "./index.scss";
import { Button } from "../MyComponentTools";
import withContext from "@/Components/WithContext";
import PageManage from "@/Stores/PageManage";

export interface ExceptionProps {
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
    title?: React.ReactNode;
    /**
     * 描述
     */
    desc?: React.ReactNode;
    /**
     * 图片
     */
    img?: string;
    /**
     * 页面管理器
     */
    pageManage?: PageManage;
}

function Exception(props: ExceptionProps) {
    const { prefixCls = "exception", className, style, title, desc, img, pageManage } = props;

    return (
        <div className={classNames(prefixCls, className)} style={style}>
            <div className="img-block">
                <div className="img-ele" style={{ backgroundImage: `url(${img})` }} />
            </div>
            <div className="content">
                <div className="middle">
                    <h1>{title}</h1>
                    <div className="desc">{desc}</div>
                    <div className="actions">
                        <Button type="primary" onClick={() => pageManage.close()}>
                            关闭
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(withContext(Exception));
