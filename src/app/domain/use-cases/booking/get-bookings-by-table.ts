import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from '../../models/booking.model';
import { BookingRepository } from '../../repositories/booking.repository';

export class GetBookingsByTable {
  private readonly repository = inject(BookingRepository);

  execute(mesaId: number): Observable<Booking[]> {
    return this.repository.getAll({ mesaId });
  }
}
