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

// Helper to capitalize the first letter of a string
function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}