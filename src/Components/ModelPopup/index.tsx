import { Model, ModelBody } from "@/Components/MyComponentTools";
import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import "./index.scss";

export interface ModelPopupProps {
    /**
     * 返回一个容器来装载抽屉
     * @description 默认为body内创建一个div作为容器
     */
    getContainer?: HTMLElement;
    /**
     * 对话框关闭动画结束
     */
    onUnmount?: Function;
    /**
     * 对话框标题
     */
    title?: React.ReactNode;
    /**
     * 对话框内容
     */
    children?: React.ReactNode;
}

function ModelPopup(props: ModelPopupProps) {
    const { getContainer, onUnmount, title, children } = props;
    return (
        <Model className="popup-model" title={title} maskClose={false} initialFocus="submit-btn" defaultVisible={true} getContainer={getContainer} onUnmount={onUnmount}>
            <ModelBody>{children}</ModelBody>
        </Model>
    );
}

/**
 * 弹出模态对话框
 * @param title 对话框标题
 * @param context 对话框内容
 */
export default function modelPopup(title: React.ReactNode, context: React.ReactNode) {
    const div = document.createElement("div");
    document.body.appendChild(div);

    ReactDOM.render(
        <ModelPopup
            title={title}
            getContainer={div}
            onUnmount={() => {
                ReactDOM.unmountComponentAtNode(div);
                div.parentNode.removeChild(div);
            }}
        >
            {context}
        </ModelPopup>,
        div,
    );
}
