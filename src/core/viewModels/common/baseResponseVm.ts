
import { MessageTypeEnum } from "src/commons";
//import { Transform } from "class-transformer";

export class BaseResponse<T>{
  data!:T;
  //@Transform((status) => MessageTypeEnum[status.value])
  status: MessageTypeEnum = MessageTypeEnum.Success;
  isSuccess:boolean=true;
  isFailure:boolean=false;
  message:string="";
  errors: Array<string> = [];
  total:number=0;
  get joinedErrors(){
    if(this.errors)
    return this.errors.join(",");
    else
    return "";
  }
}
