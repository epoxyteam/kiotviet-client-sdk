import { KiotVietClient } from '../client';
import { TrademarkListResponse } from '../types';

export class TrademarksHandler {
  constructor(private client: KiotVietClient) {}

  /**
   * Get list of trademarks
   * Documentation: 2.25.1. GET /trademark
   * @param params Filter and pagination parameters (lastModifiedFrom, pageSize, currentItem, orderBy, orderDirection)
   * @returns TrademarkListResponse
   */
  async list(params: Record<string, any> = {}): Promise<TrademarkListResponse> {
    return this.client.get('/trademark', { params });
  }
}
