import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Table } from '../../models/table.model';
import { TableRepository } from '../../repositories/table.repository';

export class GetTableById {
  private readonly repository = inject(TableRepository);

  execute(id: number): Observable<Table | undefined> {
    return this.repository.getById(id);
  }
}
