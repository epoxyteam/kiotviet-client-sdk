import { KiotVietListResponse } from './common';

export interface Surcharge {
  id: number;
  code?: string;
  name?: string;
  value?: number;
  valueRatio?: number; // Phần trăm thu khác
  surchargeCode?: string; // Mã thu khác (theo response tài liệu 2.10)
  surchargeName?: string; // Tên thu khác (theo response tài liệu 2.10)
  isPercent: boolean;
  isAutoAdd: boolean;
  isRequired: boolean;
  description?: string;
  isActive: boolean;
  retailerId: number;
  branchId?: number;
  branchIds?: number[];
  createdBy?: string;
  createdDate?: string;
  createDate?: string; // Theo response tài liệu 2.10
  modifiedDate?: string;
}

export interface SurchargeCreateParams {
  code?: string;
  name: string;
  value: number;
  isPercent: boolean;
  isAutoAdd?: boolean;
  isRequired?: boolean;
  description?: string;
  branchIds?: number[];
  isActive?: boolean;
}

export interface SurchargeUpdateParams extends Partial<SurchargeCreateParams> {
  id: number;
}

export interface SurchargeListParams {
  pageSize?: number;
  currentItem?: number;
  lastModifiedFrom?: string;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
  isActive?: boolean;
  branchId?: number;
  includeRemoveIds?: boolean;
  code?: string;
  name?: string;
}

export type SurchargeListResponse = KiotVietListResponse<Surcharge>;
