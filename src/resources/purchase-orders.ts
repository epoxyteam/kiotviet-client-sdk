import { KiotVietClient } from '../client';
import {
  PurchaseOrder,
  PurchaseOrderCreateParams,
  PurchaseOrderUpdateParams,
  PurchaseOrderListParams,
  PurchaseOrderListResponse,
  PurchaseOrderStatus,
} from '../types/purchase-order';

export class PurchaseOrderHandler {
  constructor(private client: KiotVietClient) {}

  /**
   * List purchase orders with optional filtering
   * @param params Filter parameters
   */
  async list(params: PurchaseOrderListParams = {}): Promise<PurchaseOrderListResponse> {
    const response = await this.client.apiClient.get<PurchaseOrderListResponse>('/purchaseorders', { params });
    return response.data;
  }

  /**
   * Get a purchase order by its ID
   * @param purchaseOrderId The ID of the purchase order to retrieve
   */
  async getById(purchaseOrderId: number): Promise<PurchaseOrder> {
    const response = await this.client.apiClient.get<PurchaseOrder>(`/purchaseorders/${purchaseOrderId}`);
    return response.data;
  }

  /**
   * Create a new purchase order
   * @param purchaseOrderData The purchase order data to create
   */
  async create(purchaseOrderData: PurchaseOrderCreateParams): Promise<PurchaseOrder> {
    const response = await this.client.apiClient.post<PurchaseOrder>('/purchaseorders', purchaseOrderData);
    return response.data;
  }

  /**
   * Update an existing purchase order
   * @param purchaseOrderId The ID of the purchase order to update
   * @param purchaseOrderData The purchase order data to update
   */
  async update(purchaseOrderId: number, purchaseOrderData: Partial<PurchaseOrderUpdateParams>): Promise<PurchaseOrder> {
    const response = await this.client.apiClient.put<PurchaseOrder>(`/purchaseorders/${purchaseOrderId}`, {
      id: purchaseOrderId,
      ...purchaseOrderData,
    });
    return response.data;
  }

  /**
   * Cancel a purchase order
   * @param purchaseOrderId The ID of the purchase order to cancel
   * @param reason Optional cancellation reason
   */
  async cancel(purchaseOrderId: number, reason?: string): Promise<PurchaseOrder> {
    const response = await this.client.apiClient.put<PurchaseOrder>(`/purchaseorders/${purchaseOrderId}`, {
      id: purchaseOrderId,
      status: PurchaseOrderStatus.Cancelled,
      description: reason,
    });
    return response.data;
  }

  /**
   * Get purchase orders by date range
   * @param fromDate Start date (YYYY-MM-DD)
   * @param toDate End date (YYYY-MM-DD)
   * @param params Additional filter parameters
   */
  async getByDateRange(
    fromDate: string,
    toDate: string,
    params: Omit<PurchaseOrderListParams, 'fromPurchaseDate' | 'toPurchaseDate'> = {},
  ): Promise<PurchaseOrderListResponse> {
    const response = await this.client.apiClient.get<PurchaseOrderListResponse>('/purchaseorders', {
      params: {
        ...params,
        fromPurchaseDate: fromDate,
        toPurchaseDate: toDate,
      },
    });
    return response.data;
  }

  /**
   * Get purchase orders by supplier code
   * @param supplierCode The supplier code to filter by
   * @param params Additional filter parameters
   */
  async getBySupplier(
    supplierCode: string,
    params: Omit<PurchaseOrderListParams, 'supplierCode'> = {},
  ): Promise<PurchaseOrderListResponse> {
    const response = await this.client.apiClient.get<PurchaseOrderListResponse>('/purchaseorders', {
      params: {
        ...params,
        supplierCode,
      },
    });
    return response.data;
  }

  /**
   * Delete a purchase order
   * Documentation: 2.15.5. DELETE /purchaseorders?id={Id}&IsVoidPayment=true
   * @param purchaseOrderId The ID of the purchase order to delete
   * @param isVoidPayment Whether to void the associated payment (mặc định: không hủy phiếu thanh toán)
   */
  async delete(purchaseOrderId: number, isVoidPayment = false): Promise<void> {
    await this.client.apiClient.delete('/purchaseorders', {
      params: {
        id: purchaseOrderId,
        IsVoidPayment: isVoidPayment,
      },
    });
  }
}
