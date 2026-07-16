import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Table } from '../../models/table.model';
import { TableRepository } from '../../repositories/table.repository';

export class CreateTable {
  private readonly repository = inject(TableRepository);

  execute(table: Table): Observable<number> {
    return this.repository.create(table);
  }
}
