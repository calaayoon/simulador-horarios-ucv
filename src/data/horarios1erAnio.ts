import { Materia } from './horariosTypes';

// 1er Año - Programación Oficial UCV 2025 - 2026
export const MATERIAS_1ER_ANIO: Materia[] = [
  // 1. INTRODUCCIÓN AL DERECHO (CÓDIGO 1501)
  {
    id: 'm-1501',
    codigo: '1501',
    nombre: 'Introducción al Derecho',
    anio: 1,
    creditos: 6,
    horasSemanales: 3,
    departamento: 'Filosofía y Teoría del Derecho',
    obligatoria: true,
    color: '#7b0000',
    prelaciones: [],
    secciones: [
      // MAÑANA
      {
        id: '1501-A', materiaId: 'm-1501', materiaNombre: 'Introducción al Derecho', codigoMateria: '1501',
        anio: 1, seccion: 'A', turno: 'Mañana', profesor: 'Ámbar Contreras', aula: '',
        cuposTotales: 65, cuposDisponibles: 15, color: '#7b0000',
        horarios: [
          { dia: 'Lunes', horaInicio: '07:00', horaFin: '08:30' },
          { dia: 'Jueves', horaInicio: '07:00', horaFin: '08:30' }
        ]
      },
      {
        id: '1501-B', materiaId: 'm-1501', materiaNombre: 'Introducción al Derecho', codigoMateria: '1501',
        anio: 1, seccion: 'B', turno: 'Mañana', profesor: 'Julio Gamba', aula: '',
        cuposTotales: 65, cuposDisponibles: 12, color: '#7b0000',
        horarios: [
          { dia: 'Lunes', horaInicio: '07:00', horaFin: '08:30' },
          { dia: 'Martes', horaInicio: '07:00', horaFin: '08:30' }
        ]
      },
      {
        id: '1501-C', materiaId: 'm-1501', materiaNombre: 'Introducción al Derecho', codigoMateria: '1501',
        anio: 1, seccion: 'C', turno: 'Mañana', profesor: 'Ana G. Marín', aula: '',
        cuposTotales: 60, cuposDisponibles: 18, color: '#7b0000',
        horarios: [
          { dia: 'Jueves', horaInicio: '07:00', horaFin: '08:30' },
          { dia: 'Viernes', horaInicio: '07:00', horaFin: '08:30' }
        ]
      },
      {
        id: '1501-D', materiaId: 'm-1501', materiaNombre: 'Introducción al Derecho', codigoMateria: '1501',
        anio: 1, seccion: 'D', turno: 'Mañana', profesor: 'Ruth Vera', aula: '',
        cuposTotales: 60, cuposDisponibles: 9, color: '#7b0000',
        horarios: [
          { dia: 'Miércoles', horaInicio: '11:30', horaFin: '13:00' },
          { dia: 'Viernes', horaInicio: '11:30', horaFin: '13:00' }
        ]
      },
      {
        id: '1501-E', materiaId: 'm-1501', materiaNombre: 'Introducción al Derecho', codigoMateria: '1501',
        anio: 1, seccion: 'E', turno: 'Mañana', profesor: 'Jesús Escudero', aula: '',
        cuposTotales: 60, cuposDisponibles: 14, color: '#7b0000',
        horarios: [
          { dia: 'Lunes', horaInicio: '07:00', horaFin: '08:30' },
          { dia: 'Jueves', horaInicio: '07:00', horaFin: '08:30' }
        ]
      },
      {
        id: '1501-F', materiaId: 'm-1501', materiaNombre: 'Introducción al Derecho', codigoMateria: '1501',
        anio: 1, seccion: 'F', turno: 'Mañana', profesor: 'José G. Medina C.', aula: '',
        cuposTotales: 60, cuposDisponibles: 11, color: '#7b0000',
        horarios: [
          { dia: 'Martes', horaInicio: '10:00', horaFin: '11:30' },
          { dia: 'Viernes', horaInicio: '10:00', horaFin: '11:30' }
        ]
      },
      // TARDE
      {
        id: '1501-G', materiaId: 'm-1501', materiaNombre: 'Introducción al Derecho', codigoMateria: '1501',
        anio: 1, seccion: 'G', turno: 'Tarde', profesor: 'Ruth Vera', aula: 'Nueva Sede FCJP',
        cuposTotales: 55, cuposDisponibles: 20, color: '#7b0000',
        horarios: [
          { dia: 'Lunes', horaInicio: '16:00', horaFin: '17:30' },
          { dia: 'Miércoles', horaInicio: '16:00', horaFin: '17:30' }
        ]
      },
      {
        id: '1501-H', materiaId: 'm-1501', materiaNombre: 'Introducción al Derecho', codigoMateria: '1501',
        anio: 1, seccion: 'H', turno: 'Tarde', profesor: 'Félix Sánchez', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 15, color: '#7b0000',
        horarios: [
          { dia: 'Jueves', horaInicio: '16:00', horaFin: '17:30' },
          { dia: 'Viernes', horaInicio: '13:00', horaFin: '14:30' }
        ]
      },
      {
        id: '1501-I', materiaId: 'm-1501', materiaNombre: 'Introducción al Derecho', codigoMateria: '1501',
        anio: 1, seccion: 'I', turno: 'Tarde', profesor: 'Alejandro Rodríguez', aula: 'Nueva Sede FCJP',
        cuposTotales: 55, cuposDisponibles: 16, color: '#7b0000',
        horarios: [
          { dia: 'Lunes', horaInicio: '13:00', horaFin: '14:30' },
          { dia: 'Martes', horaInicio: '13:00', horaFin: '14:30' }
        ]
      },
      {
        id: '1501-J', materiaId: 'm-1501', materiaNombre: 'Introducción al Derecho', codigoMateria: '1501',
        anio: 1, seccion: 'J', turno: 'Tarde', profesor: 'Anthony Pérez', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 22, color: '#7b0000',
        horarios: [
          { dia: 'Lunes', horaInicio: '14:30', horaFin: '16:00' },
          { dia: 'Viernes', horaInicio: '16:00', horaFin: '17:30' }
        ]
      },
      // NOCHE
      {
        id: '1501-W', materiaId: 'm-1501', materiaNombre: 'Introducción al Derecho', codigoMateria: '1501',
        anio: 1, seccion: 'W', turno: 'Noche', profesor: 'Federico Rivas', aula: '',
        cuposTotales: 65, cuposDisponibles: 25, color: '#7b0000',
        horarios: [
          { dia: 'Martes', horaInicio: '17:30', horaFin: '19:00' },
          { dia: 'Miércoles', horaInicio: '16:00', horaFin: '17:30' }
        ]
      }
    ]
  },

  // 2. DERECHO ROMANO I (CÓDIGO 1502)
  {
    id: 'm-1502',
    codigo: '1502',
    nombre: 'Derecho Romano I',
    anio: 1,
    creditos: 6,
    horasSemanales: 3,
    departamento: 'Derecho Privado',
    obligatoria: true,
    color: '#B45309',
    prelaciones: [],
    secciones: [
      // MAÑANA
      {
        id: '1502-A', materiaId: 'm-1502', materiaNombre: 'Derecho Romano I', codigoMateria: '1502',
        anio: 1, seccion: 'A', turno: 'Mañana', profesor: 'Antonio Marcoccio', aula: '',
        cuposTotales: 65, cuposDisponibles: 10, color: '#B45309',
        horarios: [
          { dia: 'Miércoles', horaInicio: '07:00', horaFin: '08:30' },
          { dia: 'Viernes', horaInicio: '07:00', horaFin: '08:30' }
        ]
      },
      {
        id: '1502-B', materiaId: 'm-1502', materiaNombre: 'Derecho Romano I', codigoMateria: '1502',
        anio: 1, seccion: 'B', turno: 'Mañana', profesor: 'José Torres', aula: '',
        cuposTotales: 65, cuposDisponibles: 14, color: '#B45309',
        horarios: [
          { dia: 'Miércoles', horaInicio: '07:00', horaFin: '08:30' },
          { dia: 'Viernes', horaInicio: '07:00', horaFin: '08:30' }
        ]
      },
      {
        id: '1502-C', materiaId: 'm-1502', materiaNombre: 'Derecho Romano I', codigoMateria: '1502',
        anio: 1, seccion: 'C', turno: 'Mañana', profesor: 'Yoanny Nogales', aula: '',
        cuposTotales: 60, cuposDisponibles: 8, color: '#B45309',
        horarios: [
          { dia: 'Martes', horaInicio: '10:00', horaFin: '11:30' },
          { dia: 'Miércoles', horaInicio: '08:30', horaFin: '10:00' }
        ]
      },
      {
        id: '1502-D', materiaId: 'm-1502', materiaNombre: 'Derecho Romano I', codigoMateria: '1502',
        anio: 1, seccion: 'D', turno: 'Mañana', profesor: 'Mirtha Guedez', aula: '',
        cuposTotales: 60, cuposDisponibles: 12, color: '#B45309',
        horarios: [
          { dia: 'Martes', horaInicio: '11:30', horaFin: '13:00' },
          { dia: 'Miércoles', horaInicio: '07:00', horaFin: '08:30' }
        ]
      },
      {
        id: '1502-E', materiaId: 'm-1502', materiaNombre: 'Derecho Romano I', codigoMateria: '1502',
        anio: 1, seccion: 'E', turno: 'Mañana', profesor: 'Alexis Algarra', aula: '',
        cuposTotales: 60, cuposDisponibles: 7, color: '#B45309',
        horarios: [
          { dia: 'Martes', horaInicio: '07:00', horaFin: '08:30' },
          { dia: 'Miércoles', horaInicio: '07:00', horaFin: '08:30' }
        ]
      },
      {
        id: '1502-F', materiaId: 'm-1502', materiaNombre: 'Derecho Romano I', codigoMateria: '1502',
        anio: 1, seccion: 'F', turno: 'Mañana', profesor: 'María Verdeal', aula: '',
        cuposTotales: 60, cuposDisponibles: 15, color: '#B45309',
        horarios: [
          { dia: 'Lunes', horaInicio: '08:30', horaFin: '10:00' },
          { dia: 'Miércoles', horaInicio: '08:30', horaFin: '10:00' }
        ]
      },
      // TARDE
      {
        id: '1502-G', materiaId: 'm-1502', materiaNombre: 'Derecho Romano I', codigoMateria: '1502',
        anio: 1, seccion: 'G', turno: 'Tarde', profesor: 'Adalberto Urbina', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 19, color: '#B45309',
        horarios: [
          { dia: 'Martes', horaInicio: '13:00', horaFin: '14:30' },
          { dia: 'Jueves', horaInicio: '13:00', horaFin: '14:30' }
        ]
      },
      {
        id: '1502-H', materiaId: 'm-1502', materiaNombre: 'Derecho Romano I', codigoMateria: '1502',
        anio: 1, seccion: 'H', turno: 'Tarde', profesor: 'Hernán Matute', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 16, color: '#B45309',
        horarios: [
          { dia: 'Miércoles', horaInicio: '13:00', horaFin: '14:30' },
          { dia: 'Viernes', horaInicio: '16:00', horaFin: '17:30' }
        ]
      },
      {
        id: '1502-I', materiaId: 'm-1502', materiaNombre: 'Derecho Romano I', codigoMateria: '1502',
        anio: 1, seccion: 'I', turno: 'Tarde', profesor: 'Hernán Matute', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 13, color: '#B45309',
        horarios: [
          { dia: 'Miércoles', horaInicio: '14:30', horaFin: '16:00' },
          { dia: 'Viernes', horaInicio: '14:30', horaFin: '16:00' }
        ]
      },
      {
        id: '1502-J', materiaId: 'm-1502', materiaNombre: 'Derecho Romano I', codigoMateria: '1502',
        anio: 1, seccion: 'J', turno: 'Tarde', profesor: 'Vismark Rodríguez', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 18, color: '#B45309',
        horarios: [
          { dia: 'Martes', horaInicio: '13:00', horaFin: '14:30' },
          { dia: 'Jueves', horaInicio: '13:00', horaFin: '14:30' }
        ]
      },
      // NOCHE
      {
        id: '1502-S', materiaId: 'm-1502', materiaNombre: 'Derecho Romano I', codigoMateria: '1502',
        anio: 1, seccion: 'S', turno: 'Noche', profesor: 'Dilcio Cordero', aula: '',
        cuposTotales: 65, cuposDisponibles: 22, color: '#B45309',
        horarios: [
          { dia: 'Miércoles', horaInicio: '17:30', horaFin: '19:00' },
          { dia: 'Jueves', horaInicio: '17:30', horaFin: '19:00' }
        ]
      },
      {
        id: '1502-V', materiaId: 'm-1502', materiaNombre: 'Derecho Romano I', codigoMateria: '1502',
        anio: 1, seccion: 'V', turno: 'Noche', profesor: 'Juan C. Pinto', aula: '',
        cuposTotales: 65, cuposDisponibles: 25, color: '#B45309',
        horarios: [
          { dia: 'Jueves', horaInicio: '17:30', horaFin: '19:00' },
          { dia: 'Viernes', horaInicio: '17:30', horaFin: '19:00' }
        ]
      },
      {
        id: '1502-W', materiaId: 'm-1502', materiaNombre: 'Derecho Romano I', codigoMateria: '1502',
        anio: 1, seccion: 'W', turno: 'Noche', profesor: 'José Fescina', aula: '',
        cuposTotales: 65, cuposDisponibles: 20, color: '#B45309',
        horarios: [
          { dia: 'Jueves', horaInicio: '17:30', horaFin: '19:00' },
          { dia: 'Viernes', horaInicio: '16:00', horaFin: '17:30' }
        ]
      }
    ]
  },

  // 3. DERECHO CIVIL I (CÓDIGO 1101)
  {
    id: 'm-1101',
    codigo: '1101',
    nombre: 'Derecho Civil I (Personas)',
    anio: 1,
    creditos: 6,
    horasSemanales: 3,
    departamento: 'Derecho Privado',
    obligatoria: true,
    color: '#1E3A8A',
    prelaciones: [],
    secciones: [
      // MAÑANA
      {
        id: '1101-A', materiaId: 'm-1101', materiaNombre: 'Derecho Civil I (Personas)', codigoMateria: '1101',
        anio: 1, seccion: 'A', turno: 'Mañana', profesor: 'Edilia de Freitas', aula: '',
        cuposTotales: 65, cuposDisponibles: 11, color: '#1E3A8A',
        horarios: [
          { dia: 'Miércoles', horaInicio: '10:00', horaFin: '11:30' },
          { dia: 'Jueves', horaInicio: '08:30', horaFin: '10:00' }
        ]
      },
      {
        id: '1101-B', materiaId: 'm-1101', materiaNombre: 'Derecho Civil I (Personas)', codigoMateria: '1101',
        anio: 1, seccion: 'B', turno: 'Mañana', profesor: 'Dilia Ribeiro', aula: '',
        cuposTotales: 65, cuposDisponibles: 9, color: '#1E3A8A',
        horarios: [
          { dia: 'Martes', horaInicio: '10:00', horaFin: '11:30' },
          { dia: 'Miércoles', horaInicio: '08:30', horaFin: '10:00' }
        ]
      },
      {
        id: '1101-C', materiaId: 'm-1101', materiaNombre: 'Derecho Civil I (Personas)', codigoMateria: '1101',
        anio: 1, seccion: 'C', turno: 'Mañana', profesor: 'Julio C. Celis', aula: '',
        cuposTotales: 60, cuposDisponibles: 16, color: '#1E3A8A',
        horarios: [
          { dia: 'Jueves', horaInicio: '08:30', horaFin: '10:00' },
          { dia: 'Viernes', horaInicio: '08:30', horaFin: '10:00' }
        ]
      },
      {
        id: '1101-D', materiaId: 'm-1101', materiaNombre: 'Derecho Civil I (Personas)', codigoMateria: '1101',
        anio: 1, seccion: 'D', turno: 'Mañana', profesor: 'Luz Oriana Martínez', aula: '',
        cuposTotales: 60, cuposDisponibles: 13, color: '#1E3A8A',
        horarios: [
          { dia: 'Miércoles', horaInicio: '08:30', horaFin: '10:00' },
          { dia: 'Jueves', horaInicio: '07:00', horaFin: '08:30' }
        ]
      },
      {
        id: '1101-E', materiaId: 'm-1101', materiaNombre: 'Derecho Civil I (Personas)', codigoMateria: '1101',
        anio: 1, seccion: 'E', turno: 'Mañana', profesor: 'Carlos Guevara', aula: '',
        cuposTotales: 60, cuposDisponibles: 10, color: '#1E3A8A',
        horarios: [
          { dia: 'Lunes', horaInicio: '10:00', horaFin: '11:30' },
          { dia: 'Martes', horaInicio: '10:00', horaFin: '11:30' }
        ]
      },
      {
        id: '1101-F', materiaId: 'm-1101', materiaNombre: 'Derecho Civil I (Personas)', codigoMateria: '1101',
        anio: 1, seccion: 'F', turno: 'Mañana', profesor: 'Tomas Guite', aula: '',
        cuposTotales: 60, cuposDisponibles: 15, color: '#1E3A8A',
        horarios: [
          { dia: 'Lunes', horaInicio: '07:00', horaFin: '08:30' },
          { dia: 'Viernes', horaInicio: '07:00', horaFin: '08:30' }
        ]
      },
      // TARDE
      {
        id: '1101-G', materiaId: 'm-1101', materiaNombre: 'Derecho Civil I (Personas)', codigoMateria: '1101',
        anio: 1, seccion: 'G', turno: 'Tarde', profesor: 'Julio C. Celis', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 18, color: '#1E3A8A',
        horarios: [
          { dia: 'Martes', horaInicio: '16:00', horaFin: '17:30' },
          { dia: 'Jueves', horaInicio: '16:00', horaFin: '17:30' }
        ]
      },
      {
        id: '1101-H', materiaId: 'm-1101', materiaNombre: 'Derecho Civil I (Personas)', codigoMateria: '1101',
        anio: 1, seccion: 'H (1 día)', turno: 'Tarde', profesor: 'María F. Arteaga', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 12, color: '#1E3A8A',
        horarios: [
          { dia: 'Jueves', horaInicio: '13:00', horaFin: '16:00' }
        ]
      },
      {
        id: '1101-I', materiaId: 'm-1101', materiaNombre: 'Derecho Civil I (Personas)', codigoMateria: '1101',
        anio: 1, seccion: 'I', turno: 'Tarde', profesor: 'Antonio Marcoccio', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 20, color: '#1E3A8A',
        horarios: [
          { dia: 'Jueves', horaInicio: '16:00', horaFin: '17:30' },
          { dia: 'Viernes', horaInicio: '16:00', horaFin: '17:30' }
        ]
      },
      {
        id: '1101-J', materiaId: 'm-1101', materiaNombre: 'Derecho Civil I (Personas)', codigoMateria: '1101',
        anio: 1, seccion: 'J', turno: 'Tarde', profesor: 'Por Designar', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 25, color: '#1E3A8A',
        horarios: [
          { dia: 'Lunes', horaInicio: '16:00', horaFin: '17:30' },
          { dia: 'Martes', horaInicio: '14:30', horaFin: '16:00' }
        ]
      },
      // NOCHE
      {
        id: '1101-S', materiaId: 'm-1101', materiaNombre: 'Derecho Civil I (Personas)', codigoMateria: '1101',
        anio: 1, seccion: 'S', turno: 'Noche', profesor: 'Henry Hamdan', aula: '',
        cuposTotales: 65, cuposDisponibles: 19, color: '#1E3A8A',
        horarios: [
          { dia: 'Lunes', horaInicio: '17:30', horaFin: '19:00' },
          { dia: 'Viernes', horaInicio: '17:30', horaFin: '19:00' }
        ]
      },
      {
        id: '1101-T', materiaId: 'm-1101', materiaNombre: 'Derecho Civil I (Personas)', codigoMateria: '1101',
        anio: 1, seccion: 'T', turno: 'Noche', profesor: 'Yanira Hernández', aula: '',
        cuposTotales: 65, cuposDisponibles: 24, color: '#1E3A8A',
        horarios: [
          { dia: 'Lunes', horaInicio: '16:00', horaFin: '17:30' },
          { dia: 'Viernes', horaInicio: '17:30', horaFin: '19:00' }
        ]
      },
      {
        id: '1101-U', materiaId: 'm-1101', materiaNombre: 'Derecho Civil I (Personas)', codigoMateria: '1101',
        anio: 1, seccion: 'U', turno: 'Noche', profesor: 'Flor K. Zambrano', aula: '',
        cuposTotales: 65, cuposDisponibles: 22, color: '#1E3A8A',
        horarios: [
          { dia: 'Martes', horaInicio: '17:30', horaFin: '19:00' },
          { dia: 'Miércoles', horaInicio: '17:30', horaFin: '19:00' }
        ]
      }
    ]
  },

  // 4. DERECHO CONSTITUCIONAL (CÓDIGO 1201)
  {
    id: 'm-1201',
    codigo: '1201',
    nombre: 'Derecho Constitucional',
    anio: 1,
    creditos: 6,
    horasSemanales: 3,
    departamento: 'Derecho Público',
    obligatoria: true,
    color: '#047857',
    prelaciones: [],
    secciones: [
      // MAÑANA
      {
        id: '1201-A', materiaId: 'm-1201', materiaNombre: 'Derecho Constitucional', codigoMateria: '1201',
        anio: 1, seccion: 'A', turno: 'Mañana', profesor: 'Arturo Peraza', aula: '',
        cuposTotales: 70, cuposDisponibles: 8, color: '#047857',
        horarios: [
          { dia: 'Lunes', horaInicio: '11:30', horaFin: '13:00' },
          { dia: 'Miércoles', horaInicio: '11:30', horaFin: '13:00' }
        ]
      },
      {
        id: '1201-B', materiaId: 'm-1201', materiaNombre: 'Derecho Constitucional', codigoMateria: '1201',
        anio: 1, seccion: 'B (1 día)', turno: 'Mañana', profesor: 'Leonel Ferrer', aula: '',
        cuposTotales: 65, cuposDisponibles: 14, color: '#047857',
        horarios: [
          { dia: 'Viernes', horaInicio: '10:00', horaFin: '13:00' }
        ]
      },
      {
        id: '1201-C', materiaId: 'm-1201', materiaNombre: 'Derecho Constitucional', codigoMateria: '1201',
        anio: 1, seccion: 'C', turno: 'Mañana', profesor: 'Tulio Álvarez', aula: '',
        cuposTotales: 65, cuposDisponibles: 10, color: '#047857',
        horarios: [
          { dia: 'Lunes', horaInicio: '11:30', horaFin: '13:00' },
          { dia: 'Miércoles', horaInicio: '11:30', horaFin: '13:00' }
        ]
      },
      {
        id: '1201-D', materiaId: 'm-1201', materiaNombre: 'Derecho Constitucional', codigoMateria: '1201',
        anio: 1, seccion: 'D (1 día)', turno: 'Mañana', profesor: 'Julio C. Fernández', aula: '',
        cuposTotales: 60, cuposDisponibles: 15, color: '#047857',
        horarios: [
          { dia: 'Lunes', horaInicio: '10:00', horaFin: '13:00' }
        ]
      },
      {
        id: '1201-E', materiaId: 'm-1201', materiaNombre: 'Derecho Constitucional', codigoMateria: '1201',
        anio: 1, seccion: 'E', turno: 'Mañana', profesor: 'Nelson Chitty la Roche', aula: '',
        cuposTotales: 65, cuposDisponibles: 6, color: '#047857',
        horarios: [
          { dia: 'Miércoles', horaInicio: '08:30', horaFin: '10:00' },
          { dia: 'Viernes', horaInicio: '08:30', horaFin: '10:00' }
        ]
      },
      {
        id: '1201-F', materiaId: 'm-1201', materiaNombre: 'Derecho Constitucional', codigoMateria: '1201',
        anio: 1, seccion: 'F', turno: 'Mañana', profesor: 'Eduardo Sánchez', aula: '',
        cuposTotales: 60, cuposDisponibles: 18, color: '#047857',
        horarios: [
          { dia: 'Lunes', horaInicio: '11:30', horaFin: '13:00' },
          { dia: 'Miércoles', horaInicio: '11:30', horaFin: '13:00' }
        ]
      },
      // TARDE
      {
        id: '1201-G', materiaId: 'm-1201', materiaNombre: 'Derecho Constitucional', codigoMateria: '1201',
        anio: 1, seccion: 'G', turno: 'Tarde', profesor: 'José Luis Rojas', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 17, color: '#047857',
        horarios: [
          { dia: 'Miércoles', horaInicio: '14:30', horaFin: '16:00' },
          { dia: 'Viernes', horaInicio: '16:00', horaFin: '17:30' }
        ]
      },
      {
        id: '1201-H', materiaId: 'm-1201', materiaNombre: 'Derecho Constitucional', codigoMateria: '1201',
        anio: 1, seccion: 'H', turno: 'Tarde', profesor: 'Pedro Afonso', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 12, color: '#047857',
        horarios: [
          { dia: 'Martes', horaInicio: '13:00', horaFin: '14:30' },
          { dia: 'Miércoles', horaInicio: '14:30', horaFin: '16:00' }
        ]
      },
      {
        id: '1201-I', materiaId: 'm-1201', materiaNombre: 'Derecho Constitucional', codigoMateria: '1201',
        anio: 1, seccion: 'I', turno: 'Tarde', profesor: 'José Augusto Soárez', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 19, color: '#047857',
        horarios: [
          { dia: 'Martes', horaInicio: '14:30', horaFin: '16:00' },
          { dia: 'Miércoles', horaInicio: '13:00', horaFin: '14:30' }
        ]
      },
      {
        id: '1201-J', materiaId: 'm-1201', materiaNombre: 'Derecho Constitucional', codigoMateria: '1201',
        anio: 1, seccion: 'J', turno: 'Tarde', profesor: 'Nélida Peña', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 15, color: '#047857',
        horarios: [
          { dia: 'Miércoles', horaInicio: '13:00', horaFin: '14:30' },
          { dia: 'Jueves', horaInicio: '16:00', horaFin: '17:30' }
        ]
      },
      // NOCHE
      {
        id: '1201-S', materiaId: 'm-1201', materiaNombre: 'Derecho Constitucional', codigoMateria: '1201',
        anio: 1, seccion: 'S', turno: 'Noche', profesor: 'Lenin Sosa', aula: '',
        cuposTotales: 65, cuposDisponibles: 22, color: '#047857',
        horarios: [
          { dia: 'Lunes', horaInicio: '16:00', horaFin: '17:30' },
          { dia: 'Martes', horaInicio: '16:00', horaFin: '17:30' }
        ]
      },
      {
        id: '1201-T', materiaId: 'm-1201', materiaNombre: 'Derecho Constitucional', codigoMateria: '1201',
        anio: 1, seccion: 'T (Bimodal)', turno: 'Noche', profesor: 'Gustavo Manzo Ugas', aula: '',
        cuposTotales: 65, cuposDisponibles: 20, color: '#047857',
        horarios: [
          { dia: 'Lunes', horaInicio: '17:30', horaFin: '19:00' },
          { dia: 'Martes', horaInicio: '17:30', horaFin: '19:00' }
        ]
      },
      {
        id: '1201-V', materiaId: 'm-1201', materiaNombre: 'Derecho Constitucional', codigoMateria: '1201',
        anio: 1, seccion: 'V', turno: 'Noche', profesor: 'Luis Molina', aula: '',
        cuposTotales: 65, cuposDisponibles: 24, color: '#047857',
        horarios: [
          { dia: 'Miércoles', horaInicio: '17:30', horaFin: '19:00' },
          { dia: 'Jueves', horaInicio: '16:00', horaFin: '17:30' }
        ]
      }
    ]
  },

  // 5. ECONOMÍA POLÍTICA (CÓDIGO 1601)
  {
    id: 'm-1601',
    codigo: '1601',
    nombre: 'Economía Política',
    anio: 1,
    creditos: 6,
    horasSemanales: 3,
    departamento: 'Economía y Finanzas',
    obligatoria: true,
    color: '#0F766E',
    prelaciones: [],
    secciones: [
      // MAÑANA
      {
        id: '1601-A', materiaId: 'm-1601', materiaNombre: 'Economía Política', codigoMateria: '1601',
        anio: 1, seccion: 'A (1 día)', turno: 'Mañana', profesor: 'Cipriano Heredia', aula: '',
        cuposTotales: 60, cuposDisponibles: 10, color: '#0F766E',
        horarios: [{ dia: 'Jueves', horaInicio: '10:00', horaFin: '13:00' }]
      },
      {
        id: '1601-B', materiaId: 'm-1601', materiaNombre: 'Economía Política', codigoMateria: '1601',
        anio: 1, seccion: 'B (1 día)', turno: 'Mañana', profesor: 'Cipriano Heredia', aula: '',
        cuposTotales: 60, cuposDisponibles: 12, color: '#0F766E',
        horarios: [{ dia: 'Jueves', horaInicio: '10:00', horaFin: '13:00' }]
      },
      {
        id: '1601-C', materiaId: 'm-1601', materiaNombre: 'Economía Política', codigoMateria: '1601',
        anio: 1, seccion: 'C (1 día)', turno: 'Mañana', profesor: 'Víctor Garrido', aula: '',
        cuposTotales: 60, cuposDisponibles: 15, color: '#0F766E',
        horarios: [{ dia: 'Martes', horaInicio: '07:00', horaFin: '10:00' }]
      },
      {
        id: '1601-D', materiaId: 'm-1601', materiaNombre: 'Economía Política', codigoMateria: '1601',
        anio: 1, seccion: 'D', turno: 'Mañana', profesor: 'Isabel Jiménez', aula: '',
        cuposTotales: 60, cuposDisponibles: 9, color: '#0F766E',
        horarios: [
          { dia: 'Lunes', horaInicio: '07:00', horaFin: '08:30' },
          { dia: 'Miércoles', horaInicio: '10:00', horaFin: '11:30' }
        ]
      },
      {
        id: '1601-E', materiaId: 'm-1601', materiaNombre: 'Economía Política', codigoMateria: '1601',
        anio: 1, seccion: 'E', turno: 'Mañana', profesor: 'Víctor Garrido', aula: '',
        cuposTotales: 60, cuposDisponibles: 14, color: '#0F766E',
        horarios: [{ dia: 'Miércoles', horaInicio: '10:00', horaFin: '13:00' }]
      },
      {
        id: '1601-F', materiaId: 'm-1601', materiaNombre: 'Economía Política', codigoMateria: '1601',
        anio: 1, seccion: 'F (1 día)', turno: 'Mañana', profesor: 'Samuel Pérez Sierra', aula: '',
        cuposTotales: 60, cuposDisponibles: 18, color: '#0F766E',
        horarios: [{ dia: 'Martes', horaInicio: '07:00', horaFin: '10:00' }]
      },
      // TARDE
      {
        id: '1601-G', materiaId: 'm-1601', materiaNombre: 'Economía Política', codigoMateria: '1601',
        anio: 1, seccion: 'G (1 día)', turno: 'Tarde', profesor: 'Víctor Garrido', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 16, color: '#0F766E',
        horarios: [
          { dia: 'Miércoles', horaInicio: '13:00', horaFin: '14:30' },
          { dia: 'Jueves', horaInicio: '14:30', horaFin: '16:00' }
        ]
      },
      {
        id: '1601-H', materiaId: 'm-1601', materiaNombre: 'Economía Política', codigoMateria: '1601',
        anio: 1, seccion: 'H', turno: 'Tarde', profesor: 'Isabel Jiménez', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 13, color: '#0F766E',
        horarios: [
          { dia: 'Lunes', horaInicio: '13:00', horaFin: '14:30' },
          { dia: 'Martes', horaInicio: '16:00', horaFin: '17:30' }
        ]
      },
      {
        id: '1601-I', materiaId: 'm-1601', materiaNombre: 'Economía Política', codigoMateria: '1601',
        anio: 1, seccion: 'I', turno: 'Tarde', profesor: 'Carlos C. Martínez', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 20, color: '#0F766E',
        horarios: [
          { dia: 'Lunes', horaInicio: '14:30', horaFin: '16:00' },
          { dia: 'Jueves', horaInicio: '14:30', horaFin: '16:00' }
        ]
      },
      {
        id: '1601-J', materiaId: 'm-1601', materiaNombre: 'Economía Política', codigoMateria: '1601',
        anio: 1, seccion: 'J', turno: 'Tarde', profesor: 'Silvia Aita', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 15, color: '#0F766E',
        horarios: [
          { dia: 'Miércoles', horaInicio: '14:30', horaFin: '16:00' },
          { dia: 'Jueves', horaInicio: '14:30', horaFin: '16:00' }
        ]
      },
      // NOCHE
      {
        id: '1601-W', materiaId: 'm-1601', materiaNombre: 'Economía Política', codigoMateria: '1601',
        anio: 1, seccion: 'W', turno: 'Noche', profesor: 'Silvia Aita', aula: '',
        cuposTotales: 65, cuposDisponibles: 22, color: '#0F766E',
        horarios: [
          { dia: 'Miércoles', horaInicio: '17:30', horaFin: '19:00' },
          { dia: 'Viernes', horaInicio: '17:30', horaFin: '19:00' }
        ]
      }
    ]
  },

  // 6. SOCIOLOGÍA JURÍDICA (CÓDIGO 1602)
  {
    id: 'm-1602',
    codigo: '1602',
    nombre: 'Sociología Jurídica',
    anio: 1,
    creditos: 6,
    horasSemanales: 3,
    departamento: 'Ciencias Sociales',
    obligatoria: true,
    color: '#6D28D9',
    prelaciones: [],
    secciones: [
      // MAÑANA
      {
        id: '1602-A', materiaId: 'm-1602', materiaNombre: 'Sociología Jurídica', codigoMateria: '1602',
        anio: 1, seccion: 'A', turno: 'Mañana', profesor: 'Pedro Arellán Zurita', aula: '',
        cuposTotales: 60, cuposDisponibles: 11, color: '#6D28D9',
        horarios: [
          { dia: 'Lunes', horaInicio: '10:00', horaFin: '11:30' },
          { dia: 'Viernes', horaInicio: '10:00', horaFin: '11:30' }
        ]
      },
      {
        id: '1602-B', materiaId: 'm-1602', materiaNombre: 'Sociología Jurídica', codigoMateria: '1602',
        anio: 1, seccion: 'B', turno: 'Mañana', profesor: 'Luz M. Toro', aula: '',
        cuposTotales: 60, cuposDisponibles: 14, color: '#6D28D9',
        horarios: [
          { dia: 'Martes', horaInicio: '08:30', horaFin: '10:00' },
          { dia: 'Jueves', horaInicio: '08:30', horaFin: '10:00' }
        ]
      },
      {
        id: '1602-C', materiaId: 'm-1602', materiaNombre: 'Sociología Jurídica', codigoMateria: '1602',
        anio: 1, seccion: 'C', turno: 'Mañana', profesor: 'Jacqueline Richter', aula: '',
        cuposTotales: 60, cuposDisponibles: 9, color: '#6D28D9',
        horarios: [
          { dia: 'Lunes', horaInicio: '10:00', horaFin: '11:30' },
          { dia: 'Miércoles', horaInicio: '07:00', horaFin: '08:30' }
        ]
      },
      {
        id: '1602-D', materiaId: 'm-1602', materiaNombre: 'Sociología Jurídica', codigoMateria: '1602',
        anio: 1, seccion: 'D', turno: 'Mañana', profesor: 'Luz M. Toro', aula: '',
        cuposTotales: 60, cuposDisponibles: 13, color: '#6D28D9',
        horarios: [
          { dia: 'Martes', horaInicio: '10:00', horaFin: '11:30' },
          { dia: 'Jueves', horaInicio: '10:00', horaFin: '11:30' }
        ]
      },
      {
        id: '1602-E', materiaId: 'm-1602', materiaNombre: 'Sociología Jurídica', codigoMateria: '1602',
        anio: 1, seccion: 'E', turno: 'Mañana', profesor: 'Pedro Arellán Zurita', aula: '',
        cuposTotales: 60, cuposDisponibles: 15, color: '#6D28D9',
        horarios: [
          { dia: 'Lunes', horaInicio: '08:30', horaFin: '10:00' },
          { dia: 'Martes', horaInicio: '11:30', horaFin: '13:00' }
        ]
      },
      {
        id: '1602-F', materiaId: 'm-1602', materiaNombre: 'Sociología Jurídica', codigoMateria: '1602',
        anio: 1, seccion: 'F', turno: 'Mañana', profesor: 'Lenin Sosa', aula: '',
        cuposTotales: 60, cuposDisponibles: 12, color: '#6D28D9',
        horarios: [
          { dia: 'Lunes', horaInicio: '10:00', horaFin: '11:30' },
          { dia: 'Jueves', horaInicio: '10:00', horaFin: '11:30' }
        ]
      },
      // TARDE
      {
        id: '1602-G', materiaId: 'm-1602', materiaNombre: 'Sociología Jurídica', codigoMateria: '1602',
        anio: 1, seccion: 'G', turno: 'Tarde', profesor: 'Juan Luis Sosa', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 17, color: '#6D28D9',
        horarios: [
          { dia: 'Lunes', horaInicio: '14:30', horaFin: '16:00' },
          { dia: 'Viernes', horaInicio: '14:30', horaFin: '16:00' }
        ]
      },
      {
        id: '1602-H', materiaId: 'm-1602', materiaNombre: 'Sociología Jurídica', codigoMateria: '1602',
        anio: 1, seccion: 'H', turno: 'Tarde', profesor: 'Juan Luis Sosa', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 19, color: '#6D28D9',
        horarios: [
          { dia: 'Lunes', horaInicio: '14:30', horaFin: '16:00' },
          { dia: 'Viernes', horaInicio: '14:30', horaFin: '16:00' }
        ]
      },
      {
        id: '1602-I', materiaId: 'm-1602', materiaNombre: 'Sociología Jurídica', codigoMateria: '1602',
        anio: 1, seccion: 'I', turno: 'Tarde', profesor: 'Emila Almeida', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 16, color: '#6D28D9',
        horarios: [
          { dia: 'Jueves', horaInicio: '13:00', horaFin: '14:30' },
          { dia: 'Viernes', horaInicio: '13:00', horaFin: '14:30' }
        ]
      },
      {
        id: '1602-J', materiaId: 'm-1602', materiaNombre: 'Sociología Jurídica', codigoMateria: '1602',
        anio: 1, seccion: 'J', turno: 'Tarde', profesor: 'Pedro Arellán Zurita', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 14, color: '#6D28D9',
        horarios: [
          { dia: 'Martes', horaInicio: '16:00', horaFin: '17:30' },
          { dia: 'Miércoles', horaInicio: '16:00', horaFin: '17:30' }
        ]
      },
      // NOCHE
      {
        id: '1602-T', materiaId: 'm-1602', materiaNombre: 'Sociología Jurídica', codigoMateria: '1602',
        anio: 1, seccion: 'T', turno: 'Noche', profesor: 'Tibisay Serrada', aula: '',
        cuposTotales: 65, cuposDisponibles: 22, color: '#6D28D9',
        horarios: [
          { dia: 'Lunes', horaInicio: '17:30', horaFin: '19:00' },
          { dia: 'Viernes', horaInicio: '17:30', horaFin: '19:00' }
        ]
      },
      {
        id: '1602-U', materiaId: 'm-1602', materiaNombre: 'Sociología Jurídica', codigoMateria: '1602',
        anio: 1, seccion: 'U', turno: 'Noche', profesor: 'Lenin Sosa', aula: '',
        cuposTotales: 65, cuposDisponibles: 25, color: '#6D28D9',
        horarios: [
          { dia: 'Lunes', horaInicio: '17:30', horaFin: '19:00' },
          { dia: 'Martes', horaInicio: '17:30', horaFin: '19:00' }
        ]
      }
    ]
  }
];
