
import { BaseResponse } from "../viewModels/common/baseResponseVm";
import { DashboardVm } from "../viewModels";
import axios from "src/plugins/axios";

import { RequestProp } from "../viewModels/quasar";


const baseEndpoint = "/OrderReport";

export class ReportService {
  currentRequestProp: RequestProp = new RequestProp();


  async dashboardReportAsync(): Promise<DashboardVm> {
    const url = `${baseEndpoint}/dashboard`;
    const response = await axios.get<BaseResponse<DashboardVm>>(url);
    const baseResponse = response.data;

    return baseResponse.data;
  }

}
