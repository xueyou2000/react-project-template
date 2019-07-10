import BaseService, { ResourceURI } from "./BaseService";
import { MenuFolder } from "@/Interface/ProjectInterface";
import Environment from "@/WebApplication/Environment";
import GlobalStoreScheme from "@/Stores/GlobalStoreScheme";
import { diInject } from "@/WebApplication/DIContext";
import PageManage from "@/Stores/PageManage";
import { MenuQueryDto, MenuQueryResult, MenuAdd } from "@/Interface/MenuInterface";
import { ResponsePage } from "@/Interface/ResponseInterface";

/**
 * 菜单服务
 */
export default class MenuService extends BaseService {
    @diInject() protected pageManage: PageManage;

    /**
     * 获取菜单
     */
    @ResourceURI(`${Environment.application}-server/permissions/find`)
    public findMenus(url?: string) {
        return this.request
            .post<MenuFolder[]>(url)
            .then((response) => response.data)
            .then((menus) => {
                GlobalStoreScheme.menus.change(menus);
                this.pageManage.changeMenus(menus);
                this.pageManage.create(null, "/welcome");
                return menus;
            });
    }

    /**
     * 查询菜单
     * @param queryDto  查询参数
     * @param pageInfo 分页信息
     */
    @ResourceURI(`${Environment.application}-server/menu/findByPage`)
    findByPage(queryDto: MenuQueryDto, pageInfo: ResponsePage, url?: string) {
        return this.request.post<ResponsePage<MenuQueryResult>>(`${url}/${pageInfo.pageNum}/${pageInfo.pageSize}`, queryDto).then((response) => response.data);
    }

    /**
     * 添加菜单
     * @param menuAdd  菜单信息
     */
    @ResourceURI(`${Environment.application}-server/menu/add`)
    addMenu(qaddMenu: MenuAdd, url?: string) {
        return this.request.post(url, qaddMenu);
    }
}
