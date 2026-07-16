import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BookingDataSource } from '../datasources/booking.datasource';
import { BookingRepository } from '../../domain/repositories/booking.repository';
import { Booking, BookingFilters } from '../../domain/models/booking.model';
import { BookingEntity } from '../entities/booking.entity';

@Injectable({
  providedIn: 'root'
})
export class BookingRepositoryImpl extends BookingRepository {

  private readonly dataSource = inject(BookingDataSource);

  private toDomain(entity: BookingEntity): Booking {
    return {
      id: entity.id,
      mesaId: entity.mesaId,
      cliente: entity.cliente,
      fecha: entity.fecha,
      hora: entity.hora,
      comensales: entity.comensales,
      estado: entity.estado as Booking['estado'],
      notas: entity.notas,
    };
  }

  private toEntity(model: Booking): BookingEntity {
    return {
      id: model.id,
      mesaId: model.mesaId,
      cliente: model.cliente,
      fecha: model.fecha,
      hora: model.hora,
      comensales: model.comensales,
      estado: model.estado,
      notas: model.notas,
    };
  }

  private buildFiltersParams(filters?: BookingFilters): Record<string, string | number | boolean> | undefined {
    if (!filters) return undefined;

    const params: Record<string, string | number | boolean> = {};

    if (filters.fecha) params['fecha'] = filters.fecha;
    if (filters.estado) params['estado'] = filters.estado;
    if (filters.cliente) params['cliente'] = filters.cliente;
    if (filters.mesaId !== undefined) params['mesaId'] = filters.mesaId;

    return Object.keys(params).length > 0 ? params : undefined;
  }

  getAll(filters?: BookingFilters): Observable<Booking[]> {
    return this.dataSource.getAll(this.buildFiltersParams(filters)).pipe(
      map(entities => entities.map(this.toDomain))
    );
  }

  getById(id: number): Observable<Booking | undefined> {
    return this.dataSource.getItem(id).pipe(
      map(entity => entity ? this.toDomain(entity) : undefined)
    );
  }

  create(booking: Booking): Observable<number> {
    return this.dataSource.addBooking(this.toEntity(booking));
  }

  update(id: number, booking: Booking): Observable<number> {
    return this.dataSource.updateBooking(id, this.toEntity(booking));
  }

  delete(id: number): Observable<void> {
    return this.dataSource.deleteBooking(id);
  }
}
