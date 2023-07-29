import { ReportByUserParameterVm } from "./../viewModels/reportVm/reportByUserParameterVm";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { BaseResponse } from "../viewModels/common/baseResponseVm";
import {
  OrderVm,
  OrderConfirmationVm,
  DdlVm,
  DropDownVm,
  ReportOrderByUserVm,
} from "../viewModels";
import axios from "src/plugins/axios";
import { MessageTypeEnum } from "src/commons";
import { RequestProp } from "../viewModels/quasar";
import { TableVm } from "../viewModels/table";

const baseEndpoint = "/OrderList";
const actionEndpoint = "/Order";

export class OrderService {
  currentRequestProp: RequestProp = new RequestProp();
  currentNewOrderRequestProp: RequestProp = new RequestProp();
  currentInProgressRequestProp: RequestProp = new RequestProp();
  currentRefundRequestProp: RequestProp = new RequestProp();
  currentDoneRequestProp: RequestProp = new RequestProp();

  ddlCustomer: Array<DropDownVm> = [];
  //ddlStatus: Array<DropDownVm> = [];

  async tableNewAsync(
    requestProp: RequestProp
  ): Promise<BaseResponse<Array<OrderVm>>> {
    const url = `${baseEndpoint}/New`;
    this.currentNewOrderRequestProp.setData(requestProp);
    const table = TableVm.toTable(this.currentNewOrderRequestProp);
    const jsonData = instanceToPlain(table);

    const response = await axios.post<BaseResponse<Array<OrderVm>>>(
      url,
      jsonData
    );
    const baseResponse = response.data;
    if (baseResponse.status == MessageTypeEnum.Success) {
      baseResponse.data = plainToInstance(OrderVm, baseResponse.data);
    }
    return baseResponse;
  }
  async tableInProgressAsync(
    requestProp: RequestProp
  ): Promise<BaseResponse<Array<OrderVm>>> {
    const url = `${baseEndpoint}/InProgress`;
    this.currentInProgressRequestProp.setData(requestProp);
    const table = TableVm.toTable(this.currentInProgressRequestProp);
    const jsonData = instanceToPlain(table);

    const response = await axios.post<BaseResponse<Array<OrderVm>>>(
      url,
      jsonData
    );
    const baseResponse = response.data;
    if (baseResponse.status == MessageTypeEnum.Success) {
      baseResponse.data = plainToInstance(OrderVm, baseResponse.data);
    }
    return baseResponse;
  }
  async tableRefundAsync(
    requestProp: RequestProp
  ): Promise<BaseResponse<Array<OrderVm>>> {
    const url = `${baseEndpoint}/Refund`;
    this.currentRefundRequestProp.setData(requestProp);
    const table = TableVm.toTable(this.currentRefundRequestProp);
    const jsonData = instanceToPlain(table);

    const response = await axios.post<BaseResponse<Array<OrderVm>>>(
      url,
      jsonData
    );
    const baseResponse = response.data;
    if (baseResponse.status == MessageTypeEnum.Success) {
      baseResponse.data = plainToInstance(OrderVm, baseResponse.data);
    }
    return baseResponse;
  }
  async tableDoneAsync(
    requestProp: RequestProp
  ): Promise<BaseResponse<Array<OrderVm>>> {
    const url = `${baseEndpoint}/Done`;
    this.currentDoneRequestProp.setData(requestProp);
    const table = TableVm.toTable(this.currentDoneRequestProp);
    const jsonData = instanceToPlain(table);

    const response = await axios.post<BaseResponse<Array<OrderVm>>>(
      url,
      jsonData
    );
    const baseResponse = response.data;
    if (baseResponse.status == MessageTypeEnum.Success) {
      baseResponse.data = plainToInstance(OrderVm, baseResponse.data);
    }
    return baseResponse;
  }

  async takeAsync(id: string): Promise<BaseResponse<boolean>> {
    const url = `${actionEndpoint}/take/${id}`;
    const response = await axios.patch<BaseResponse<boolean>>(url);
    return response.data;
  }

  async cancelAsync(
    id: string,
    reason: string
  ): Promise<BaseResponse<boolean>> {
    const url = `${actionEndpoint}/cancel/${id}`;
    const response = await axios.patch<BaseResponse<boolean>>(url, {
      reason: reason,
    });
    return response.data;
  }

  async doAsync(
    orderProductId: string,
    model: OrderConfirmationVm
  ): Promise<BaseResponse<boolean>> {
    const url = `${actionEndpoint}/do/${orderProductId}`;
    const response = await axios.patch<BaseResponse<boolean>>(url, model);
    return response.data;
  }

  async customerList(): Promise<Array<DdlVm>> {
    const url = `${actionEndpoint}/search/customers`;
    const response = await axios.get<BaseResponse<Array<DdlVm>>>(url);

    const baseResponse = response.data;
    let result: Array<DdlVm> = [];

    if (baseResponse.status == MessageTypeEnum.Success) {
      result = plainToInstance(DdlVm, baseResponse.data);
    }
    return result;
  }

  async ddlCustomerAsync(): Promise<Array<DropDownVm>> {
    if (this.ddlCustomer.length > 0) {
      return this.ddlCustomer;
    } else {
      const list = await this.customerList();
      for (const item of list) {
        this.ddlCustomer.push({ label: `${item.value} `, value: item.key });
      }
      return this.ddlCustomer;
    }
  }

  async ddlStatusAsync(): Promise<Array<DropDownVm>> {
    // if (this.ddlStatus.length > 0) {
    //   return this.ddlStatus;
    // } else {
     const ddlStatus: Array<DropDownVm> = [];
      const list = ["Created", "in Progress", "Canceled", "Done"];
      for (let i = 0; i < list.length; i++) {
        ddlStatus.push({ label: list[i], value: (i + 1).toString() });
      }
      return ddlStatus;
     // return this.ddlStatus;

  }

  async getReportByUser(
    model: ReportByUserParameterVm
  ): Promise<BaseResponse<Array<ReportOrderByUserVm>>> {
    const url = "orderList/getOrderSummarize";
    const response = await axios.post<BaseResponse<Array<ReportOrderByUserVm>>>(url, model);

    const baseResponse = response.data;
    //let result: Array<ReportOrderByUserVm> = [];
//debugger
    // if (baseResponse.status == MessageTypeEnum.Success) {
   // result = plainToInstance(ReportOrderByUserVm, baseResponse);
    console.log(baseResponse);
    // }
    return baseResponse;
  }
}
