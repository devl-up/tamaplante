export const sortAlphabetically = <T>(mapFn: (t: T) => string) => {
  return (a: T, b: T) => (a === b ? 0 : mapFn(a) > mapFn(b) ? 1 : -1);
};
