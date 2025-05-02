import React from "react";
import { PropertyAccessors, makeAccessors } from "../utils/accessorFactory";
import { makeStateMutators } from "../utils/mutatorsFactory";

const useStateWithAccessors = <T extends object>(
  initialState: T,
  getterFactory: (obj: T) => PropertyAccessors<T> = makeAccessors
) => {
  const [state, setState] = React.useState<T>(initialState);

  const getters = getterFactory(state);
  const setters = makeStateMutators(state, setState);

  return { state, ...getters, ...setters };
};

export { useStateWithAccessors };
