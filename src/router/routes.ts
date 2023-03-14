import { $t, L } from "src/commons";
import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "",
    component: () => import("src/layouts/AppLayout.vue"),
    children: [
      {
        path: "dashboard",
        name:"dashboard",
        component: () => import("../views/dashboard/Index.vue"),
        meta: {
         // title: $t(L.PAGES.DASHBOARD),

        },
      },
      {
        path: "order",
        name:"order",
        component: () =>
          import(
            /* webpackChunkName: "Orders" */ "../views/orders/Index.vue"
          ),
          meta: {
            title: $t(L.PAGES.ORDER),
          },
      },
      {
        path: "transaction",
        name: "Transaction",
        component: () =>
          import(
            /* webpackChunkName: "Transactions" */ "../views/transactions/Transactions.vue"
          ),
          meta: {
            title: $t(L.PAGES.TRANSACTION),
          },
      },
      {
        path: "withdraw",
        name: "Withdraw",
        component: () =>
          import(
            /* webpackChunkName: "Withdraw" */ "../views/withdraw/Withdraw.vue"
          ),
          meta: {
            title: $t(L.PAGES.WITHDRAW),
          },
      },
      {
        path: "UserManagement",
        name: "UserManagement",
        component: () =>
          import(
            /* webpackChunkName: "Users" */ "../views/user/Users.vue"
          ),
          meta: {
            title: $t(L.PAGES.USER),
          },
      },
      {
        path: "Customer",
        name: "Customer",
        component: () =>
          import(
            /* webpackChunkName: "Customer" */ "../views/customer/Customers.vue"
          ),
          meta: {
            title: $t(L.PAGES.CUSTOMER),
          },
      },
      {
        path: "Category",
        name: "Category",
        component: () =>
          import(
            /* webpackChunkName: "Customer" */ "../views/category/Index.vue"
          ),
          meta: {
            title: $t(L.PAGES.CUSTOMER),
          },
      },
      {
        path: "Product",
        name: "Product",
        component: () =>
          import(
            /* webpackChunkName: "Product" */ "../views/product/Product.vue"
          ),
          meta: {
            title: $t(L.PAGES.PRODUCT),
          },
      },
      {
        path: "ResetPassword",
        name: "ResetPassword",
        component: () =>
          import(
            /* webpackChunkName: "ResetPassword" */ "../views/user/ResetPassword.vue"
          ),
          meta: {
            title: $t(L.PAGES.CHANGE_PASSWORD),
          },
      },
    ],
  },

  {
    path: "/",
    name: "publicLayout",
    // meta: { requiresAuth: true },
    component: () =>
      import(
        /* webpackChunkName: "publicLayout" */ "../layouts/publicLayout.vue"
      ),
    children: [
      {
        path: "Login",
        name: "Login",
        component: () =>
          import(/* webpackChunkName: "Login" */ "../views/user/Login.vue"),
        meta: {
          title: "Login",
        },
      },
      {
        path: "SignUp",
        name: "SignUp",
        component: () =>
          import(/* webpackChunkName: "SignUp" */ "../views/user/Signup.vue"),
        meta: {
          title: "SignUp",
        },
      },
      {
        path: "ChangePassword",
        name: "ChangePassword",
        component: () =>
          import(
            /* webpackChunkName: "ChangePassword" */ "../views/user/ChangePassword.vue"
          ),
          meta: {
            title: $t(L.PAGES.CHANGE_PASSWORD),
          },
      },
      {
        path: "ForgetPassword",
        name: "ForgetPassword",
        component: () =>
          import(
            /* webpackChunkName: "ForgetPassword" */ "../views/user/ForgetPassword.vue"
          ),
          meta: {
            title: "",
          },
      },
    ],
  },

];

export default routes;
