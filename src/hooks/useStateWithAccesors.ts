import React from "react";
import {
  PropertyAccessors,
  makeAccessors,
} from "../utils/accessorFactory";
import { capitalize } from "../utils/capitalize";

function useStateWithAccessors<T extends object>(
  initialState: T,
  getterFactory: (obj: T) => PropertyAccessors<T> = makeAccessors
) {
  const [state, setState] = React.useState<T>(initialState);

  // Create getters for reading state
  const getters = getterFactory(state);

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
