import { capitalize } from "./capitalize";

export type PropertyAccessors<T> = {
    [K in keyof T as `get${Capitalize<string & K>}`]:  () => T[K];
};

// Function to generate the getter methods dynamically
export function makeAccessors<T>(obj: T): PropertyAccessors<T> {
    const result = {} as PropertyAccessors<T>;
    
    for (const key in obj) {
        const getterName = `get${capitalize(key)}` as keyof PropertyAccessors<T>;
        result[getterName] = (() => obj[key]) as PropertyAccessors<T>[keyof PropertyAccessors<T>];
    }
    
    return result;
}

export function makeLoggingAccessors<T>(obj: T): PropertyAccessors<T> {
    const result = {} as PropertyAccessors<T>;
    
    for (const key in obj) {
        const getterName = `get${capitalize(key)}` as keyof PropertyAccessors<T>;
        result[getterName] = (() => {
            console.info(`Accessed ${key}: ${obj[key]}`);
            return obj[key];
        }) as PropertyAccessors<T>[keyof PropertyAccessors<T>];
    }
    
    return result;
}
