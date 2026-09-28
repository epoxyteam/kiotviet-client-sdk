import { KiotVietClient } from '../client';
import { CouponListParams, CouponListResponse, CouponSetUsedParams, CouponSetUsedResponse } from '../types';

export class CouponsHandler {
  constructor(private client: KiotVietClient) {}

  /**
   * List coupons with optional filtering
   * @param params Filter and pagination parameters
   */
  async list(params: CouponListParams = {}): Promise<CouponListResponse> {
    const response = await this.client.apiClient.get<CouponListResponse>('/coupons', { params });
    return response.data;
  }

  /**
   * Mark coupons as used
   * Documentation: 2.23. POST /coupons/setused
   * @param codes List of coupon codes to mark as "Đã sử dụng"
   * @returns CouponSetUsedResponse
   */
  async setUsed(codes: string[]): Promise<CouponSetUsedResponse> {
    const body: CouponSetUsedParams = { coupons: codes.map((code) => ({ code })) };
    const response = await this.client.apiClient.post<CouponSetUsedResponse>('/coupons/setused', body);
    return response.data;
  }

  /**
   * Mark coupons as used from an existing CouponSetUsedParams payload
   * Documentation: 2.23. POST /coupons/setused
   * @param data Coupon payload with `coupons` array
   */
  async setUsedByParams(data: CouponSetUsedParams): Promise<CouponSetUsedResponse> {
    const response = await this.client.apiClient.post<CouponSetUsedResponse>('/coupons/setused', data);
    return response.data;
  }
}
