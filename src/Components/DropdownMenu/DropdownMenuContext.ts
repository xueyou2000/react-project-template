import React from "react";

export interface DropdownMenuContextState {
    /**
     * 是否显示图标
     */
    showIcon: boolean;
    /**
     * 菜单点击事件
     */
    onMenuClick: (name: string) => void;
}

export default React.createContext<DropdownMenuContextState>(null);
