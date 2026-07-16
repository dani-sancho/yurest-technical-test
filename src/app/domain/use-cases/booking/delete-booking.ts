import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingRepository } from '../../repositories/booking.repository';

export class DeleteBooking {
  private readonly repository = inject(BookingRepository);

  execute(id: number): Observable<void> {
    return this.repository.delete(id);
  }
}
