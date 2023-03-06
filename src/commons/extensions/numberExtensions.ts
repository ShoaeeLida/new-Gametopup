/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-this-alias */

//#region ### Number ###
interface Number {
  toRial(): number;
  toToman(): number;
  format(): string;
  toTomanFormat(): string;
  toTimeFormat(): string;
  toEnDigit(n: string): string;
}

Number.prototype.toRial = function () {
  return this.valueOf() * 10;
};

Number.prototype.toToman = function () {
  return this.valueOf() / 10;
};

Number.prototype.format = function () {
  return this.toLocaleString("en-US");
};

Number.prototype.toTomanFormat = function () {
  return this.toToman().format();
};

Number.prototype.toTimeFormat = function () {
  const sec = Math.round(this.valueOf() % 60);
  const min = Math.round(this.valueOf() / 60);
  return `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;
};
//

Number.prototype.toEnDigit = function (n: string) {
  let result = n;
  if (n != null) {
    if (n.length > 0) {
      result = n
        .replace(/۰/g, "0")
        .replace(/۱/g, "1")
        .replace(/۲/g, "2")
        .replace(/۳/g, "3")
        .replace(/۴/g, "4")
        .replace(/۵/g, "5")
        .replace(/۶/g, "6")
        .replace(/۷/g, "7")
        .replace(/۸/g, "8")
        .replace(/۹/g, "9")
        .replace(/٠/g, "0")
        .replace(/١/g, "1")
        .replace(/٢/g, "2")
        .replace(/٣/g, "3")
        .replace(/٤/g, "4")
        .replace(/٥/g, "5")
        .replace(/٦/g, "6")
        .replace(/٧/g, "7")
        .replace(/٨/g, "8")
        .replace(/٩/g, "9");
    }
  } else {
    result = "";
  }
  return result;
};

//#endregion
