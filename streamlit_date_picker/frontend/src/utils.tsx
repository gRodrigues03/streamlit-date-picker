export enum FormatString {
    time = 'DD/MM/YYYY HH:mm:ss',
    date = 'DD/MM/YYYY',
    week = 'wo/YYYY',
    month = 'MM/YYYY',
    quarter = 'Q/YYYY',
    year = 'YYYY'
}
export const getFormatString = (value: string): FormatString | undefined => {
  switch (value) {
    case 'time':
      return FormatString.time
    case 'date':
      return FormatString.date
    case 'week':
      return FormatString.week
    case 'month':
      return FormatString.month
    case 'quarter':
      return FormatString.quarter
    case 'year':
      return FormatString.year
    default:
      return FormatString.date;
  }
}

export function getMaskByFormat(format: string): Array<string | RegExp> {
  if (format === 'DD/MM/YYYY') {
    return [
      /[0-3]/, /[0-9]/, "/",
      /[0-1]/, /[0-9]/, "/",
      /[1-2]/, /\d/, /\d/, /\d/
    ];
  } else if (format === 'MM/YYYY') {
    return [
      /[0-1]/, /[0-9]/, "/",
      /[1-2]/, /\d/, /\d/, /\d/
    ];
  } else if (format === 'DD/MM/YYYY HH:mm:ss') {
    return [
      /[0-3]/, /[0-9]/, "/",
      /[0-1]/, /[0-9]/, "/",
      /[1-2]/, /\d/, /\d/, /\d/,
      " ",
      /[0-2]/, /[0-9]/, ":",
      /[0-5]/, /[0-9]/, ":",
      /[0-5]/, /[0-9]/
    ];
  }

  return []; // fallback
}

// export function useCssVar(varName: string) {
//   return getComputedStyle(document.documentElement).getPropertyValue(varName)?.trim();
// }
