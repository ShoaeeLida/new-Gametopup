import {  instanceToPlain, plainToInstance } from "class-transformer";
import { BaseResponse } from "../viewModels/common/baseResponseVm";
import {
  TransactionVm,
  TransactionCreateVm,
  DropDownVm,
  BalanceVm,
  WithdrawalVm
} from "../viewModels";
import axios from "src/plugins/axios";
import { MessageTypeEnum } from "src/commons";
import { RequestProp } from "../viewModels/quasar";
import { TableVm } from "../viewModels/table";

const baseEndpoint = "/Transaction";

export class TransactionService {
  currentRequestProp: RequestProp = new RequestProp();
  currentAllRequestProp: RequestProp = new RequestProp();
  currentIncomeRequestProp: RequestProp = new RequestProp();
  currentWithdrawRequestProp: RequestProp = new RequestProp();

  ddl: Array<DropDownVm> = [];

  async detailAsync(id: string): Promise<TransactionVm> {
    const url = `${baseEndpoint}/${id}`;
    const response = await axios.get<BaseResponse<TransactionVm>>(url);
    const baseResponse = response.data;
    let detail!: TransactionVm;
    if (baseResponse.status == MessageTypeEnum.Success) {
      detail = plainToInstance(TransactionVm, baseResponse.data);
    } else {
      detail = new TransactionVm();
    }
    return detail;
  }

  async listAllAsync(
    requestProp: RequestProp
  ): Promise<BaseResponse<Array<TransactionVm>>> {
    const url = `${baseEndpoint}/list/all`;
    this.currentAllRequestProp.setData(requestProp);
    const table = TableVm.toTable(this.currentAllRequestProp);
    const jsonData = instanceToPlain(table);
    const response = await axios.post<BaseResponse<Array<TransactionVm>>>(
      url,
      jsonData
    );
    const baseResponse = response.data;
    if (baseResponse.status == MessageTypeEnum.Success) {
      baseResponse.data = plainToInstance(TransactionVm, baseResponse.data);
    }
    return baseResponse;
  }

  async listIncomeAsync(
    requestProp: RequestProp
  ): Promise<BaseResponse<Array<TransactionVm>>> {
    const url = `${baseEndpoint}/list/income`;
    this.currentIncomeRequestProp.setData(requestProp);
    const table = TableVm.toTable(this.currentIncomeRequestProp);
    const jsonData = instanceToPlain(table);
    const response = await axios.post<BaseResponse<Array<TransactionVm>>>(
      url,
      jsonData
    );
    const baseResponse = response.data;
    if (baseResponse.status == MessageTypeEnum.Success) {
      baseResponse.data = plainToInstance(TransactionVm, baseResponse.data);
    }
    return baseResponse;
  }

  async listWithdrawAsync(
    requestProp: RequestProp
  ): Promise<BaseResponse<Array<TransactionVm>>> {
    const url = `${baseEndpoint}/list/withdraw`;
    this.currentWithdrawRequestProp.setData(requestProp);
    const table = TableVm.toTable(this.currentWithdrawRequestProp);
    const jsonData = instanceToPlain(table);
    const response = await axios.post<BaseResponse<Array<TransactionVm>>>(
      url,
      jsonData
    );
    const baseResponse = response.data;
    if (baseResponse.status == MessageTypeEnum.Success) {
      baseResponse.data = plainToInstance(TransactionVm, baseResponse.data);
    }
    return baseResponse;
  }

  async addAsync(model: TransactionCreateVm): Promise<BaseResponse<TransactionVm>> {
    const url = `${baseEndpoint}`;
    const response = await axios.post<BaseResponse<TransactionVm>>(url, model);
    const baseResponse = response.data;
    if (baseResponse.status == MessageTypeEnum.Success) {
      baseResponse.data = plainToInstance(TransactionVm, baseResponse.data);
    }
    return baseResponse;
  }

  async withdrawalRequestAsync(model: WithdrawalVm): Promise<BaseResponse<boolean>> {
    const url = `${baseEndpoint}/withdraw`;
    const response = await axios.post<BaseResponse<boolean>>(url, model);
    const baseResponse = response.data;
    return baseResponse;
  }

  async balanceAsync(): Promise<BalanceVm> {
    const url = `${baseEndpoint}/withdraw`;
    const response = await axios.get<BaseResponse<BalanceVm>>(url);
    const baseResponse = response.data;
    let detail!: BalanceVm;
    if (baseResponse.status == MessageTypeEnum.Success) {
      detail = plainToInstance(BalanceVm, baseResponse.data);
    } else {
      detail = new BalanceVm();
    }
    return detail;
  }

}


