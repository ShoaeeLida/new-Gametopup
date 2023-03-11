/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios, { AxiosResponse } from "axios";
import { plainToInstance } from "class-transformer";
import { BaseResponse } from "src/core/viewModels/common/baseResponseVm";
import { Loading, LocalStorage } from "quasar";
import {
  // GROUP_POLICY,
  LOCAL_STORAGE,
  MessageTypeEnum,
  Utility,
} from "src/commons";
import { $t, L } from "src/commons";
//import { useRouter } from "vue-router";
//const router = useRouter();

const lang = LocalStorage.getItem(LOCAL_STORAGE.LANG);
if (lang != "" && lang != undefined && lang != null) {
  axios.defaults.headers.post["accept-language"] = lang;
} else {
  axios.defaults.headers.post["accept-language"] = "en";
}

let countOfRequests = 0;
const ignoredLoadingUrls = [
  "/OrderList/New",
  "/OrderList/InProgress",
  "/OrderList/Refund",
  "/OrderList/Done",
  "/Transaction/list/all",
  "/Transaction/list/income",
  "/Transaction/list/withdraw",
  "/orderReport/dashboard"
];

axios.interceptors.request.use(
  (cfg) => {
    cfg.url = `${process.env.VUE_APP_BASE_API_URL.trimCharEnd(
      "/"
    )}/${cfg.url?.trimCharStart("/")}`;

    const token = LocalStorage.getItem(LOCAL_STORAGE.TOKEN);
    cfg.headers.Authorization = `Bearer ${token}`;

    const showLoading = LocalStorage.getItem(LOCAL_STORAGE.SHOW_LOADING);

    if (
      showLoading &&
      // countOfRequests == 0 &&
      !ignoredLoadingUrls.some((x) =>
        cfg.url?.toLocaleLowerCase().endsWith(x.toLocaleLowerCase())
      )
    ) {
      Loading.show();
    }
    countOfRequests++;
    return cfg;
  },
  (err) => {
    if ([401, 403].includes(err.response.status)) {
    }
    // log error here
    setTimeout(() => {
      Loading.hide();
    }, 500);
    Promise.reject(err.message);
  }
);

axios.interceptors.response.use(
  (res) => {
    countOfRequests--;
    if (countOfRequests == 0) {
      setTimeout(() => {
        Loading.hide();
      }, 500);
    }
    // const json = JSON.stringify(res.data);
    // console.log(res.data.status);
    if (res.data && res.data.status == 1)
      res.data = plainToInstance(BaseResponse, res.data);
    return res;
  },
  (err) => {
    countOfRequests--;
    setTimeout(() => {
      Loading.hide();
    }, 500);

    // log error here
    if (err.response && err.response.status) {
      switch (err.response.status) {
        // case 401:
        //   //logout user here
        //   LocalStorage.remove(LOCAL_STORAGE.TOKEN);
        //   // router.push({ name: GROUP_POLICY.Login.NAME })
        //   // window.location.replace(GROUP_POLICY.LOGIN.NAME);
        //   break;
        // case 403:
        //   Utility.showNotification(MessageTypeEnum.Danger, "عدم دسترسی");
        case 400:
          Utility.showNotification(
            MessageTypeEnum.Danger,
            err.response.data.message
          );
          break;
        case 500:
          Utility.showNotification(
            MessageTypeEnum.Danger,
            err.response.data.message
          );
          break;
          case 403:
          Utility.showNotification(
            MessageTypeEnum.Danger,
            $t(L.MESSAGE.INACCESSIBILITY)
          );
          break;
          case 401:
            Utility.showNotification(
              MessageTypeEnum.Danger,
              $t(L.MESSAGE.UNAUTHORIZED)
            );
            break;

        // ****************
      }
    }
    return Promise.reject(err);
  }
);

export default axios;
export { AxiosResponse };
