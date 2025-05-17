export interface RequestListResponse {
  status: boolean;
  message: string;
  total: number;
  count: number;
  list: any[];
  total_pending: number;
  total_accepted: number;
  total_declined: number;
  total_cancelled: number;
  total_without_filter: number;
  pending_without_filter: number;
  accepted_without_filter: number;
  declined_without_filter: number;
  cancelled_without_filter: number;
}
