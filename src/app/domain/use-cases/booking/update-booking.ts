import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from '../../models/booking.model';
import { BookingRepository } from '../../repositories/booking.repository';

export class UpdateBooking {
  private readonly repository = inject(BookingRepository);

  execute(id: number, booking: Booking): Observable<number> {
    return this.repository.update(id, booking);
  }
}
