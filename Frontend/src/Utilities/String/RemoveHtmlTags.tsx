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


export function SummarizeText(text: string, maxLength: number): string {
  if (!text) {
    return ''
  }
  // Check if the text length is greater than the maximum allowed length
  if (text.length > maxLength) {
    // Truncate the text to the maximum length minus 3 to account for the ellipsis
    return text.substring(0, maxLength - 3) + "...";
  } else {
    // If the text is within the limit, return it as is
    return text;
  }
}



