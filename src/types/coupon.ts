import { KiotVietListResponse } from './common';

/**
 * KiotViet Coupon
 * Tài liệu: 2.23. Cập nhật trạng thái Coupon
 * POST https://public.kiotapi.com/coupons/setused
 */
export interface CouponSetUsedParams {
  coupons: Array<{
    code: string; // Mã coupon (bắt buộc)
  }>;
}

export interface CouponSetUsedResponse {
  message: string;
  dataError?: Array<{
    code: string; // thông báo lỗi tương ứng với mã coupon
  }>;
}

/**
 * Danh sách coupon (dùng chung cấu trúc list của KiotViet)
 */
export interface Coupon {
  id: number;
  code: string;
  name: string;
  description?: string;
  discount?: number;
  discountType?: number;
  startDate?: string;
  endDate?: string;
  isActive: boolean;
  status: number;
  statusValue: string;
  createdDate: string;
  modifiedDate?: string;
  retailerId: number;
}

export interface CouponListParams {
  status?: number[];
  keyword?: string;
  pageSize?: number;
  currentItem?: number;
}

export type CouponListResponse = KiotVietListResponse<Coupon>;
