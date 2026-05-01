export function capitalizeFirstLetter(str: string): string {
  return str.replace(/^./, char => char.toUpperCase());
}
