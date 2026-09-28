import { KiotVietClient } from '../client';
import { Location, LocationListResponse } from '../types';

export class LocationsHandler {
  constructor(private client: KiotVietClient) {}

  /**
   * Get list of locations
   * Documentation: 2.21. GET /locations
   * @returns LocationListResponse
   */
  async list(params: Record<string, any> = {}): Promise<LocationListResponse> {
    const response = await this.client.apiClient.get<LocationListResponse>('/locations', { params });
    return response.data;
  }

  /**
   * Get location by ID
   * @param id Location ID
   * @returns Location
   */
  async getById(id: number): Promise<Location> {
    const response = await this.client.apiClient.get<Location>(`/locations/${id}`);
    return response.data;
  }
}
