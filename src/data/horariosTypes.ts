export type DiaSemana = 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado';
export type Turno = 'Mañana' | 'Tarde' | 'Noche';

export interface BloqueHorario {
  dia: DiaSemana;
  horaInicio: string; // "07:00", "08:30"
  horaFin: string;    // "08:30", "10:00"
}

export interface Seccion {
  id: string;
  materiaId: string;
  materiaNombre: string;
  codigoMateria: string;
  anio: number;
  seccion: string; // e.g. "A", "B", "B-01", "G", "S"
  turno: Turno;
  profesor: string;
  aula: string;
  horarios: BloqueHorario[];
  cuposTotales: number;
  cuposDisponibles: number;
  color: string;
  avisoEmergente?: string;
}

export interface Materia {
  id: string;
  codigo: string;
  nombre: string;
  anio: number; // 1 a 5
  creditos: number;
  horasSemanales: number;
  departamento: string;
  obligatoria: boolean;
  color: string;
  prelaciones?: string[]; // Códigos oficiales de materias que deben estar aprobadas
  secciones: Seccion[];
}

export interface ConflictoHorario {
  materia1: string;
  seccion1: string;
  profesor1?: string;
  materia2: string;
  seccion2: string;
  profesor2?: string;
  dia: DiaSemana;
  horaInicio: string;
  horaFin: string;
  descripcion: string;
}
