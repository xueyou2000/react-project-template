/**
 * 响应通知参数
 */
export interface ResponseNotice {
    /**
     * 通知状态
     */
    noticeStatus: "info" | "error" | "success" | "warning";
    /**
     * 通知类型
     */
    noticeType: "NOTICE" | "MESSAGEBOX";
    /**
     * 持续时间 (仅NoticeType.NOTICE类型)
     */
    duration?: number;
    /**
     * 通知标题
     */
    title?: string;
    /**
     * 重定向地址
     */
    redirect?: string;
}

/**
 * 通用响应结构
 */
export interface ResponseGeneric<T = any> {
    /**
     * 响应状态码
     */
    status: string;
    /**
     * 响应消息
     */
    msg?: string;
    /**
     * 响应详情信息
     */
    detail?: string;
    /**
     * 响应数据
     */
    data?: T;
    /**
     * 响应通知
     */
    notice?: ResponseNotice;
}

/**
 * 分页查询结构
 */
export interface ResponsePage<T = any> {
    /**
     * 当前页码
     */
    pageNum: number;
    /**
     * 每页条数
     */
    pageSize: number;
    /**
     * 总条数
     */
    total: number;
    /**
     * 查询数据
     */
    list: T[];
    /**
     * 是否有上一页
     */
    hasPreviousPage?: boolean;
    /**
     * 是否有下一页
     */
    hasNextPage?: boolean;
}
