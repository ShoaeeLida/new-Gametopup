import { GroupPolicyVm } from "../dynamicPolicyVm/groupPolicyVm";

export class LoginResultVm {
  username: string = "";
  token: string = "";
  dynamicGroupPolicies: Array<GroupPolicyVm> = [];
}
