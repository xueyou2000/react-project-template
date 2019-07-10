import { useState } from "react";
import Store from "../../Stores/Store";
import { useUnmount } from 'utils-hooks';

export function useStore<T>(store: Store<T>): [T, (v: T) => void] {
    const [val, setVal] = useState(store.value);

    const unsubscribe = store.subscribe((value) => {
        setVal(value);
    });

    useUnmount(() => {
        unsubscribe();
    });

    return [val, store.change];
}
