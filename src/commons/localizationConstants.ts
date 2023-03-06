export const L = {
  GENERAL: {
    LOGIN: "general.login",
    LOGIN_DESC: "general.loginDesc",
    SIGNUP: "general.signup",
    SIGNUP_DESC: "general.signupDesc",
    EMAIL: "general.email",
    EMAIL_DESC: "general.emailEnter",
    PASSWORD: "general.password",
    PASSWORD_DESC: "general.passwordEnter",
    OR: "general.or",
    GOOGLE_ACCOUNT: "general.googleAccount",
    FACEBOOK_ACCOUNT: "general.facebookAccount",
    CREATE_ACCOUNT: "general.createAccount",
    CONFIRM_PASSWORD: "general.confirmPassword",
    CONFIRM_PASSWORD_DESC: "general.confirmPasswordDesc",
    WELCOME: "general.welcome",
    ALL: "general.all",
    ACTIVE: "general.active",
    DE_ACTIVE: "general.deActive",
    ADD_NEW_USER: "general.addNewUser",
    USERNAME: "general.username",
    ENTER_USERNAME: "general.enterUsername",
    FIRST_NAME: "general.firstName",
    LAST_NAME: "general.lastName",
    CHOOSE_ROLE: "general.chooseRole",
    NEW: "general.new",
    ORDERS: "general.orders",
    PROCESSING: "general.processing",
    TICKETS: "general.tickets",
    SALES_CHART: "general.salesChart",
    TODAY_SALES: "general.todaySales",
    MONTHLY_SALES: "general.monthlySales",
    USD: "general.usd",
    VIEW_ALL_ORDERS: "general.viewAllOrders",
    TRANSACTIONS: "general.transactions",
    PLUGINS: "general.plugins",
    WITHDRAW: "general.withdraw",
    SETTINGS: "general.settings",
    ACCOUNT: "general.account",
    SEARCH: "general.search",
    NUMBER: "general.number",
    ORDER: "general.order",
    ENTER_ORDER_NUMBER: "general.enterOrderNumber",
    IN_PROGRESS: "general.inProgress",
    REFUNDED: "general.refunded",
    DONE: "general.done",
    ADD_NEW_PRODUCT: "general.addNewProduct",
    ITEM_NAME: "general.itemName",
    ENTER_ITEM_NAME: "general.enterItemName",
    ITEM_PRICE: "general.itemPrice",
    ENTER_AMOUNT: "general.enterAmount",
    INCOME: "general.income",
    REFUND: "general.refund",
    TRANSACTION: "general.transaction",
    FROM: "general.from",
    TO: "general.to",
    USER: "general.user",
    CUSTOMER: "general.customer",
    ADD_NEW: "general.addNew",
    PRODUCT: "general.product",
    ORDER_COMPLETION: "general.orderCompletion",
    FILE: "general.file",
    DESCRIPTION: "general.description",
    RESET_PASSWORD: "general.resetPassword",
    TOKEN: "general.token",
    FORGET_PASSWORD: "general.forgetPassword",
    BACK_LOGIN: "general.backLogin",
    WITHDRAW_WALLET: "general.withdrawWallet",
    ENTER_WITHDRAWAL_AMOUNT: "general.enterWithdrawalAmount",
    ENTER_WALLET_ADDRESS: "general.enterWalletAddress",
    WITHDRAW_CONFIRMATION: "general.withdrawConfirmation",
    WITHDRAW_CHECK_MESSAGE: "general.withdrawCheckMessage",
    WITHDRAW_TIME_DONE: "general.withdrawTimeDone",
    WITHDRAW_CONFIRM_ACCEPT: "general.withdrawConfirmAccept",
  },
  PAGES: {
    DASHBOARD: "pages.dashboard",
    PRODUCT: "pages.product",
    USER: "pages.user",
    CUSTOMER: "pages.customer",
    ORDER: "pages.order",
    CHANGE_PASSWORD: "pages.changePassword",
    TRANSACTION: "pages.transaction",
    WITHDRAW: "pages.withdraw",
  },
  ACTIONS: {
    CLEAR: "actions.clear",
    ADD: "actions.add",
    SEARCH: "actions.search",
    CANCEL: "actions.cancel",
    EDIT: "actions.edit",
    GENERATE: "actions.generate",
    LOGOUT: "actions.logout",
    DONE: "actions.done",
    TAKE: "actions.take",
    OK: "actions.ok",
    SEND: "actions.send",
    CHANGE: "actions.change",
    REFRESH: "actions.refresh",
    WITHDRAW: "actions.withdraw",
    CONFIRM_WITHDRAW:"actions.confirmWithdraw"
  },
  MESSAGE: {
    FAILED: "message.failed",
    SUCCESS: "message.success",
    SURE: "message.sure",
    FAILED_UPLOAD: "message.failedUpload",
    UNAUTHORIZED: "message.unAuthorized",
    INACCESSIBILITY: "message.Inaccessibility",
    NO_MATCH: "message.noMatch",
    FORGET_MSG: "message.forgetMsg",
    AFTER_EMAIL: "message.afterEmail",
    EMPTY_MAX_DEBT: "message.emptyMaxDebt",
  },
  VALIDATION: {
    REQUIRED: "validation.required",
    INVALID_EMAIL: "validation.invalidEmail",
  },
  MODEL: {
    CATEGORY: {
      TITLE: "model.category.title",
      DESCRIPTION: "model.category.description",
    },
    BASE: {
      ID: "model.base.id",
    },
    DDL: {
      KEY: "model.ddl.key",
      VALUE: "model.ddl.value",
    },
    DROPDOWN: {
      LABEL: "model.dropdown.label",
      VALUE: "model.dropdown.value",
    },
    CUSTOMER: {
      NAME: "model.customer.name",
      TELEGRAM_USER_ID: "model.customer.telegramUserId",
      TELEGRAM_AUTHENTICATION_CODE: "model.customer.telegramAuthenticationCode",
      IS_PAY_FIRST: "model.customer.isPayFirst",
      MAX_DEBT: "model.customer.maxDebt",
    },
    PRODUCT_CATEGORY: {
      PRODUCT_CATEGORY_ID: "model.productCategory.productCategoryId",
      PRODUCT_CATEGORY_TITLE: "model.productCategory.productCategoryTitle",
      PRODUCTS: "model.productCategory.products",
    },
    NESTED_PRODUCT: {
      PRODUCT_TITLE: "model.nestedProduct.productTitle",
      PRODUCT_ID: "model.nestedProduct.productId",
    },
    PRODUCTS: {
      TITLE: "model.product.title",
      PRODUCT_TYPE: "model.product.productType",
      PRODUCT_CATEGORY_ID: "model.product.productCategoryId",
      PRICE: "model.product.price",
    },
    LOGIN: {
      USERNAME: "model.login.username",
      PASSWORD: "model.login.password",
    },
    USER: {
      FIRST_NAME: "model.user.firstName",
      LAST_NAME: "model.user.lastName",
      EMAIL: "model.user.email",
      USERNAME: "model.user.userName",
      PASSWORD: "model.user.password",
      IS_ACTIVE: "model.user.isActive",
      ROLES: "model.user.roles",
    },
    ORDER: {
      CREATED_DATE_TIME: "model.order.createdDateTime",
      PRODUCT_TITLE: "model.order.productTitle",
      CODE: "model.order.code",
      ACCOUNT_USERNAME: "model.order.accountUsername",
      ACCOUNT_PASSWORD: "model.order.accountPassword",
      ACCOUNT_NAME: "model.order.accountName",
      ACCOUNT_PLATFORM: "model.order.accountPlatform",
      CUSTOMER_NAME: "model.order.customerName",
    },
    PASSWORD: {
      OLD_PASSWORD: "model.password.oldPassword",
      NEW_PASSWORD: "model.password.newPassword",
      CONFIRM_NEW_PASSWORD: "model.password.confirmNewPassword",
    },
    TRANSACTION: {
      ORDER_CODE: "model.transaction.orderCode",
      CUSTOMER_NAME: "model.transaction.customerName",
      CUSTOMER_ID: "model.transaction.customerId",
      CREATE_DATE_TIME: "model.transaction.createDateTime",
      PRICE: "model.transaction.price",
      DESCRIPTION: "model.transaction.description",
      STATUS:"model.transaction.status"
    },
    WITHDRAW: {
      BALANCE: {
        AVAILABLE_BALANCE: "model.withdraw.balance.availableBalance",
        PENDING_BALANCE: "model.withdraw.balance.pendingBalance",
      },
      REQUEST: {
        AMOUNT: "model.withdraw.request.amount",
        WALLET_ADDRESS: "model.withdraw.request.walletAddress",
        PAYMENT_METHOD: "model.withdraw.request.paymentMethod",
        DESCRIPTION: "model.withdraw.request.description",
      },
    },
  },
};
