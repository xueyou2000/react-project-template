import BaseService, { ResourceURI } from "./BaseService";
import { LoginDto, LoginVo } from "@/Interface/AuthorizeInterface";
import { diInject } from "@/WebApplication/DIContext";
import Authorization from "@/Stores/Authorization";

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
}
