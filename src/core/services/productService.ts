import {  instanceToPlain, plainToInstance } from "class-transformer";
import { BaseResponse } from "../viewModels/common/baseResponseVm";
import {
  ProductVm,
  ProductCreateVm,
  ProductEditVm,
 // ProductCategoryVm,
  DdlVm,
  DropDownVm,
} from "../viewModels";
import axios from "src/plugins/axios";
import { MessageTypeEnum } from "src/commons";
import { RequestProp } from "../viewModels/quasar";
import { TableVm } from "../viewModels/table";

const baseEndpoint = "/Product";

export class ProductService {
  currentRequestProp: RequestProp = new RequestProp();
  ddl: Array<DropDownVm> = [];

  async detailAsync(id: string): Promise<ProductVm> {
    const url = `${baseEndpoint}/${id}`;
    const response = await axios.get<BaseResponse<ProductVm>>(url);
    const baseResponse = response.data;
    let detail!: ProductVm;
    if (baseResponse.status == MessageTypeEnum.Success) {
      detail = plainToInstance(ProductVm, baseResponse.data);
    } else {
      detail = new ProductVm();
    }
    return detail;
  }

  async tableAsync(
    requestProp: RequestProp
  ): Promise<BaseResponse<Array<ProductVm>>> {
    const url = `${baseEndpoint}/List`;
    this.currentRequestProp.setData(requestProp);
    const table = TableVm.toTable(this.currentRequestProp);
    const jsonData = instanceToPlain(table);
    const response = await axios.post<BaseResponse<Array<ProductVm>>>(
      url,
      jsonData
    );
    const baseResponse = response.data;
    if (baseResponse.status == MessageTypeEnum.Success) {
      baseResponse.data = plainToInstance(ProductVm, baseResponse.data);
    }
    return baseResponse;
  }

  async listAsync(): Promise<Array<ProductVm>> {

    const url = `${baseEndpoint}/List`;
    const response = await axios.post<BaseResponse<Array<ProductVm>>>(url);
    const baseResponse = response.data;
    let result: Array<ProductVm> = [];
    if (baseResponse.status == MessageTypeEnum.Success) {
      result = plainToInstance(ProductVm, baseResponse.data);
    }
    return result;
  }

  async addAsync(model: ProductCreateVm): Promise<BaseResponse<ProductVm>> {
    const url = `${baseEndpoint}`;
    const response = await axios.post<BaseResponse<ProductVm>>(url, model);
    const baseResponse = response.data;
    if (baseResponse.status == MessageTypeEnum.Success) {
      baseResponse.data = plainToInstance(ProductVm, baseResponse.data);
    }
    return baseResponse;
  }

  async updateAsync(model: ProductEditVm): Promise<BaseResponse<ProductVm>> {
    const url = `${baseEndpoint}/${model.productId}`;
    const response = await axios.put<BaseResponse<ProductVm>>(url, model);
    const baseResponse = response.data;
    if (baseResponse.status == MessageTypeEnum.Success) {
      baseResponse.data = plainToInstance(ProductVm, baseResponse.data);
    }
    return baseResponse;
  }

  async listCategoryAsync(): Promise<Array<DdlVm>> {
    const url = `${baseEndpoint}/categories`;
    const response = await axios.get<BaseResponse<Array<DdlVm>>>(url);

    const baseResponse = response.data;
    let result: Array<DdlVm> = [];

    if (baseResponse.status == MessageTypeEnum.Success) {
      result = plainToInstance(DdlVm, baseResponse.data);
    }
    return result;
  }

  async ddlAsync(): Promise<Array<DropDownVm>> {
    if (this.ddl.length > 0) {
      return this.ddl;
    } else {
      const list = await this.listCategoryAsync();
      for (const item of list) {
        this.ddl.push({ label: `${item.value} `, value: item.key });
      }
      return this.ddl;
    }
  }
}
