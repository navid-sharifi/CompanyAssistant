export default function IsNumberString(str: string): boolean {
  return !isNaN(parseFloat(str));
}
