import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TableRepository } from '../../repositories/table.repository';

export class DeleteTable {
  private readonly repository = inject(TableRepository);

  execute(id: number): Observable<void> {
    return this.repository.delete(id);
  }
}
