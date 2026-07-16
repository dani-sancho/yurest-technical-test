import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Table, TableFilters } from '../../models/table.model';
import { TableRepository } from '../../repositories/table.repository';

export class GetTables {
  private readonly repository = inject(TableRepository);

  execute(filters?: TableFilters): Observable<Table[]> {
    return this.repository.getAll(filters);
  }
}
