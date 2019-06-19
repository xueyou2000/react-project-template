import React, { useState, useRef } from "react";
import classNames from "classnames";
import { useUnmount } from "utils-hooks";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.scss";

export interface CountDownProps {
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
     * 普通状态内容
     */
    children?: React.ReactNode;
    /**
     * 开始计时事件
     * @description 返回false则中断
     */
    onStart: (disabled: boolean) => Promise<boolean>;
    /**
     * 倒计时完毕节点
     */
    finish?: React.ReactNode;
    /**
     * 倒计时总秒数
     */
    time?: number;
    /**
     * 是否禁用
     */
    disabled?: boolean;
}

/**
 * 倒计时状态
 */
export enum CountdownStatusEnum {
    /**
     * 普通状态
     */
    NORMAL,
    /**
     * 倒计时状态
     */
    COUNTDOWN,
    /**
     * 倒计时完毕
     */
    COMPLETE
}

function Countdown(props: CountDownProps) {
    const { prefixCls = "xy-count-down", className, style, children, disabled = false, onStart, finish = "再次发送", time = 60 } = props;
    // 验证码倒计时数
    const [countdown, setCountdown] = useState(0);
    // 状态 0=正常, 1=倒计时, 2=倒计时完毕
    const [status, setStatus] = useState(CountdownStatusEnum.NORMAL);
    // 计时器句柄
    const timeHandle = useRef(null);
    // 是否发送请求中
    const [loading, setLoading] = useState(false);

    function start() {
        if (onStart) {
            setLoading(true);
            onStart(disabled).then((keep) => {
                setLoading(false);
                if (keep) {
                    doStart();
                }
            });
        } else {
            doStart();
        }
    }

    function doStart() {
        if (disabled) {
            return;
        }
        stop();
        setStatus(CountdownStatusEnum.COUNTDOWN);
        setCountdown(time);
        timeHandle.current = window.setInterval(() => {
            if (countdown <= 0) {
                complete();
            } else {
                setCountdown((prev) => --prev);
            }
        }, 1000);
    }

    function stop() {
        clearInterval(timeHandle.current);
    }

    function complete() {
        stop();
        setStatus(CountdownStatusEnum.COMPLETE);
    }

    function renderStatusNode() {
        if (status === CountdownStatusEnum.COUNTDOWN) {
            return <span className={`${prefixCls}_timer`}>{countdown}秒</span>;
        } else {
            return (
                <a className={`${prefixCls}_link`} onClick={start}>
                    {loading ? (
                        <React.Fragment>
                            <FontAwesomeIcon className={`${prefixCls}_icon`} icon={faSpinner} spin={true} />
                            发送中
                        </React.Fragment>
                    ) : status === CountdownStatusEnum.COMPLETE ? (
                        finish
                    ) : (
                        children
                    )}
                </a>
            );
        }
    }

    useUnmount(() => {
        stop();
    });

    return (
        <span className={classNames(prefixCls, className, { [`${prefixCls}--disabled`]: disabled })} style={style}>
            {renderStatusNode()}
        </span>
    );
}

export default React.memo(Countdown);
