export interface TableListItem {
  roleId: number;
  unitId: number;
  createUserId: number;
  roleName: string;
  unitName: string;
  remark: string;
  created: Date;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface roleListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface roleListParams {
  total: number;
  pageSize: number;
  current: number;
}