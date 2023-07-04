
import { container } from "inversify-props";
import {
  AccountService,
  UserManagerService,
  CustomerService,
  CategoryService,
  ProductService,
  OrderService,
  ReportService,
  TransactionService,
  PayoutService,
  TenantService
} from "../services";

export default function buildDependencyContainer(): void {
  container.addSingleton(AccountService, "AccountService");
  container.addSingleton(UserManagerService, "UserManagerService");
  container.addSingleton(CustomerService, "CustomerService");
  container.addSingleton(CategoryService, "CategoryService");
  container.addSingleton(ProductService, "ProductService");
  container.addSingleton(OrderService, "OrderService");
  container.addSingleton(ReportService, "ReportService");
  container.addSingleton(TransactionService, "TransactionService");
  container.addSingleton(PayoutService, "PayoutService");
  container.addSingleton(TenantService, "TenantService");
}
