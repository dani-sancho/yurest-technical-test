export type BookingStatus = 'pendiente' | 'confirmada' | 'cancelada' | 'completada';

export interface Booking {
  id: number;
  mesaId: number;
  cliente: string;
  fecha: string;
  hora: string;
  comensales: number;
  estado: BookingStatus;
  notas?: string;
}

export interface BookingFilters {
  fecha?: string;
  estado?: BookingStatus;
  cliente?: string;
  mesaId?: number;
}
