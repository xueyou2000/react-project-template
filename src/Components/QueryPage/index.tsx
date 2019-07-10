import { Button, Form, FormMethods, TableColumn } from "@/Components/MyComponentTools";
import PageHeaderLayout from "@/Components/PageHeaderLayout";
import withContext from "@/Components/WithContext";
import { ApplicationContextProps } from "@/Interface/ProjectInterface";
import { ResponsePage } from "@/Interface/ResponseInterface";
import classNames from "classnames";
import React, { useRef, useState } from "react";
import "./index.scss";
import QueryTable from "./QueryTable";

export interface QueryPageProps<QueryDto, QueryResult> extends ApplicationContextProps {
    /**
     * 附加类名
     */
    prefixCls?: string;
    /**
     * 根节点的附加类名
     */
    className?: string;
    /**
     * 内联样式
     */
    style?: React.CSSProperties;
    /**
     * 页面标题
     */
    title?: string;
    /**
     * 默认查询条件
     */
    queryDto?: QueryDto;
    /**
     * 表格列定义
     */
    columus?: TableColumn[];
    /**
     * 查询实现
     */
    findPage?: (queryDto: QueryDto, response: ResponsePage<QueryResult>) => Promise<ResponsePage<QueryResult>>;
    /**
     * 查询条件
     */
    children?: React.ReactNode;
    /**
     * 标签宽度
     */
    labelWidth?: string;
    /**
     * 扩展按钮
     */
    extedBtns?: React.ReactNode;
}

function QueryPage<QueryDto, QueryResult>(props: QueryPageProps<QueryDto, QueryResult>) {
    const { prefixCls = "query-page-wrapper", className, style, title, labelWidth = "110px", queryDto, columus, findPage, children, extedBtns } = props;
    // 表单方法
    const formMethodsRef = useRef<FormMethods>(null);
    // 查询方法
    const queryMethod = useRef<Function>(null);
    const [loading, setLoading] = useState(false);

    // 重置
    function rest() {
        const formMethods = formMethodsRef.current;
        if (formMethods) {
            formMethods.resetFields();
        }
    }

    function doQuery() {
        if (queryMethod.current) {
            queryMethod.current();
        }
    }

    function query(queryDto, response) {
        if (findPage) {
            const queryData = formMethodsRef.current.toData();
            return findPage(queryData, response);
        }
    }

    return (
        <PageHeaderLayout title={title} cardType={true}>
            <div className={classNames(prefixCls, className)} style={style}>
                <div className="query-panel">
                    <div className="query-panel">
                        <Form className="query-form fix" labelWidth={labelWidth} defaultModel={queryDto} getFormMethods={(methods) => (formMethodsRef.current = methods)}>
                            {children}
                        </Form>
                        <div className="query-control-panel fix">
                            <div className="fr">
                                <Button type="primary" loading={loading} onClick={doQuery}>
                                    查询
                                </Button>
                                <Button onClick={rest}>重置</Button>
                                {extedBtns}
                            </div>
                        </div>
                        <QueryTable queryDto={queryDto} columus={columus} findPage={query} getQuery={(query) => (queryMethod.current = query)} onFetchChange={setLoading} />
                    </div>
                </div>
            </div>
        </PageHeaderLayout>
    );
}

export default React.memo(withContext(QueryPage));
