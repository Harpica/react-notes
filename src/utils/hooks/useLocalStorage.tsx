import { useState, useEffect, useCallback, useMemo } from "react";

export type SetValue<T> = (newValue: T) => void;

// !! Doesn't support work with dublicated tabs

function useLocalStorage<T>(
  keyName: string,
  defaultValue: T
): [{ get: T; set: SetValue<T> }, { get: string; set: SetValue<string> }] {
  const [key, setKeyValue] = useState<string>(keyName);
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const value = window.localStorage.getItem(key);
      if (value !== undefined && value !== null) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      console.error(err);
      return defaultValue;
    }
  });

  // custom event, returns string - name of the event, like 'onclick'
  const customEventOnSetName = useMemo(() => {
    return `session-storage-${key}-update`;
  }, [key]);

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
        window.localStorage.setItem(key, JSON.stringify(newValue));
      } catch (err) {
        // придумать, что делать, если во время теста ошибка
        console.log(err);
      }
      setStoredValue(newValue);
      customEventOnSet(newValue);
    },
    [setStoredValue, customEventOnSet, key]
  );

  const setKey = useCallback(
    (newKey: string) => {
      const storedStringValue = window.localStorage.getItem(newKey);
      if (storedStringValue) {
        const newValue = JSON.parse(storedStringValue);
        setStoredValue(newValue);
        customEventOnSet(newValue);
      }
      setKeyValue(newKey);
    },
    [setKeyValue, setStoredValue]
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
  }, [key, storedValue, customEventListener, customEventOnSetName]);

  return [
    { get: storedValue, set: setValue },
    { get: key, set: setKey },
  ];
}

export default useLocalStorage;
