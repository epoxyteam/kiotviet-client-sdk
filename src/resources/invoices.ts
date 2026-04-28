import { KiotVietClient } from '../client';
import {
  Invoice,
  InvoiceCreateParams,
  InvoiceUpdateParams,
  InvoiceListParams,
  InvoiceListResponse,
  InvoiceStatus,
} from '../types';

export class InvoiceHandler {
  constructor(private client: KiotVietClient) {}

  /**
   * List invoices with optional filtering
   * @param params Filter parameters
   */
  async list(params: InvoiceListParams = {}): Promise<InvoiceListResponse> {
    const response = await this.client.apiClient.get<InvoiceListResponse>('/invoices', { params });
    return response.data;
  }

  /**
   * Get an invoice by its ID
   * @param invoiceId The ID of the invoice to retrieve
   */
  async getById(invoiceId: number): Promise<Invoice> {
    const response = await this.client.apiClient.get<Invoice>(`/invoices/${invoiceId}`);
    return response.data;
  }

  /**
   * Create a new invoice
   * @param invoiceData The invoice data to create
   */
  async create(invoiceData: InvoiceCreateParams): Promise<Invoice> {
    const response = await this.client.apiClient.post<Invoice>('/invoices', invoiceData);
    return response.data;
  }

  /**
   * Update an existing invoice
   * @param invoiceId The ID of the invoice to update
   * @param invoiceData The invoice data to update
   */
  async update(invoiceId: number, invoiceData: Partial<InvoiceUpdateParams>): Promise<Invoice> {
    const response = await this.client.apiClient.put<Invoice>(`/invoices/${invoiceId}`, {
      id: invoiceId,
      ...invoiceData,
    });
    return response.data;
  }

  /**
   * Cancel an invoice
   * @param invoiceId The ID of the invoice to cancel
   * @param reason Optional cancellation reason
   */
  async cancel(invoiceId: number, reason?: string): Promise<Invoice> {
    const response = await this.client.apiClient.put<Invoice>(`/invoices/${invoiceId}`, {
      id: invoiceId,
      status: InvoiceStatus.Cancelled,
      description: reason,
    });
    return response.data;
  }

  /**
   * Get invoices by date range
   * @param fromDate Start date (YYYY-MM-DD)
   * @param toDate End date (YYYY-MM-DD)
   * @param params Additional filter parameters
   */
  async getByDateRange(
    fromDate: string,
    toDate: string,
    params: Omit<InvoiceListParams, 'fromPurchaseDate' | 'toPurchaseDate'> = {},
  ): Promise<InvoiceListResponse> {
    const response = await this.client.apiClient.get<InvoiceListResponse>('/invoices', {
      params: {
        ...params,
        fromPurchaseDate: fromDate,
        toPurchaseDate: toDate,
      },
    });
    return response.data;
  }

  /**
   * Get invoices by customer
   * @param customerIdentifier Customer's phone number or code
   * @param params Additional filter parameters
   */
  async getByCustomer(
    customerIdentifier: string,
    params: Omit<InvoiceListParams, 'customerPhone' | 'customerCode'> = {},
  ): Promise<InvoiceListResponse> {
    // Try to determine if the identifier is a phone number
    const isPhone = /^\d+$/.test(customerIdentifier);

    const response = await this.client.apiClient.get<InvoiceListResponse>('/invoices', {
      params: {
        ...params,
        ...(isPhone ? { customerPhone: customerIdentifier } : { customerCode: customerIdentifier }),
      },
    });
    return response.data;
  }

  /**
   * Get invoices by order
   * @param orderId The ID of the order
   * @param params Additional filter parameters
   */
  async getByOrder(orderId: number, params: Omit<InvoiceListParams, 'orderId'> = {}): Promise<InvoiceListResponse> {
    const response = await this.client.apiClient.get<InvoiceListResponse>('/invoices', {
      params: {
        ...params,
        orderId,
      },
    });
    return response.data;
  }

  /**
   * Get an invoice by its code
   * @param code The code of the invoice to retrieve
   */
  async getByCode(code: string): Promise<Invoice> {
    const response = await this.client.apiClient.get<Invoice>(`/invoices/code/${code}`);
    return response.data;
  }

  /**
   * Delete/void an invoice
   * @param invoiceId The ID of the invoice to delete
   * @param isVoidPayment Whether to void the associated payment
   */
  async delete(invoiceId: number, isVoidPayment = false): Promise<void> {
    await this.client.apiClient.delete(`/invoices/${invoiceId}`, {
      params: { isVoidPayment },
    });
  }
}
