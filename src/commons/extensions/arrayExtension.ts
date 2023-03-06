/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */

//#region ### Array ###
interface Array<T> {
  clear(): Array<T>;
  max(): number;
  min(): number;
  sum(): number;
  unique(): Array<T>;
  // toTree<T>(id?: number): Array<T>;
}

Array.prototype.clear = function () {
  this.splice(0, this.length);
  return this;
};

Array.prototype.max = function () {
  return this.length == 0 ? 0 : Math.max.apply(null, this);
};

Array.prototype.min = function () {
  return this.length == 0 ? 0 : Math.min.apply(null, this);
};

Array.prototype.sum = function () {
  return this.reduce((a: number, b: number) => a + b, 0);
};

Array.prototype.unique = function () {
  return this.filter((item, pos, self) => self.indexOf(item) == pos);
};

// Array.prototype.toTree = function (id) {
//   return this.filter((item) => item.parentId === id).map((item) => ({
//     ...item,
//     children: this.toTree(item.id),
//   }));
// };
//#endregion
