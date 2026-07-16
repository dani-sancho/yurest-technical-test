import { Observable } from 'rxjs';
import { Booking, BookingFilters } from '../models/booking.model';

export abstract class BookingRepository {
  abstract getAll(filters?: BookingFilters): Observable<Booking[]>;
  abstract getById(id: number): Observable<Booking | undefined>;
  abstract create(booking: Booking): Observable<number>;
  abstract update(id: number, booking: Booking): Observable<number>;
  abstract delete(id: number): Observable<void>;
}
