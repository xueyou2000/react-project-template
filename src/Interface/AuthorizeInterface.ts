/**
 * 用户登录dto
 */
export interface LoginDto {
    /**
     * 登陆名
     */
    username: string;
    /**
     * 登陆密码
     */
    password: string;
}

/**
 * 用户登录vo
 */
export interface LoginVo {
    /**
     * 授权令牌
     */
    token: string;
}
