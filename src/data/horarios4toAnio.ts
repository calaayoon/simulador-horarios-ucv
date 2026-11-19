import { Materia } from './horariosTypes';

// 4to Año - Programación Oficial UCV 2025 - 2026
export const MATERIAS_4TO_ANIO: Materia[] = [
  // 1. DERECHO DEL TRABAJO (CÓDIGO 1109 - 4to Año)
  {
    id: 'm-1109',
    codigo: '1109',
    nombre: 'Derecho del Trabajo',
    anio: 4,
    creditos: 6,
    horasSemanales: 3,
    departamento: 'Derecho Social',
    obligatoria: true,
    color: '#047857',
    prelaciones: ['1103'],
    secciones: [
      // MAÑANA
      {
        id: '1109-A', materiaId: 'm-1109', materiaNombre: 'Derecho del Trabajo', codigoMateria: '1109',
        anio: 4, seccion: 'A', turno: 'Mañana', profesor: 'León Arismendi', aula: '',
        cuposTotales: 65, cuposDisponibles: 10, color: '#047857',
        horarios: [
          { dia: 'Lunes', horaInicio: '07:00', horaFin: '08:30' },
          { dia: 'Miércoles', horaInicio: '08:30', horaFin: '10:00' }
        ]
      },
      {
        id: '1109-B', materiaId: 'm-1109', materiaNombre: 'Derecho del Trabajo', codigoMateria: '1109',
        anio: 4, seccion: 'B', turno: 'Mañana', profesor: 'León Arismendi', aula: '',
        cuposTotales: 65, cuposDisponibles: 12, color: '#047857',
        horarios: [
          { dia: 'Lunes', horaInicio: '08:30', horaFin: '10:00' },
          { dia: 'Miércoles', horaInicio: '07:00', horaFin: '08:30' }
        ]
      },
      {
        id: '1109-C', materiaId: 'm-1109', materiaNombre: 'Derecho del Trabajo', codigoMateria: '1109',
        anio: 4, seccion: 'C (1 día)', turno: 'Mañana', profesor: 'Juan Carlos Pro Risquez', aula: '',
        cuposTotales: 60, cuposDisponibles: 14, color: '#047857',
        horarios: [{ dia: 'Miércoles', horaInicio: '07:00', horaFin: '10:00' }]
      },
      // TARDE
      {
        id: '1109-G', materiaId: 'm-1109', materiaNombre: 'Derecho del Trabajo', codigoMateria: '1109',
        anio: 4, seccion: 'G', turno: 'Tarde', profesor: 'Douglas Bustamante', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 15, color: '#047857',
        horarios: [
          { dia: 'Martes', horaInicio: '13:00', horaFin: '14:30' },
          { dia: 'Jueves', horaInicio: '13:00', horaFin: '14:30' }
        ]
      },
      {
        id: '1109-H', materiaId: 'm-1109', materiaNombre: 'Derecho del Trabajo', codigoMateria: '1109',
        anio: 4, seccion: 'H', turno: 'Tarde', profesor: 'Biba Arciniegas', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 18, color: '#047857',
        horarios: [
          { dia: 'Miércoles', horaInicio: '16:00', horaFin: '17:30' },
          { dia: 'Viernes', horaInicio: '16:00', horaFin: '17:30' }
        ]
      },
      {
        id: '1109-I', materiaId: 'm-1109', materiaNombre: 'Derecho del Trabajo', codigoMateria: '1109',
        anio: 4, seccion: 'I', turno: 'Tarde', profesor: 'Jacqueline Richter', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 14, color: '#047857',
        horarios: [
          { dia: 'Lunes', horaInicio: '16:00', horaFin: '17:30' },
          { dia: 'Miércoles', horaInicio: '14:30', horaFin: '16:00' }
        ]
      },
      // NOCHE
      {
        id: '1109-S', materiaId: 'm-1109', materiaNombre: 'Derecho del Trabajo', codigoMateria: '1109',
        anio: 4, seccion: 'S (Virtual)', turno: 'Noche', profesor: 'Ramón Fábregas', aula: 'Virtual FCJP',
        cuposTotales: 65, cuposDisponibles: 22, color: '#047857',
        horarios: [
          { dia: 'Miércoles', horaInicio: '17:30', horaFin: '19:00' },
          { dia: 'Jueves', horaInicio: '16:00', horaFin: '17:30' }
        ]
      },
      {
        id: '1109-T', materiaId: 'm-1109', materiaNombre: 'Derecho del Trabajo', codigoMateria: '1109',
        anio: 4, seccion: 'T', turno: 'Noche', profesor: 'Víctor Durán', aula: '',
        cuposTotales: 65, cuposDisponibles: 20, color: '#047857',
        horarios: [
          { dia: 'Lunes', horaInicio: '16:00', horaFin: '17:30' },
          { dia: 'Martes', horaInicio: '16:00', horaFin: '17:30' }
        ]
      }
    ]
  },

  // 2. DERECHO CIVIL IV (CÓDIGO 1104)
  {
    id: 'm-1104',
    codigo: '1104',
    nombre: 'Derecho Civil IV (Familia y Sucesiones)',
    anio: 4,
    creditos: 6,
    horasSemanales: 3,
    departamento: 'Derecho Privado',
    obligatoria: true,
    color: '#7b0000',
    prelaciones: ['1102'],
    secciones: [
      // MAÑANA
      {
        id: '1104-A', materiaId: 'm-1104', materiaNombre: 'Derecho Civil IV', codigoMateria: '1104',
        anio: 4, seccion: 'A', turno: 'Mañana', profesor: 'Pedro Pablo Calvani', aula: '',
        cuposTotales: 65, cuposDisponibles: 9, color: '#7b0000',
        horarios: [
          { dia: 'Lunes', horaInicio: '08:30', horaFin: '10:00' },
          { dia: 'Miércoles', horaInicio: '08:30', horaFin: '10:00' }
        ]
      },
      {
        id: '1104-B', materiaId: 'm-1104', materiaNombre: 'Derecho Civil IV', codigoMateria: '1104',
        anio: 4, seccion: 'B', turno: 'Mañana', profesor: 'Milagros Hernández', aula: '',
        cuposTotales: 65, cuposDisponibles: 11, color: '#7b0000',
        horarios: [
          { dia: 'Martes', horaInicio: '11:30', horaFin: '13:00' },
          { dia: 'Jueves', horaInicio: '08:30', horaFin: '10:00' }
        ]
      },
      {
        id: '1104-C', materiaId: 'm-1104', materiaNombre: 'Derecho Civil IV', codigoMateria: '1104',
        anio: 4, seccion: 'C', turno: 'Mañana', profesor: 'Lourdes Wills Rivera', aula: '',
        cuposTotales: 60, cuposDisponibles: 14, color: '#7b0000',
        horarios: [
          { dia: 'Martes', horaInicio: '10:00', horaFin: '11:30' },
          { dia: 'Jueves', horaInicio: '10:00', horaFin: '11:30' }
        ]
      },
      // TARDE
      {
        id: '1104-G', materiaId: 'm-1104', materiaNombre: 'Derecho Civil IV', codigoMateria: '1104',
        anio: 4, seccion: 'G (1 día)', turno: 'Tarde', profesor: 'Cenaida Ortega', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 15, color: '#7b0000',
        horarios: [{ dia: 'Jueves', horaInicio: '14:30', horaFin: '17:30' }]
      },
      {
        id: '1104-H', materiaId: 'm-1104', materiaNombre: 'Derecho Civil IV', codigoMateria: '1104',
        anio: 4, seccion: 'H', turno: 'Tarde', profesor: 'Milagros Hernández', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 16, color: '#7b0000',
        horarios: [
          { dia: 'Martes', horaInicio: '13:00', horaFin: '14:30' },
          { dia: 'Jueves', horaInicio: '14:30', horaFin: '16:00' }
        ]
      },
      // NOCHE
      {
        id: '1104-S', materiaId: 'm-1104', materiaNombre: 'Derecho Civil IV', codigoMateria: '1104',
        anio: 4, seccion: 'S', turno: 'Noche', profesor: 'Fanny Plaza', aula: '',
        cuposTotales: 65, cuposDisponibles: 22, color: '#7b0000',
        horarios: [
          { dia: 'Jueves', horaInicio: '17:30', horaFin: '19:00' },
          { dia: 'Viernes', horaInicio: '17:30', horaFin: '19:00' }
        ]
      }
    ]
  },

  // 3. DERECHO PROCESAL CIVIL I (CÓDIGO 1401)
  {
    id: 'm-1401',
    codigo: '1401',
    nombre: 'Derecho Procesal Civil I',
    anio: 4,
    creditos: 6,
    horasSemanales: 3,
    departamento: 'Derecho Procesal',
    obligatoria: true,
    color: '#B45309',
    prelaciones: ['1102'],
    secciones: [
      // MAÑANA
      {
        id: '1401-A', materiaId: 'm-1401', materiaNombre: 'Derecho Procesal Civil I', codigoMateria: '1401',
        anio: 4, seccion: 'A', turno: 'Mañana', profesor: 'Máximo Febres Siso', aula: '',
        cuposTotales: 65, cuposDisponibles: 9, color: '#B45309',
        horarios: [
          { dia: 'Martes', horaInicio: '08:30', horaFin: '10:00' },
          { dia: 'Viernes', horaInicio: '08:30', horaFin: '10:00' }
        ]
      },
      {
        id: '1401-B', materiaId: 'm-1401', materiaNombre: 'Derecho Procesal Civil I', codigoMateria: '1401',
        anio: 4, seccion: 'B', turno: 'Mañana', profesor: 'Nilyan Santana Longa', aula: '',
        cuposTotales: 65, cuposDisponibles: 12, color: '#B45309',
        horarios: [
          { dia: 'Lunes', horaInicio: '07:00', horaFin: '08:30' },
          { dia: 'Viernes', horaInicio: '07:00', horaFin: '08:30' }
        ]
      },
      {
        id: '1401-C', materiaId: 'm-1401', materiaNombre: 'Derecho Procesal Civil I', codigoMateria: '1401',
        anio: 4, seccion: 'C', turno: 'Mañana', profesor: 'Bernardo Pisani', aula: '',
        cuposTotales: 60, cuposDisponibles: 14, color: '#B45309',
        horarios: [
          { dia: 'Miércoles', horaInicio: '08:30', horaFin: '10:00' },
          { dia: 'Viernes', horaInicio: '08:30', horaFin: '10:00' }
        ]
      },
      // TARDE
      {
        id: '1401-G', materiaId: 'm-1401', materiaNombre: 'Derecho Procesal Civil I', codigoMateria: '1401',
        anio: 4, seccion: 'G', turno: 'Tarde', profesor: 'Josué Rodríguez', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 16, color: '#B45309',
        horarios: [
          { dia: 'Martes', horaInicio: '14:30', horaFin: '16:00' },
          { dia: 'Jueves', horaInicio: '14:30', horaFin: '16:00' }
        ]
      },
      {
        id: '1401-H', materiaId: 'm-1401', materiaNombre: 'Derecho Procesal Civil I', codigoMateria: '1401',
        anio: 4, seccion: 'H', turno: 'Tarde', profesor: 'Gustavo Manzo Ugas', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 15, color: '#B45309',
        horarios: [
          { dia: 'Martes', horaInicio: '14:30', horaFin: '16:00' },
          { dia: 'Jueves', horaInicio: '13:00', horaFin: '14:30' }
        ]
      },
      {
        id: '1401-I', materiaId: 'm-1401', materiaNombre: 'Derecho Procesal Civil I', codigoMateria: '1401',
        anio: 4, seccion: 'I', turno: 'Tarde', profesor: 'Iván Harting', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 18, color: '#B45309',
        horarios: [
          { dia: 'Martes', horaInicio: '16:00', horaFin: '17:30' },
          { dia: 'Jueves', horaInicio: '16:00', horaFin: '17:30' }
        ]
      },
      // NOCHE
      {
        id: '1401-S', materiaId: 'm-1401', materiaNombre: 'Derecho Procesal Civil I', codigoMateria: '1401',
        anio: 4, seccion: 'S', turno: 'Noche', profesor: 'Emerson Moros', aula: '',
        cuposTotales: 65, cuposDisponibles: 20, color: '#B45309',
        horarios: [{ dia: 'Lunes', horaInicio: '16:00', horaFin: '19:00' }]
      },
      {
        id: '1401-T', materiaId: 'm-1401', materiaNombre: 'Derecho Procesal Civil I', codigoMateria: '1401',
        anio: 4, seccion: 'T', turno: 'Noche', profesor: 'Naual Naime', aula: '',
        cuposTotales: 65, cuposDisponibles: 22, color: '#B45309',
        horarios: [
          { dia: 'Miércoles', horaInicio: '17:30', horaFin: '19:00' },
          { dia: 'Jueves', horaInicio: '16:00', horaFin: '17:30' }
        ]
      },
      {
        id: '1401-U', materiaId: 'm-1401', materiaNombre: 'Derecho Procesal Civil I', codigoMateria: '1401',
        anio: 4, seccion: 'U', turno: 'Noche', profesor: 'Héctor Cardoze', aula: '',
        cuposTotales: 65, cuposDisponibles: 24, color: '#B45309',
        horarios: [
          { dia: 'Martes', horaInicio: '16:00', horaFin: '17:30' },
          { dia: 'Jueves', horaInicio: '16:00', horaFin: '17:30' }
        ]
      }
    ]
  },

  // 4. CONTRATOS Y GARANTÍAS (CÓDIGO 1106)
  {
    id: 'm-1106',
    codigo: '1106',
    nombre: 'Contratos y Garantías',
    anio: 4,
    creditos: 6,
    horasSemanales: 3,
    departamento: 'Derecho Privado',
    obligatoria: true,
    color: '#1E3A8A',
    prelaciones: ['1103'],
    secciones: [
      // MAÑANA
      {
        id: '1106-A', materiaId: 'm-1106', materiaNombre: 'Contratos y Garantías', codigoMateria: '1106',
        anio: 4, seccion: 'A', turno: 'Mañana', profesor: 'Isabel Medina', aula: '',
        cuposTotales: 65, cuposDisponibles: 8, color: '#1E3A8A',
        horarios: [
          { dia: 'Lunes', horaInicio: '10:00', horaFin: '11:30' },
          { dia: 'Miércoles', horaInicio: '10:00', horaFin: '11:30' }
        ]
      },
      {
        id: '1106-B', materiaId: 'm-1106', materiaNombre: 'Contratos y Garantías', codigoMateria: '1106',
        anio: 4, seccion: 'B', turno: 'Mañana', profesor: 'Isabel Medina', aula: '',
        cuposTotales: 65, cuposDisponibles: 10, color: '#1E3A8A',
        horarios: [
          { dia: 'Lunes', horaInicio: '10:00', horaFin: '11:30' },
          { dia: 'Miércoles', horaInicio: '08:30', horaFin: '10:00' }
        ]
      },
      {
        id: '1106-C', materiaId: 'm-1106', materiaNombre: 'Contratos y Garantías', codigoMateria: '1106',
        anio: 4, seccion: 'C', turno: 'Mañana', profesor: 'Andrea Cruz', aula: '',
        cuposTotales: 60, cuposDisponibles: 14, color: '#1E3A8A',
        horarios: [
          { dia: 'Lunes', horaInicio: '10:00', horaFin: '11:30' },
          { dia: 'Viernes', horaInicio: '07:00', horaFin: '08:30' }
        ]
      },
      // TARDE
      {
        id: '1106-G', materiaId: 'm-1106', materiaNombre: 'Contratos y Garantías', codigoMateria: '1106',
        anio: 4, seccion: 'G', turno: 'Tarde', profesor: 'Edsa Sánchez de Caffaro', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 16, color: '#1E3A8A',
        horarios: [
          { dia: 'Lunes', horaInicio: '14:30', horaFin: '16:00' },
          { dia: 'Viernes', horaInicio: '14:30', horaFin: '16:00' }
        ]
      },
      {
        id: '1106-H', materiaId: 'm-1106', materiaNombre: 'Contratos y Garantías', codigoMateria: '1106',
        anio: 4, seccion: 'H', turno: 'Tarde', profesor: 'Andrés Dams Donoso', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 15, color: '#1E3A8A',
        horarios: [
          { dia: 'Martes', horaInicio: '16:00', horaFin: '17:30' },
          { dia: 'Jueves', horaInicio: '16:00', horaFin: '17:30' }
        ]
      },
      {
        id: '1106-I', materiaId: 'm-1106', materiaNombre: 'Contratos y Garantías', codigoMateria: '1106',
        anio: 4, seccion: 'I', turno: 'Tarde', profesor: 'Tadeo Arrieche', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 18, color: '#1E3A8A',
        horarios: [
          { dia: 'Lunes', horaInicio: '13:00', horaFin: '14:30' },
          { dia: 'Jueves', horaInicio: '14:30', horaFin: '16:00' }
        ]
      },
      // NOCHE
      {
        id: '1106-T', materiaId: 'm-1106', materiaNombre: 'Contratos y Garantías', codigoMateria: '1106',
        anio: 4, seccion: 'T', turno: 'Noche', profesor: 'Antonio Marcoccio', aula: '',
        cuposTotales: 65, cuposDisponibles: 20, color: '#1E3A8A',
        horarios: [
          { dia: 'Lunes', horaInicio: '17:30', horaFin: '19:00' },
          { dia: 'Viernes', horaInicio: '17:30', horaFin: '19:00' }
        ]
      },
      {
        id: '1106-U', materiaId: 'm-1106', materiaNombre: 'Contratos y Garantías', codigoMateria: '1106',
        anio: 4, seccion: 'U', turno: 'Noche', profesor: 'Lorisel Goacuto', aula: '',
        cuposTotales: 65, cuposDisponibles: 22, color: '#1E3A8A',
        horarios: [
          { dia: 'Martes', horaInicio: '17:30', horaFin: '19:00' },
          { dia: 'Viernes', horaInicio: '16:00', horaFin: '17:30' }
        ]
      }
    ]
  },

  // 5. DERECHO MERCANTIL I (CÓDIGO 1107)
  {
    id: 'm-1107',
    codigo: '1107',
    nombre: 'Derecho Mercantil I',
    anio: 4,
    creditos: 6,
    horasSemanales: 3,
    departamento: 'Derecho Mercantil',
    obligatoria: true,
    color: '#0F766E',
    prelaciones: ['1103'],
    secciones: [
      // MAÑANA
      {
        id: '1107-A', materiaId: 'm-1107', materiaNombre: 'Derecho Mercantil I', codigoMateria: '1107',
        anio: 4, seccion: 'A', turno: 'Mañana', profesor: 'Víctor Guidón', aula: '',
        cuposTotales: 65, cuposDisponibles: 10, color: '#0F766E',
        horarios: [
          { dia: 'Martes', horaInicio: '11:30', horaFin: '13:00' },
          { dia: 'Miércoles', horaInicio: '11:30', horaFin: '13:00' }
        ]
      },
      {
        id: '1107-B', materiaId: 'm-1107', materiaNombre: 'Derecho Mercantil I', codigoMateria: '1107',
        anio: 4, seccion: 'B (Bimodal)', turno: 'Mañana', profesor: 'Nayibe Chacón', aula: '',
        cuposTotales: 65, cuposDisponibles: 8, color: '#0F766E',
        horarios: [
          { dia: 'Lunes', horaInicio: '11:30', horaFin: '13:00' },
          { dia: 'Miércoles', horaInicio: '11:30', horaFin: '13:00' }
        ]
      },
      {
        id: '1107-C', materiaId: 'm-1107', materiaNombre: 'Derecho Mercantil I', codigoMateria: '1107',
        anio: 4, seccion: 'C', turno: 'Mañana', profesor: 'Adriana Domínguez', aula: '',
        cuposTotales: 60, cuposDisponibles: 12, color: '#0F766E',
        horarios: [
          { dia: 'Lunes', horaInicio: '07:00', horaFin: '08:30' },
          { dia: 'Jueves', horaInicio: '08:30', horaFin: '10:00' }
        ]
      },
      // TARDE
      {
        id: '1107-G', materiaId: 'm-1107', materiaNombre: 'Derecho Mercantil I', codigoMateria: '1107',
        anio: 4, seccion: 'G', turno: 'Tarde', profesor: 'Daniel Pérez Pereda', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 15, color: '#0F766E',
        horarios: [
          { dia: 'Martes', horaInicio: '14:30', horaFin: '16:00' },
          { dia: 'Miércoles', horaInicio: '13:00', horaFin: '14:30' }
        ]
      },
      {
        id: '1107-H', materiaId: 'm-1107', materiaNombre: 'Derecho Mercantil I', codigoMateria: '1107',
        anio: 4, seccion: 'H', turno: 'Tarde', profesor: 'Leonel Salazar', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 16, color: '#0F766E',
        horarios: [
          { dia: 'Lunes', horaInicio: '13:00', horaFin: '14:30' },
          { dia: 'Miércoles', horaInicio: '13:00', horaFin: '14:30' }
        ]
      },
      {
        id: '1107-I', materiaId: 'm-1107', materiaNombre: 'Derecho Mercantil I', codigoMateria: '1107',
        anio: 4, seccion: 'I (Bimodal)', turno: 'Tarde', profesor: 'Kimlen Chang Mora', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 18, color: '#0F766E',
        horarios: [
          { dia: 'Lunes', horaInicio: '14:30', horaFin: '16:00' },
          { dia: 'Miércoles', horaInicio: '14:30', horaFin: '16:00' }
        ]
      },
      // NOCHE
      {
        id: '1107-S', materiaId: 'm-1107', materiaNombre: 'Derecho Mercantil I', codigoMateria: '1107',
        anio: 4, seccion: 'S (Virtual)', turno: 'Noche', profesor: 'Diego Castagnino', aula: 'Virtual FCJP',
        cuposTotales: 65, cuposDisponibles: 22, color: '#0F766E',
        horarios: [
          { dia: 'Martes', horaInicio: '16:00', horaFin: '17:30' },
          { dia: 'Viernes', horaInicio: '17:30', horaFin: '19:00' }
        ]
      },
      {
        id: '1107-U', materiaId: 'm-1107', materiaNombre: 'Derecho Mercantil I', codigoMateria: '1107',
        anio: 4, seccion: 'U', turno: 'Noche', profesor: 'Gabriel Rodríguez', aula: '',
        cuposTotales: 65, cuposDisponibles: 25, color: '#0F766E',
        horarios: [
          { dia: 'Lunes', horaInicio: '17:30', horaFin: '19:00' },
          { dia: 'Miércoles', horaInicio: '17:30', horaFin: '19:00' }
        ]
      }
    ]
  },

  // 6. PRÁCTICA JURÍDICA II (CÓDIGO 1903)
  {
    id: 'm-1903',
    codigo: '1903',
    nombre: 'Práctica Jurídica II',
    anio: 4,
    creditos: 6,
    horasSemanales: 3,
    departamento: 'Práctica Forense',
    obligatoria: true,
    color: '#0284C7',
    prelaciones: ['1902'],
    secciones: [
      // MAÑANA
      {
        id: '1903-M02', materiaId: 'm-1903', materiaNombre: 'Práctica Jurídica II', codigoMateria: '1903',
        anio: 4, seccion: 'M02', turno: 'Mañana', profesor: 'Nelson Calderón', aula: '',
        cuposTotales: 35, cuposDisponibles: 12, color: '#0284C7',
        horarios: [{ dia: 'Martes', horaInicio: '07:00', horaFin: '10:00' }]
      },
      {
        id: '1903-M03', materiaId: 'm-1903', materiaNombre: 'Práctica Jurídica II', codigoMateria: '1903',
        anio: 4, seccion: 'M03', turno: 'Mañana', profesor: 'Nilyan Santana', aula: '',
        cuposTotales: 35, cuposDisponibles: 10, color: '#0284C7',
        horarios: [{ dia: 'Martes', horaInicio: '08:30', horaFin: '11:30' }]
      },
      {
        id: '1903-M04', materiaId: 'm-1903', materiaNombre: 'Práctica Jurídica II', codigoMateria: '1903',
        anio: 4, seccion: 'M04', turno: 'Mañana', profesor: 'Alfredo Montiel', aula: '',
        cuposTotales: 35, cuposDisponibles: 14, color: '#0284C7',
        horarios: [{ dia: 'Martes', horaInicio: '07:00', horaFin: '10:00' }]
      },
      {
        id: '1903-M06', materiaId: 'm-1903', materiaNombre: 'Práctica Jurídica II', codigoMateria: '1903',
        anio: 4, seccion: 'M06', turno: 'Mañana', profesor: 'Teresa Borges', aula: '',
        cuposTotales: 35, cuposDisponibles: 11, color: '#0284C7',
        horarios: [{ dia: 'Martes', horaInicio: '07:00', horaFin: '10:00' }]
      },
      {
        id: '1903-V09', materiaId: 'm-1903', materiaNombre: 'Práctica Jurídica II', codigoMateria: '1903',
        anio: 4, seccion: 'V09', turno: 'Mañana', profesor: 'Emerson Moro', aula: '',
        cuposTotales: 35, cuposDisponibles: 15, color: '#0284C7',
        horarios: [{ dia: 'Viernes', horaInicio: '08:30', horaFin: '11:30' }]
      },
      // TARDE
      {
        id: '1903-V02', materiaId: 'm-1903', materiaNombre: 'Práctica Jurídica II', codigoMateria: '1903',
        anio: 4, seccion: 'V02', turno: 'Tarde', profesor: 'Héctor Cardoze', aula: '',
        cuposTotales: 35, cuposDisponibles: 13, color: '#0284C7',
        horarios: [{ dia: 'Miércoles', horaInicio: '14:30', horaFin: '17:30' }]
      },
      {
        id: '1903-V07', materiaId: 'm-1903', materiaNombre: 'Práctica Jurídica II', codigoMateria: '1903',
        anio: 4, seccion: 'V07', turno: 'Tarde', profesor: 'Adriana Golding', aula: '',
        cuposTotales: 35, cuposDisponibles: 12, color: '#0284C7',
        horarios: [{ dia: 'Miércoles', horaInicio: '16:00', horaFin: '19:00' }]
      },
      {
        id: '1903-V08', materiaId: 'm-1903', materiaNombre: 'Práctica Jurídica II', codigoMateria: '1903',
        anio: 4, seccion: 'V08', turno: 'Tarde', profesor: 'María del M. Da Corte', aula: '',
        cuposTotales: 35, cuposDisponibles: 9, color: '#0284C7',
        horarios: [{ dia: 'Miércoles', horaInicio: '16:00', horaFin: '19:00' }]
      },
      {
        id: '1903-V11', materiaId: 'm-1903', materiaNombre: 'Práctica Jurídica II', codigoMateria: '1903',
        anio: 4, seccion: 'V11', turno: 'Tarde', profesor: 'Carlos Chacín', aula: '',
        cuposTotales: 35, cuposDisponibles: 16, color: '#0284C7',
        horarios: [{ dia: 'Viernes', horaInicio: '14:30', horaFin: '17:30' }]
      },
      {
        id: '1903-V15', materiaId: 'm-1903', materiaNombre: 'Práctica Jurídica II', codigoMateria: '1903',
        anio: 4, seccion: 'V15', turno: 'Tarde', profesor: 'Jesús Mendoza M.', aula: '',
        cuposTotales: 35, cuposDisponibles: 14, color: '#0284C7',
        horarios: [{ dia: 'Viernes', horaInicio: '14:30', horaFin: '17:30' }]
      },
      {
        id: '1903-V14', materiaId: 'm-1903', materiaNombre: 'Práctica Jurídica II', codigoMateria: '1903',
        anio: 4, seccion: 'V14', turno: 'Tarde', profesor: 'Desireé Ríos', aula: '',
        cuposTotales: 35, cuposDisponibles: 10, color: '#0284C7',
        horarios: [{ dia: 'Viernes', horaInicio: '16:00', horaFin: '19:00' }]
      }
    ]
  }
];
