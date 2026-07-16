import {
  Component,
  computed,
  inject,
  OnInit,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookingEntity } from '../../../data/entities/booking.entity';
import { BookingQueryParams } from '../../../data/entities/booking-query.params';
import { TableEntity } from '../../../data/entities/table.entity';
import { BookingDataSource } from '../../../data/datasources/booking.datasource';
import { TableDataSource } from '../../../data/datasources/table.datasource';
import { SortKey } from './components/reservation-table/reservation-table.component';

import { SkeletonComponent } from '../../components/skeleton/skeleton.component';
import { EmptyStateComponent } from '../../components/empty-state/empty-state.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { StatusBadgeComponent } from '../../components/status-badge/status-badge.component';
import { ReservationFiltersComponent } from './components/reservation-filters/reservation-filters.component';
import { ReservationTableComponent } from './components/reservation-table/reservation-table.component';
import { ReservationCardComponent } from './components/reservation-card/reservation-card.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    RouterLink,
    SkeletonComponent,
    EmptyStateComponent,
    ModalComponent,
    PaginationComponent,
    StatusBadgeComponent,
    ReservationFiltersComponent,
    ReservationTableComponent,
    ReservationCardComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  private readonly bookingDs = inject(BookingDataSource);
  private readonly tableDs = inject(TableDataSource);

  protected readonly isLoading = signal(true);
  protected readonly isInitialLoad = signal(true);
  protected readonly tables = signal<TableEntity[]>([]);
  protected readonly reservations = signal<BookingEntity[]>([]);
  protected readonly toast = signal('');
  protected readonly loadingIds = signal<Set<number>>(new Set());
  protected readonly selectedBooking = signal<BookingEntity | null>(null);

  protected readonly page = signal(1);
  protected readonly limit = signal(10);
  protected readonly total = signal(0);
  protected readonly sortKey = signal<SortKey>('id');
  protected readonly sortDir = signal<'asc' | 'desc'>('asc');
  protected readonly filterStatus = signal('');
  protected readonly filterTableId = signal<number | null>(null);
  protected readonly filterDate = signal('');

  protected readonly stats = signal({ total: 0, pendiente: 0, confirmada: 0, cancelada: 0 });

  ngOnInit() {
    this.fetchBookings();
    this.fetchStats();
  }

  protected onFilters(e: { status: string; tableId: number | null; date: string }) {
    console.log(e);
    this.filterStatus.set(e.status);
    this.filterTableId.set(e.tableId);
    this.filterDate.set(e.date);
    this.page.set(1);
    this.fetchBookings();
  }

  protected onClearFilters() {
    this.filterStatus.set('');
    this.filterTableId.set(null);
    this.filterDate.set('');
    this.page.set(1);
    this.fetchBookings();
  }

  protected onSortChange(e: { key: SortKey; dir: 'asc' | 'desc' }) {
    this.sortKey.set(e.key);
    this.sortDir.set(e.dir);
    this.page.set(1);
    this.fetchBookings();
  }

  protected onPageChange(p: number) {
    this.page.set(p);
    this.fetchBookings();
  }

  protected onRowClick(booking: BookingEntity) {
    this.selectedBooking.set(booking);
  }

  protected closeModal() {
    this.selectedBooking.set(null);
  }

  protected getTableName(mesaId: number): string {
    return this.tables().find((t) => t.id === mesaId)?.nombre ?? `Mesa ${mesaId}`;
  }

  protected onConfirm(id: number) {
    this.loadingIds.update((ids) => new Set(ids).add(id));
    this.bookingDs.patch(id, { estado: 'confirmada' }).subscribe({
      next: () => {
        this.reservations.update(list => list.map(r => r.id === id ? { ...r, estado: 'confirmada' } : r));
        this.fetchStats();
        this.showToast(`Reserva #${id} confirmada`);
      },
      complete: () =>
        this.loadingIds.update((ids) => {
          const next = new Set(ids);
          next.delete(id);
          return next;
        }),
    });
  }

  protected onCancel(id: number) {
    this.loadingIds.update((ids) => new Set(ids).add(id));
    this.bookingDs.patch(id, { estado: 'cancelada' }).subscribe({
      next: () => {
        this.reservations.update(list => list.map(r => r.id === id ? { ...r, estado: 'cancelada' } : r));
        this.fetchStats();
        this.showToast(`Reserva #${id} cancelada`);
      },
      complete: () =>
        this.loadingIds.update((ids) => {
          const next = new Set(ids);
          next.delete(id);
          return next;
        }),
    });
  }

  private fetchBookings() {
    this.isLoading.set(true);
    const params: BookingQueryParams = {
      page: this.page(),
      limit: this.limit(),
      sort: this.sortKey(),
      order: this.sortDir(),
    };

    const s = this.filterStatus();
    const t = this.filterTableId();
    const d = this.filterDate();
    if (s) params.estado = s;
    if (t !== null) params.mesaId = t;
    if (d) params.fecha = d;

    this.bookingDs.query(params).subscribe({
      next: (res) => {
        this.reservations.set(res.data);
        this.total.set(res.total);
        this.isLoading.set(false);
        this.isInitialLoad.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }

  private fetchStats() {
    this.bookingDs.getAll().subscribe({
      next: (list) => {
        this.stats.set({
          total: list.length,
          pendiente: list.filter((r) => r.estado === 'pendiente').length,
          confirmada: list.filter((r) => r.estado === 'confirmada').length,
          cancelada: list.filter((r) => r.estado === 'cancelada').length,
        });
      },
    });
  }

  private showToast(msg: string) {
    this.toast.set(msg);
    setTimeout(() => this.toast.set(''), 3500);
  }
}
