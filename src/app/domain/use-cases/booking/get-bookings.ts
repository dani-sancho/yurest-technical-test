import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking, BookingFilters } from '../../models/booking.model';
import { BookingRepository } from '../../repositories/booking.repository';

export class GetBookings {
  private readonly repository = inject(BookingRepository);

  execute(filters?: BookingFilters): Observable<Booking[]> {
    return this.repository.getAll(filters);
  }
}
