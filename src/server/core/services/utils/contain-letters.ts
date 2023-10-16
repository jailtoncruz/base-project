export function containLetters(s: string) {
  return s.match(/[a-zA-Z]/) === null ? false : true;
}
