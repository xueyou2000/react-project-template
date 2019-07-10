import BaseService, { ResourceURI } from "./BaseService";
import { Dict, DictMulti, DictItemsMap } from "@/Interface/ProjectInterface";

export default class DictService extends BaseService {

    /**
     * 字典缓存
     */
    private globalCacheDictMaps: { [dictKey: string]: Dict } = {};

    /**
     * 是否有缓存
     * @param code  字典键 
     */
    private hasCacheByCode(code: string) {
        return Boolean(this.globalCacheDictMaps[code]);
    }

    /**
     * 是否有缓存
     * @param codes 
     */
    private hasCacheByCodes(codes: string[]) {
        return codes.every(code => this.hasCacheByCode(code));
    }


    /**
     * 创建字典map
     * @param codes 
     */
    private createDictMulti(codes: string[]) {
        const dicts: DictMulti = {};
        codes.forEach(code => {
            dicts[code] = this.globalCacheDictMaps[code];
        });
        return dicts;
    }

    /**
     * 删除指定key缓存
     * @param key
     */
    public forgetCache(key: string) {
        if (key in this.globalCacheDictMaps) {
            delete this.globalCacheDictMaps[key];
        }
    }

    /**
     * 获取字典根据字典键
     * @param code 
     */
    @ResourceURI('/redis/dict/findDictByCode')
    findDictByCode(code: string, url?: string) {

        // use cache
        if (this.hasCacheByCode(code)) {
            return Promise.resolve(this.globalCacheDictMaps[code]);
        }

        return this.request
            .post<Dict>(`${url}/${code}`)
            .then(response => {
                const dict = response.data;
                this.globalCacheDictMaps[code] = dict;
                return dict;
            });
    }

    /**
     * 获取多个字典
     * @param codes 
     */
    @ResourceURI('/redis/dict/findDictsByCodes')
    findDictsByCodes(codes: string[], url?: string) {

        // use cache
        if (this.hasCacheByCodes(codes)) {
            return Promise.resolve(this.createDictMulti(codes));
        }

        return this.request
            .post<DictMulti>(url, { codes })
            .then(response => {
                const dicts = response.data;
                for (let code in dicts) {
                    this.globalCacheDictMaps[code] = dicts[code];
                }
                return dicts;
            });
    }

    /**
     * 修改字典
     * @param code 
     */
    @ResourceURI('/redis/dict/put')
    put(dict: Dict, url?: string) {
        return this.request
            .post<Dict>(url, dict)
            .then(response => response.data);
    }

    /**
     * 获取字典项集合
     * @param codes 
     */
    findDictItems(codes: string[]): Promise<DictItemsMap> {
        const dictMaps: DictItemsMap = {};
        return this.findDictsByCodes(codes)
            .then(dictMulti => {
                for (let key in dictMulti) {
                    dictMaps[key] = dictMulti[key].dictionaries;
                }
                return dictMaps;
            });
    }

}