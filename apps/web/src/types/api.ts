export interface ApiError {
  code: string;
  message: string;
}

export type ApiResponse<T> =
  | {
      success: true;
      data: T;
      error?: never; // Ensures error doesn't exist when success is true
    }
  | {
      success: false;
      data?: never; // Ensures data doesn't exist when success is false
      error: ApiError;
      timestamp: string;
      path: string;
    };

export interface ApiErrorResponse {
  success: false;
  statusCode: number;
  message: string | string[];
  path: string;
  timestamp: string;
}

// export interface PaginationMeta {
//   page: number;
//   limit: number;
//   total: number;
//   totalPages: number;
//   hasNextPage: boolean;
//   hasPreviousPage: boolean;
// }

// export interface PaginatedResponse<T> {
//   items: T[];
//   meta: PaginationMeta;
// }
