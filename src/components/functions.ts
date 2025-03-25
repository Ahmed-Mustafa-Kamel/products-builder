
/**
 * 
 * @param {string} text -The input text to be sliced
 * @param {number }max - The maximum lenght of the sliced text
 * @returns 
 */

export function textSlicer(text: string, max: number = 50) {

    if (text.length >= max) return `${text.slice(0, 80)}...`;
    return text;

}