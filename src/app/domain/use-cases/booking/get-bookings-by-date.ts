import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from '../../models/booking.model';
import { BookingRepository } from '../../repositories/booking.repository';

export class GetBookingsByDate {
  private readonly repository = inject(BookingRepository);

  execute(fecha: string): Observable<Booking[]> {
    return this.repository.getAll({ fecha });
  }
}
