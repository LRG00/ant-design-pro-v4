export interface TableListItem {
  userId: number;
  unitId: number;
  createUserId: number;
  roleName: string;
  unitName: string;
  email: string;
  mobile: string;
  status: boolean;
  created: Date;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface sysUserListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface sysUserListParams {
  total: number;
  pageSize: number;
  current: number;
}