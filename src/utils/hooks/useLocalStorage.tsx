import { useState, useEffect, useCallback, useMemo } from "react";

export type SetValue<T> = (newValue: T) => void;

// !! Doesn't support work with dublicated tabs

function useLocalStorage<T>(
  keyName: string,
  defaultValue: T
): { get: T; set: SetValue<T> } {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value !== undefined && value !== null) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      console.error(err);
      return defaultValue;
    }
  });

  // custom event, returns string - name of the event, like 'onclick'
  const customEventOnSetName = useMemo(() => {
    return `session-storage-${keyName}-update`;
  }, [keyName]);

  // custom event function that dispatches event
  const customEventOnSet = useCallback(
    (newValue: T) => {
      if (typeof document !== "undefined") {
        const event: CustomEvent<{ newValue: T }> = new CustomEvent(
          customEventOnSetName,
          { detail: { newValue } }
        );
        document.dispatchEvent(event);
      } else {
        console.warn("[useSessionStorage] document is undefined");
      }
    },
    [customEventOnSetName]
  );

  // custom event handler
  const customEventListener = useCallback(
    (event: CustomEvent<{ newValue: T }>) => {
      const { newValue } = event.detail;
      if (storedValue !== newValue) {
        setStoredValue(newValue);
      }
    },
    [storedValue]
  );

  // wrapper for setting value, calls custom event dispatcher
  const setValue = useCallback(
    (newValue: T) => {
      try {
        window.localStorage.setItem(keyName, JSON.stringify(newValue));
      } catch (err) {
        // придумать, что делать, если во время теста ошибка
        console.log(err);
      }
      setStoredValue(newValue);
      customEventOnSet(newValue);
    },
    [setStoredValue, customEventOnSet, keyName]
  );

  // adding listeners for custom event on dicument
  useEffect(() => {
    document.addEventListener(
      customEventOnSetName,
      customEventListener as EventListener
    );

    return () => {
      document.removeEventListener(
        customEventOnSetName,
        customEventListener as EventListener
      );
    };
  }, [keyName, storedValue, customEventListener, customEventOnSetName]);

  return { get: storedValue, set: setValue };
}

export default useLocalStorage;
