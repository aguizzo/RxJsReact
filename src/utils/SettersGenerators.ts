import { capitalize } from "./capitalize";

export type Setters<T> = {
    [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void;
};

// Function to generate the setter methods dynamically
export function createSetters<T>(obj: T): Setters<T> {
    const result = {} as Setters<T>;
    
    for (const key in obj) {
        const setterName = `set${capitalize(key)}` as keyof Setters<T>;
        result[setterName] = ((value: T[typeof key]) => { obj[key] = value; }) as Setters<T>[keyof Setters<T>];
    }
    
    return result;
}