import Environment from "@/WebApplication/Environment";
export type TokenChangeHandle = (token: string) => void;

/**
 * @author  XueYou
 * @description 授权工具, 通过 sessionStorage 维护 token
 * @see http://www.ruanyifeng.com/blog/2014/05/oauth_2_0.html
 */
export default class Authorization {
    /**
     * Bearer Token
     * @see http://www.rfcreader.com/#rfc6750
     */
    static Bearer = "Bearer";

    /**
     * sessionStorage 存储键
     */
    static StorageKeyWord = `${Environment.application}-token`;

    /**
     * 不包含前缀 Bearer 得token字符串
     */
    private _token: string;

    /**
     * token改变事件
     */
    public onTokenChange: TokenChangeHandle;

    /**
     * 构造函数
     * @param changeHandle
     */
    public constructor(changeHandle?: TokenChangeHandle) {
        this.initialize();
        this.onTokenChange = changeHandle;
    }

    /**
     * 初始化token
     */
    private initialize() {
        const token = sessionStorage.getItem(Authorization.StorageKeyWord);
        if (token) {
            this.token = sessionStorage.getItem(Authorization.StorageKeyWord);
        }
    }

    public get token() {
        if (this._token) {
            return `${Authorization.Bearer} ${this._token}`;
        } else {
            return null;
        }
    }

    public set token(val: string) {
        if (!val) {
            throw new Error("Fail Set Token, parameter cannot be empty!");
        }
        this._token = val || null;
        if (this.token !== null) {
            sessionStorage.setItem(Authorization.StorageKeyWord, this._token);
        } else {
            sessionStorage.removeItem(Authorization.StorageKeyWord);
        }
        if (this.onTokenChange) {
            this.onTokenChange(this.token);
        }
    }

    public clean() {
        this._token = null;
    }

    public exist() {
        return this.token !== null;
    }
}
