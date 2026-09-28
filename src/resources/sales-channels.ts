import { KiotVietClient } from '../client';
import { SalesChannelListResponse } from '../types';

export class SalesChannelsHandler {
  constructor(private client: KiotVietClient) {}

  /**
   * Get list of sales channels
   * Documentation: 2.18.1. GET /salechannel
   * @returns SalesChannelListResponse
   */
  async list(params: Record<string, any> = {}): Promise<SalesChannelListResponse> {
    return this.client.get('/salechannel', { params });
  }
}
