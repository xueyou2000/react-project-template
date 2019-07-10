import { RouteConfig } from 'react-router-config';
import { BooleanEnum } from '@/Enums/ProjectEnums';
import PageManage from '@/Stores/PageManage';
import DictService from '@/Services/DictService';

/**
 * 菜单项
 */
export interface MenuItem {
    /**
     * 菜单名称
     */
    name: string;
    /**
     * 菜单路径
     */
    path: string;
}

/**
 * 菜单
 */
export interface MenuFolder extends MenuItem {
    /**
     * 子菜单
     */
    children?: MenuFolder[] | null;
}

/**
 * 扁平菜单
 */
export type FlatMenus = { [path: string]: MenuFolder };

/**
 * 页面信息
 */
export interface PageInfo {
    /**
     * 选项卡名称
     */
    name: string;
    /**
     * 路径
     */
    url: string;
    /**
     * 页面内容
     */
    content: any;
    /**
     * 附加数据
     */
    state?: any;
    /**
     * 是否刷新中
     */
    isReloading: boolean;
}

/**
 * 扁平路由信息
 */
export type FlatRoutes = { [path: string]: RouteConfig };

/**
 * 范围日期查询
 */
export interface DateTimeRange {
    /**
     * 字段名
     */
    columnsField: string;
    /**
     * 起始时间
     */
    startTime: Date;
    /**
     * 结束时间
     */
    endTime: Date;
}

/**
 * 数值范围
 */
export interface NumberRange {
    /**
     * 字段名
     */
    columnsField: string;
    /**
     * 最小数值
     */
    min: number;
    /**
     * 最大数值
     */
    max: number;
}

/**
 * 查询基础
 */
export interface QueryBase {
    queryBaseDto?: {
        /**
         * 日期范围
         */
        dateTimeIntervals?: DateTimeRange[];
        /**
         * 数值范围
         */
        numberRanges?: NumberRange[];
    };
}

/**
 * 字典
 */
export interface Dict {
    /**
     * 字典键
     */
    code: string;
    /**
     * 字典名称
     */
    name: string;
    /**
     * 字典备注
     */
    remark: string;
    /**
     * 字典
     */
    dictionaries: DictItem[];
}

/**
 * 字典项
 */
export interface DictItem {
    /**
     * 字段排序
     */
    order: number;
    /**
     * 字典键
     */
    key: string;
    /**
     * 字典值
     */
    value: string;
    /**
     * 字典状态
     */
    status: BooleanEnum;
    /**
     * 字典颜色
     */
    color: string;
}

export type DictMulti = { [key: string]: Dict };

export type DictItemsMap = { [key: string]: DictItem[] };

export interface DictQueryDto {
    /**
     * 字典key数组
     */
    codes: string[];
}

/**
 * 应用上下文
 */
export interface ApplicationContextProps {
    /**
     * 页面管理器
     */
    pageManage?: PageManage;
    /**
     * 字典服务
     */
    dictService?: DictService;
}