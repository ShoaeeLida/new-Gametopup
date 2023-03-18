import { plainToInstance } from "class-transformer";
import { BaseResponse } from "../viewModels/common/baseResponseVm";
import {
 PaymentMethodVm,
 BalanceVm,
 PayoutVm,
} from "../viewModels";
import axios from "src/plugins/axios";
import { MessageTypeEnum } from "src/commons";

const baseEndpoint = "/payout";

export class PayoutService {

  async balanceAsync(): Promise<BalanceVm> {
    const url = `${baseEndpoint}/balance`;
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

  async paymentMethodAsync(): Promise<PaymentMethodVm> {
    const url = `${baseEndpoint}/paymentMethods`;
    const response = await axios.get<BaseResponse<PaymentMethodVm>>(url);
    const baseResponse = response.data;
    return baseResponse.data;

  }

  async payoutRequestAsync(model: PayoutVm): Promise<BaseResponse<PayoutVm>> {
    const url = `${baseEndpoint}/request`;
    const response = await axios.post<BaseResponse<PayoutVm>>(url, model);
    const baseResponse = response.data;
    if (baseResponse.status == MessageTypeEnum.Success) {
      baseResponse.data = plainToInstance(PayoutVm, baseResponse.data);
    }
    return baseResponse;
  }

}
