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

export interface menuListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface menuListParams {
  total: number;
  pageSize: number;
  current: number;
}