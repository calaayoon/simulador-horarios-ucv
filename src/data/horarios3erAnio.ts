import { Materia } from './horariosTypes';

// 3er Año - Programación Oficial UCV 2025 - 2026
export const MATERIAS_3ER_ANIO: Materia[] = [
  // 1. DERECHO ADMINISTRATIVO II (CÓDIGO 1203)
  {
    id: 'm-1203',
    codigo: '1203',
    nombre: 'Derecho Administrativo II',
    anio: 3,
    creditos: 6,
    horasSemanales: 3,
    departamento: 'Derecho Público',
    obligatoria: true,
    color: '#047857',
    prelaciones: ['1202'],
    secciones: [
      // MAÑANA
      {
        id: '1203-A', materiaId: 'm-1203', materiaNombre: 'Derecho Administrativo II', codigoMateria: '1203',
        anio: 3, seccion: 'A', turno: 'Mañana', profesor: 'Carlos García Soto', aula: '',
        cuposTotales: 65, cuposDisponibles: 10, color: '#047857',
        horarios: [
          { dia: 'Miércoles', horaInicio: '10:00', horaFin: '11:30' },
          { dia: 'Jueves', horaInicio: '10:00', horaFin: '11:30' }
        ]
      },
      {
        id: '1203-B', materiaId: 'm-1203', materiaNombre: 'Derecho Administrativo II', codigoMateria: '1203',
        anio: 3, seccion: 'B', turno: 'Mañana', profesor: 'Francisco Paz Yanastacio', aula: '',
        cuposTotales: 65, cuposDisponibles: 12, color: '#047857',
        horarios: [
          { dia: 'Martes', horaInicio: '07:00', horaFin: '08:30' },
          { dia: 'Miércoles', horaInicio: '07:00', horaFin: '08:30' }
        ]
      },
      {
        id: '1203-B01', materiaId: 'm-1203', materiaNombre: 'Derecho Administrativo II', codigoMateria: '1203',
        anio: 3, seccion: 'B-01', turno: 'Mañana', profesor: 'Cosimina Pellegrino Pacera', aula: '',
        cuposTotales: 65, cuposDisponibles: 14, color: '#047857',
        horarios: [
          { dia: 'Lunes', horaInicio: '07:00', horaFin: '08:30' },
          { dia: 'Miércoles', horaInicio: '07:00', horaFin: '08:30' }
        ]
      },
      {
        id: '1203-C', materiaId: 'm-1203', materiaNombre: 'Derecho Administrativo II', codigoMateria: '1203',
        anio: 3, seccion: 'C', turno: 'Mañana', profesor: 'Claudia Nikken', aula: '',
        cuposTotales: 60, cuposDisponibles: 7, color: '#047857',
        horarios: [
          { dia: 'Martes', horaInicio: '08:30', horaFin: '10:00' },
          { dia: 'Miércoles', horaInicio: '08:30', horaFin: '10:00' }
        ]
      },
      // TARDE
      {
        id: '1203-G', materiaId: 'm-1203', materiaNombre: 'Derecho Administrativo II', codigoMateria: '1203',
        anio: 3, seccion: 'G', turno: 'Tarde', profesor: 'Julie González de Kancev', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 16, color: '#047857',
        horarios: [
          { dia: 'Lunes', horaInicio: '16:00', horaFin: '17:30' },
          { dia: 'Miércoles', horaInicio: '14:30', horaFin: '16:00' }
        ]
      },
      {
        id: '1203-H', materiaId: 'm-1203', materiaNombre: 'Derecho Administrativo II', codigoMateria: '1203',
        anio: 3, seccion: 'H', turno: 'Tarde', profesor: 'Cosimina Pellegrino Pacera', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 18, color: '#047857',
        horarios: [
          { dia: 'Martes', horaInicio: '13:00', horaFin: '14:30' },
          { dia: 'Jueves', horaInicio: '13:00', horaFin: '14:30' }
        ]
      },
      {
        id: '1203-I', materiaId: 'm-1203', materiaNombre: 'Derecho Administrativo II', codigoMateria: '1203',
        anio: 3, seccion: 'I', turno: 'Tarde', profesor: 'Carlos Luis Carrillo', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 15, color: '#047857',
        horarios: [
          { dia: 'Lunes', horaInicio: '14:30', horaFin: '16:00' },
          { dia: 'Jueves', horaInicio: '16:00', horaFin: '17:30' }
        ]
      },
      // NOCHE
      {
        id: '1203-T', materiaId: 'm-1203', materiaNombre: 'Derecho Administrativo II', codigoMateria: '1203',
        anio: 3, seccion: 'T', turno: 'Noche', profesor: 'Iván Paredes Calderón', aula: '',
        cuposTotales: 65, cuposDisponibles: 20, color: '#047857',
        horarios: [
          { dia: 'Lunes', horaInicio: '17:30', horaFin: '19:00' },
          { dia: 'Jueves', horaInicio: '17:30', horaFin: '19:00' }
        ]
      },
      {
        id: '1203-U', materiaId: 'm-1203', materiaNombre: 'Derecho Administrativo II', codigoMateria: '1203',
        anio: 3, seccion: 'U', turno: 'Noche', profesor: 'Darrin Gibbs', aula: '',
        cuposTotales: 65, cuposDisponibles: 22, color: '#047857',
        horarios: [
          { dia: 'Martes', horaInicio: '17:30', horaFin: '19:00' },
          { dia: 'Jueves', horaInicio: '17:30', horaFin: '19:00' }
        ]
      }
    ]
  },

  // 2. DERECHO CIVIL III (OBLIGACIONES) (CÓDIGO 1103)
  {
    id: 'm-1103',
    codigo: '1103',
    nombre: 'Derecho Civil III (Obligaciones)',
    anio: 3,
    creditos: 6,
    horasSemanales: 3,
    departamento: 'Derecho Privado',
    obligatoria: true,
    color: '#7b0000',
    prelaciones: ['1101', '1501'],
    secciones: [
      // MAÑANA
      {
        id: '1103-A', materiaId: 'm-1103', materiaNombre: 'Derecho Civil III (Obligaciones)', codigoMateria: '1103',
        anio: 3, seccion: 'A', turno: 'Mañana', profesor: 'Iván Harting', aula: '',
        cuposTotales: 65, cuposDisponibles: 12, color: '#7b0000',
        horarios: [
          { dia: 'Martes', horaInicio: '07:00', horaFin: '08:30' },
          { dia: 'Jueves', horaInicio: '07:00', horaFin: '08:30' }
        ]
      },
      {
        id: '1103-B', materiaId: 'm-1103', materiaNombre: 'Derecho Civil III (Obligaciones)', codigoMateria: '1103',
        anio: 3, seccion: 'B', turno: 'Mañana', profesor: 'Marisabel Pérez Sosa', aula: '',
        cuposTotales: 65, cuposDisponibles: 8, color: '#7b0000',
        horarios: [
          { dia: 'Martes', horaInicio: '08:30', horaFin: '10:00' },
          { dia: 'Jueves', horaInicio: '10:00', horaFin: '11:30' }
        ]
      },
      {
        id: '1103-C', materiaId: 'm-1103', materiaNombre: 'Derecho Civil III (Obligaciones)', codigoMateria: '1103',
        anio: 3, seccion: 'C', turno: 'Mañana', profesor: 'Tamara Adrián', aula: '',
        cuposTotales: 65, cuposDisponibles: 11, color: '#7b0000',
        horarios: [
          { dia: 'Lunes', horaInicio: '07:00', horaFin: '08:30' },
          { dia: 'Miércoles', horaInicio: '07:00', horaFin: '08:30' }
        ]
      },
      {
        id: '1103-D', materiaId: 'm-1103', materiaNombre: 'Derecho Civil III (Obligaciones)', codigoMateria: '1103',
        anio: 3, seccion: 'D (Virtual)', turno: 'Mañana', profesor: 'Edison Varela Cáceres', aula: 'Virtual FCJP',
        cuposTotales: 70, cuposDisponibles: 15, color: '#7b0000',
        horarios: [
          { dia: 'Lunes', horaInicio: '11:30', horaFin: '13:00' },
          { dia: 'Miércoles', horaInicio: '11:30', horaFin: '13:00' }
        ]
      },
      // TARDE
      {
        id: '1103-G', materiaId: 'm-1103', materiaNombre: 'Derecho Civil III (Obligaciones)', codigoMateria: '1103',
        anio: 3, seccion: 'G', turno: 'Tarde', profesor: 'Eduardo Delsol', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 17, color: '#7b0000',
        horarios: [
          { dia: 'Lunes', horaInicio: '14:30', horaFin: '16:00' },
          { dia: 'Martes', horaInicio: '16:00', horaFin: '17:30' }
        ]
      },
      {
        id: '1103-H', materiaId: 'm-1103', materiaNombre: 'Derecho Civil III (Obligaciones)', codigoMateria: '1103',
        anio: 3, seccion: 'H', turno: 'Tarde', profesor: 'Víctor Guidón', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 14, color: '#7b0000',
        horarios: [
          { dia: 'Lunes', horaInicio: '14:30', horaFin: '16:00' },
          { dia: 'Miércoles', horaInicio: '14:30', horaFin: '16:00' }
        ]
      },
      {
        id: '1103-I', materiaId: 'm-1103', materiaNombre: 'Derecho Civil III (Obligaciones)', codigoMateria: '1103',
        anio: 3, seccion: 'I', turno: 'Tarde', profesor: 'Manuel Pérez Luna', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 19, color: '#7b0000',
        horarios: [
          { dia: 'Lunes', horaInicio: '13:00', horaFin: '14:30' },
          { dia: 'Jueves', horaInicio: '13:00', horaFin: '14:30' }
        ]
      },
      // NOCHE
      {
        id: '1103-U', materiaId: 'm-1103', materiaNombre: 'Derecho Civil III (Obligaciones)', codigoMateria: '1103',
        anio: 3, seccion: 'U', turno: 'Noche', profesor: 'Juan José de Sousa', aula: '',
        cuposTotales: 65, cuposDisponibles: 22, color: '#7b0000',
        horarios: [
          { dia: 'Lunes', horaInicio: '17:30', horaFin: '19:00' },
          { dia: 'Miércoles', horaInicio: '16:00', horaFin: '17:30' }
        ]
      },
      {
        id: '1103-V', materiaId: 'm-1103', materiaNombre: 'Derecho Civil III (Obligaciones)', codigoMateria: '1103',
        anio: 3, seccion: 'V', turno: 'Noche', profesor: 'Sacha Fernández', aula: '',
        cuposTotales: 65, cuposDisponibles: 24, color: '#7b0000',
        horarios: [
          { dia: 'Lunes', horaInicio: '17:30', horaFin: '19:00' },
          { dia: 'Miércoles', horaInicio: '17:30', horaFin: '19:00' }
        ]
      }
    ]
  },

  // 3. FINANZAS PÚBLICAS (CÓDIGO 1205)
  {
    id: 'm-1205',
    codigo: '1205',
    nombre: 'Finanzas Públicas (Derecho Tributario)',
    anio: 3,
    creditos: 6,
    horasSemanales: 3,
    departamento: 'Derecho Financiero',
    obligatoria: true,
    color: '#0F766E',
    prelaciones: ['1202', '1601'],
    secciones: [
      // MAÑANA
      {
        id: '1205-A', materiaId: 'm-1205', materiaNombre: 'Finanzas Públicas', codigoMateria: '1205',
        anio: 3, seccion: 'A (Bimodal)', turno: 'Mañana', profesor: 'Taormina Cappello', aula: '',
        cuposTotales: 65, cuposDisponibles: 10, color: '#0F766E',
        horarios: [
          { dia: 'Lunes', horaInicio: '11:30', horaFin: '13:00' },
          { dia: 'Miércoles', horaInicio: '11:30', horaFin: '13:00' }
        ]
      },
      {
        id: '1205-B', materiaId: 'm-1205', materiaNombre: 'Finanzas Públicas', codigoMateria: '1205',
        anio: 3, seccion: 'B (Bimodal)', turno: 'Mañana', profesor: 'Taormina Cappello', aula: '',
        cuposTotales: 65, cuposDisponibles: 12, color: '#0F766E',
        horarios: [
          { dia: 'Lunes', horaInicio: '10:00', horaFin: '11:30' },
          { dia: 'Miércoles', horaInicio: '08:30', horaFin: '10:00' }
        ]
      },
      {
        id: '1205-C', materiaId: 'm-1205', materiaNombre: 'Finanzas Públicas', codigoMateria: '1205',
        anio: 3, seccion: 'C', turno: 'Mañana', profesor: 'Carolina Cano', aula: '',
        cuposTotales: 60, cuposDisponibles: 14, color: '#0F766E',
        horarios: [
          { dia: 'Martes', horaInicio: '10:00', horaFin: '11:30' },
          { dia: 'Jueves', horaInicio: '10:00', horaFin: '11:30' }
        ]
      },
      {
        id: '1205-D', materiaId: 'm-1205', materiaNombre: 'Finanzas Públicas', codigoMateria: '1205',
        anio: 3, seccion: 'D', turno: 'Mañana', profesor: 'Ronald Evans', aula: '',
        cuposTotales: 60, cuposDisponibles: 8, color: '#0F766E',
        horarios: [
          { dia: 'Martes', horaInicio: '10:00', horaFin: '11:30' },
          { dia: 'Jueves', horaInicio: '10:00', horaFin: '11:30' }
        ]
      },
      // TARDE
      {
        id: '1205-G', materiaId: 'm-1205', materiaNombre: 'Finanzas Públicas', codigoMateria: '1205',
        anio: 3, seccion: 'G', turno: 'Tarde', profesor: 'Juan Carlos Castillo', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 16, color: '#0F766E',
        horarios: [
          { dia: 'Lunes', horaInicio: '13:00', horaFin: '14:30' },
          { dia: 'Miércoles', horaInicio: '13:00', horaFin: '14:30' }
        ]
      },
      {
        id: '1205-H', materiaId: 'm-1205', materiaNombre: 'Finanzas Públicas', codigoMateria: '1205',
        anio: 3, seccion: 'H', turno: 'Tarde', profesor: 'Henry Canino', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 15, color: '#0F766E',
        horarios: [
          { dia: 'Lunes', horaInicio: '13:00', horaFin: '14:30' },
          { dia: 'Miércoles', horaInicio: '13:00', horaFin: '14:30' }
        ]
      },
      // NOCHE
      {
        id: '1205-S', materiaId: 'm-1205', materiaNombre: 'Finanzas Públicas', codigoMateria: '1205',
        anio: 3, seccion: 'S', turno: 'Noche', profesor: 'Henry Canino', aula: '',
        cuposTotales: 65, cuposDisponibles: 22, color: '#0F766E',
        horarios: [
          { dia: 'Jueves', horaInicio: '17:30', horaFin: '19:00' },
          { dia: 'Viernes', horaInicio: '17:30', horaFin: '19:00' }
        ]
      },
      {
        id: '1205-T', materiaId: 'm-1205', materiaNombre: 'Finanzas Públicas', codigoMateria: '1205',
        anio: 3, seccion: 'T', turno: 'Noche', profesor: 'Carlos Mota', aula: '',
        cuposTotales: 65, cuposDisponibles: 20, color: '#0F766E',
        horarios: [
          { dia: 'Miércoles', horaInicio: '16:00', horaFin: '17:30' },
          { dia: 'Jueves', horaInicio: '17:30', horaFin: '19:00' }
        ]
      }
    ]
  },

  // 4. DERECHO PENAL II (CÓDIGO 1302)
  {
    id: 'm-1302',
    codigo: '1302',
    nombre: 'Derecho Penal II',
    anio: 3,
    creditos: 6,
    horasSemanales: 3,
    departamento: 'Ciencias Penales',
    obligatoria: true,
    color: '#991B1B',
    prelaciones: ['1301'],
    secciones: [
      // MAÑANA
      {
        id: '1302-A', materiaId: 'm-1302', materiaNombre: 'Derecho Penal II', codigoMateria: '1302',
        anio: 3, seccion: 'A', turno: 'Mañana', profesor: 'María Pérez Dupuy', aula: '',
        cuposTotales: 65, cuposDisponibles: 8, color: '#991B1B',
        horarios: [
          { dia: 'Miércoles', horaInicio: '07:00', horaFin: '08:30' },
          { dia: 'Viernes', horaInicio: '07:00', horaFin: '08:30' }
        ]
      },
      {
        id: '1302-B', materiaId: 'm-1302', materiaNombre: 'Derecho Penal II', codigoMateria: '1302',
        anio: 3, seccion: 'B', turno: 'Mañana', profesor: 'Yván Figueroa Ortega', aula: '',
        cuposTotales: 70, cuposDisponibles: 6, color: '#991B1B',
        horarios: [
          { dia: 'Lunes', horaInicio: '08:30', horaFin: '10:00' },
          { dia: 'Miércoles', horaInicio: '10:00', horaFin: '11:30' }
        ]
      },
      {
        id: '1302-C', materiaId: 'm-1302', materiaNombre: 'Derecho Penal II', codigoMateria: '1302',
        anio: 3, seccion: 'C', turno: 'Mañana', profesor: 'Carlos Simón Bello', aula: '',
        cuposTotales: 65, cuposDisponibles: 12, color: '#991B1B',
        horarios: [
          { dia: 'Martes', horaInicio: '08:30', horaFin: '10:00' },
          { dia: 'Miércoles', horaInicio: '08:30', horaFin: '10:00' }
        ]
      },
      // TARDE
      {
        id: '1302-G', materiaId: 'm-1302', materiaNombre: 'Derecho Penal II', codigoMateria: '1302',
        anio: 3, seccion: 'G', turno: 'Tarde', profesor: 'Ángel Zerpa', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 15, color: '#991B1B',
        horarios: [
          { dia: 'Miércoles', horaInicio: '16:00', horaFin: '17:30' },
          { dia: 'Jueves', horaInicio: '16:00', horaFin: '17:30' }
        ]
      },
      {
        id: '1302-I', materiaId: 'm-1302', materiaNombre: 'Derecho Penal II', codigoMateria: '1302',
        anio: 3, seccion: 'I', turno: 'Tarde', profesor: 'José Ángel Fajardo', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 18, color: '#991B1B',
        horarios: [
          { dia: 'Lunes', horaInicio: '16:00', horaFin: '17:30' },
          { dia: 'Martes', horaInicio: '16:00', horaFin: '17:30' }
        ]
      },
      // NOCHE
      {
        id: '1302-S', materiaId: 'm-1302', materiaNombre: 'Derecho Penal II', codigoMateria: '1302',
        anio: 3, seccion: 'S', turno: 'Noche', profesor: 'Anthony Pérez', aula: '',
        cuposTotales: 65, cuposDisponibles: 22, color: '#991B1B',
        horarios: [
          { dia: 'Miércoles', horaInicio: '17:30', horaFin: '19:00' },
          { dia: 'Viernes', horaInicio: '16:00', horaFin: '17:30' }
        ]
      },
      {
        id: '1302-U', materiaId: 'm-1302', materiaNombre: 'Derecho Penal II', codigoMateria: '1302',
        anio: 3, seccion: 'U', turno: 'Noche', profesor: 'Yeimber Machado', aula: '',
        cuposTotales: 65, cuposDisponibles: 20, color: '#991B1B',
        horarios: [
          { dia: 'Martes', horaInicio: '16:00', horaFin: '17:30' },
          { dia: 'Viernes', horaInicio: '17:30', horaFin: '19:00' }
        ]
      }
    ]
  },

  // 5. FILOSOFÍA DEL DERECHO (CÓDIGO 1504)
  {
    id: 'm-1504',
    codigo: '1504',
    nombre: 'Filosofía del Derecho',
    anio: 3,
    creditos: 6,
    horasSemanales: 3,
    departamento: 'Filosofía y Teoría del Derecho',
    obligatoria: true,
    color: '#6D28D9',
    prelaciones: ['1501'],
    secciones: [
      // MAÑANA
      {
        id: '1504-A', materiaId: 'm-1504', materiaNombre: 'Filosofía del Derecho', codigoMateria: '1504',
        anio: 3, seccion: 'A', turno: 'Mañana', profesor: 'Francisco Delgado Soto', aula: '',
        cuposTotales: 60, cuposDisponibles: 10, color: '#6D28D9',
        horarios: [
          { dia: 'Jueves', horaInicio: '11:30', horaFin: '13:00' },
          { dia: 'Viernes', horaInicio: '11:30', horaFin: '13:00' }
        ]
      },
      {
        id: '1504-B', materiaId: 'm-1504', materiaNombre: 'Filosofía del Derecho', codigoMateria: '1504',
        anio: 3, seccion: 'B', turno: 'Mañana', profesor: 'Francisco Delgado Soto', aula: '',
        cuposTotales: 60, cuposDisponibles: 12, color: '#6D28D9',
        horarios: [
          { dia: 'Jueves', horaInicio: '11:30', horaFin: '13:00' },
          { dia: 'Viernes', horaInicio: '11:30', horaFin: '13:00' }
        ]
      },
      {
        id: '1504-C', materiaId: 'm-1504', materiaNombre: 'Filosofía del Derecho', codigoMateria: '1504',
        anio: 3, seccion: 'C', turno: 'Mañana', profesor: 'Larry Tadino Parra', aula: '',
        cuposTotales: 60, cuposDisponibles: 8, color: '#6D28D9',
        horarios: [
          { dia: 'Lunes', horaInicio: '08:30', horaFin: '10:00' },
          { dia: 'Miércoles', horaInicio: '08:30', horaFin: '10:00' }
        ]
      },
      // TARDE
      {
        id: '1504-G', materiaId: 'm-1504', materiaNombre: 'Filosofía del Derecho', codigoMateria: '1504',
        anio: 3, seccion: 'G', turno: 'Tarde', profesor: 'Edgar Pérez Pereira', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 15, color: '#6D28D9',
        horarios: [
          { dia: 'Martes', horaInicio: '14:30', horaFin: '16:00' },
          { dia: 'Viernes', horaInicio: '14:30', horaFin: '16:00' }
        ]
      },
      {
        id: '1504-I', materiaId: 'm-1504', materiaNombre: 'Filosofía del Derecho', codigoMateria: '1504',
        anio: 3, seccion: 'I', turno: 'Tarde', profesor: 'Edgar Pérez Pereira', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 17, color: '#6D28D9',
        horarios: [
          { dia: 'Martes', horaInicio: '14:30', horaFin: '16:00' },
          { dia: 'Viernes', horaInicio: '14:30', horaFin: '16:00' }
        ]
      },
      // NOCHE
      {
        id: '1504-T', materiaId: 'm-1504', materiaNombre: 'Filosofía del Derecho', codigoMateria: '1504',
        anio: 3, seccion: 'T', turno: 'Noche', profesor: 'Luis David Briceño', aula: '',
        cuposTotales: 65, cuposDisponibles: 22, color: '#6D28D9',
        horarios: [
          { dia: 'Martes', horaInicio: '17:30', horaFin: '19:00' },
          { dia: 'Jueves', horaInicio: '17:30', horaFin: '19:00' }
        ]
      }
    ]
  },

  // 6. PRÁCTICA JURÍDICA I (CÓDIGO 1902)
  {
    id: 'm-1902',
    codigo: '1902',
    nombre: 'Práctica Jurídica I',
    anio: 3,
    creditos: 6,
    horasSemanales: 3,
    departamento: 'Práctica Forense',
    obligatoria: true,
    color: '#0369A1',
    prelaciones: ['1501'],
    secciones: [
      // MAÑANA (Viernes 8:30 a 11:30)
      {
        id: '1902-M01', materiaId: 'm-1902', materiaNombre: 'Práctica Jurídica I', codigoMateria: '1902',
        anio: 3, seccion: 'M01', turno: 'Mañana', profesor: 'María F. Arteaga', aula: '',
        cuposTotales: 35, cuposDisponibles: 12, color: '#0369A1',
        horarios: [{ dia: 'Viernes', horaInicio: '08:30', horaFin: '11:30' }]
      },
      {
        id: '1902-M02', materiaId: 'm-1902', materiaNombre: 'Práctica Jurídica I', codigoMateria: '1902',
        anio: 3, seccion: 'M02', turno: 'Mañana', profesor: 'Sonia Fernández', aula: '',
        cuposTotales: 35, cuposDisponibles: 10, color: '#0369A1',
        horarios: [{ dia: 'Viernes', horaInicio: '08:30', horaFin: '11:30' }]
      },
      {
        id: '1902-M03', materiaId: 'm-1902', materiaNombre: 'Práctica Jurídica I', codigoMateria: '1902',
        anio: 3, seccion: 'M03', turno: 'Mañana', profesor: 'Pedro Mata', aula: '',
        cuposTotales: 35, cuposDisponibles: 14, color: '#0369A1',
        horarios: [{ dia: 'Viernes', horaInicio: '08:30', horaFin: '11:30' }]
      },
      {
        id: '1902-M04', materiaId: 'm-1902', materiaNombre: 'Práctica Jurídica I', codigoMateria: '1902',
        anio: 3, seccion: 'M04', turno: 'Mañana', profesor: 'Henry Martínez', aula: '',
        cuposTotales: 35, cuposDisponibles: 9, color: '#0369A1',
        horarios: [{ dia: 'Viernes', horaInicio: '08:30', horaFin: '11:30' }]
      },
      {
        id: '1902-M05', materiaId: 'm-1902', materiaNombre: 'Práctica Jurídica I', codigoMateria: '1902',
        anio: 3, seccion: 'M05', turno: 'Mañana', profesor: 'Raúl Ramírez', aula: '',
        cuposTotales: 35, cuposDisponibles: 11, color: '#0369A1',
        horarios: [{ dia: 'Viernes', horaInicio: '08:30', horaFin: '11:30' }]
      },
      {
        id: '1902-M06', materiaId: 'm-1902', materiaNombre: 'Práctica Jurídica I', codigoMateria: '1902',
        anio: 3, seccion: 'M06', turno: 'Mañana', profesor: 'Fabio Veliz', aula: '',
        cuposTotales: 35, cuposDisponibles: 15, color: '#0369A1',
        horarios: [{ dia: 'Viernes', horaInicio: '08:30', horaFin: '11:30' }]
      },
      {
        id: '1902-M08', materiaId: 'm-1902', materiaNombre: 'Práctica Jurídica I', codigoMateria: '1902',
        anio: 3, seccion: 'M08', turno: 'Mañana', profesor: 'Iván Harting', aula: '',
        cuposTotales: 35, cuposDisponibles: 16, color: '#0369A1',
        horarios: [{ dia: 'Viernes', horaInicio: '08:30', horaFin: '11:30' }]
      },
      {
        id: '1902-M09', materiaId: 'm-1902', materiaNombre: 'Práctica Jurídica I', codigoMateria: '1902',
        anio: 3, seccion: 'M09', turno: 'Mañana', profesor: 'Patricia Araujo', aula: '',
        cuposTotales: 35, cuposDisponibles: 13, color: '#0369A1',
        horarios: [{ dia: 'Viernes', horaInicio: '08:30', horaFin: '11:30' }]
      },
      // TARDE (Vespertino)
      {
        id: '1902-V01', materiaId: 'm-1902', materiaNombre: 'Práctica Jurídica I', codigoMateria: '1902',
        anio: 3, seccion: 'V01', turno: 'Tarde', profesor: 'Marisol Anzola', aula: '',
        cuposTotales: 35, cuposDisponibles: 12, color: '#0369A1',
        horarios: [{ dia: 'Jueves', horaInicio: '13:00', horaFin: '16:00' }]
      },
      {
        id: '1902-V03', materiaId: 'm-1902', materiaNombre: 'Práctica Jurídica I', codigoMateria: '1902',
        anio: 3, seccion: 'V03', turno: 'Tarde', profesor: 'Naual Naime', aula: '',
        cuposTotales: 35, cuposDisponibles: 10, color: '#0369A1',
        horarios: [{ dia: 'Jueves', horaInicio: '13:00', horaFin: '16:00' }]
      },
      {
        id: '1902-V05', materiaId: 'm-1902', materiaNombre: 'Práctica Jurídica I', codigoMateria: '1902',
        anio: 3, seccion: 'V05', turno: 'Tarde', profesor: 'Humberto Angrisano', aula: '',
        cuposTotales: 35, cuposDisponibles: 14, color: '#0369A1',
        horarios: [{ dia: 'Jueves', horaInicio: '13:00', horaFin: '16:00' }]
      },
      {
        id: '1902-V10', materiaId: 'm-1902', materiaNombre: 'Práctica Jurídica I', codigoMateria: '1902',
        anio: 3, seccion: 'V10', turno: 'Tarde', profesor: 'Jennyfer Gordon', aula: '',
        cuposTotales: 35, cuposDisponibles: 15, color: '#0369A1',
        horarios: [{ dia: 'Jueves', horaInicio: '13:00', horaFin: '16:00' }]
      },
      {
        id: '1902-V11', materiaId: 'm-1902', materiaNombre: 'Práctica Jurídica I', codigoMateria: '1902',
        anio: 3, seccion: 'V11', turno: 'Tarde', profesor: 'José Luis Rojas', aula: '',
        cuposTotales: 35, cuposDisponibles: 11, color: '#0369A1',
        horarios: [{ dia: 'Miércoles', horaInicio: '13:00', horaFin: '16:00' }]
      },
      {
        id: '1902-V12', materiaId: 'm-1902', materiaNombre: 'Práctica Jurídica I', codigoMateria: '1902',
        anio: 3, seccion: 'V12', turno: 'Tarde', profesor: 'Agustina Ordaz M.', aula: '',
        cuposTotales: 35, cuposDisponibles: 16, color: '#0369A1',
        horarios: [{ dia: 'Viernes', horaInicio: '13:00', horaFin: '16:00' }]
      }
    ]
  }
];
