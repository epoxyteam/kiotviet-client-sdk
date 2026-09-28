import { KiotVietListResponse } from './common';

/**
 * KiotViet Kênh bán hàng
 * Tài liệu: 2.18.1. Lấy danh sách kênh bán hàng - GET /salechannel
 */
export interface SalesChannel {
  id: number; // Id kênh bán hàng
  name: string; // Tên kênh bán hàng
  isActive: boolean; // Còn sử dụng không
  status: boolean; // Alias của isActive
  img?: string; // Đường dẫn ảnh đại diện
  isNotDelete?: boolean; // true = không thể xóa
  description?: string;
  retailerId?: number;
  createdDate: string;
  modifiedDate?: string;
}

export interface SalesChannelListResponse extends KiotVietListResponse<SalesChannel> {}
