import { KiotVietListResponse } from './common';

export interface OrderProduct {
  productId: number;
  productCode: string;
  productName: string;
  quantity: number;
  price: number;
  discount?: number;
  discountRatio?: number;
  note?: string;
  isMaster: boolean;
}

export interface Order {
  id: number;
  code: string;
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
  description?: string;
  status: number;
  statusValue: string;
  usingCod: boolean;
  orderDetails: OrderProduct[];
  retailerId: number;
  soldById?: number;
  soldByName?: string;
  saleChannelId?: number;
  orderDelivery?: {
    deliveryCode: string;
    type?: number;
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
  payments?: Array<{
    id: number;
    code: string;
    amount: number;
    method: string;
    status?: number;
    statusValue?: string;
    transDate: string;
    bankAccount?: string;
    accountId?: number;
  }>;
  modifiedDate?: string;
  createdDate: string;
}

export interface OrderCreateParams {
  purchaseDate?: string;
  branchId: number;
  customerId?: number;
  soldById?: number; // Id người bán
  cashierId?: number; // Id người tạo đơn đặt hàng (mặc định Admin)
  discount?: number;
  description?: string;
  method?: string;
  totalPayment?: number;
  accountId?: number; // Id tài khoản ngân hàng nếu method là TRANSFER, CARD
  makeInvoice?: boolean; // Tạo hóa đơn từ đơn đặt hàng
  saleChannelId?: number;
  isApplyVoucher?: boolean;
  usingCod?: boolean;
  totalTax?: number; // Tổng thuế
  isApplyTaxReduction?: boolean; // Trạng thái áp dụng giảm thuế của giao dịch
  orderDetails: Array<{
    productId: number;
    productCode: string;
    productName: string;
    isMaster?: boolean; // true: hàng hóa dòng chính, false: dòng phụ
    quantity: number;
    price: number;
    discount?: number;
    discountRatio?: number;
    note?: string;
    orderDetailTaxs?: Array<{
      taxId: number; // ID thuế
      detailTax?: number; // Giá trị thuế của hàng hóa
      isApplyTaxReduction?: boolean;
    }>;
  }>;
  orderDelivery?: {
    deliveryCode?: string;
    type?: number;
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
    wardName?: string;
    email?: string;
    comments?: string;
  };
}

export interface OrderUpdateParams extends Partial<Omit<OrderCreateParams, 'makeInvoice'>> {
  id: number;
}

export interface OrderListParams {
  branchIds?: number[];
  customerIds?: number[];
  customerCode?: string;
  status?: number[];
  includePayment?: boolean;
  includeOrderDelivery?: boolean;
  lastModifiedFrom?: string;
  pageSize?: number;
  currentItem?: number;
  toDate?: string;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
  createdDate?: string;
  saleChannelId?: number;
}

export interface OrderStatusCount {
  status: number;
  statusValue: string;
  count: number;
}

export interface OrderListResponse extends KiotVietListResponse<Order> {
  statusCount?: OrderStatusCount[];
}

export enum OrderStatus {
  Draft = 1,
  Processing = 2,
  Completed = 3,
  Cancelled = 4,
}
