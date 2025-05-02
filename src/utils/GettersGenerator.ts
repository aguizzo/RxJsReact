import { capitalize } from "./capitalize";

export type Getters<T> = {
    [K in keyof T as `get${Capitalize<string & K>}`]:  () => T[K];
};

// Function to generate the getter methods dynamically
export function createGetters<T>(obj: T): Getters<T> {
    const result = {} as Getters<T>;
    
    for (const key in obj) {
        const getterName = `get${capitalize(key)}` as keyof Getters<T>;
        result[getterName] = (() => obj[key]) as Getters<T>[keyof Getters<T>];
    }
    
    return result;
}

export function createGettersWithLogging<T>(obj: T): Getters<T> {
    const result = {} as Getters<T>;
    
    for (const key in obj) {
        const getterName = `get${capitalize(key)}` as keyof Getters<T>;
        result[getterName] = (() => {
            console.info(`Accessed ${key}: ${obj[key]}`);
            return obj[key];
        }) as Getters<T>[keyof Getters<T>];
    }
    
    return result;
}
