import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking, BookingStatus } from '../../models/booking.model';
import { BookingRepository } from '../../repositories/booking.repository';

export class GetBookingsByStatus {
  private readonly repository = inject(BookingRepository);

  execute(status: BookingStatus): Observable<Booking[]> {
    return this.repository.getAll({ estado: status });
  }
}
