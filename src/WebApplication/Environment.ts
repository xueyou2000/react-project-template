const application = process.env.APPLICATION;
const baseurl = `/${application}`;

export interface Environment {
    /**
     * 项目基本标题
     */
    title: string;
    /**
     * 应用名
     */
    application: string;
    /**
     * 网关路径
     */
    baseurl: string;
    /**
     * 版本
     */
    version: string;
}

export default {
    baseurl,
    application,
    title: process.env.NAME,
    version: process.env.VERSION
} as Environment;
