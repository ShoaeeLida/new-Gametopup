import { instanceToPlain, plainToInstance } from "class-transformer";
import { BaseResponse } from "../viewModels/common/baseResponseVm";
import { CategoryVm } from "../viewModels";
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

}
