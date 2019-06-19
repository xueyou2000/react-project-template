import { matchRoutes, MatchedRoute } from "react-router-config";
import { RootRoutesConfig, RedirectPath } from "@/WebApplication/RoutesConfig";
import { diContext } from "@/WebApplication/DIContext";
import Authorization from "./Authorization";
import Request, { RequestError } from "@/Libs/request";
import Environment from "@/WebApplication/Environment";
import H from "history";

export default class Application {
    private _breadcrumb: MatchedRoute<{}>[];
    private _history: H.History;

    /**
     * 获取当前路由面包屑
     */
    public get breadcrumb() {
        return this._breadcrumb;
    }

    /**
     * 构造函数
     * @param history
     */
    public constructor(history: H.History) {
        this._history = history;
        this.ConfigService();
    }

    /**
     * 初始化DI服务
     */
    private ConfigService() {
        const { _history } = this;

        // 注入 app
        diContext.application = this;

        // 注入网络请求工具
        diContext.request = new Request(Environment.baseurl, (error: RequestError) => {
            const { status, notice } = error.response.data;

            // 没有权限则重定向到登陆页面
            if (error.response.status === 401 || status === "401") {
                _history.replace(RedirectPath);
            }

            // 主动重定向到服务器指定的页面
            if (notice && notice.redirect) {
                _history.replace(notice.redirect);
            }

            return Promise.reject(error);
        });

        // 注入授权认证
        diContext.authorization = new Authorization((token) => {
            // 写入 token 头部
            diContext.request.setHeaders({ Authorization: token });
        });
    }

    /**
     * 路由改变事件
     */
    public onRouterChange(path: string) {
        // 生成面包屑
        this._breadcrumb = matchRoutes(RootRoutesConfig, path);
        if (this._breadcrumb.length > 0) {
            // 获取当前页面配置
            const config = this._breadcrumb[this._breadcrumb.length - 1].route;
            // 更新文档标题
            window.document.title = config.title;
        }
    }
}
