import { KiotVietListResponse } from './common';

/**
 * Đợt phát hành voucher
 * Tài liệu: 2.24.1. Lấy danh sách đợt phát hành - GET /vouchercampaign
 */
export interface VoucherCampaign {
  id: number; // id đợt phát hành
  code: string; // mã đợt phát hành
  name: string; // tên đợt phát hành
  isActive: boolean; // trạng thái đợt phát hành
  startDate: string; // thời gian áp dụng bắt đầu
  endDate: string; // thời gian áp dụng kết thúc
  expireTime: number; // số ngày kể từ ngày phát hành sẽ hết hạn sử dụng voucher
  prereqCategoryIds?: number[]; // danh sách id nhóm hàng
  prereqProductIds?: number[]; // danh sách id hàng hóa
  prereqPrice?: number; // tổng tiền hàng
  quantity: number; // tổng số voucher
  price: number; // mệnh giá
  useVoucherCombineInvoice: boolean; // áp dụng gộp nhiều voucher trên 1 hóa đơn
  isGlobal: boolean; // có áp dụng cho toàn hệ thống
  forAllCusGroup: boolean; // có áp dụng cho toàn bộ khách hàng
  forAllUser: boolean; // có áp dụng cho toàn bộ người tạo
  voucherBranchs?: Array<{
    branchId: number; // id chi nhánh
    branchName: string; // tên chi nhánh
  }>;
  voucherUsers?: Array<{
    userId: number; // id người tạo
    userName: string; // tên người tạo
  }>;
}

/**
 * Voucher
 * Tài liệu: 2.24.2. Lấy danh sách voucher trong đợt phát hành - GET /voucher
 */
export interface Voucher {
  id: number; // id voucher
  code: string; // mã voucher
  voucherCampaignId: number; // id đợt phát hành voucher
  releaseDate: string; // ngày phát hành
  expireDate: string; // ngày hết hạn
  usedDate?: string; // ngày sử dụng
  status: VoucherStatus; // trạng thái
  sellType: VoucherSellType; // hình thức
  price: number; // giá trị voucher
  partnerType: VoucherPartnerType; // nhóm người mua nhận voucher
  partnerId?: number; // id người mua nhận voucher
  partnerName?: string; // tên người mua nhận voucher
  modifiedDate?: string; // ngày chỉnh sửa
  createdDate: string; // ngày tạo
}

export interface VoucherCampaignListParams {
  includeVoucherBranchs?: boolean; // có lấy danh sách chi nhánh áp dụng voucher
  includeVoucherUsers?: boolean; // có lấy danh sách người tạo áp dụng voucher
  isActive?: boolean; // trạng thái đợt phát hành
  id?: number; // id đợt phát hành
  isGlobal?: boolean; // có áp dụng cho toàn hệ thống
  forAllCusGroup?: boolean; // có áp dụng cho toàn bộ khách hàng
  forAllUser?: boolean; // có áp dụng cho toàn bộ người tạo
}

export interface VoucherListParams {
  campaignId: number; // id đợt phát hành voucher (bắt buộc)
  status?: number; // trạng thái = [0: chưa sử dụng | 1: đã phát hành | 2: đã sử dụng | 3: đã hủy]
  lastModifiedFrom?: string; // ngày cập nhật cuối
  code?: string; // mã code của voucher (optional)
  pageSize?: number;
  currentItem?: number;
}

/**
 * Tạo mới voucher
 * Tài liệu: 2.24.3. POST /voucher
 * body: { "voucherCampaignId": long, "data": [{ "code": string }] }
 */
export interface VoucherCreateParams {
  voucherCampaignId: number; // id đợt phát hành voucher đang ở trạng thái kích hoạt
  data: Array<{
    code: string; // mã voucher
  }>;
}

/**
 * Phát hành voucher (hình thức tặng)
 * Tài liệu: 2.24.4. POST /voucher/release/give
 */
export interface VoucherReleaseParams {
  CampaignId: number; // id đợt phát hành voucher đang ở trạng thái kích hoạt
  Vouchers: Array<{
    Code: string; // mã voucher (chỉ áp dụng với voucher trạng thái 0: chưa sử dụng)
  }>;
  ReleaseDate: string; // ngày phát hành
}

/**
 * Hủy voucher
 * Tài liệu: 2.24.5. DELETE /voucher/cancel
 */
export interface VoucherCancelParams {
  CampaignId: number; // id đợt phát hành voucher đang ở trạng thái kích hoạt
  Vouchers: Array<{
    Code: string; // mã voucher (chỉ áp dụng với voucher trạng thái 0: chưa sử dụng)
  }>;
}

export interface VoucherActionResponse {
  message: string;
}

export interface VoucherListResponse extends KiotVietListResponse<Voucher> {}

export interface VoucherCampaignListResponse {
  total: number;
  pageSize?: number;
  data: VoucherCampaign[];
}

/** Trạng thái voucher */
export enum VoucherStatus {
  /** Chưa sử dụng */
  Unused = 0,
  /** Đã phát hành */
  Released = 1,
  /** Đã sử dụng */
  Used = 2,
  /** Đã hủy */
  Cancelled = 3,
}

/** Hình thức voucher */
export enum VoucherSellType {
  /** Tặng */
  Gift = 0,
  /** Bán */
  Sold = 1,
}

/** Nhóm người mua nhận voucher */
export enum VoucherPartnerType {
  /** Nhân viên */
  User = 'U',
  /** Khách hàng */
  Customer = 'C',
  /** Nhà cung cấp */
  Supplier = 'S',
  /** Khác */
  Other = 'O',
  /** Đối tác giao hàng */
  DeliveryPartner = 'D',
}
