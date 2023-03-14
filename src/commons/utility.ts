import { GROUP_POLICY, LOCAL_STORAGE } from "./";
import { Notify, LocalStorage } from "quasar";
import { MessageTypeEnum } from "./enumerations";
import { $t } from "src/boot/i18n";
import { GroupPolicyVm } from "src/core/viewModels";

export class Utility {
  static showNotification(status: MessageTypeEnum, msg?: string) {
    if (status == MessageTypeEnum.Success) {
      msg = msg || $t("message.success");
      Notify.create({
        message: msg,
        color: "positive",
        position: "top",
      });
    } /* if (status == MessageTypeEnum.Error) */ else {
      msg = msg || $t("message.failed");
      Notify.create({
        message: msg,
        color: "red",
        position: "top",
      });
    }
  }
  static hasGroupPolicy(groupPolicyName: string): boolean {
    const groupPolicyList = LocalStorage.getItem<Array<GroupPolicyVm>>(
      LOCAL_STORAGE.GROUP_POLICIES
    );
    if (
      groupPolicyName == GROUP_POLICY.CHANGE_PASSWORD.NAME ||
      groupPolicyName == GROUP_POLICY.FORGET_PASSWORD.NAME ||
      groupPolicyName == GROUP_POLICY.WITHDRAW.NAME ||
      groupPolicyName == GROUP_POLICY.CATEGORY.NAME
    ) {
      return true;
    }

    if (groupPolicyList == null) {
      return false;
    }


    if (
      groupPolicyName == GROUP_POLICY.RESET_PASSWORD.NAME ||
      groupPolicyName == GROUP_POLICY.DASHBOARD.NAME
    ) {
      return true;
    }

    const groupPolicy = groupPolicyList?.find(
      (x) => x.name.toUpperCase() == groupPolicyName.toLocaleUpperCase()
    );

    if (!groupPolicy) {
      return false;
    }
    const view = groupPolicy.policies.some((x) => x.name.endsWith(".view"));
    const list = groupPolicy.policies.some((x) => x.name.endsWith(".list"));

    return view || list;
  }

  static hasPolicy(groupPolicyName: string, policyName: string): boolean {
    const groupPolicyList = LocalStorage.getItem<Array<GroupPolicyVm>>(
      LOCAL_STORAGE.GROUP_POLICIES
    );

    const groupPolicy = groupPolicyList?.find((x) => x.name == groupPolicyName);
    if (!groupPolicy) {
      return false;
    }
    return groupPolicy.policies.some((x) => x.name == policyName);
  }

  static showLoadingGlobally(show: boolean) {
    LocalStorage.set(LOCAL_STORAGE.SHOW_LOADING, show);
  }
}
