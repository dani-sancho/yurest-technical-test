import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from '../../models/booking.model';
import { BookingRepository } from '../../repositories/booking.repository';

export class CreateBooking {
  private readonly repository = inject(BookingRepository);

  execute(booking: Booking): Observable<number> {
    return this.repository.create(booking);
  }
}
