import { useEffect, useState } from 'react'

function useStorage(
    storageKey,
    initialState
){
    let sessionItem = localStorage.getItem(storageKey);
    let previousState = sessionItem ? JSON.parse(sessionItem) : initialState;
    const [value, setValue] = useState(previousState);

    useEffect(() => {
        if (value) {
            localStorage.setItem(storageKey, JSON.stringify(value))
        } else {
            localStorage.removeItem(storageKey)
        }
    }, [storageKey, value]);

    return [value, setValue]
}

export default useStorage
