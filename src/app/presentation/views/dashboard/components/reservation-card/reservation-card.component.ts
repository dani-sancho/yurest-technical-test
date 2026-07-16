import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { BookingEntity } from '../../../../../data/entities/booking.entity';
import { StatusBadgeComponent } from '../../../../components/status-badge/status-badge.component';
import { ButtonComponent } from '../../../../components/button/button.component';

@Component({
  selector: 'app-reservation-card',
  imports: [StatusBadgeComponent, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './reservation-card.component.html',
})
export class ReservationCardComponent {
  reservation = input.required<BookingEntity>();
  tableName = input('Mesa');
  loading = input(false);
  confirm = output<number>();
  cancel = output<number>();

  protected fmtDate = (f: string) => { const [,m,d] = f.split('-'); return `${d}/${m}`; };
  protected canConfirm = (e: string) => e?.toLowerCase() === 'pendiente';
  protected canCancel = (e: string) => ['pendiente', 'confirmada'].includes(e?.toLowerCase());
}
