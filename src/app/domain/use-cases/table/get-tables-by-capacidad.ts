import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Table } from '../../models/table.model';
import { TableRepository } from '../../repositories/table.repository';

export class GetTablesByCapacidad {
  private readonly repository = inject(TableRepository);

  execute(capacidad: number): Observable<Table[]> {
    return this.repository.getAll({ capacidad });
  }
}
