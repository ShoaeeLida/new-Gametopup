import { instanceToPlain, plainToInstance } from "class-transformer";
import { BaseResponse } from "../viewModels/common/baseResponseVm";
import { CustomerVm,CustomerCreateVm,CustomerEditVm } from "../viewModels";
import axios from "src/plugins/axios";
import { MessageTypeEnum } from "src/commons";
import { RequestProp } from "../viewModels/quasar";
import { TableVm } from "../viewModels/table";

const baseEndpoint="/Customer";

export class CustomerService{
  currentRequestProp: RequestProp = new RequestProp();
  async detailAsync(id: string): Promise<CustomerEditVm> {
    const url = `${baseEndpoint}/${id}`;
    const response = await axios.get<BaseResponse<CustomerEditVm>>(url);
    const baseResponse = response.data;
    let detail!: CustomerEditVm;
    if (baseResponse.status == MessageTypeEnum.Success) {
      detail = plainToInstance(CustomerEditVm, baseResponse.data);
    } else {
      detail = new CustomerEditVm();
    }
    return detail;
  }

  async tableAsync( requestProp: RequestProp): Promise<BaseResponse<Array<CustomerVm>>> {
    const url = `${baseEndpoint}/List`;
    this.currentRequestProp.setData(requestProp);
    const table = TableVm.toTable(this.currentRequestProp);
    const jsonData = instanceToPlain(table);

    const response = await axios.post<BaseResponse<Array<CustomerVm>>>( url,
      jsonData);
    const baseResponse = response.data;
   // let result: Array<CustomerVm> = [];
    if (baseResponse.status == MessageTypeEnum.Success) {
      baseResponse.data = plainToInstance(CustomerVm, baseResponse.data);
    }
    return baseResponse;
  }

  async addAsync(model: CustomerCreateVm): Promise<BaseResponse<CustomerVm>> {
    const url = `${baseEndpoint}`;
    const response = await axios.post<BaseResponse<CustomerVm>>(url, model);
    const baseResponse = response.data;
    if (baseResponse.status == MessageTypeEnum.Success) {
      baseResponse.data = plainToInstance(CustomerVm, baseResponse.data);
    }
    return baseResponse;
  }

  async updateAsync(model: CustomerEditVm): Promise<BaseResponse<CustomerVm>> {
    const url = `${baseEndpoint}/${model.id}`;
    const response = await axios.put<BaseResponse<CustomerVm>>(url, model);
    const baseResponse = response.data;
    if (baseResponse.status == MessageTypeEnum.Success) {
      baseResponse.data = plainToInstance(CustomerVm, baseResponse.data);
    }
    return baseResponse;
  }

}
