export interface BookingQueryParams {
  page: number;
  limit: number;
  sort?: string;
  order?: 'asc' | 'desc';
  estado?: string;
  mesaId?: number;
  fecha?: string;
}
