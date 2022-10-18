import { useEffect, useRef } from 'react'

/**
 * The Hook is used to initialize a component only once after it's mounted.
 * Useful with React.StrictMode to prevent multiple http requests.
 * @param callback
 */
export function useInitializer(callback: VoidFunction): void {
    const initRef = useRef<boolean>(false)

    useEffect(() => {
        if (!initRef.current) {
            initRef.current = true
            callback()
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
}
