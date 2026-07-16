import { Component, computed, input, ChangeDetectionStrategy } from '@angular/core';

const STYLES: Record<string, { bg: string; dot: string; text: string }> = {
  pendiente:  { bg: 'bg-amber-50 ring-amber-200', dot: 'bg-amber-500', text: 'text-amber-700' },
  confirmada: { bg: 'bg-emerald-50 ring-emerald-200', dot: 'bg-emerald-500', text: 'text-emerald-700' },
  cancelada:  { bg: 'bg-rose-50 ring-rose-200', dot: 'bg-rose-500', text: 'text-rose-700' },
};

@Component({
  selector: 'app-status-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './status-badge.component.html',
})
export class StatusBadgeComponent {
  status = input.required<string>();

  protected readonly statusStyle = computed(() => STYLES[this.status().toLowerCase()] ?? STYLES['pendiente']);
  protected readonly label = computed(() => {
    const m: Record<string, string> = { pendiente: 'Pendiente', confirmada: 'Confirmada', cancelada: 'Cancelada' };
    return m[this.status().toLowerCase()] ?? this.status();
  });
}
