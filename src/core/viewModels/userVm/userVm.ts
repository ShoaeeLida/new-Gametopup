import { BaseVm } from "./../common/baseVm";
export class UserVm extends BaseVm {
  firstName: string = "";
  lastName: string = "";
  email: string = "";
 // userName: string = "";
  password: string = "";
  isActive: boolean = true;
  roles: Array<string> = [];
}
