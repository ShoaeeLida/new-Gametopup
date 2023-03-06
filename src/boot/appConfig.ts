import {
  Column,
  RequestProp,
  TableHeaderSlot,
  LazyLoadDetail,
} from "./../core/viewModels/quasar";
//

// register extensions
import "../commons/extensions/arrayExtension";
import "../commons/extensions/numberExtensions";
import "../commons/extensions/promiseExtension";
import "../commons/extensions/stringExtension";

import AppCreateForm from "components/AppCreateForm.vue";
import AppEditForm from "components/AppEditForm.vue";
// ioc
import "reflect-metadata";
import buildDependencyContainer from "../core/IocConfig/appContainer";
buildDependencyContainer();

import { boot } from "quasar/wrappers";

import { L, GROUP_POLICY, Utility } from "src/commons";
import { QTableProps, QTableSlots, QTreeProps } from "quasar";

export default boot(({ app }) => {
  app.component("app-create-form", AppCreateForm);
  app.component("app-edit-form", AppEditForm);
  //#region ### global props ###
  app.config.globalProperties.$L = L;
  app.config.globalProperties.$GROUP_POLICY = GROUP_POLICY;
  // app.config.globalProperties.$ROWS_PER_PAGE_OPTIONS = ROWS_PER_PAGE_OPTIONS;
  app.config.globalProperties.$Utility = Utility;
  //#endregion
});

type ICustomQTableProps = Omit<QTableProps, "columns" | "onRequest"> & {
  columns: Array<Column>;
  onRequest?: (requestProp: RequestProp) => void;
};

type ICustomQTableSlot = Omit<QTableSlots, "header"> & {
  header: TableHeaderSlot;
};

type ICustomQTreeProps<T> = Omit<QTreeProps, "onLazyLoad"> & {
  onLazyLoad?: LazyLoadDetail<T>;
};

/* eslint-disable */
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $L: typeof L;
    $GROUP_POLICY: typeof GROUP_POLICY;
    // $ROWS_PER_PAGE_OPTIONS: typeof ROWS_PER_PAGE_OPTIONS;
    $Utility: typeof Utility;
  }

  interface QTableProps extends ICustomQTableProps {}
  interface QTableSlot extends ICustomQTableSlot {}
  interface QTreeProps extends ICustomQTreeProps<any> {}
}
