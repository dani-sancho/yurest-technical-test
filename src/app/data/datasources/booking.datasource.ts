import { Injectable, inject } from '@angular/core';
import { ApiClient, PagedResponse } from '../database/api-client';
import { ApiEndpoints } from '../database/endpoints/api-endpoints';
import { BookingEntity } from '../entities/booking.entity';
import { BookingQueryParams } from '../entities/booking-query.params';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BookingDataSource {
  private readonly api = inject(ApiClient);

  query(params: BookingQueryParams): Observable<PagedResponse<BookingEntity>> {
    const httpParams: Record<string, string | number | boolean> = {
      _page: params.page,
      _limit: params.limit,
    };

    if (params.sort) {
      httpParams['_sort'] = params.sort;
      httpParams['_order'] = params.order ?? 'asc';
    }

    if (params.estado) httpParams['estado'] = params.estado;
    if (params.mesaId) httpParams['mesaId'] = params.mesaId;
    if (params.fecha) httpParams['fecha'] = params.fecha;

    return this.api.getPaged<BookingEntity>(ApiEndpoints.bookings, httpParams);
  }

  getAll(params?: Record<string, string | number | boolean>): Observable<BookingEntity[]> {
    return this.api.get<BookingEntity[]>(ApiEndpoints.bookings, params);
  }

  getItem(id: number): Observable<BookingEntity> {
    return this.api.get<BookingEntity>(`${ApiEndpoints.bookings}/${id}`);
  }

  addBooking(item: Omit<BookingEntity, 'id'>): Observable<number> {
    return this.api.post<number>(ApiEndpoints.bookings, item);
  }

  updateBooking(id: number, item: BookingEntity): Observable<number> {
    return this.api.put<number>(`${ApiEndpoints.bookings}/${id}`, item);
  }

  deleteBooking(id: number): Observable<void> {
    return this.api.delete<void>(`${ApiEndpoints.bookings}/${id}`);
  }

  patch(id: number, changes: Partial<BookingEntity>): Observable<BookingEntity> {
    return this.api.patch<BookingEntity>(`${ApiEndpoints.bookings}/${id}`, changes);
  }

  create(booking: Omit<BookingEntity, 'id'>): Observable<BookingEntity> {
    return this.api.post<BookingEntity>(ApiEndpoints.bookings, booking);
  }
}
