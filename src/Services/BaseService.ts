/**
 * @author  XueYou
 * @description 基础Service类, 提供request的注入
 */

import { diInject } from "@/WebApplication/DIContext";
import Request, { RequestError } from "@/Libs/request";

/**
 * 标记uri装饰器
 * @description 标记一个资源的路径, 存储在元数据上
 * @param uri
 */
export function ResourceURI(uri: string) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        // 缓存原始方法
        const backup = target[propertyKey];

        if (!(backup instanceof Function)) {
            throw new Error("ResourceURI装饰器只能用于方法上!");
        }

        // 包裹成新方法
        target[propertyKey] = function(...params: any[]) {
            var self = this;

            // 将uri注入到最后一个参数
            params.push(uri);
            // 调用原始方法
            return backup.apply(self, params);
        };

        // 在方法上定义uri, 用于让外部获取uri
        target[propertyKey].uri = uri;

        return target;
    };
}

/**
 * 获取装饰器包装的uri参数
 * @param method
 */
export function getResourceURI(method: Function) {
    return (method as any).uri;
}

/**
 * 服务基类
 */
export default class BaseService {
    /**
     * 网络请求工具
     */
    @diInject() protected request: Request;
}
