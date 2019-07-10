import classNames from "classnames";
import React from "react";
import { useControll } from 'utils-hooks';
import "./index.scss";

export interface MenuFolderProps {
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
     * 是否展开
     */
    fold?: boolean;
    /**
     * 默认是否展开
     */
    defaultFold?: boolean;
    /**
     * 菜单展开切换事件
     */
    onFoldChange?: (open: boolean, url?: string) => void;
    /**
     * 菜单名称
     */
    name?: string;
    /**
     * 子菜单
     */
    children?: React.ReactNode;
    /**
     * 菜单url
     */
    url?: string;
}

function MenuFolder(props: MenuFolderProps) {
    const { prefixCls = "menu-folder", className, style, name, onFoldChange, children, url } = props;
    const [fold, setFold, isControll] = useControll<boolean>(props, 'fold', 'defaultFold', false);
    const classString = classNames(prefixCls, className, {
        open: fold,
    });

    function changeFold() {
        const next = !fold;
        if (!isControll) {
            setFold(next);
        }
        if (onFoldChange) {
            onFoldChange(next, url);
        }
    }


    return (
        <li className={classString} style={style}>
            <div className="menu-folder__title" onClick={changeFold}>
                <span>{name}</span>
                <span className="menu-folder__arrow" />
            </div>
            <ul className="sub-menu-list">
                {children}
            </ul>
        </li>
    );
}

export default React.memo(MenuFolder);