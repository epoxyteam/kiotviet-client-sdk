import { KiotVietListResponse } from './common';

export interface Branch {
  id: number;
  branchId?: string;
  name?: string;
  branchName?: string; // Alias theo response tài liệu 2.7
  branchCode?: string; // Mã chi nhánh theo response tài liệu 2.7
  address: string;
  wardName?: string;
  districtName?: string;
  cityName?: string;
  phoneNumber?: string;
  email?: string;
  isActive: boolean;
  isMain: boolean;
  retailerId: number;
  locationId?: number;
  locationName?: string;
  createdBy?: string;
  createdDate: string;
  modifiedDate?: string;
  contactNumber?: string;
  latLng?: string;
  code?: string;
  parentId?: number;
  level?: number;
  hasChild?: boolean;
}

export interface BranchCreateParams {
  code?: string;
  branchId?: string;
  name: string;
  address: string;
  wardName?: string;
  districtName?: string;
  cityName?: string;
  phoneNumber?: string;
  contactNumber?: string;
  email?: string;
  isActive?: boolean;
  locationId?: number;
  locationName?: string;
  latLng?: string;
  parentId?: number;
  level?: number;
}

export interface BranchUpdateParams extends Partial<BranchCreateParams> {
  id: number;
}

export interface BranchListParams {
  pageSize?: number;
  currentItem?: number;
  lastModifiedFrom?: string;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
  isActive?: boolean;
  isMain?: boolean;
  includeRemoveIds?: boolean;
  code?: string;
  name?: string;
  parentId?: number;
  level?: number;
}

export type BranchListResponse = KiotVietListResponse<Branch>;
