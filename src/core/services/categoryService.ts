
import { instanceToPlain, plainToInstance } from "class-transformer";
import { BaseResponse } from "../viewModels/common/baseResponseVm";
import { CategoryVm,CategoryCreateVm } from "../viewModels";
import axios from "src/plugins/axios";
import { MessageTypeEnum } from "src/commons";
import { RequestProp } from "../viewModels/quasar";
import { TableVm } from "../viewModels/table";

const baseEndpoint = "/ProductCategory";

export class CategoryService {
  currentRequestProp: RequestProp = new RequestProp();


  async tableAsync(requestProp: RequestProp): Promise<BaseResponse<Array<CategoryVm>>> {
    const url = `${baseEndpoint}/List`;
    this.currentRequestProp.setData(requestProp);
    const table = TableVm.toTable(this.currentRequestProp);
    const jsonData = instanceToPlain(table);

    const response = await axios.post<BaseResponse<Array<CategoryVm>>>(
      url,
      jsonData
    );
    const baseResponse = response.data;
    if (baseResponse.status == MessageTypeEnum.Success) {
      baseResponse.data = plainToInstance(CategoryVm, baseResponse.data);
    }
    return baseResponse;
  }

  async listAsync(): Promise<Array<CategoryVm>> {
    const url = `${baseEndpoint}/List`;
    const response = await axios.get<BaseResponse<Array<CategoryVm>>>(url);
    const baseResponse = response.data;
    let result: Array<CategoryVm> = [];
    if (baseResponse.status == MessageTypeEnum.Success) {
      result = plainToInstance(CategoryVm, baseResponse.data);
    }
    return result;
  }

  async addAsync(model: CategoryCreateVm): Promise<BaseResponse<CategoryVm>> {
    const url = `${baseEndpoint}`;
    const response = await axios.post<BaseResponse<CategoryVm>>(url, model);
    const baseResponse = response.data;
    if (baseResponse.status == MessageTypeEnum.Success) {
      baseResponse.data = plainToInstance(CategoryVm, baseResponse.data);
    }
    return baseResponse;
  }

}
