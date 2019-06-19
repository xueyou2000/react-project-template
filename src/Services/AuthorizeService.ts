import BaseService, { ResourceURI } from "./BaseService";
import { LoginDto, LoginVo, ResetPasswordDto } from "@/Interface/AuthorizeInterface";
import { diInject } from "@/WebApplication/DIContext";
import Authorization from "@/Stores/Authorization";
import Environment from "@/WebApplication/Environment";

/**
 * 认证服务
 */
export default class AuthorizeService extends BaseService {
    /**
     * 注入授权认证
     */
    @diInject() protected authorization: Authorization;

    /**
     * 登录认证
     * @param dto   登录参数
     */
    @ResourceURI("/auth")
    public login(dto: LoginDto, url?: string) {
        return this.request.post<LoginVo>(url, dto).then((response) => {
            const { data } = response;

            // set token
            this.authorization.token = data.token;

            return data;
        });
    }

    /**
     * 发送手机验证码
     * @description 用于找回密码
     * @param phone 手机号
     */
    @ResourceURI(`${Environment.application}-server/operatorInfo/verifyCodeByPhone`)
    public sendVerifyCodeByPhone(phone: string, url?: string) {
        return this.request.post(`${url}?phone=${phone}`);
    }

    /**
     * 重置密码
     * @param dto
     * @param url
     */
    @ResourceURI(`${Environment.application}-server/operatorInfo/forgetPassword`)
    public resetPassword(dto: ResetPasswordDto, url?: string) {
        return this.request.post(url, dto);
    }
}
