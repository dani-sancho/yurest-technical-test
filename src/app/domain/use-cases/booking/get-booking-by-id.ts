import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from '../../models/booking.model';
import { BookingRepository } from '../../repositories/booking.repository';

export class GetBookingById {
  private readonly repository = inject(BookingRepository);

  execute(id: number): Observable<Booking | undefined> {
    return this.repository.getById(id);
  }
}
