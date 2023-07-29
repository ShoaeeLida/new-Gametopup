import { instanceToPlain, plainToInstance } from "class-transformer";
import { BaseResponse } from "../viewModels/common/baseResponseVm";
import {
  UserVm,
  UserCreateVm,
  UserEditVm,
  DropDownVm,
  UserTenantVm,
  CustomerDdlVm
} from "../viewModels";
import axios from "src/plugins/axios";
import { MessageTypeEnum } from "src/commons";
import { RequestProp } from "../viewModels/quasar";
import { TableVm } from "../viewModels/table";

const baseEndpoint = "/UserManager";


export class UserManagerService {
  currentRequestProp: RequestProp = new RequestProp();
  //ddlUserTenant: Array<DropDownVm> = [];

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

  async tableAsync(
    requestProp: RequestProp
  ): Promise<BaseResponse<Array<UserVm>>> {
    const url = `${baseEndpoint}/List`;
    this.currentRequestProp.setData(requestProp);
    const table = TableVm.toTable(this.currentRequestProp);
    const jsonData = instanceToPlain(table);

    const response = await axios.post<BaseResponse<Array<UserVm>>>(
      url,
      jsonData
    );
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

  async getUserTenant(): Promise<Array<DropDownVm>> {
    const url = "account/getTenantUsers";
    const response = await axios.get<BaseResponse<Array<UserTenantVm>>>(url);
    const baseResponse = response.data;
    let result: Array<UserTenantVm> = [];
    if (baseResponse.status == MessageTypeEnum.Success) {
      result = plainToInstance(UserTenantVm, baseResponse.data);
    }
    const ddlUserTenant: Array<DropDownVm> = []
    for (const item of result) {
      ddlUserTenant.push({ label: `${item.fullName} `, value: item.id });
    }
    return ddlUserTenant;
  }
//

async getCustomer(): Promise<Array<DropDownVm>> {
  const url = "order/search/customers";
  const response = await axios.get<BaseResponse<Array<CustomerDdlVm>>>(url);
  const baseResponse = response.data;
  let result: Array<CustomerDdlVm> = [];
  if (baseResponse.status == MessageTypeEnum.Success) {
    result = plainToInstance(CustomerDdlVm, baseResponse.data);
  }
  const customerList: Array<DropDownVm> = []
  for (const item of result) {
    customerList.push({ label: `${item.value} `, value: item.key });
  }
  return customerList;
}

}
