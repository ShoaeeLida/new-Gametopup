import { instanceToPlain, plainToInstance } from "class-transformer";
import { BaseResponse } from "../viewModels/common/baseResponseVm";
import { UserVm,UserCreateVm,UserEditVm } from "../viewModels";
import axios from "src/plugins/axios";
import { MessageTypeEnum } from "src/commons";
import { RequestProp } from "../viewModels/quasar";
import { TableVm } from "../viewModels/table";

const baseEndpoint="/UserManager";

export class UserManagerService{
  currentRequestProp: RequestProp = new RequestProp();
  async detailAsync(id: string): Promise<UserVm> {
    const url = `${baseEndpoint}/${id}`;
    const response = await axios.get<BaseResponse<UserVm>>(url);
    const baseResponse = response.data;
    let detail!: UserVm;
    if (baseResponse.status == MessageTypeEnum.Success) {
      detail = plainToInstance(UserVm, baseResponse.data);
    } else {
      detail = new UserVm();
    }
    return detail;
  }

  async tableAsync( requestProp: RequestProp): Promise<BaseResponse<Array<UserVm>>> {
    const url = `${baseEndpoint}/List`;
    this.currentRequestProp.setData(requestProp);
    const table = TableVm.toTable(this.currentRequestProp);
    const jsonData = instanceToPlain(table);

    const response = await axios.post<BaseResponse<Array<UserVm>>>( url,
      jsonData);
    const baseResponse = response.data;
   // let result: Array<UserVm> = [];
    if (baseResponse.status == MessageTypeEnum.Success) {
      baseResponse.data = plainToInstance(UserVm, baseResponse.data);
    }
    return baseResponse;
  }

  async addAsync(model: UserCreateVm): Promise<BaseResponse<UserVm>> {
    const url = `${baseEndpoint}`;
    const response = await axios.post<BaseResponse<UserVm>>(url, model);
    const baseResponse = response.data;
    if (baseResponse.status == MessageTypeEnum.Success) {
      baseResponse.data = plainToInstance(UserVm, baseResponse.data);
    }
    return baseResponse;
  }

  async updateAsync(model: UserEditVm): Promise<BaseResponse<UserVm>> {
    const url = `${baseEndpoint}/${model.id}`;
    const response = await axios.put<BaseResponse<UserVm>>(url, model);
    const baseResponse = response.data;
    if (baseResponse.status == MessageTypeEnum.Success) {
      baseResponse.data = plainToInstance(UserVm, baseResponse.data);
    }
    return baseResponse;
  }

}
