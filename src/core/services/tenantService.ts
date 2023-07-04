
import { BaseResponse } from "../viewModels/common/baseResponseVm";
import axios from "src/plugins/axios";
import { RequestProp } from "../viewModels/quasar";

const baseEndpoint = "/tenant";

export class TenantService {
  currentRequestProp: RequestProp = new RequestProp();

  async getOrderRegistrationAsync(): Promise<boolean> {
    const url = `${baseEndpoint}/isOrderRegistrationClosed`;
    const response = await axios.get<BaseResponse<boolean>>(url);
    const baseResponse = response.data;
    return baseResponse.data;
  }

  async setOrderRegistrationAsync(
    status: boolean,
  ): Promise<BaseResponse<boolean>> {
    const url = `${baseEndpoint}/changeOrderRegistration/${status}`;
    const response = await axios.patch<BaseResponse<boolean>>(url);
    return response.data;
  }

}
