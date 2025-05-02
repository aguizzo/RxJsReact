import React from "react";
import { createGetters } from "../utils/GettersGenerator";
import { capitalize } from "../utils/capitalize";

function useStateWithAccessors<T extends object>(initialState: T) {
  const [state, setState] = React.useState<T>(initialState);

  // Create getters for reading state
  const getters = createGetters(state);

  // Create setters that update React state
  const setters = {} as any;
  for (const key in state) {
    const setterName = `set${capitalize(key)}`;
    setters[setterName] = (value: any) => {
      setState((prev) => ({ ...prev, [key]: value }));
    };
  }

  return { state, ...getters, ...setters };
}

export { useStateWithAccessors };