import { Pagination, Spin, Table, TableColumn } from "@/Components/MyComponentTools";
import { ResponsePage } from "@/Interface/ResponseInterface";
import { DefaultPageInfo, FetchState } from "@/Utils/Hooks/useFetch";
import classNames from "classnames";
import React, { useState, useEffect } from "react";
import { useMount } from "utils-hooks";

export interface QueryTableProps<QueryDto, QueryResult> {
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
     * 获取查询方法
     */
    getQuery?: (query: Function) => void;
    /**
     * 查询状态更改
     */
    onFetchChange?: (fetch: boolean) => void;
}

function QueryTable<QueryDto, QueryResult>(props: QueryTableProps<QueryDto, QueryResult>) {
    const { prefixCls = "query-result", className, style, queryDto, columus, findPage, getQuery, onFetchChange } = props;
    const [fetchState, setFetchState] = useState<FetchState<ResponsePage<QueryResult>>>({ loading: true, result: DefaultPageInfo, error: null });
    const response = fetchState.result;

    // 分页查询
    function query() {
        if (findPage) {
            setFetchState({ ...fetchState, loading: true });
            findPage(queryDto, response)
                .then((responsePage) => {
                    setFetchState({ loading: false, result: responsePage, error: null });
                })
                .catch((error) => {
                    setFetchState({ loading: false, result: null, error: error });
                });
        }
    }

    if (getQuery) {
        getQuery(query);
    }

    // 更改当前页
    function handlePageChange(page: number) {
        response.pageNum = page;
        query();
    }

    // 更改查询页数
    function handlePageSizeChange(pageSize: number) {
        response.pageSize = pageSize;
        query();
    }

    useEffect(() => {
        if (onFetchChange) {
            onFetchChange(fetchState.loading);
        }
    }, [fetchState.loading]);

    useMount(() => {
        query();
    });

    return (
        <div className={classNames(prefixCls, className)} style={style}>
            <div className="query-table">
                <Spin spinning={fetchState.loading} inline={false}>
                    <Table scroll={{ x: 1200 }} columns={columus} data={fetchState.result.list} />
                </Spin>
            </div>
            <div className="query-pagination fix">
                <Pagination current={response.pageNum} total={response.total} pageSize={response.pageSize} showSizeChanger={true} onChange={handlePageChange} onPageSizeChange={handlePageSizeChange} />
                <span className="total-count">
                    共<span className="total">{response.total}</span>条
                </span>
            </div>
        </div>
    );
}

export default React.memo(QueryTable);
