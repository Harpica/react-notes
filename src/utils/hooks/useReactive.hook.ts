import { Dispatch, SetStateAction, useState } from "react";
import { SetValue } from "./useLocalStorage";

export interface ReactiveState<T> {
  get: T;
  set: Dispatch<SetStateAction<T>> | SetValue<T>;
}

export default function useReactive<T>(data: T): ReactiveState<T> {
  const [state, setState] = useState(data);

  return {
    get: state,
    set: setState,
  };
}
