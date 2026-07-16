import { Injectable, inject } from '@angular/core';
import { ApiClient } from '../database/api-client';
import { ApiEndpoints } from '../database/endpoints/api-endpoints';
import { TableEntity } from '../entities/table.entity';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TableDataSource {
  private readonly api = inject(ApiClient);

  getAll(params?: Record<string, string | number | boolean>): Observable<TableEntity[]> {
    return this.api.get<TableEntity[]>(ApiEndpoints.tables, params);
  }

  getItem(id: number): Observable<TableEntity> {
    return this.api.get<TableEntity>(`${ApiEndpoints.tables}/${id}`);
  }

  addTable(item: Omit<TableEntity, 'id'>): Observable<number> {
    return this.api.post<number>(ApiEndpoints.tables, item);
  }

  updateTable(id: number, item: TableEntity): Observable<number> {
    return this.api.put<number>(`${ApiEndpoints.tables}/${id}`, item);
  }

  deleteTable(id: number): Observable<void> {
    return this.api.delete<void>(`${ApiEndpoints.tables}/${id}`);
  }
}
