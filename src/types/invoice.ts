import { KiotVietListResponse } from './common';

export interface InvoicePayment {
  id: number;
  code: string;
  amount: number;
  method: string;
  status?: number;
  statusValue?: string;
  transDate: string;
  bankAccount?: string;
  accountId?: number;
  description?: string;
}

export interface Invoice {
  id: number;
  code: string;
  orderCode?: string;
  purchaseDate: string;
  branchId: number;
  branchName: string;
  customerId?: number;
  customerCode?: string;
  customerName?: string;
  total: number;
  totalPayment: number;
  discount?: number;
  discountRatio?: number;
  discountAfterTax?: number; // giảm giá hóa đơn sau thuế
  totalTax?: number; // Tổng thuế
  pricingMode?: number; // MODE thuế: null: trực tiếp, 0: trước thuế, 1: sau thuế
  isApplyTaxReduction?: boolean; // Trạng thái áp dụng giảm thuế của giao dịch
  description?: string;
  status: number;
  statusValue: string;
  usingCod: boolean;
  invoiceDetails: Array<{
    productId: number;
    productCode: string;
    productName: string;
    quantity: number;
    price: number;
    discount?: number;
    discountRatio?: number;
    note?: string;
    serialNumbers?: string;
    productBatchExpire?: {
      id: number;
      productId: number;
      batchName: string;
      fullNameVirgule: string;
      createdDate: string;
      expireDate: string;
    };
  }>;
  invoiceOrderSurcharges?: Array<{
    id: number;
    invoiceId?: number;
    surchargeId?: number;
    surchargeName: string;
    surValue?: number;
    price?: number;
    createdDate: string;
  }>;
  invoiceDelivery?: {
    deliveryCode: string;
    type?: number;
    status: number;
    statusValue: string;
    price?: number;
    receiver: string;
    contactNumber: string;
    address: string;
    locationId?: number;
    locationName?: string;
    usingPriceCod: boolean;
    priceCodPayment: number;
    weight?: number;
    length?: number;
    width?: number;
    height?: number;
    partnerDeliveryId?: number;
    partnerDelivery?: {
      code: string;
      name: string;
      address: string;
      contactNumber: string;
      email: string;
    };
  };
  payments: InvoicePayment[];
  retailerId: number;
  soldById?: number;
  soldByName?: string;
  saleChannelId?: number;
  modifiedDate?: string;
  createdDate: string;
  orderId?: number;
}

export interface InvoiceCreateParams {
  branchId: number;
  purchaseDate?: string;
  customerId?: number;
  discount?: number;
  totalPayment: number;
  method?: string;
  accountId?: number;
  usingCod?: boolean;
  soldById?: number;
  orderId?: number;
  saleChannelId?: number;
  isApplyVoucher?: boolean;
  totalTax?: number; // Tổng thuế
  isApplyTaxReduction?: boolean; // Trạng thái áp dụng giảm thuế của giao dịch
  invoiceDetails: Array<{
    productId: number;
    productCode: string;
    productName: string;
    quantity: number;
    price: number;
    discount?: number;
    discountRatio?: number;
    note?: string;
    serialNumbers?: string; // Danh sách serial/IMEI, mỗi IMEI cách nhau bởi dấu phẩy
    invoiceDetailTaxs?: Array<{
      taxId: number; // ID thuế
      detailTax?: number; // Số tiền chịu thuế
      isApplyTaxReduction?: boolean;
    }>;
  }>;
  deliveryDetail?: {
    deliveryCode?: string;
    type?: number;
    status: number; // trạng thái vận đơn
    price?: number;
    receiver: string;
    contactNumber: string;
    address: string;
    locationId?: number;
    locationName?: string;
    wardName?: string;
    weight?: number;
    length?: number;
    width?: number;
    height?: number;
    usingPriceCod?: boolean; // Thu hộ tiền
    priceCodPayment?: number; // Số tiền thu hộ
    partnerDeliveryId?: number;
    expectedDelivery?: string;
    partnerDelivery?: {
      code: string;
      name: string;
      address: string;
      contactNumber: string;
      email: string;
    };
  };
  customer?: {
    id?: number;
    code?: string;
    name: string;
    gender?: boolean;
    birthDate?: string;
    contactNumber?: string;
    address?: string;
    email?: string;
    comment?: string;
  };
  surchages?: Array<{
    id: number;
    code: string;
    price: number;
  }>;
}

export interface InvoiceUpdateParams extends Partial<Omit<InvoiceCreateParams, 'orderId'>> {
  id: number;
  codPaymentMethod?: string; // Phương thức thanh toán thu hộ (Cash, Transfer)
  codPaymentAccount?: number; // Id tài khoản ngân hàng nếu thanh toán chuyển khoản/thẻ
}

export interface InvoiceListParams {
  branchIds?: number[];
  customerIds?: number[];
  customerCode?: string;
  status?: number[];
  includePayment?: boolean;
  includeInvoiceDelivery?: boolean;
  lastModifiedFrom?: string;
  pageSize?: number;
  currentItem?: number;
  toDate?: string;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
  orderId?: number;
  createdDate?: string;
  fromPurchaseDate?: string;
  toPurchaseDate?: string;
  includeSaleChannel?: boolean; // Có lấy dữ liệu SaleChannel không
}

export interface InvoiceStatusCount {
  status: number;
  statusValue: string;
  count: number;
}

export interface InvoiceListResponse extends KiotVietListResponse<Invoice> {
  statusCount?: InvoiceStatusCount[];
}

export enum InvoiceStatus {
  Draft = 1,
  Processing = 2,
  Completed = 3,
  Cancelled = 4,
}

export enum PaymentMethod {
  Cash = 1,
  Card = 2,
  BankTransfer = 3,
  MobilePayment = 4,
  Mixed = 5,
}
