export const capitaliseFirstLetter = (str: string): string => {
  return str.replace(/^\w/, c => c.toUpperCase())
}

export const formatNumberToThreeDigits = (num: number): string => {
  const digits = 3
  let str = num.toString()

  if (str.length < digits) {
    str = str.padStart(digits, '0')
  }

  return str
}
