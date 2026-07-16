import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableEntity } from '../../../../../data/entities/table.entity';

@Component({
  selector: 'app-reservation-filters',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reservation-filters.component.html',
})
export class ReservationFiltersComponent {
  tables = input<TableEntity[]>([]);
  selectedStatus = input<string>('');
  selectedTableId = input<number | null>(null);
  selectedDate = input<string>('');
  filtersChanged = output<{ status: string; tableId: number | null; date: string }>();
  clearFilters = output<void>();

  protected get hasActive(): boolean {
    return !!this.selectedStatus() || this.selectedTableId() !== null || !!this.selectedDate();
  }

  onStatus(v: string) { this.filtersChanged.emit({ status: v, tableId: this.selectedTableId(), date: this.selectedDate() }); }
  onTable(v: string) { this.filtersChanged.emit({ status: this.selectedStatus(), tableId: v ? +v : null, date: this.selectedDate() }); }
  onDate(v: string) { this.filtersChanged.emit({ status: this.selectedStatus(), tableId: this.selectedTableId(), date: v }); }
  onClear() { this.clearFilters.emit(); }
}
