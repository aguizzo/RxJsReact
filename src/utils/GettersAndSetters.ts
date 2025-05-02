import { capitalize } from "./capitalize";
import { Getters } from "./GettersGenerator";
import { Setters } from "./SettersGenerators";

// Type for combined getters and setters
export type GettersAndSetters<T> = Getters<T> & Setters<T>;

// Function to generate both getter and setter methods dynamically
export function createGettersAndSetters<T>(obj: T): GettersAndSetters<T> {
    const result = {} as GettersAndSetters<T>;
    
    for (const key in obj) {
        const getterName = `get${capitalize(key)}` as keyof Getters<T>;
        const setterName = `set${capitalize(key)}` as keyof Setters<T>;
        
        // Add getter
        result[getterName] = (() => obj[key]) as GettersAndSetters<T>[keyof Getters<T>];
        
        // Add setter
        result[setterName] = ((value: T[typeof key]) => { 
            obj[key] = value; 
        }) as GettersAndSetters<T>[keyof Setters<T>];
    }
    
    return result;
}