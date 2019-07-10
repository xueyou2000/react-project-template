import GlobalStoreScheme from "./GlobalStoreScheme";
import { MenuFolder, FlatMenus, PageInfo, FlatRoutes } from "@/Interface/ProjectInterface";
import ProjectRoutesConfig from "@/WebApplication/ProjectRoutesConfig";
import NotFoundException from "@/Components/Exception/NotFoundException";
import { flat } from '@/Utils';
import { diInject } from '@/WebApplication/DIContext';

export default class PageManage {
    // 扁平菜单
    private flatMenus: FlatMenus;

    /**
     * 扁平路由信息
     */
    @diInject() routeConfigs: FlatRoutes;

    /**
     * 创建页面管理器
     * @param menus
     */
    public constructor(menus: MenuFolder[]) {
        this.changeMenus(menus);
    }

    /**
     * 更改菜单
     */
    public changeMenus(menus: MenuFolder[]) {
        this.flatMenus = flatMenus(menus);
    }

    /**
     * 获取页面内容
     * @param url
     */
    private getPageContent(url: string) {
        const route = this.routeConfigs[url];
        return route ? route.component : null;
    }

    /**
     * 创建页面信息
     * @param url
     * @param state
     * @param name
     */
    private createPageInfo(url: string, state?: any, name?: string): PageInfo {
        const route = this.routeConfigs[url];
        const menuInfo = this.flatMenus[url];
        const available = !!route;

        const page: PageInfo = {
            name: available ? name || (menuInfo ? menuInfo.name : route.title) : "页面不存在",
            url,
            state,
            content: available ? this.getPageContent(url) : NotFoundException,
            isReloading: false,
        };

        return page;
    }

    /**
     * 验证页面是否存在
     * @param url 
     */
    public valid(url: string) {
        const route = this.routeConfigs[url];
        return route && !('routes' in route);
    }

    /**
     * 创建或切换页面
     * @param name
     * @param url
     * @param state
     */
    public createOrSwitch(name: string, url: string, state?: any) {
        const pages = GlobalStoreScheme.pages.value;
        const index = pages.findIndex((x) => x.url === url);

        if (index === -1) {
            this.create(name, url, state);
        } else {
            this.active(index);
        }
    }

    /**
     * 创建页面
     */
    public create(name: string, url: string, state?: any) {
        const page = this.createPageInfo(url, state, name);
        const pages = [...GlobalStoreScheme.pages.value, page];
        GlobalStoreScheme.pages.change(pages);
        this.active(pages.length - 1);
    }

    /**
     * 删除页面
     * @param index
     */
    public remove(index: number) {
        const pages = GlobalStoreScheme.pages.value;
        if (index >= 0 && index < pages.length) {
            let nextIndex;
            if (index === pages.length - 1 && index != 0 && index === GlobalStoreScheme.pageIndex.value) {
                nextIndex = index - 1;
            }


            GlobalStoreScheme.pages.change(pages.filter((x, i) => i !== index));
            if (nextIndex !== undefined) {
                this.active(nextIndex);
            }
        }
    }

    /**
     * 关闭当前页
     */
    public close() {
        this.remove(GlobalStoreScheme.pageIndex.value);
    }

    /**
     * 激活页面
     * @param index 要激活的索引
     */
    public active(index: number, force?: boolean) {
        const pages = GlobalStoreScheme.pages.value;
        if (index >= 0 && index < pages.length) {
            const page = pages[index];
            if (force) {
                this.refresh(index);
            }
            GlobalStoreScheme.pageIndex.change(index);
            GlobalStoreScheme.pathname.change(page.url);
            window.document.title = page.name;
        }
    }

    /**
     * 重定向页面
     * @description 如果找到重定向的页面, 则关闭当前页面, 激活那个页面, 否则将当前页面重定向为目标页面
     * @param url
     * @param state
     */
    public redirect(url: string, state?: any) {
        const pages = GlobalStoreScheme.pages.value;
        const currentIndex = GlobalStoreScheme.pageIndex.value;
        const nextIndex = pages.findIndex((x) => x.url === url);

        if (nextIndex === -1) {
            // 重定向当前页面
            pages[currentIndex] = this.createPageInfo(url, state);
            GlobalStoreScheme.pages.change([...pages]);
        } else {
            // 跳转到那个页面, 关闭当前页面
            this.active(nextIndex);
            this.remove(currentIndex);
        }
    }

    /**
     * 刷新页面
     * @param index
     */
    public refresh(index: number) {
        const pages = GlobalStoreScheme.pages.value;
        if (index >= 0 && index < pages.length) {
            const page = pages[index];
            page.isReloading = true;
            GlobalStoreScheme.pages.change([...pages]);
            setTimeout(() => {
                page.isReloading = false;
                GlobalStoreScheme.pages.change([...pages]);
            }, 50);
        }
    }
}

/**
 * 提取菜单数据至扁平
 * @param menus
 */
function flatMenus(menus: MenuFolder[]): FlatMenus {
    return flat(menus, 'path', 'children');
}
