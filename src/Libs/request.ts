import { ResponseGeneric } from "@/Interface/ResponseInterface";
import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

/**
 * 服务器响应成功状态码
 */
const SUCCESS_CODE = "200";

/**
 * 状态码中文消息
 */
export const CodeMessage = {
    400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
    401: "用户没有权限（令牌、用户名、密码错误）。",
    403: "用户得到授权，但是访问是被禁止的。",
    404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
    406: "请求的格式不可得。",
    410: "请求的资源被永久删除，且不会再得到的。",
    422: "当创建一个对象时，发生一个验证错误。",
    500: "服务器发生错误，请检查服务器。",
    502: "网关错误。",
    503: "服务不可用，服务器暂时过载或维护。",
    504: "网关超时。"
};

/**
 * 网络请求工具
 */
export default class Request {
    /**
     * axios实例
     */
    private _fetch: AxiosInstance;

    /**
     * 获取axios实例
     */
    public get fetch() {
        return this._fetch;
    }

    private onrejected: (reason: any) => PromiseLike<never>;

    /**
     * 构造函数
     * @param baseurl
     */
    public constructor(baseurl: string, onrejected?: (reason: any) => PromiseLike<never>) {
        this.onrejected = onrejected;
        this._fetch = Axios.create({
            baseURL: baseurl,
            method: "post",
            timeout: 60000,
            headers: {
                language: "zh_Hans",
                client: "web"
            }
        });
    }

    /**
     * 设置请求头
     * @param headers
     */
    public setHeaders(headers: { [key: string]: any }) {
        for (let key in headers) {
            this.fetch.defaults.headers[key] = headers[key];
        }
    }

    /**
     * post请求
     * @param url
     * @param data
     * @param options
     */
    public post<T = any>(url: string, data?: any, options: AxiosRequestConfig = {}) {
        return this.fetch
            .post<ResponseGeneric<T>>(url, data, options)
            .then((response) => {
                const { status, statusText, data } = response;
                if ("status" in data) {
                    if (data.status === SUCCESS_CODE) {
                        return data;
                    } else {
                        // 抛业务异常
                        throw new RequestError(data.msg || statusText, data.status, response, RequestErrorType.BusinessException);
                    }
                } else {
                    // 抛网络异常
                    throw new RequestError(statusText, status, response);
                }
            })
            .catch((error: AxiosError) => {
                if ("errorType" in error) {
                    return Promise.reject(error);
                } else {
                    // 将 AxiosError 转换为 RequestError
                    return Promise.reject(new RequestError(CodeMessage[error.response.status] || error.message, error.response.status, error.response));
                }
            })
            .catch((error: RequestError) => {
                if (this.onrejected) {
                    return this.onrejected(error);
                }
                return Promise.reject(error);
            });
    }
}

/**
 * 网络请求异常类型
 */
export enum RequestErrorType {
    /**
     * 业务异常
     */
    BusinessException,
    /**
     * 网络异常
     */
    NetWorkException
}

/**
 * 网络请求异常
 */
export class RequestError extends Error {
    /**
     * 获取状态码
     */
    public statusCode: number | string;

    /**
     * 获取响应
     */
    public response: AxiosResponse<ResponseGeneric>;

    /**
     * 异常类型
     */
    public errorType: RequestErrorType;

    /**
     * 构造函数
     * @param message
     * @param statusCode
     * @param response
     * @param errorType
     */
    constructor(message: string, statusCode: number | string, response: AxiosResponse, errorType: RequestErrorType = RequestErrorType.NetWorkException) {
        super(message || CodeMessage[statusCode]);
        this.statusCode = statusCode;
        this.response = response;
        this.errorType = errorType;
    }
}
