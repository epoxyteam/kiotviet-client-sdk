// Export the main client
export { KiotVietClient } from './client';

// Export resource handlers
export { CustomerHandler } from './resources/customers';
export { ProductHandler } from './resources/products';
export { CategoryHandler } from './resources/categories';
export { OrderHandler } from './resources/orders';
export { BankAccountHandler } from './resources/bank-accounts';
export { BranchHandler } from './resources/branches';
export { CashFlowHandler } from './resources/cash-flow';
export { InvoiceHandler } from './resources/invoices';
export { PriceBookHandler } from './resources/price-books';
export { PurchaseOrderHandler } from './resources/purchase-orders';
export { ReturnsHandler } from './resources/returns';
export { SalesChannelsHandler } from './resources/sales-channels';
export { SettingsHandler } from './resources/settings';
export { SupplierHandler } from './resources/suppliers';
export { SurchargeHandler } from './resources/surcharges';
export { TrademarksHandler } from './resources/trademarks';
export { TransferHandler } from './resources/transfers';
export { UserHandler } from './resources/users';
export { VouchersHandler } from './resources/vouchers';
export { WebhookHandler } from './resources/webhooks';
export { OrderSuppliersHandler } from './resources/order-suppliers';
export { LocationsHandler } from './resources/locations';
export { CouponsHandler } from './resources/coupons';
export { TaxesHandler } from './resources/taxes';
export { EInvoicesHandler } from './resources/einvoices';

// Export types
export {
  KiotVietListResponse,
  KiotVietClientConfig,
  KiotVietTokenResponse,
  KiotVietErrorResponse,
  KiotVietErrorStatus,
  Product,
  ProductCreateParams,
  ProductUpdateParams,
  Category,
  CategoryCreateParams,
  CategoryUpdateParams,
  CategoryListParams,
  CategoryListResponse,
  Order,
  OrderCreateParams,
  OrderUpdateParams,
  OrderListParams,
  OrderStatus,
  OrderProduct,
  OrderListResponse,
  Customer,
  CustomerCreateParams,
  CustomerGroup,
  Location,
  LocationListResponse,
  Coupon,
  CouponSetUsedParams,
  CouponSetUsedResponse,
  Tax,
  TaxDetailResponse,
  EInvoiceInfo,
  EInvoiceInfoUpdateParams,
  EInvoicePartner,
  EInvoiceType,
  EInvoiceStatus,
} from './types';

// Export error classes
export {
  KiotVietApiError,
  AuthenticationError,
  ValidationError,
  ForbiddenError,
  NotFoundError,
  RateLimitError,
} from './errors';
