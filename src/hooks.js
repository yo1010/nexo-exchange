import { useEffect, useRef } from 'react';

/**
 *
 * @param callback - callback to pass into interval
 * @param delay - amount of time to delay between each call
 * @param isStarted - boolean to determine whether to start executing
 */
export const useInterval = (callback, delay = 5000, isStarted = false) => {
    const savedCallback = useRef();

    useEffect(() => {
        if (isStarted) {
            savedCallback.current = callback;
        }
    }, [callback, isStarted]);

    useEffect(() => {
        if (isStarted) {
            const intervalId = setInterval(
                () => savedCallback.current(),
                delay
            );

            return () => {
                clearInterval(intervalId);
            };
        }
    }, [delay, isStarted]);
};
