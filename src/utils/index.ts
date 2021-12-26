export const jsonCopy = (json: unknown) => JSON.parse(JSON.stringify(json));

export const isElement = (element: unknown) => element instanceof HTMLElement;

export function getTranslateXY(element: HTMLElement) {
    const style = window.getComputedStyle(element);
    const matrix = new DOMMatrixReadOnly(style.transform);
    return {
        translateX: matrix.m41,
        translateY: matrix.m42,
    };
}

// 8 to 30 symbols, must use digit, lower and uppercase letter
export const passwordPattern = "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,30}";

export const isSsr = import.meta.env.SSR;

export function isToday(date: Date): boolean {
        const today = new Date();
        return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
}

export function range(start: number, end: number): Array<number> {
    const length = end - start;
    return Array.from({ length }, (_, i) => start + i);
}


export function appendPathToPrefix(prefix: string, path: string): string {
    return `/${prefix}/${path}`;
}

export function makeBlogUrl(slug: string): string {
    return appendPathToPrefix('blog', slug)
}

export function makeTagsUrl(tag: string): string {
    return appendPathToPrefix('tags', tag);
}
