import { KiotVietClient } from '../client';
import { Tax, TaxDetailResponse } from '../types';

export class TaxesHandler {
  constructor(private client: KiotVietClient) {}

  /**
   * Get list of supported taxes
   * Documentation: 2.27.1. GET /tax/detail
   * @returns TaxDetailResponse { data, message, isSuccess }
   */
  async list(): Promise<TaxDetailResponse> {
    const response = await this.client.apiClient.get<TaxDetailResponse>('/tax/detail');
    return response.data;
  }

  /**
   * Get supported taxes as a flat list
   * @returns Tax[]
   */
  async getAll(): Promise<Tax[]> {
    const result = await this.list();
    return result.data;
  }
}
