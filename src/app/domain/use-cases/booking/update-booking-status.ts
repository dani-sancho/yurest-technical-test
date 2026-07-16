import { inject } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Booking, BookingStatus } from '../../models/booking.model';
import { BookingRepository } from '../../repositories/booking.repository';

export class UpdateBookingStatus {
  private readonly repository = inject(BookingRepository);

  execute(id: number, status: BookingStatus): Observable<number> {
    return this.repository.getById(id).pipe(
      switchMap(booking => {
        if (!booking) throw new Error(`Booking with id ${id} not found`);
        const updated: Booking = { ...booking, estado: status };
        return this.repository.update(id, updated);
      })
    );
  }
}
