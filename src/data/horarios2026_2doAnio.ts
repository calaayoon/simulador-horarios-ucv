import { Materia } from './horariosTypes';

// 2do Año - Programación Oficial UCV 2026 - 2027
export const MATERIAS_2DO_ANIO_2026: Materia[] = [
  // 1. DERECHO ROMANO II (CÓDIGO 1503)
  {
    id: 'm-1503',
    codigo: '1503',
    nombre: 'Derecho Romano II',
    anio: 2,
    creditos: 6,
    horasSemanales: 3,
    departamento: 'Derecho Privado',
    obligatoria: true,
    color: '#B45309',
    prelaciones: ['1502'],
    secciones: [
      // MAÑANA
      {
        id: '2627-1503-A', materiaId: 'm-1503', materiaNombre: 'Derecho Romano II', codigoMateria: '1503',
        anio: 2, seccion: 'A', turno: 'Mañana', profesor: 'Yoanny Nogales', aula: '',
        cuposTotales: 65, cuposDisponibles: 12, color: '#B45309',
        horarios: [
          { dia: 'Lunes', horaInicio: '07:00', horaFin: '08:30' },
          { dia: 'Miércoles', horaInicio: '07:00', horaFin: '08:30' }
        ]
      },
      {
        id: '2627-1503-B', materiaId: 'm-1503', materiaNombre: 'Derecho Romano II', codigoMateria: '1503',
        anio: 2, seccion: 'B', turno: 'Mañana', profesor: 'Hernán Matute', aula: '',
        cuposTotales: 65, cuposDisponibles: 15, color: '#B45309',
        horarios: [
          { dia: 'Miércoles', horaInicio: '11:30', horaFin: '13:00' },
          { dia: 'Jueves', horaInicio: '11:30', horaFin: '13:00' }
        ]
      },
      {
        id: '2627-1503-C', materiaId: 'm-1503', materiaNombre: 'Derecho Romano II', codigoMateria: '1503',
        anio: 2, seccion: 'C', turno: 'Mañana', profesor: 'Mirtha Guedez', aula: '',
        cuposTotales: 60, cuposDisponibles: 10, color: '#B45309',
        horarios: [
          { dia: 'Lunes', horaInicio: '08:30', horaFin: '10:00' },
          { dia: 'Miércoles', horaInicio: '08:30', horaFin: '10:00' }
        ]
      },
      {
        id: '2627-1503-D', materiaId: 'm-1503', materiaNombre: 'Derecho Romano II', codigoMateria: '1503',
        anio: 2, seccion: 'D', turno: 'Mañana', profesor: 'Tulio Álvarez', aula: '',
        cuposTotales: 60, cuposDisponibles: 8, color: '#B45309',
        horarios: [
          { dia: 'Lunes', horaInicio: '10:00', horaFin: '11:30' },
          { dia: 'Miércoles', horaInicio: '10:00', horaFin: '11:30' }
        ]
      },
      // TARDE
      {
        id: '2627-1503-G', materiaId: 'm-1503', materiaNombre: 'Derecho Romano II', codigoMateria: '1503',
        anio: 2, seccion: 'G', turno: 'Tarde', profesor: 'Antonio Marcoccio', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 16, color: '#B45309',
        horarios: [
          { dia: 'Miércoles', horaInicio: '13:00', horaFin: '14:30' },
          { dia: 'Viernes', horaInicio: '13:00', horaFin: '14:30' }
        ]
      },
      {
        id: '2627-1503-H', materiaId: 'm-1503', materiaNombre: 'Derecho Romano II', codigoMateria: '1503',
        anio: 2, seccion: 'H', turno: 'Tarde', profesor: 'Mirtha Guedez', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 14, color: '#B45309',
        horarios: [
          { dia: 'Martes', horaInicio: '14:30', horaFin: '16:00' },
          { dia: 'Miércoles', horaInicio: '14:30', horaFin: '16:00' }
        ]
      },
      {
        id: '2627-1503-I', materiaId: 'm-1503', materiaNombre: 'Derecho Romano II', codigoMateria: '1503',
        anio: 2, seccion: 'I', turno: 'Tarde', profesor: 'Vismark Rodríguez', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 18, color: '#B45309',
        horarios: [
          { dia: 'Martes', horaInicio: '14:30', horaFin: '16:00' },
          { dia: 'Jueves', horaInicio: '14:30', horaFin: '16:00' }
        ]
      },
      // NOCHE
      {
        id: '2627-1503-T', materiaId: 'm-1503', materiaNombre: 'Derecho Romano II', codigoMateria: '1503',
        anio: 2, seccion: 'T', turno: 'Noche', profesor: 'María A. Delgado', aula: '',
        cuposTotales: 65, cuposDisponibles: 22, color: '#B45309',
        horarios: [
          { dia: 'Martes', horaInicio: '17:30', horaFin: '19:00' },
          { dia: 'Viernes', horaInicio: '17:30', horaFin: '19:00' }
        ]
      },
      {
        id: '2627-1503-U', materiaId: 'm-1503', materiaNombre: 'Derecho Romano II', codigoMateria: '1503',
        anio: 2, seccion: 'U', turno: 'Noche', profesor: 'María A. Delgado', aula: '',
        cuposTotales: 65, cuposDisponibles: 20, color: '#B45309',
        horarios: [
          { dia: 'Jueves', horaInicio: '16:00', horaFin: '19:00' },
          { dia: 'Viernes', horaInicio: '17:30', horaFin: '19:00' }
        ]
      }
    ]
  },

  // 2. DERECHO ADMINISTRATIVO I (CÓDIGO 1202)
  {
    id: 'm-1202',
    codigo: '1202',
    nombre: 'Derecho Administrativo I',
    anio: 2,
    creditos: 6,
    horasSemanales: 3,
    departamento: 'Derecho Público',
    obligatoria: true,
    color: '#047857',
    prelaciones: ['1201'],
    secciones: [
      // MAÑANA
      {
        id: '2627-1202-A', materiaId: 'm-1202', materiaNombre: 'Derecho Administrativo I', codigoMateria: '1202',
        anio: 2, seccion: 'A', turno: 'Mañana', profesor: 'Gustavo Urdaneta', aula: '',
        cuposTotales: 70, cuposDisponibles: 10, color: '#047857',
        horarios: [
          { dia: 'Lunes', horaInicio: '08:30', horaFin: '10:00' },
          { dia: 'Jueves', horaInicio: '08:30', horaFin: '10:00' }
        ]
      },
      {
        id: '2627-1202-B', materiaId: 'm-1202', materiaNombre: 'Derecho Administrativo I', codigoMateria: '1202',
        anio: 2, seccion: 'B', turno: 'Mañana', profesor: 'Margarita Escudero', aula: '',
        cuposTotales: 65, cuposDisponibles: 14, color: '#047857',
        horarios: [
          { dia: 'Lunes', horaInicio: '07:00', horaFin: '08:30' },
          { dia: 'Jueves', horaInicio: '07:00', horaFin: '08:30' }
        ]
      },
      {
        id: '2627-1202-C', materiaId: 'm-1202', materiaNombre: 'Derecho Administrativo I', codigoMateria: '1202',
        anio: 2, seccion: 'C', turno: 'Mañana', profesor: 'Gustavo Linares', aula: '',
        cuposTotales: 70, cuposDisponibles: 6, color: '#047857',
        horarios: [
          { dia: 'Lunes', horaInicio: '11:30', horaFin: '13:00' },
          { dia: 'Jueves', horaInicio: '11:30', horaFin: '13:00' }
        ]
      },
      {
        id: '2627-1202-D', materiaId: 'm-1202', materiaNombre: 'Derecho Administrativo I', codigoMateria: '1202',
        anio: 2, seccion: 'D', turno: 'Mañana', profesor: 'Juan D. Alfonso', aula: '',
        cuposTotales: 65, cuposDisponibles: 12, color: '#047857',
        horarios: [
          { dia: 'Lunes', horaInicio: '07:00', horaFin: '08:30' },
          { dia: 'Jueves', horaInicio: '07:00', horaFin: '08:30' }
        ]
      },
      {
        id: '2627-1202-E', materiaId: 'm-1202', materiaNombre: 'Derecho Administrativo I', codigoMateria: '1202',
        anio: 2, seccion: 'E', turno: 'Mañana', profesor: 'Leonel A. Ferrer Urdaneta', aula: '',
        cuposTotales: 60, cuposDisponibles: 11, color: '#047857',
        horarios: [
          { dia: 'Miércoles', horaInicio: '07:00', horaFin: '08:30' },
          { dia: 'Viernes', horaInicio: '08:30', horaFin: '10:00' }
        ]
      },
      // TARDE
      {
        id: '2627-1202-G', materiaId: 'm-1202', materiaNombre: 'Derecho Administrativo I', codigoMateria: '1202',
        anio: 2, seccion: 'G', turno: 'Tarde', profesor: 'José Luis Velásquez', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 18, color: '#047857',
        horarios: [
          { dia: 'Lunes', horaInicio: '16:00', horaFin: '17:30' },
          { dia: 'Jueves', horaInicio: '13:00', horaFin: '14:30' }
        ]
      },
      {
        id: '2627-1202-H', materiaId: 'm-1202', materiaNombre: 'Derecho Administrativo I', codigoMateria: '1202',
        anio: 2, seccion: 'H', turno: 'Tarde', profesor: 'María Correa', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 15, color: '#047857',
        horarios: [
          { dia: 'Martes', horaInicio: '13:00', horaFin: '14:30' },
          { dia: 'Jueves', horaInicio: '13:00', horaFin: '14:30' }
        ]
      },
      {
        id: '2627-1202-I', materiaId: 'm-1202', materiaNombre: 'Derecho Administrativo I', codigoMateria: '1202',
        anio: 2, seccion: 'I (Bimodal)', turno: 'Tarde', profesor: 'José Peña Solís', aula: 'Nueva Sede FCJP',
        cuposTotales: 60, cuposDisponibles: 22, color: '#047857',
        horarios: [
          { dia: 'Lunes', horaInicio: '13:00', horaFin: '14:30' },
          { dia: 'Miércoles', horaInicio: '13:00', horaFin: '14:30' }
        ]
      },
      // NOCHE
      {
        id: '2627-1202-T', materiaId: 'm-1202', materiaNombre: 'Derecho Administrativo I', codigoMateria: '1202',
        anio: 2, seccion: 'T', turno: 'Noche', profesor: 'Edwin Romero', aula: '',
        cuposTotales: 65, cuposDisponibles: 23, color: '#047857',
        horarios: [
          { dia: 'Lunes', horaInicio: '17:30', horaFin: '19:00' },
          { dia: 'Miércoles', horaInicio: '17:30', horaFin: '19:00' }
        ]
      },
      {
        id: '2627-1202-U', materiaId: 'm-1202', materiaNombre: 'Derecho Administrativo I', codigoMateria: '1202',
        anio: 2, seccion: 'U', turno: 'Noche', profesor: 'Rodrigo Moncho', aula: '',
        cuposTotales: 65, cuposDisponibles: 25, color: '#047857',
        horarios: [
          { dia: 'Lunes', horaInicio: '17:30', horaFin: '19:00' },
          { dia: 'Viernes', horaInicio: '17:30', horaFin: '19:00' }
        ]
      }
    ]
  },

  // 3. DERECHO CIVIL II (CÓDIGO 1102)
  {
    id: 'm-1102',
    codigo: '1102',
    nombre: 'Derecho Civil II (Bienes y Derechos Reales)',
    anio: 2,
    creditos: 6,
    horasSemanales: 3,
    departamento: 'Derecho Privado',
    obligatoria: true,
    color: '#7b0000',
    prelaciones: ['1101', '1501'],
    secciones: [
      // MAÑANA
      {
        id: '2627-1102-A', materiaId: 'm-1102', materiaNombre: 'Derecho Civil II', codigoMateria: '1102',
        anio: 2, seccion: 'A', turno: 'Mañana', profesor: 'Luisa Sánchez', aula: '',
        cuposTotales: 65, cuposDisponibles: 10, color: '#7b0000',
        horarios: [
          { dia: 'Martes', horaInicio: '08:30', horaFin: '10:00' },
          { dia: 'Miércoles', horaInicio: '10:00', horaFin: '11:30' }
        ]
      },
      {
        id: '2627-1102-B', materiaId: 'm-1102', materiaNombre: 'Derecho Civil II', codigoMateria: '1102',
        anio: 2, seccion: 'B', turno: 'Mañana', profesor: 'Dilia Ribeiro', aula: '',
        cuposTotales: 65, cuposDisponibles: 8, color: '#7b0000',
        horarios: [
          { dia: 'Miércoles', horaInicio: '10:00', horaFin: '11:30' },
          { dia: 'Jueves', horaInicio: '10:00', horaFin: '11:30' }
        ]
      },
      {
        id: '2627-1102-C', materiaId: 'm-1102', materiaNombre: 'Derecho Civil II', codigoMateria: '1102',
        anio: 2, seccion: 'C', turno: 'Mañana', profesor: 'Luisa Sánchez', aula: '',
        cuposTotales: 60, cuposDisponibles: 12, color: '#7b0000',
        horarios: [
          { dia: 'Martes', horaInicio: '07:00', horaFin: '08:30' },
          { dia: 'Miércoles', horaInicio: '08:30', horaFin: '10:00' }
        ]
      },
      {
        id: '2627-1102-D', materiaId: 'm-1102', materiaNombre: 'Derecho Civil II', codigoMateria: '1102',
        anio: 2, seccion: 'D', turno: 'Mañana', profesor: 'Antonio Callaos', aula: '',
        cuposTotales: 60, cuposDisponibles: 15, color: '#7b0000',
        horarios: [
          { dia: 'Martes', horaInicio: '11:30', horaFin: '13:00' },
          { dia: 'Jueves', horaInicio: '11:30', horaFin: '13:00' }
        ]
      },
      // TARDE
      {
        id: '2627-1102-G', materiaId: 'm-1102', materiaNombre: 'Derecho Civil II', codigoMateria: '1102',
        anio: 2, seccion: 'G', turno: 'Tarde', profesor: 'Dilia Ribeiro', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 17, color: '#7b0000',
        horarios: [
          { dia: 'Martes', horaInicio: '13:00', horaFin: '14:30' },
          { dia: 'Miércoles', horaInicio: '14:30', horaFin: '16:00' }
        ]
      },
      {
        id: '2627-1102-I', materiaId: 'm-1102', materiaNombre: 'Derecho Civil II', codigoMateria: '1102',
        anio: 2, seccion: 'I', turno: 'Tarde', profesor: 'Carlos Ortiz F.', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 14, color: '#7b0000',
        horarios: [
          { dia: 'Lunes', horaInicio: '16:00', horaFin: '17:30' },
          { dia: 'Martes', horaInicio: '16:00', horaFin: '17:30' }
        ]
      },
      // NOCHE
      {
        id: '2627-1102-T', materiaId: 'm-1102', materiaNombre: 'Derecho Civil II', codigoMateria: '1102',
        anio: 2, seccion: 'T', turno: 'Noche', profesor: 'Carlos Ortiz F.', aula: '',
        cuposTotales: 65, cuposDisponibles: 20, color: '#7b0000',
        horarios: [
          { dia: 'Lunes', horaInicio: '17:30', horaFin: '19:00' },
          { dia: 'Miércoles', horaInicio: '16:00', horaFin: '17:30' }
        ]
      },
      {
        id: '2627-1102-U', materiaId: 'm-1102', materiaNombre: 'Derecho Civil II', codigoMateria: '1102',
        anio: 2, seccion: 'U', turno: 'Noche', profesor: 'Daniel Gomes', aula: '',
        cuposTotales: 65, cuposDisponibles: 22, color: '#7b0000',
        horarios: [
          { dia: 'Lunes', horaInicio: '17:30', horaFin: '19:00' },
          { dia: 'Martes', horaInicio: '16:00', horaFin: '17:30' }
        ]
      },
      {
        id: '2627-1102-V', materiaId: 'm-1102', materiaNombre: 'Derecho Civil II', codigoMateria: '1102',
        anio: 2, seccion: 'V', turno: 'Noche', profesor: 'Carlos Pérez', aula: '',
        cuposTotales: 65, cuposDisponibles: 24, color: '#7b0000',
        horarios: [
          { dia: 'Lunes', horaInicio: '17:30', horaFin: '19:00' },
          { dia: 'Viernes', horaInicio: '17:30', horaFin: '19:00' }
        ]
      }
    ]
  },

  // 4. DERECHO INTERNACIONAL PÚBLICO (CÓDIGO 1206)
  {
    id: 'm-1206',
    codigo: '1206',
    nombre: 'Derecho Internacional Público',
    anio: 2,
    creditos: 6,
    horasSemanales: 3,
    departamento: 'Derecho Internacional',
    obligatoria: true,
    color: '#4338CA',
    prelaciones: ['1201'],
    secciones: [
      // MAÑANA
      {
        id: '2627-1206-A', materiaId: 'm-1206', materiaNombre: 'Derecho Internacional Público', codigoMateria: '1206',
        anio: 2, seccion: 'A', turno: 'Mañana', profesor: 'Adalberto Urbina', aula: '',
        cuposTotales: 65, cuposDisponibles: 12, color: '#4338CA',
        horarios: [
          { dia: 'Martes', horaInicio: '10:00', horaFin: '11:30' },
          { dia: 'Jueves', horaInicio: '10:00', horaFin: '11:30' }
        ]
      },
      {
        id: '2627-1206-B', materiaId: 'm-1206', materiaNombre: 'Derecho Internacional Público', codigoMateria: '1206',
        anio: 2, seccion: 'B', turno: 'Mañana', profesor: 'Carmela Harris', aula: '',
        cuposTotales: 65, cuposDisponibles: 9, color: '#4338CA',
        horarios: [
          { dia: 'Martes', horaInicio: '08:30', horaFin: '10:00' },
          { dia: 'Jueves', horaInicio: '08:30', horaFin: '10:00' }
        ]
      },
      {
        id: '2627-1206-C', materiaId: 'm-1206', materiaNombre: 'Derecho Internacional Público', codigoMateria: '1206',
        anio: 2, seccion: 'C', turno: 'Mañana', profesor: 'Santo Morrone', aula: '',
        cuposTotales: 60, cuposDisponibles: 15, color: '#4338CA',
        horarios: [
          { dia: 'Jueves', horaInicio: '10:00', horaFin: '11:30' },
          { dia: 'Viernes', horaInicio: '10:00', horaFin: '11:30' }
        ]
      },
      {
        id: '2627-1206-D', materiaId: 'm-1206', materiaNombre: 'Derecho Internacional Público', codigoMateria: '1206',
        anio: 2, seccion: 'D', turno: 'Mañana', profesor: 'Jerson Revanales', aula: '',
        cuposTotales: 60, cuposDisponibles: 14, color: '#4338CA',
        horarios: [
          { dia: 'Martes', horaInicio: '07:00', horaFin: '08:30' },
          { dia: 'Miércoles', horaInicio: '07:00', horaFin: '08:30' }
        ]
      },
      // TARDE
      {
        id: '2627-1206-H', materiaId: 'm-1206', materiaNombre: 'Derecho Internacional Público', codigoMateria: '1206',
        anio: 2, seccion: 'H', turno: 'Tarde', profesor: 'Roxana Orihuela', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 18, color: '#4338CA',
        horarios: [
          { dia: 'Miércoles', horaInicio: '16:00', horaFin: '17:30' },
          { dia: 'Jueves', horaInicio: '14:30', horaFin: '16:00' }
        ]
      },
      {
        id: '2627-1206-I', materiaId: 'm-1206', materiaNombre: 'Derecho Internacional Público', codigoMateria: '1206',
        anio: 2, seccion: 'I', turno: 'Tarde', profesor: 'Alexis Algarra', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 16, color: '#4338CA',
        horarios: [
          { dia: 'Martes', horaInicio: '13:00', horaFin: '14:30' },
          { dia: 'Miércoles', horaInicio: '14:30', horaFin: '16:00' }
        ]
      },
      // NOCHE
      {
        id: '2627-1206-S', materiaId: 'm-1206', materiaNombre: 'Derecho Internacional Público', codigoMateria: '1206',
        anio: 2, seccion: 'S', turno: 'Noche', profesor: 'Jesus Ollarves I.', aula: '',
        cuposTotales: 65, cuposDisponibles: 22, color: '#4338CA',
        horarios: [
          { dia: 'Martes', horaInicio: '17:30', horaFin: '19:00' },
          { dia: 'Miércoles', horaInicio: '17:30', horaFin: '19:00' }
        ]
      },
      {
        id: '2627-1206-U', materiaId: 'm-1206', materiaNombre: 'Derecho Internacional Público', codigoMateria: '1206',
        anio: 2, seccion: 'U', turno: 'Noche', profesor: 'Lenin Sosa', aula: '',
        cuposTotales: 65, cuposDisponibles: 25, color: '#4338CA',
        horarios: [
          { dia: 'Miércoles', horaInicio: '16:00', horaFin: '17:30' },
          { dia: 'Jueves', horaInicio: '17:30', horaFin: '19:00' }
        ]
      }
    ]
  },

  // 5. DERECHO PENAL I (CÓDIGO 1301)
  {
    id: 'm-1301',
    codigo: '1301',
    nombre: 'Derecho Penal I',
    anio: 2,
    creditos: 6,
    horasSemanales: 3,
    departamento: 'Ciencias Penales',
    obligatoria: true,
    color: '#991B1B',
    prelaciones: [],
    secciones: [
      // MAÑANA
      {
        id: '2627-1301-A', materiaId: 'm-1301', materiaNombre: 'Derecho Penal I', codigoMateria: '1301',
        anio: 2, seccion: 'A', turno: 'Mañana', profesor: 'María Pérez Dupuy', aula: '',
        cuposTotales: 65, cuposDisponibles: 9, color: '#991B1B',
        horarios: [
          { dia: 'Miércoles', horaInicio: '08:30', horaFin: '10:00' },
          { dia: 'Viernes', horaInicio: '08:30', horaFin: '10:00' }
        ]
      },
      {
        id: '2627-1301-B', materiaId: 'm-1301', materiaNombre: 'Derecho Penal I', codigoMateria: '1301',
        anio: 2, seccion: 'B', turno: 'Mañana', profesor: 'Yván Figueroa Ortega', aula: '',
        cuposTotales: 70, cuposDisponibles: 6, color: '#991B1B',
        horarios: [
          { dia: 'Martes', horaInicio: '07:00', horaFin: '08:30' },
          { dia: 'Miércoles', horaInicio: '07:00', horaFin: '08:30' }
        ]
      },
      {
        id: '2627-1301-C', materiaId: 'm-1301', materiaNombre: 'Derecho Penal I', codigoMateria: '1301',
        anio: 2, seccion: 'C', turno: 'Mañana', profesor: 'Yván Figueroa Ortega', aula: '',
        cuposTotales: 70, cuposDisponibles: 8, color: '#991B1B',
        horarios: [
          { dia: 'Lunes', horaInicio: '07:00', horaFin: '08:30' },
          { dia: 'Viernes', horaInicio: '07:00', horaFin: '08:30' }
        ]
      },
      {
        id: '2627-1301-D', materiaId: 'm-1301', materiaNombre: 'Derecho Penal I', codigoMateria: '1301',
        anio: 2, seccion: 'D', turno: 'Mañana', profesor: 'Yván Figueroa Ortega', aula: '',
        cuposTotales: 70, cuposDisponibles: 5, color: '#991B1B',
        horarios: [
          { dia: 'Miércoles', horaInicio: '08:30', horaFin: '10:00' },
          { dia: 'Viernes', horaInicio: '08:30', horaFin: '10:00' }
        ]
      },
      {
        id: '2627-1301-E', materiaId: 'm-1301', materiaNombre: 'Derecho Penal I', codigoMateria: '1301',
        anio: 2, seccion: 'E', turno: 'Mañana', profesor: 'Moira Martínez', aula: '',
        cuposTotales: 60, cuposDisponibles: 14, color: '#991B1B',
        horarios: [
          { dia: 'Lunes', horaInicio: '10:00', horaFin: '11:30' },
          { dia: 'Martes', horaInicio: '11:30', horaFin: '13:00' }
        ]
      },
      // TARDE
      {
        id: '2627-1301-G', materiaId: 'm-1301', materiaNombre: 'Derecho Penal I', codigoMateria: '1301',
        anio: 2, seccion: 'G', turno: 'Tarde', profesor: 'Wilmen Romero', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 16, color: '#991B1B',
        horarios: [
          { dia: 'Lunes', horaInicio: '14:30', horaFin: '16:00' },
          { dia: 'Martes', horaInicio: '14:30', horaFin: '16:00' }
        ]
      },
      {
        id: '2627-1301-H', materiaId: 'm-1301', materiaNombre: 'Derecho Penal I', codigoMateria: '1301',
        anio: 2, seccion: 'H', turno: 'Tarde', profesor: 'Wilmen Romero', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 18, color: '#991B1B',
        horarios: [
          { dia: 'Lunes', horaInicio: '13:00', horaFin: '14:30' },
          { dia: 'Jueves', horaInicio: '13:00', horaFin: '14:30' }
        ]
      },
      {
        id: '2627-1301-I', materiaId: 'm-1301', materiaNombre: 'Derecho Penal I', codigoMateria: '1301',
        anio: 2, seccion: 'I', turno: 'Tarde', profesor: 'Gabriela Chaurio', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 20, color: '#991B1B',
        horarios: [
          { dia: 'Miércoles', horaInicio: '16:00', horaFin: '17:30' },
          { dia: 'Viernes', horaInicio: '16:00', horaFin: '17:30' }
        ]
      },
      // NOCHE
      {
        id: '2627-1301-S', materiaId: 'm-1301', materiaNombre: 'Derecho Penal I', codigoMateria: '1301',
        anio: 2, seccion: 'S', turno: 'Noche', profesor: 'Jorge Núñez', aula: '',
        cuposTotales: 65, cuposDisponibles: 22, color: '#991B1B',
        horarios: [
          { dia: 'Miércoles', horaInicio: '17:30', horaFin: '19:00' },
          { dia: 'Viernes', horaInicio: '17:30', horaFin: '19:00' }
        ]
      }
    ]
  },

  // 6. CRIMINOLOGÍA (CÓDIGO 1303)
  {
    id: 'm-1303',
    codigo: '1303',
    nombre: 'Criminología',
    anio: 2,
    creditos: 6,
    horasSemanales: 3,
    departamento: 'Ciencias Penales',
    obligatoria: true,
    color: '#334155',
    prelaciones: [],
    secciones: [
      // MAÑANA
      {
        id: '2627-1303-A', materiaId: 'm-1303', materiaNombre: 'Criminología', codigoMateria: '1303',
        anio: 2, seccion: 'A', turno: 'Mañana', profesor: 'Sabino Motrone', aula: '',
        cuposTotales: 60, cuposDisponibles: 12, color: '#334155',
        horarios: [
          { dia: 'Lunes', horaInicio: '10:00', horaFin: '11:30' },
          { dia: 'Martes', horaInicio: '10:00', horaFin: '11:30' }
        ]
      },
      {
        id: '2627-1303-B', materiaId: 'm-1303', materiaNombre: 'Criminología', codigoMateria: '1303',
        anio: 2, seccion: 'B (1 día)', turno: 'Mañana', profesor: 'Keymer Ávila', aula: '',
        cuposTotales: 65, cuposDisponibles: 8, color: '#334155',
        horarios: [{ dia: 'Lunes', horaInicio: '10:00', horaFin: '13:00' }]
      },
      {
        id: '2627-1303-C', materiaId: 'm-1303', materiaNombre: 'Criminología', codigoMateria: '1303',
        anio: 2, seccion: 'C (Bimodal)', turno: 'Mañana', profesor: 'María J. Ferrer', aula: '',
        cuposTotales: 60, cuposDisponibles: 14, color: '#334155',
        horarios: [
          { dia: 'Martes', horaInicio: '10:00', horaFin: '11:30' },
          { dia: 'Miércoles', horaInicio: '10:00', horaFin: '11:30' }
        ]
      },
      {
        id: '2627-1303-D', materiaId: 'm-1303', materiaNombre: 'Criminología', codigoMateria: '1303',
        anio: 2, seccion: 'D', turno: 'Mañana', profesor: 'Moira Martínez', aula: '',
        cuposTotales: 60, cuposDisponibles: 16, color: '#334155',
        horarios: [
          { dia: 'Lunes', horaInicio: '11:30', horaFin: '13:00' },
          { dia: 'Martes', horaInicio: '10:00', horaFin: '11:30' }
        ]
      },
      // TARDE
      {
        id: '2627-1303-G', materiaId: 'm-1303', materiaNombre: 'Criminología', codigoMateria: '1303',
        anio: 2, seccion: 'G', turno: 'Tarde', profesor: 'Moira Martínez', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 15, color: '#334155',
        horarios: [
          { dia: 'Lunes', horaInicio: '13:00', horaFin: '14:30' },
          { dia: 'Martes', horaInicio: '16:00', horaFin: '17:30' }
        ]
      },
      {
        id: '2627-1303-H', materiaId: 'm-1303', materiaNombre: 'Criminología', codigoMateria: '1303',
        anio: 2, seccion: 'H', turno: 'Tarde', profesor: 'Andrés Antillano', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 13, color: '#334155',
        horarios: [
          { dia: 'Miércoles', horaInicio: '16:00', horaFin: '17:30' },
          { dia: 'Jueves', horaInicio: '16:00', horaFin: '17:30' }
        ]
      },
      {
        id: '2627-1303-I', materiaId: 'm-1303', materiaNombre: 'Criminología', codigoMateria: '1303',
        anio: 2, seccion: 'I', turno: 'Tarde', profesor: 'Moira Martínez', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 18, color: '#334155',
        horarios: [
          { dia: 'Lunes', horaInicio: '14:30', horaFin: '16:00' },
          { dia: 'Jueves', horaInicio: '14:30', horaFin: '16:00' }
        ]
      },
      // NOCHE
      {
        id: '2627-1303-U', materiaId: 'm-1303', materiaNombre: 'Criminología', codigoMateria: '1303',
        anio: 2, seccion: 'U', turno: 'Noche', profesor: 'Luis Izquiel', aula: '',
        cuposTotales: 65, cuposDisponibles: 22, color: '#334155',
        horarios: [
          { dia: 'Martes', horaInicio: '17:30', horaFin: '19:00' },
          { dia: 'Miércoles', horaInicio: '17:30', horaFin: '19:00' }
        ]
      }
    ]
  }
];
