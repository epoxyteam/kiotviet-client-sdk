import { KiotVietClient } from '../client';
import { EInvoiceInfoUpdateParams, EInvoiceInfoUpdateResponse, EInvoiceInfo } from '../types';

export class EInvoicesHandler {
  constructor(private client: KiotVietClient) {}

  /**
   * Update e-invoice publishing info for multiple invoices that were not issued from KiotViet
   * Documentation: 2.28.1. PUT /einvoices/info
   * @param items Array of e-invoice info to update
   */
  async updateInfo(items: EInvoiceInfo[]): Promise<EInvoiceInfoUpdateResponse> {
    const body: EInvoiceInfoUpdateParams = { data: items };
    const response = await this.client.apiClient.put<EInvoiceInfoUpdateResponse>('/einvoices/info', body);
    return response.data;
  }

  /**
   * Update e-invoice publishing info from an existing EInvoiceInfoUpdateParams payload
   * Documentation: 2.28.1. PUT /einvoices/info
   * @param data Payload with `data` array of e-invoice info
   */
  async updateInfoByParams(data: EInvoiceInfoUpdateParams): Promise<EInvoiceInfoUpdateResponse> {
    const response = await this.client.apiClient.put<EInvoiceInfoUpdateResponse>('/einvoices/info', data);
    return response.data;
  }
}
