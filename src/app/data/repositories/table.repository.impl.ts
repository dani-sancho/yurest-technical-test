import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { TableDataSource } from '../datasources/table.datasource';
import { TableRepository } from '../../domain/repositories/table.repository';
import { Table, TableFilters } from '../../domain/models/table.model';
import { TableEntity } from '../entities/table.entity';

@Injectable({
  providedIn: 'root'
})
export class TableRepositoryImpl extends TableRepository {

  private readonly dataSource = inject(TableDataSource);

  private toDomain(entity: TableEntity): Table {
    return {
      id: entity.id,
      nombre: entity.nombre,
      capacidad: entity.capacidad,
      ubicacion: entity.ubicacion,
      activa: entity.activa,
    };
  }

  private toEntity(model: Table): TableEntity {
    return {
      id: model.id,
      nombre: model.nombre,
      capacidad: model.capacidad,
      ubicacion: model.ubicacion,
      activa: model.activa,
    };
  }

  private buildFiltersParams(filters?: TableFilters): Record<string, string | number | boolean> | undefined {
    if (!filters) return undefined;

    const params: Record<string, string | number | boolean> = {};

    if (filters.ubicacion) params['ubicacion'] = filters.ubicacion;
    if (filters.capacidad !== undefined) params['capacidad'] = filters.capacidad;
    if (filters.activa !== undefined) params['activa'] = filters.activa;
    if (filters.nombre) params['nombre'] = filters.nombre;

    return Object.keys(params).length > 0 ? params : undefined;
  }

  getAll(filters?: TableFilters): Observable<Table[]> {
    return this.dataSource.getAll(this.buildFiltersParams(filters)).pipe(
      map(entities => entities.map(this.toDomain))
    );
  }

  getById(id: number): Observable<Table | undefined> {
    return this.dataSource.getItem(id).pipe(
      map(entity => entity ? this.toDomain(entity) : undefined)
    );
  }

  create(table: Table): Observable<number> {
    return this.dataSource.addTable(this.toEntity(table));
  }

  update(id: number, table: Table): Observable<number> {
    return this.dataSource.updateTable(id, this.toEntity(table));
  }

  delete(id: number): Observable<void> {
    return this.dataSource.deleteTable(id);
  }
}
