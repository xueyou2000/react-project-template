import BaseService, { ResourceURI } from "./BaseService";
import { OperatorInfo } from "@/Interface/OperatorInterface";
import Environment from "@/WebApplication/Environment";
import GlobalStoreScheme from "@/Stores/GlobalStoreScheme";

/**
 * 操作员服务
 */
export default class OperatorService extends BaseService {
    /**
     * 获取当前登录操作员
     */
    @ResourceURI(`${Environment.application}-server/operatorInfo/findOperator`)
    public findOperator(url?: string) {
        return this.request
            .post<OperatorInfo>(url)
            .then((response) => response.data)
            .then((operator) => {
                GlobalStoreScheme.operator.change(operator);
                return operator;
            });
    }
}
