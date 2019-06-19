import React, { useState } from "react";

interface FetchState<T = any> {
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
