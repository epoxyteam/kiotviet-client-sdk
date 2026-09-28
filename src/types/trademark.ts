import { KiotVietListResponse } from './common';

/**
 * KiotViet Thương hiệu
 * Tài liệu: 2.25.1. Lấy danh sách thương hiệu - GET /trademark
 */
export interface Trademark {
  tradeMarkId: number; // ID thương hiệu
  name: string; // Tên thương hiệu
  tradeMarkName?: string; // Alias theo response tài liệu
  description?: string;
  status: boolean;
  isActive?: boolean; // Alias của status
  retailerId?: number;
  createdDate: string; // Thời gian tạo thương hiệu
  modifiedDate?: string; // Thời gian cập nhật (bằng thời gian tạo nếu chưa cập nhật)
}

export interface TrademarkListResponse extends KiotVietListResponse<Trademark> {}
