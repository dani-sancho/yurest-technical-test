import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './empty-state.component.html',
})
export class EmptyStateComponent {
  title = input('No hay reservas');
  description = input('Intenta ajustar los filtros para ver más resultados.');
  clearFilters = output<void>();
}
