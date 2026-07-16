import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Table } from '../../models/table.model';
import { TableRepository } from '../../repositories/table.repository';

export class UpdateTable {
  private readonly repository = inject(TableRepository);

  execute(id: number, table: Table): Observable<number> {
    return this.repository.update(id, table);
  }
}
