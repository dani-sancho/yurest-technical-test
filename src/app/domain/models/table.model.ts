export interface Table {
  id: number;
  nombre: string;
  capacidad: number;
  ubicacion: string;
  activa: boolean;
}

export interface TableFilters {
  ubicacion?: string;
  capacidad?: number;
  activa?: boolean;
  nombre?: string;
}
