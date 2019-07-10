
export interface OperatorInfo {
    /**
     * ID
     */
    id?: number;
    /**
     * 创建时间
     */
    createTime?: string;
    /**
     * 操作人编号
     */
    operatorNo?: string;
    /**
     * 用户名称
     */
    userName?: string;
    /**
     * 密码
     */
    password?: string;
    /**
     * 电话
     */
    phone?: string;
    /**
     * 状态
     */
    status?: string;
    /**
     * 状态(翻译)
     */
    statusLabel?: string;
    /**
     * 是否基本操作员
     */
    ifBase?: string;
    /**
     * 是否基本操作员(翻译)
     */
    ifBaseLabel?: string;
}

