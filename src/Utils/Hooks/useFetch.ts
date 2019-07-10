import React, { useState } from "react";
import { ResponsePage } from '@/Interface/ResponseInterface';

export interface FetchState<T = any> {
    /**
     * 是否加载中
     */
    loading: boolean;
    /**
     * 结果
     */
    result: T;
    /**
     * 异常状态
     */
    error: Error;
}

export const DefaultFetchState = { loading: true, result: null, error: null };

export const DefaultPageInfo: ResponsePage<any> = {
    pageNum: 1,
    pageSize: 5,
    total: 0,
    hasPreviousPage: false,
    hasNextPage: true,
    list: [],
};

export default function useFetch<T>(promise: Promise<T>) {
    const [state, setState] = useState<FetchState<T>>({ loading: true, result: null, error: null });

    promise
        .then((response) => {
            setState({ loading: false, result: response, error: null });
        })
        .catch((error) => {
            setState({ loading: false, result: null, error: error });
        });

    return state;
}
