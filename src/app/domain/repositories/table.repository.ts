import { Observable } from 'rxjs';
import { Table, TableFilters } from '../models/table.model';

export abstract class TableRepository {
  abstract getAll(filters?: TableFilters): Observable<Table[]>;
  abstract getById(id: number): Observable<Table | undefined>;
  abstract create(table: Table): Observable<number>;
  abstract update(id: number, table: Table): Observable<number>;
  abstract delete(id: number): Observable<void>;
}
