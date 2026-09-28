import { KiotVietClient } from '../client';
import { Setting } from '../types/setting';

export class SettingsHandler {
  constructor(private client: KiotVietClient) {}

  /**
   * Get settings
   * Documentation: 2.22. GET /settings
   * API trả về object trực tiếp với key dạng PascalCase, được map sang camelCase:
   * {
   *   "ManagerCustomerByBranch": bool,
   *   "AllowOrderWhenOutStock": bool,
   *   "AllowSellWhenOrderOutStock": bool,
   *   "AllowSellWhenOutStock": bool
   * }
   * @returns Current settings (camelCase)
   */
  async get(): Promise<Setting> {
    const response = await this.client.apiClient.get<Record<string, any>>('/settings');
    const raw = response.data;

    return {
      managerCustomerByBranch: raw.ManagerCustomerByBranch ?? raw.managerCustomerByBranch,
      allowOrderWhenOutStock: raw.AllowOrderWhenOutStock ?? raw.allowOrderWhenOutStock,
      allowSellWhenOrderOutStock: raw.AllowSellWhenOrderOutStock ?? raw.allowSellWhenOrderOutStock,
      allowSellWhenOutStock: raw.AllowSellWhenOutStock ?? raw.allowSellWhenOutStock,
    };
  }

  /**
   * Get raw settings response as returned by the API (PascalCase keys)
   * Documentation: 2.22. GET /settings
   */
  async getRaw(): Promise<Record<string, any>> {
    const response = await this.client.apiClient.get<Record<string, any>>('/settings');
    return response.data;
  }
}
