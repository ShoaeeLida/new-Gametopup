import { plainToInstance } from "class-transformer";
import { BaseResponse } from "../viewModels/common/baseResponseVm";
import { LoginVm, LoginResultVm, UserEmailVm,ResetPasswordVm, UserResetPasswordVm } from "../viewModels";
import axios from "src/plugins/axios";
import { MessageTypeEnum } from "src/commons";

const baseEndpoint = "/Account";

export class AccountService {
  async login(model: LoginVm): Promise<BaseResponse<LoginResultVm>> {
    const url = `${baseEndpoint}/login`;
    const response = await axios.post<BaseResponse<LoginResultVm>>(url, model);

    const baseResponse = response.data;
    if (baseResponse.status == MessageTypeEnum.Success) {
      baseResponse.data = plainToInstance(LoginResultVm, baseResponse.data);
    }
    return baseResponse;
  }

  async resetPasswordRequest(
    model: UserEmailVm
  ): Promise<BaseResponse<boolean>> {
    const url = `${baseEndpoint}/resetPasswordRequest`;
    const response = await axios.post<BaseResponse<boolean>>(url, model);
    const baseResponse = response.data;
    return baseResponse;
  }

  async changePassword(
    model: ResetPasswordVm
  ): Promise<BaseResponse<boolean>> {
    const url = `${baseEndpoint}/resetPassword`;
    const response = await axios.post<BaseResponse<boolean>>(url, model);
    const baseResponse = response.data;
    return baseResponse;
  }

  async userResetPassword(
    model: UserResetPasswordVm
  ): Promise<BaseResponse<boolean>> {
    const url = `${baseEndpoint}/changePassword`;
    const response = await axios.post<BaseResponse<boolean>>(url, model);
    const baseResponse = response.data;
    return baseResponse;
  }


}
