import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Table } from '../../models/table.model';
import { TableRepository } from '../../repositories/table.repository';

export class GetTablesByUbicacion {
  private readonly repository = inject(TableRepository);

  execute(ubicacion: string): Observable<Table[]> {
    return this.repository.getAll({ ubicacion });
  }
}
