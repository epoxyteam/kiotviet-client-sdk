/**
 * KiotViet Hóa đơn điện tử (E-Invoice)
 * Tài liệu: 2.28. Hóa đơn điện tử
 * PUT https://public.kiotapi.com/einvoices/info
 *
 * Cập nhật thông tin phát hành HĐĐT cho nhiều hóa đơn cùng lúc.
 * Lưu ý: Hóa đơn đã phát hành HĐĐT từ hệ thống KiotViet sẽ không thể cập nhật qua API này.
 */
export interface EInvoiceInfo {
  invoiceId: number; // Mã hóa đơn cần cập nhật thông tin HĐĐT (bắt buộc)
  invoiceRefId: string; // UUID của hóa đơn điện tử (bắt buộc)
  partnerTransactionCode?: string; // Mã tra cứu hóa đơn tại nhà cung cấp
  partner: EInvoicePartner; // Nhà cung cấp (bắt buộc)
  status: number; // Trạng thái đẩy hóa đơn (bắt buộc)
  invoiceNumber?: string; // Số hóa đơn điện tử
  type: EInvoiceType; // Loại phát hành mẫu hóa đơn (bắt buộc)
  publishDate?: string; // Ngày phát hành hóa đơn điện tử
  serial?: string; // Ký hiệu hóa đơn
}

export interface EInvoiceInfoUpdateParams {
  data: EInvoiceInfo[];
}

export interface EInvoiceInfoUpdateResponse {
  message: string;
}

/** Nhà cung cấp hóa đơn điện tử */
export enum EInvoicePartner {
  MISA = 0,
  VNPT = 1,
  VIETTEL = 2,
  FPT = 3,
  KIOTVIET = 4,
}

/** Loại phát hành mẫu hóa đơn */
export enum EInvoiceType {
  /** Phát hành hóa đơn thông thường */
  NORMAL = 0,
  /** Phát hành hóa đơn từ MTT */
  POS = 1,
}

/** Trạng thái đẩy hóa đơn */
export enum EInvoiceStatus {
  Unpublish = 0, // Chưa phát hành
  Processing = 1, // Đang xử lý
  PublishSuccess = 2, // Đã phát hành
  PublishError = 3, // Phát hành lỗi
  Transferred = 4, // Đã chuyển
  Submitted = 5, // Đã gửi CQT
  Approved = 6, // CQT chấp nhận
  Rejected = 7, // CQT kiểm tra không hợp lệ
}
