import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Table } from '../../models/table.model';
import { TableRepository } from '../../repositories/table.repository';

export class GetTablesByActivas {
  private readonly repository = inject(TableRepository);

  execute(activa: boolean): Observable<Table[]> {
    return this.repository.getAll({ activa });
  }
}
