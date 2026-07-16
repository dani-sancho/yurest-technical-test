import { Component, computed, input, output, ChangeDetectionStrategy } from '@angular/core';
import { BookingEntity } from '../../../../../data/entities/booking.entity';
import { TableEntity } from '../../../../../data/entities/table.entity';
import { StatusBadgeComponent } from '../../../../components/status-badge/status-badge.component';
import { ButtonComponent } from '../../../../components/button/button.component';

export type SortKey = 'id' | 'cliente' | 'mesaId' | 'fecha';

@Component({
  selector: 'app-reservation-table',
  imports: [StatusBadgeComponent, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './reservation-table.component.html',
})
export class ReservationTableComponent {
  reservations = input.required<BookingEntity[]>();
  tables = input.required<TableEntity[]>();
  loadingIds = input<Set<number>>(new Set());
  sortKey = input<SortKey>('id');
  sortDir = input<'asc' | 'desc'>('asc');
  confirm = output<number>();
  cancel = output<number>();
  rowClick = output<BookingEntity>();
  sortChange = output<{ key: SortKey; dir: 'asc' | 'desc' }>();

  protected readonly cols: { label: string; key?: SortKey }[] = [
    { label: 'ID', key: 'id' },
    { label: 'Cliente', key: 'cliente' },
    { label: 'Mesa', key: 'mesaId' },
    { label: 'Fecha', key: 'fecha' },
    { label: 'Hora' },
    { label: 'Comensales' },
    { label: 'Estado' },
    { label: 'Acciones' },
  ];

  protected tableName = (mesaId: number) =>
    computed(() => this.tables().find((t) => t.id === mesaId)?.nombre ?? `Mesa ${mesaId}`);
  protected fmtDate = (f: string) => {
    const [y, m, d] = f.split('-');
    return `${d}/${m}/${y.substring(2)}`;
  };
  protected canConfirm = (e: string) => e?.toLowerCase() === 'pendiente';
  protected canCancel = (e: string) => ['pendiente', 'confirmada'].includes(e?.toLowerCase());

  onSort(key: SortKey) {
    const dir = this.sortKey() === key && this.sortDir() === 'asc' ? 'desc' : 'asc';
    this.sortChange.emit({ key, dir });
  }

  onRowClick(res: BookingEntity, e: Event) {
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('app-button')) return;
    this.rowClick.emit(res);
  }
}
