export function deepCopy<T = any>(obj: any): T {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    const newObj: any = Array.isArray(obj) ? [] : {};

    for (const key in obj) {
        newObj[key] = deepCopy(obj[key]);
    }

    return newObj as T;
}