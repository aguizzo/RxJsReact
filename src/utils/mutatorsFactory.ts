import { capitalize } from "./capitalize";

export type PropertyMutators<T> = {
  [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void;
};

// Function to generate mutator methods dynamically
export function makeMutators<T>(obj: T): PropertyMutators<T> {
  const result = {} as PropertyMutators<T>;

  for (const key in obj) {
    const setterName = `set${capitalize(key)}` as keyof PropertyMutators<T>;
    result[setterName] = ((value: T[typeof key]) => {
      obj[key] = value;
    }) as PropertyMutators<T>[keyof PropertyMutators<T>];
  }

  return result;
}

export function makeStateMutators<T>(
  obj: T,
  setState: (updater: (prev: T) => T) => void
): PropertyMutators<T> {
  const result = {} as PropertyMutators<T>;

  for (const key in obj) {
    const setterName = `set${capitalize(key)}` as keyof PropertyMutators<T>;
    result[setterName] = ((value: T[typeof key]) => {
      setState((prev) => ({ ...prev, [key]: value }));
    }) as PropertyMutators<T>[keyof PropertyMutators<T>];
  }

  return result;
}
