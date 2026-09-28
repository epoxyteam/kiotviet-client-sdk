import { KiotVietListResponse } from './common';

/**
 * KiotViet Location (địa bàn hành chính)
 * Tài liệu: 2.21. Lấy danh sách Location
 * GET https://public.kiotapi.com/locations
 */
export interface Location {
  id: number;
  name: string;
  normalName: string; // Tên không dấu
}

export type LocationListResponse = KiotVietListResponse<Location>;
