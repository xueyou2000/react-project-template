export const diContext: any = {};

/**
 * DI容器装饰器
 * @description 全局单例维护引用的容器
 * @example diInject() app;
 */
export function diInject(): any {
    return function(target: any, propertyKey: string) {
        Object.defineProperty(target, propertyKey, {
            get() {
                const bean = diContext[propertyKey];
                if (bean) {
                    return bean;
                } else if (process.env.NODE_ENV !== "production") {
                    console.error(`Context has no bean with name ${propertyKey}. 
                  Available beans: ${Object.getOwnPropertyNames(diContext).join(", ")}`);
                }
            },
            set() {
                throw new Error("Not allowed");
            },
            enumerable: true,
            configurable: true
        });
    };
}
