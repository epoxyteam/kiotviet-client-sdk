import { KiotVietListResponse } from './common';

/**
 * KiotViet Thuế (Tax)
 * Tài liệu: 2.27. Thuế - 2.27.1. Lấy danh sách Thuế đang được hỗ trợ
 * GET https://public.kiotapi.com/tax/detail
 */
export interface Tax {
  taxId: number; // ID của loại thuế
  taxName: string; // Tên loại thuế
  value: number | null; // Giá trị % thuế, null nếu không xác định
  type: 'Khấu trừ' | 'Trực tiếp'; // Phương pháp tính thuế
}

export interface TaxDetailResponse {
  data: Tax[];
  message: string; // Nội dung thông báo
  isSuccess: boolean; // Thành công hay không
}

export type TaxListResponse = KiotVietListResponse<Tax>;
