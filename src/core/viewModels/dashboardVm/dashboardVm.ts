import { TransactionVm } from "./../transactionVm/transactionVm";
export class DashboardVm {
  // newOrders: string = "";
  // processingOrders: string = "";
  // doneOrders: string = "";
  // todaySales: string = "";
  // monthlySales: string = "";
  // todaySalesCount: string = "";
  // monthlySalesCount: string = "";

  tenantName: string = "";
  accountBalance: number = 0;
  totalOrders: number = 0;
  totalCustomers: number = 0;
  transactions: Array<TransactionVm> = [];
}
