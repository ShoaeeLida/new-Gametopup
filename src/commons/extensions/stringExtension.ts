/* eslint-disable @typescript-eslint/no-unused-vars */
//#region ### String ###
interface String {
  toNumber(): number;
  toNumberFormat(): string;
  toEnglishNumber(): string;
  toPersianNumber(): string;
  // replaceAll(searchValue: string | RegExp, replaceValue: string): string;
  toBoolean(): boolean;
  isEmpty(): boolean;
  isValidEmail(): boolean;
  trimChar(chr: string): string;
  trimCharStart(chr: string): string;
  trimCharEnd(chr: string): string;
}

String.prototype.toNumber = function () {
  const strNum = this.replace(/,/g, "");
  const num = Number(strNum);
  return isNaN(num) ? 0 : num;
};

String.prototype.toNumberFormat = function () {
  const num = this.toNumber();
  return num.format();
};

// String.prototype.toEnglishNumber = function () {
//   const englishNumbers: Array<string> = [];
//   const symbolMap = {
//     '۱': '1',
//     '۲': '2',
//     '۳': '3',
//     '۴': '4',
//     '۵': '5',
//     '۶': '6',
//     '۷': '7',
//     '۸': '8',
//     '۹': '9',
//     '۰': '0',
//   };

//   const persianNumber = this;
//   for (let i = 0; i < persianNumber.length; i++) {
//     if (symbolMap[persianNumber[i]]) {
//       englishNumbers.push(symbolMap[persianNumber[i]]);
//     } else {
//       englishNumbers.push(persianNumber[i]);
//     }
//   }
//   return englishNumbers.join('');
// };

// String.prototype.toPersianNumber = function () {
//   const persianNumbers: Array<string> = [];
//   const symbolMap = {
//     '1': '۱',
//     '2': '۲',
//     '3': '۳',
//     '4': '۴',
//     '5': '۵',
//     '6': '۶',
//     '7': '۷',
//     '8': '۸',
//     '9': '۹',
//     '0': '۰',
//   };

//   const englishNumber = this;
//   for (let i = 0; i < englishNumber.length; i++) {
//     if (symbolMap[englishNumber[i]]) {
//       persianNumbers.push(symbolMap[englishNumber[i]]);
//     } else {
//       persianNumbers.push(englishNumber[i]);
//     }
//   }
//   return persianNumbers.join('');
// };

// String.prototype.replaceAll = function(
//   searchValue: string | RegExp,
//   replaceValue: string | ((substring: string, ...args: any[]) => string)
// ): string {
//   return this.replace(new RegExp(searchValue, "g"), replaceValue);
// };

String.prototype.toBoolean = function () {
  try {
    return JSON.parse(this.valueOf()) as boolean;
  } catch {
    return false;
  }
};

String.prototype.isEmpty = function () {
  return this.length === 0 || !this.trim();
};

String.prototype.isValidEmail = function () {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(String(this).toLowerCase());
};

String.prototype.trimChar = function (chr) {
  const regex = new RegExp(`^${chr}+|${chr}+$`, "g");
  return this.replace(regex, "");
};

String.prototype.trimCharStart = function (chr) {
  const regex = new RegExp(`^${chr}+`, "g");
  return this.replace(regex, "");
};

String.prototype.trimCharEnd = function (chr) {
  const regex = new RegExp(`${chr}+$`, "g");
  return this.replace(regex, "");
};

//#endregion
