export interface BookingEntity { 
     id: number;
     mesaId: number;
     cliente: string;
     fecha: string;
     hora: string;
     comensales: number;
     estado: string;
     notas?: string;
}