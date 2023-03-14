export interface PaginationParams {
  _limit: number;
  _page: number;
  _totalRows: number;
}

export interface ResponseListDog<T> {
  message: T;
}

export interface ListResponse<T> {
  data: ResponseListDog<T>;
  status: number;
  pagination: PaginationParams;
}

export interface MessageType<T> {
  message: T;
}

export interface ListParams {
  _page?: number;
  _limit?: number;
  _sort?: string;
  _order?: "asc" | "desc";

  [key: string]: any;
}
