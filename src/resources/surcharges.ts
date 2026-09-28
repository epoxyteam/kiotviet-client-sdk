import { KiotVietClient } from '../client';
import {
  Surcharge,
  SurchargeCreateParams,
  SurchargeUpdateParams,
  SurchargeListParams,
  SurchargeListResponse,
} from '../types/surcharge';

export class SurchargeHandler {
  constructor(private client: KiotVietClient) {}

  /**
   * List surcharges with optional filtering and pagination
   * @param params Filter and pagination parameters
   */
  async list(params: SurchargeListParams = {}): Promise<SurchargeListResponse> {
    const response = await this.client.apiClient.get<SurchargeListResponse>('/surcharges', { params });
    return response.data;
  }

  /**
   * Get a surcharge by its ID
   * @param surchargeId The ID of the surcharge to retrieve
   */
  async getById(surchargeId: number): Promise<Surcharge> {
    const response = await this.client.apiClient.get<Surcharge>(`/surcharges/${surchargeId}`);
    return response.data;
  }

  /**
   * Create a new surcharge
   * @param surchargeData The surcharge data to create
   */
  async create(surchargeData: SurchargeCreateParams): Promise<Surcharge> {
    const response = await this.client.apiClient.post<Surcharge>('/surcharges', surchargeData);
    return response.data;
  }

  /**
   * Update an existing surcharge
   * @param surchargeId The ID of the surcharge to update
   * @param surchargeData The surcharge data to update
   */
  async update(surchargeId: number, surchargeData: Partial<SurchargeUpdateParams>): Promise<Surcharge> {
    const response = await this.client.apiClient.put<Surcharge>(`/surcharges/${surchargeId}`, surchargeData);
    return response.data;
  }

  /**
   * Activate or deactivate a surcharge
   * @param surchargeId The ID of the surcharge
   * @param isActive true: cho phép hoạt động; false: ngừng hoạt động
   * Documentation: 2.10.4. POST /surcharges/{id}/activesurchage  body: { "isActive": bool }
   */
  async setActive(surchargeId: number, isActive: boolean): Promise<void> {
    await this.client.apiClient.post(`/surcharges/${surchargeId}/activesurchage`, { isActive });
  }

  /**
   * Activate a surcharge
   * @param surchargeId The ID of the surcharge
   */
  async activate(surchargeId: number): Promise<void> {
    await this.setActive(surchargeId, true);
  }

  /**
   * Deactivate a surcharge
   * @param surchargeId The ID of the surcharge
   */
  async deactivate(surchargeId: number): Promise<void> {
    await this.setActive(surchargeId, false);
  }

  /**
   * Delete a surcharge
   * @param surchargeId The ID of the surcharge to delete
   */
  async delete(surchargeId: number): Promise<void> {
    await this.client.apiClient.delete(`/surcharges/${surchargeId}`);
  }
}
