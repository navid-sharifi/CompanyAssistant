const he = require('he');

export default function RemoveHtmlTags(str: string): string {
    if ((str === null) || (str === ''))
        return '';
    else {
        str = str.toString();
    }
    return asciiToChar(str.replace(/<[^>]*>/g, ''))
}

function asciiToChar(str: string): string {
    return he.decode(str);
}