import { KiotVietListResponse } from './common';

export interface PurchaseOrderProduct {
  productId: number;
  productCode: string;
  productName: string;
  quantity: number;
  price: number;
  discount?: number;
  discountRatio?: number;
  note?: string;
  receivedQuantity?: number;
  serialNumbers?: string[];
  batches?: Array<{
    batchName: string;
    quantity: number;
    expiredDate: string;
  }>;
}

export interface PurchaseOrder {
  id: number;
  code: string;
  documentCode?: string;
  purchaseDate: string;
  expectedDeliveryDate?: string;
  deliveryDate?: string;
  branchId: number;
  branchName: string;
  supplierId?: number;
  supplierCode?: string;
  supplierName?: string;
  total: number;
  totalPayment: number;
  discount?: number;
  discountRatio?: number;
  description?: string;
  status: number;
  statusValue: string;
  purchaseOrderDetails: PurchaseOrderProduct[];
  retailerId: number;
  createdById?: number;
  createdByName?: string;
  modifiedDate?: string;
  createdDate: string;
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
}

export interface PurchaseOrderCreateParams {
  branchId: number;
  supplierId?: number;
  purchaseDate?: string;
  expectedDeliveryDate?: string;
  description?: string;
  discount?: number;
  discountRatio?: number;
  purchaseOrderDetails: Array<{
    productId: number;
    productCode?: string;
    quantity: number;
    price: number;
    discount?: number;
    discountRatio?: number;
    note?: string;
    serialNumbers?: string[];
    batches?: Array<{
      batchName: string;
      quantity: number;
      expiredDate: string;
    }>;
  }>;
  supplier?: {
    code?: string;
    name: string;
    contactNumber?: string;
    email?: string;
    address?: string;
    description?: string;
  };
  payments?: Array<{
    amount: number;
    method: string;
    accountId?: number;
  }>;
}

export interface PurchaseOrderUpdateParams extends Partial<PurchaseOrderCreateParams> {
  id: number;
}

export interface PurchaseOrderListParams {
  branchIds?: number[];
  supplierIds?: number[];
  supplierCode?: string;
  status?: number[];
  includePayment?: boolean;
  lastModifiedFrom?: string;
  pageSize?: number;
  currentItem?: number;
  toDate?: string;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
  createdDate?: string;
  fromPurchaseDate?: string;
  toPurchaseDate?: string;
  taxIds?: number[]; // ID thuế
  code?: string;
}

export interface PurchaseOrderStatusCount {
  status: number;
  statusValue: string;
  count: number;
}

export interface PurchaseOrderListResponse extends KiotVietListResponse<PurchaseOrder> {
  statusCount?: PurchaseOrderStatusCount[];
}

export enum PurchaseOrderStatus {
  Draft = 1,
  Processing = 2,
  Completed = 3,
  Cancelled = 4,
}
