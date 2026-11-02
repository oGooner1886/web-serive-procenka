import { useState, useEffect, useRef, useMemo } from 'react';

export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function useThrottledCallback(callback, limit = 300) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  const throttled = useMemo(() => {
    let lastRun = 0;
    let timerId = null;

    const fn = (...args) => {
      const now = Date.now();

      if (now - lastRun >= limit) {
        if (timerId) {
          clearTimeout(timerId);
          timerId = null;
        }
        lastRun = now;
        callbackRef.current(...args);
      } else if (!timerId) {
        timerId = setTimeout(() => {
          lastRun = Date.now();
          timerId = null;
          callbackRef.current(...args);
        }, limit - (now - lastRun));
      }
    };

    fn.cancel = () => {
      if (timerId) {
        clearTimeout(timerId);
        timerId = null;
      }
    };

    return fn;
  }, [limit]);

  useEffect(() => {
    return () => {
      throttled.cancel();
    };
  }, [throttled]);

  return throttled;
}

export function useDebouncedCallback(
  callback,
  delay = 500,
  options = { leading: false, trailing: true }
) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  const { leading = false, trailing = true } = options;

  const debounced = useMemo(() => {
    let timerId = null;
    let lastArgs = null;

    const fn = (...args) => {
      const isInvoking = leading && !timerId;
      lastArgs = args;

      if (timerId) {
        clearTimeout(timerId);
      }

      if (isInvoking) {
        callbackRef.current(...args);
        lastArgs = null;
      }

      timerId = setTimeout(() => {
        if (trailing && lastArgs) {
          callbackRef.current(...lastArgs);
        }
        timerId = null;
        lastArgs = null;
      }, delay);
    };

    fn.cancel = () => {
      if (timerId) {
        clearTimeout(timerId);
        timerId = null;
      }
      lastArgs = null;
    };

    return fn;
  }, [delay, leading, trailing]);

  useEffect(() => {
    return () => {
      debounced.cancel();
    };
  }, [debounced]);

  return debounced;
}
