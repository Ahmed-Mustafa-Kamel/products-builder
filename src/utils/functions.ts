/**
 * @param {string} text - the input text to be sliced
 * @param {number} max - the maximum length befor truncation
 * @returns -the sliced text with and ellipsis(...) appended if truncated
 */
export function textSlicer(text: string, max: number = 70) {
    if (text.length >= max) return `${text.slice(0, max)}...`;
    return text;
}