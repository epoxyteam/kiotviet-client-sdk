import { KiotVietClient } from '../client';
import {
  VoucherListParams,
  VoucherListResponse,
  VoucherCampaignListParams,
  VoucherCampaignListResponse,
  VoucherCampaign,
  VoucherCreateParams,
  VoucherReleaseParams,
  VoucherCancelParams,
  VoucherActionResponse,
  Voucher,
} from '../types/voucher';

export class VouchersHandler {
  constructor(private client: KiotVietClient) {}

  /**
   * Get list of voucher campaigns (đợt phát hành voucher)
   * Documentation: 2.24.1. GET /vouchercampaign
   * @param params Filter parameters
   */
  async listCampaigns(params?: VoucherCampaignListParams): Promise<VoucherCampaignListResponse> {
    const response = await this.client.apiClient.get<VoucherCampaignListResponse>('/vouchercampaign', { params });
    return response.data;
  }

  /**
   * Get a voucher campaign by ID
   * Documentation: 2.24.1. GET /vouchercampaign?id={id}
   * @param id Voucher campaign ID
   */
  async getCampaign(id: number): Promise<VoucherCampaign | null> {
    const response = await this.client.apiClient.get<VoucherCampaignListResponse>('/vouchercampaign', {
      params: { id },
    });
    return response.data.data.find((campaign) => campaign.id === id) ?? null;
  }

  /**
   * Get list of vouchers in a campaign
   * Documentation: 2.24.2. GET /voucher
   * @param params Filter parameters (campaignId is required)
   */
  async list(params: VoucherListParams): Promise<VoucherListResponse> {
    const response = await this.client.apiClient.get<VoucherListResponse>('/voucher', { params });
    return response.data;
  }

  /**
   * Get vouchers by campaign ID
   * Documentation: 2.24.2. GET /voucher?campaignId={campaignId}
   * @param campaignId Voucher campaign ID
   * @param params Additional filter parameters
   */
  async getByCampaign(
    campaignId: number,
    params: Omit<VoucherListParams, 'campaignId'> = {},
  ): Promise<VoucherListResponse> {
    const response = await this.client.apiClient.get<VoucherListResponse>('/voucher', {
      params: {
        ...params,
        campaignId,
      },
    });
    return response.data;
  }

  /**
   * Get a voucher by code
   * Documentation: 2.24.2. GET /voucher?code={code}
   * @param code Voucher code
   */
  async getByCode(code: string): Promise<Voucher | null> {
    const response = await this.client.apiClient.get<VoucherListResponse>('/voucher', {
      params: { code, pageSize: 1 },
    });
    return response.data.data.length > 0 ? response.data.data[0] : null;
  }

  /**
   * Create new vouchers in a campaign
   * Documentation: 2.24.3. POST /voucher
   * @param data Voucher creation data
   */
  async create(data: VoucherCreateParams): Promise<VoucherActionResponse> {
    const response = await this.client.apiClient.post<VoucherActionResponse>('/voucher', data);
    return response.data;
  }

  /**
   * Release vouchers (hình thức tặng)
   * Documentation: 2.24.4. POST /voucher/release/give
   * @param data Release data
   */
  async releaseGive(data: VoucherReleaseParams): Promise<VoucherActionResponse> {
    const response = await this.client.apiClient.post<VoucherActionResponse>('/voucher/release/give', data);
    return response.data;
  }

  /**
   * Cancel vouchers
   * Documentation: 2.24.5. DELETE /voucher/cancel
   * @param data Cancel data
   */
  async cancel(data: VoucherCancelParams): Promise<VoucherActionResponse> {
    const response = await this.client.apiClient.delete<VoucherActionResponse>('/voucher/cancel', { data });
    return response.data;
  }
}
