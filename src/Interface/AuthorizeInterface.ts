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

/**
 * 找回密码dtp
 */
export interface ResetPasswordDto {
    /**
     * 手机号
     */
    phone: string;
    /**
     * 短信验证码
     */
    verifyCode: string;
}
