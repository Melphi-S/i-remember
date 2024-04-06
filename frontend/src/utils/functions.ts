export function getDeclension(number: number, words: string[]) {
  return words[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? Math.abs(number) % 10 : 5]
  ];
}

export function getPluralForm(number: number, words: string[]) {
  return words[number === 1 ? 0 : 1];
}

export function getDaysBetween(date1: Date, date2: Date) {
  const oneDay = 1000 * 60 * 60 * 24;

  const date1_ms = date1.getTime();
  const date2_ms = date2.getTime();

  const difference_ms = date2_ms - date1_ms;

  return Math.round(difference_ms / oneDay);
}
