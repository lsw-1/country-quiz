import * as R from "ramda";
const strFormatter = (str: string): string[] =>
  str
    .toLowerCase()
    .replace(/\s/g, "")
    .split("");

export const isCorrect = R.curry((guess: string, actual: string): boolean => {
  const guessAsArr = strFormatter(guess);
  const actualAsArr = strFormatter(actual);
  const numOfMatch = R.pipe(
    R.zipWith((a, b) => (a === b ? 1 : 0), actualAsArr),
    R.reduce((curr, init) => curr + init, 0)
  )(guessAsArr);
  const percentage = numOfMatch / actualAsArr.length;
  const Threshold = 0.69;
  return percentage > Threshold ? true : false;
});
