/* eslint-disable @typescript-eslint/no-unused-vars */

//#region ### Promise ###
interface PromiseConstructor {
  delay(timeout: number): Promise<string>;
  waitUntil(timeout: number, condition: () => boolean): Promise<string>;
}

Promise.delay = function (timeout: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, timeout);
  });
};

Promise.waitUntil = async function (timeout: number, condition: () => boolean) {
  return await new Promise((resolve) => {
    const interval = setInterval(() => {
      if (condition()) {
        resolve("");
        clearInterval(interval);
      }
    }, timeout);
  });
};
//#endregion
