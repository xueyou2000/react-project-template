
/**
 * 提取扁平数据
 * @param data 
 * @param key 
 * @param children 
 */
export function flat(data: any[], key: string, children: string) {
    let keys: any = {};
    data.forEach((item) => {
        keys[item[key]] = { ...item };
        if (item[children]) {
            keys = { ...keys, ...flat(item[children], key, children) };
        }
    });
    return keys;
}