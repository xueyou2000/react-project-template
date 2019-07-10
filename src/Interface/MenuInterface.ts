import { QueryBase } from './ProjectInterface';

export interface MenuQueryDto extends QueryBase {
    menu?: MenuQuery;
}

export interface MenuQuery extends MenuQueryResult { }

export interface MenuQueryResult {
    /**
     * ID
     */
    id?: number;
    /**
     * 创建时间
     */
    createTime?: Date;
    /**
     * 名称
     */
    name?: string;
    /**
     * 路径
     */
    path?: string;
    /**
     * 显示顺序
     */
    displayOrder?: number;
    /**
     * 级别
     */
    levels?: number;
    /**
     * 父节点ID
     */
    parentId?: number;
    /**
     * 状态
     */
    status?: string;
    /**
     * 状态(翻译)
     */
    statusLabel?: string;
    /**
     * 标签
     */
    label?: string;
}

export interface MenuAdd {
    /**
     * 名称
     */
    name?: string;
    /**
     * 路径
     */
    path?: string;
    /**
     * 显示顺序
     */
    displayOrder?: number;
    /**
     * 级别
     */
    levels?: number;
    /**
     * 父节点ID
     */
    parentId?: number;
    /**
     * 状态
     */
    status?: string;
    /**
     * 标签
     */
    label?: string;
}

export interface MenuUpdate extends MenuAdd {
    /**
     * ID
     */
    id: number;
    /**
     * 创建时间
     */
    createTime: Date;
}