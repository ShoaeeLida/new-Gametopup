//import { Transform } from "class-transformer";
//import moment from "jalali-moment";

export class BaseVm<T = string> {
  id!: T;

  // @Transform(({ value }) => {
  //   try {
  //     return moment(value).locale("fa").format("YYYY-MM-DD HH:mm");
  //   } catch (e) {
  //     return "";
  //   }
  // })
  // createDateTime: string = "";

  // @Transform(({ value }) => {
  //   try {
  //     return moment(value).locale("fa").format("YYYY-MM-DD HH:mm");
  //   } catch (e) {
  //     return "";
  //   }
  // })
  // updateDateTime: string = "";
}
