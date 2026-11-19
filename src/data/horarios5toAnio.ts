import { Materia } from './horariosTypes';

// 5to Año - Programación Oficial UCV 2025 - 2026
export const MATERIAS_5TO_ANIO: Materia[] = [
  // 1. DERECHO ADMINISTRATIVO III (CÓDIGO 1207)
  {
    id: 'm-1207',
    codigo: '1207',
    nombre: 'Derecho Administrativo III',
    anio: 5,
    creditos: 6,
    horasSemanales: 3,
    departamento: 'Derecho Público',
    obligatoria: true,
    color: '#047857',
    prelaciones: ['1203', '1401'],
    secciones: [
      // MAÑANA
      {
        id: '1207-A', materiaId: 'm-1207', materiaNombre: 'Derecho Administrativo III', codigoMateria: '1207',
        anio: 5, seccion: 'A', turno: 'Mañana', profesor: 'Rafael Chavero Gazdik', aula: '',
        cuposTotales: 65, cuposDisponibles: 10, color: '#047857',
        horarios: [
          { dia: 'Lunes', horaInicio: '07:00', horaFin: '08:30' },
          { dia: 'Jueves', horaInicio: '07:00', horaFin: '08:30' }
        ]
      },
      {
        id: '1207-B', materiaId: 'm-1207', materiaNombre: 'Derecho Administrativo III', codigoMateria: '1207',
        anio: 5, seccion: 'B', turno: 'Mañana', profesor: 'Miguel Ángel Torrealba', aula: '',
        cuposTotales: 65, cuposDisponibles: 12, color: '#047857',
        horarios: [
          { dia: 'Lunes', horaInicio: '07:00', horaFin: '08:30' },
          { dia: 'Viernes', horaInicio: '07:00', horaFin: '08:30' }
        ]
      },
      {
        id: '1207-B01', materiaId: 'm-1207', materiaNombre: 'Derecho Administrativo III', codigoMateria: '1207',
        anio: 5, seccion: 'B-01', turno: 'Mañana', profesor: 'José Luis Castillo', aula: '',
        cuposTotales: 65, cuposDisponibles: 15, color: '#047857',
        horarios: [
          { dia: 'Lunes', horaInicio: '07:00', horaFin: '08:30' },
          { dia: 'Jueves', horaInicio: '07:00', horaFin: '08:30' }
        ]
      },
      {
        id: '1207-C', materiaId: 'm-1207', materiaNombre: 'Derecho Administrativo III', codigoMateria: '1207',
        anio: 5, seccion: 'C (1 día)', turno: 'Mañana', profesor: 'Eglée González Lobato', aula: '',
        cuposTotales: 60, cuposDisponibles: 8, color: '#047857',
        horarios: [{ dia: 'Lunes', horaInicio: '08:30', horaFin: '11:30' }]
      },
      // TARDE
      {
        id: '1207-G', materiaId: 'm-1207', materiaNombre: 'Derecho Administrativo III', codigoMateria: '1207',
        anio: 5, seccion: 'G', turno: 'Tarde', profesor: 'Carlos Luis Carrillo', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 16, color: '#047857',
        horarios: [
          { dia: 'Lunes', horaInicio: '16:00', horaFin: '17:30' },
          { dia: 'Jueves', horaInicio: '14:30', horaFin: '16:00' }
        ]
      },
      {
        id: '1207-H', materiaId: 'm-1207', materiaNombre: 'Derecho Administrativo III', codigoMateria: '1207',
        anio: 5, seccion: 'H', turno: 'Tarde', profesor: 'José Gregorio Silva B.', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 14, color: '#047857',
        horarios: [{ dia: 'Miércoles', horaInicio: '16:00', horaFin: '19:00' }]
      },
      // NOCHE
      {
        id: '1207-S', materiaId: 'm-1207', materiaNombre: 'Derecho Administrativo III', codigoMateria: '1207',
        anio: 5, seccion: 'S (Bimodal)', turno: 'Noche', profesor: 'Gustavo Amoni Reverón', aula: '',
        cuposTotales: 65, cuposDisponibles: 20, color: '#047857',
        horarios: [
          { dia: 'Lunes', horaInicio: '16:00', horaFin: '17:30' },
          { dia: 'Viernes', horaInicio: '17:30', horaFin: '19:00' }
        ]
      },
      {
        id: '1207-T', materiaId: 'm-1207', materiaNombre: 'Derecho Administrativo III', codigoMateria: '1207',
        anio: 5, seccion: 'T', turno: 'Noche', profesor: 'Gonzalo Pérez Salazar', aula: '',
        cuposTotales: 65, cuposDisponibles: 22, color: '#047857',
        horarios: [
          { dia: 'Lunes', horaInicio: '17:30', horaFin: '19:00' },
          { dia: 'Viernes', horaInicio: '17:30', horaFin: '19:00' }
        ]
      },
      {
        id: '1207-U', materiaId: 'm-1207', materiaNombre: 'Derecho Administrativo III', codigoMateria: '1207',
        anio: 5, seccion: 'U', turno: 'Noche', profesor: 'José Luis Velásquez', aula: '',
        cuposTotales: 65, cuposDisponibles: 24, color: '#047857',
        horarios: [
          { dia: 'Martes', horaInicio: '17:30', horaFin: '19:00' },
          { dia: 'Jueves', horaInicio: '17:30', horaFin: '19:00' }
        ]
      }
    ]
  },

  // 2. DERECHO INTERNACIONAL PRIVADO (CÓDIGO 1110)
  {
    id: 'm-1110',
    codigo: '1110',
    nombre: 'Derecho Internacional Privado',
    anio: 5,
    creditos: 6,
    horasSemanales: 3,
    departamento: 'Derecho Internacional',
    obligatoria: true,
    color: '#6D28D9',
    prelaciones: ['1103', '1401'],
    secciones: [
      // MAÑANA
      {
        id: '1110-A', materiaId: 'm-1110', materiaNombre: 'Derecho Internacional Privado', codigoMateria: '1110',
        anio: 5, seccion: 'A (Virtual)', turno: 'Mañana', profesor: 'Claudia Madrid Martínez', aula: 'Virtual FCJP',
        cuposTotales: 70, cuposDisponibles: 6, color: '#6D28D9',
        horarios: [
          { dia: 'Martes', horaInicio: '07:00', horaFin: '08:30' },
          { dia: 'Viernes', horaInicio: '07:00', horaFin: '08:30' }
        ]
      },
      {
        id: '1110-B', materiaId: 'm-1110', materiaNombre: 'Derecho Internacional Privado', codigoMateria: '1110',
        anio: 5, seccion: 'B (1 día)', turno: 'Mañana', profesor: 'Víctor Garrido', aula: '',
        cuposTotales: 60, cuposDisponibles: 10, color: '#6D28D9',
        horarios: [{ dia: 'Miércoles', horaInicio: '10:00', horaFin: '13:00' }]
      },
      {
        id: '1110-C', materiaId: 'm-1110', materiaNombre: 'Derecho Internacional Privado', codigoMateria: '1110',
        anio: 5, seccion: 'C', turno: 'Mañana', profesor: 'Eugenio Hernández Bretón', aula: '',
        cuposTotales: 65, cuposDisponibles: 8, color: '#6D28D9',
        horarios: [
          { dia: 'Martes', horaInicio: '07:00', horaFin: '08:30' },
          { dia: 'Jueves', horaInicio: '07:00', horaFin: '08:30' }
        ]
      },
      // NOCHE
      {
        id: '1110-U', materiaId: 'm-1110', materiaNombre: 'Derecho Internacional Privado', codigoMateria: '1110',
        anio: 5, seccion: 'U', turno: 'Noche', profesor: 'Javier Ochoa', aula: '',
        cuposTotales: 65, cuposDisponibles: 22, color: '#6D28D9',
        horarios: [
          { dia: 'Lunes', horaInicio: '16:00', horaFin: '17:30' },
          { dia: 'Miércoles', horaInicio: '17:30', horaFin: '19:00' }
        ]
      },
      {
        id: '1110-V', materiaId: 'm-1110', materiaNombre: 'Derecho Internacional Privado', codigoMateria: '1110',
        anio: 5, seccion: 'V', turno: 'Noche', profesor: 'Claudia Lugo', aula: '',
        cuposTotales: 65, cuposDisponibles: 25, color: '#6D28D9',
        horarios: [
          { dia: 'Lunes', horaInicio: '17:30', horaFin: '19:00' },
          { dia: 'Jueves', horaInicio: '17:30', horaFin: '19:00' }
        ]
      }
    ]
  },

  // 3. DERECHO PROCESAL CIVIL II (CÓDIGO 1402)
  {
    id: 'm-1402',
    codigo: '1402',
    nombre: 'Derecho Procesal Civil II',
    anio: 5,
    creditos: 6,
    horasSemanales: 3,
    departamento: 'Derecho Procesal',
    obligatoria: true,
    color: '#B45309',
    prelaciones: ['1401'],
    secciones: [
      // MAÑANA
      {
        id: '1402-A', materiaId: 'm-1402', materiaNombre: 'Derecho Procesal Civil II', codigoMateria: '1402',
        anio: 5, seccion: 'A', turno: 'Mañana', profesor: 'Tulio Álvarez', aula: '',
        cuposTotales: 65, cuposDisponibles: 9, color: '#B45309',
        horarios: [
          { dia: 'Martes', horaInicio: '08:30', horaFin: '10:00' },
          { dia: 'Miércoles', horaInicio: '08:30', horaFin: '10:00' }
        ]
      },
      {
        id: '1402-B', materiaId: 'm-1402', materiaNombre: 'Derecho Procesal Civil II', codigoMateria: '1402',
        anio: 5, seccion: 'B', turno: 'Mañana', profesor: 'Nilyan Santana', aula: '',
        cuposTotales: 65, cuposDisponibles: 11, color: '#B45309',
        horarios: [
          { dia: 'Martes', horaInicio: '07:00', horaFin: '08:30' },
          { dia: 'Miércoles', horaInicio: '07:00', horaFin: '08:30' }
        ]
      },
      {
        id: '1402-C', materiaId: 'm-1402', materiaNombre: 'Derecho Procesal Civil II', codigoMateria: '1402',
        anio: 5, seccion: 'C', turno: 'Mañana', profesor: 'Máximo Febres', aula: '',
        cuposTotales: 60, cuposDisponibles: 14, color: '#B45309',
        horarios: [
          { dia: 'Martes', horaInicio: '10:00', horaFin: '11:30' },
          { dia: 'Viernes', horaInicio: '10:00', horaFin: '11:30' }
        ]
      },
      // TARDE
      {
        id: '1402-G', materiaId: 'm-1402', materiaNombre: 'Derecho Procesal Civil II', codigoMateria: '1402',
        anio: 5, seccion: 'G', turno: 'Tarde', profesor: 'Josué Rodríguez', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 16, color: '#B45309',
        horarios: [
          { dia: 'Martes', horaInicio: '16:00', horaFin: '17:30' },
          { dia: 'Jueves', horaInicio: '16:00', horaFin: '17:30' }
        ]
      },
      // NOCHE
      {
        id: '1402-S', materiaId: 'm-1402', materiaNombre: 'Derecho Procesal Civil II', codigoMateria: '1402',
        anio: 5, seccion: 'S', turno: 'Noche', profesor: 'Héctor Cardoze', aula: '',
        cuposTotales: 65, cuposDisponibles: 20, color: '#B45309',
        horarios: [
          { dia: 'Martes', horaInicio: '17:30', horaFin: '19:00' },
          { dia: 'Miércoles', horaInicio: '17:30', horaFin: '19:00' }
        ]
      },
      {
        id: '1402-T', materiaId: 'm-1402', materiaNombre: 'Derecho Procesal Civil II', codigoMateria: '1402',
        anio: 5, seccion: 'T', turno: 'Noche', profesor: 'Juan Carlos Apitz', aula: '',
        cuposTotales: 65, cuposDisponibles: 22, color: '#B45309',
        horarios: [
          { dia: 'Miércoles', horaInicio: '17:30', horaFin: '19:00' },
          { dia: 'Jueves', horaInicio: '17:30', horaFin: '19:00' }
        ]
      },
      {
        id: '1402-U', materiaId: 'm-1402', materiaNombre: 'Derecho Procesal Civil II', codigoMateria: '1402',
        anio: 5, seccion: 'U', turno: 'Noche', profesor: 'Carlos Chacín', aula: '',
        cuposTotales: 65, cuposDisponibles: 24, color: '#B45309',
        horarios: [
          { dia: 'Lunes', horaInicio: '17:30', horaFin: '19:00' },
          { dia: 'Martes', horaInicio: '17:30', horaFin: '19:00' }
        ]
      },
      {
        id: '1402-V', materiaId: 'm-1402', materiaNombre: 'Derecho Procesal Civil II', codigoMateria: '1402',
        anio: 5, seccion: 'V', turno: 'Noche', profesor: 'Humberto Angrisano', aula: '',
        cuposTotales: 65, cuposDisponibles: 25, color: '#B45309',
        horarios: [{ dia: 'Jueves', horaInicio: '16:00', horaFin: '19:00' }]
      }
    ]
  },

  // 4. DERECHO PROCESAL PENAL (CÓDIGO 1403)
  {
    id: 'm-1403',
    codigo: '1403',
    nombre: 'Derecho Procesal Penal',
    anio: 5,
    creditos: 6,
    horasSemanales: 3,
    departamento: 'Derecho Procesal',
    obligatoria: true,
    color: '#991B1B',
    prelaciones: ['1302', '1401'],
    secciones: [
      // MAÑANA
      {
        id: '1403-A', materiaId: 'm-1403', materiaNombre: 'Derecho Procesal Penal', codigoMateria: '1403',
        anio: 5, seccion: 'A (Bimodal)', turno: 'Mañana', profesor: 'José Tadeo Saín', aula: '',
        cuposTotales: 65, cuposDisponibles: 9, color: '#991B1B',
        horarios: [
          { dia: 'Martes', horaInicio: '07:00', horaFin: '08:30' },
          { dia: 'Miércoles', horaInicio: '07:00', horaFin: '08:30' }
        ]
      },
      {
        id: '1403-B', materiaId: 'm-1403', materiaNombre: 'Derecho Procesal Penal', codigoMateria: '1403',
        anio: 5, seccion: 'B', turno: 'Mañana', profesor: 'Jorge Núñez', aula: '',
        cuposTotales: 65, cuposDisponibles: 12, color: '#991B1B',
        horarios: [
          { dia: 'Jueves', horaInicio: '08:30', horaFin: '10:00' },
          { dia: 'Viernes', horaInicio: '10:00', horaFin: '11:30' }
        ]
      },
      {
        id: '1403-C', materiaId: 'm-1403', materiaNombre: 'Derecho Procesal Penal', codigoMateria: '1403',
        anio: 5, seccion: 'C (Virtual)', turno: 'Mañana', profesor: 'Javier Elechiguerra', aula: 'Virtual FCJP',
        cuposTotales: 70, cuposDisponibles: 8, color: '#991B1B',
        horarios: [
          { dia: 'Miércoles', horaInicio: '07:00', horaFin: '08:30' },
          { dia: 'Viernes', horaInicio: '07:00', horaFin: '08:30' }
        ]
      },
      // TARDE
      {
        id: '1403-G', materiaId: 'm-1403', materiaNombre: 'Derecho Procesal Penal', codigoMateria: '1403',
        anio: 5, seccion: 'G', turno: 'Tarde', profesor: 'Ángel Zerpa', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 14, color: '#991B1B',
        horarios: [
          { dia: 'Miércoles', horaInicio: '14:30', horaFin: '16:00' },
          { dia: 'Jueves', horaInicio: '14:30', horaFin: '16:00' }
        ]
      },
      {
        id: '1403-H', materiaId: 'm-1403', materiaNombre: 'Derecho Procesal Penal', codigoMateria: '1403',
        anio: 5, seccion: 'H', turno: 'Tarde', profesor: 'Yván Figueroa', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 16, color: '#991B1B',
        horarios: [
          { dia: 'Miércoles', horaInicio: '16:00', horaFin: '17:30' },
          { dia: 'Jueves', horaInicio: '16:00', horaFin: '17:30' }
        ]
      },
      // NOCHE
      {
        id: '1403-S', materiaId: 'm-1403', materiaNombre: 'Derecho Procesal Penal', codigoMateria: '1403',
        anio: 5, seccion: 'S', turno: 'Noche', profesor: 'María Inmaculada Pérez Dupuy', aula: '',
        cuposTotales: 65, cuposDisponibles: 20, color: '#991B1B',
        horarios: [
          { dia: 'Lunes', horaInicio: '16:00', horaFin: '17:30' },
          { dia: 'Martes', horaInicio: '16:00', horaFin: '17:30' }
        ]
      },
      {
        id: '1403-U', materiaId: 'm-1403', materiaNombre: 'Derecho Procesal Penal', codigoMateria: '1403',
        anio: 5, seccion: 'U (Bimodal)', turno: 'Noche', profesor: 'Ángel Zerpa', aula: '',
        cuposTotales: 65, cuposDisponibles: 22, color: '#991B1B',
        horarios: [
          { dia: 'Miércoles', horaInicio: '17:30', horaFin: '19:00' },
          { dia: 'Jueves', horaInicio: '17:30', horaFin: '19:00' }
        ]
      }
    ]
  },

  // 5. DERECHO MERCANTIL II (CÓDIGO 1108)
  {
    id: 'm-1108',
    codigo: '1108',
    nombre: 'Derecho Mercantil II',
    anio: 5,
    creditos: 6,
    horasSemanales: 3,
    departamento: 'Derecho Mercantil',
    obligatoria: true,
    color: '#0F766E',
    prelaciones: ['1107'],
    secciones: [
      // MAÑANA
      {
        id: '1108-A', materiaId: 'm-1108', materiaNombre: 'Derecho Mercantil II', codigoMateria: '1108',
        anio: 5, seccion: 'A', turno: 'Mañana', profesor: 'Leonel Salazar', aula: '',
        cuposTotales: 65, cuposDisponibles: 10, color: '#0F766E',
        horarios: [
          { dia: 'Lunes', horaInicio: '10:00', horaFin: '11:30' },
          { dia: 'Miércoles', horaInicio: '10:00', horaFin: '11:30' }
        ]
      },
      {
        id: '1108-B', materiaId: 'm-1108', materiaNombre: 'Derecho Mercantil II', codigoMateria: '1108',
        anio: 5, seccion: 'B (Bimodal)', turno: 'Mañana', profesor: 'Sonia Fernández', aula: '',
        cuposTotales: 65, cuposDisponibles: 9, color: '#0F766E',
        horarios: [
          { dia: 'Martes', horaInicio: '10:00', horaFin: '11:30' },
          { dia: 'Miércoles', horaInicio: '08:30', horaFin: '10:00' }
        ]
      },
      {
        id: '1108-C', materiaId: 'm-1108', materiaNombre: 'Derecho Mercantil II', codigoMateria: '1108',
        anio: 5, seccion: 'C', turno: 'Mañana', profesor: 'Adriana Domínguez Ball', aula: '',
        cuposTotales: 60, cuposDisponibles: 12, color: '#0F766E',
        horarios: [
          { dia: 'Martes', horaInicio: '11:30', horaFin: '13:00' },
          { dia: 'Jueves', horaInicio: '10:00', horaFin: '11:30' }
        ]
      },
      // TARDE
      {
        id: '1108-G', materiaId: 'm-1108', materiaNombre: 'Derecho Mercantil II', codigoMateria: '1108',
        anio: 5, seccion: 'G (Bimodal)', turno: 'Tarde', profesor: 'Betty Lugo Capé', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 16, color: '#0F766E',
        horarios: [
          { dia: 'Lunes', horaInicio: '16:00', horaFin: '17:30' },
          { dia: 'Martes', horaInicio: '16:00', horaFin: '17:30' }
        ]
      },
      {
        id: '1108-H', materiaId: 'm-1108', materiaNombre: 'Derecho Mercantil II', codigoMateria: '1108',
        anio: 5, seccion: 'H (Bimodal)', turno: 'Tarde', profesor: 'Kimlen Chang Mora', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 15, color: '#0F766E',
        horarios: [
          { dia: 'Lunes', horaInicio: '13:00', horaFin: '14:30' },
          { dia: 'Miércoles', horaInicio: '13:00', horaFin: '14:30' }
        ]
      },
      {
        id: '1108-I', materiaId: 'm-1108', materiaNombre: 'Derecho Mercantil II', codigoMateria: '1108',
        anio: 5, seccion: 'I', turno: 'Tarde', profesor: 'Gabriel Rodríguez', aula: 'Nueva Sede FCJP',
        cuposTotales: 50, cuposDisponibles: 18, color: '#0F766E',
        horarios: [
          { dia: 'Lunes', horaInicio: '16:00', horaFin: '17:30' },
          { dia: 'Miércoles', horaInicio: '16:00', horaFin: '17:30' }
        ]
      },
      // NOCHE
      {
        id: '1108-S', materiaId: 'm-1108', materiaNombre: 'Derecho Mercantil II', codigoMateria: '1108',
        anio: 5, seccion: 'S', turno: 'Noche', profesor: 'Pedro Arellán Zurita', aula: '',
        cuposTotales: 65, cuposDisponibles: 20, color: '#0F766E',
        horarios: [
          { dia: 'Lunes', horaInicio: '17:30', horaFin: '19:00' },
          { dia: 'Jueves', horaInicio: '16:00', horaFin: '17:30' }
        ]
      },
      {
        id: '1108-T', materiaId: 'm-1108', materiaNombre: 'Derecho Mercantil II', codigoMateria: '1108',
        anio: 5, seccion: 'T', turno: 'Noche', profesor: 'Betty Lugo Capé', aula: '',
        cuposTotales: 65, cuposDisponibles: 22, color: '#0F766E',
        horarios: [
          { dia: 'Lunes', horaInicio: '17:30', horaFin: '19:00' },
          { dia: 'Martes', horaInicio: '17:30', horaFin: '19:00' }
        ]
      }
    ]
  },

  // 6. PRÁCTICA JURÍDICA III (CÓDIGO 1904)
  {
    id: 'm-1904',
    codigo: '1904',
    nombre: 'Práctica Jurídica III',
    anio: 5,
    creditos: 6,
    horasSemanales: 3,
    departamento: 'Práctica Forense',
    obligatoria: true,
    color: '#0284C7',
    prelaciones: ['1401', '1903'],
    secciones: [
      // MAÑANA
      {
        id: '1904-M08', materiaId: 'm-1904', materiaNombre: 'Práctica Jurídica III', codigoMateria: '1904',
        anio: 5, seccion: 'M08', turno: 'Mañana', profesor: 'Romer Pacheco', aula: 'STG-02 · Proc. Oral en el CPC',
        cuposTotales: 35, cuposDisponibles: 12, color: '#0284C7',
        horarios: [{ dia: 'Lunes', horaInicio: '07:00', horaFin: '10:00' }]
      },
      {
        id: '1904-M07', materiaId: 'm-1904', materiaNombre: 'Práctica Jurídica III', codigoMateria: '1904',
        anio: 5, seccion: 'M07', turno: 'Mañana', profesor: 'Rodolfo Vílchez', aula: 'Proc. Agrarios',
        cuposTotales: 35, cuposDisponibles: 14, color: '#0284C7',
        horarios: [{ dia: 'Martes', horaInicio: '07:00', horaFin: '10:00' }]
      },
      {
        id: '1904-V08', materiaId: 'm-1904', materiaNombre: 'Práctica Jurídica III', codigoMateria: '1904',
        anio: 5, seccion: 'V08', turno: 'Mañana', profesor: 'Rafael Tosta R.', aula: 'Práctica Forense General',
        cuposTotales: 35, cuposDisponibles: 11, color: '#0284C7',
        horarios: [{ dia: 'Jueves', horaInicio: '08:30', horaFin: '11:30' }]
      },
      {
        id: '1904-M01', materiaId: 'm-1904', materiaNombre: 'Práctica Jurídica III', codigoMateria: '1904',
        anio: 5, seccion: 'M01', turno: 'Mañana', profesor: 'Cora Farías', aula: 'Proc. Inquilinarios',
        cuposTotales: 35, cuposDisponibles: 10, color: '#0284C7',
        horarios: [{ dia: 'Viernes', horaInicio: '08:30', horaFin: '11:30' }]
      },
      {
        id: '1904-M02', materiaId: 'm-1904', materiaNombre: 'Práctica Jurídica III', codigoMateria: '1904',
        anio: 5, seccion: 'M02', turno: 'Mañana', profesor: 'Gisela Costa', aula: 'Proc. Constitucionales',
        cuposTotales: 35, cuposDisponibles: 9, color: '#0284C7',
        horarios: [{ dia: 'Viernes', horaInicio: '08:30', horaFin: '11:30' }]
      },
      {
        id: '1904-M03', materiaId: 'm-1904', materiaNombre: 'Práctica Jurídica III', codigoMateria: '1904',
        anio: 5, seccion: 'M03', turno: 'Mañana', profesor: 'Anthony Pérez', aula: 'Proceso penal venezolano',
        cuposTotales: 35, cuposDisponibles: 13, color: '#0284C7',
        horarios: [{ dia: 'Viernes', horaInicio: '08:30', horaFin: '11:30' }]
      },
      {
        id: '1904-M04', materiaId: 'm-1904', materiaNombre: 'Práctica Jurídica III', codigoMateria: '1904',
        anio: 5, seccion: 'M04', turno: 'Mañana', profesor: 'Eddy Méndez', aula: 'Honorarios y Costas',
        cuposTotales: 35, cuposDisponibles: 12, color: '#0284C7',
        horarios: [{ dia: 'Viernes', horaInicio: '08:30', horaFin: '11:30' }]
      },
      {
        id: '1904-M05', materiaId: 'm-1904', materiaNombre: 'Práctica Jurídica III', codigoMateria: '1904',
        anio: 5, seccion: 'M05', turno: 'Mañana', profesor: 'Leonel Salazar', aula: 'Propiedad Intelectual',
        cuposTotales: 35, cuposDisponibles: 15, color: '#0284C7',
        horarios: [{ dia: 'Viernes', horaInicio: '08:30', horaFin: '11:30' }]
      },
      {
        id: '1904-M06', materiaId: 'm-1904', materiaNombre: 'Práctica Jurídica III', codigoMateria: '1904',
        anio: 5, seccion: 'M06', turno: 'Mañana', profesor: 'Ángel Zerpa', aula: 'Penal',
        cuposTotales: 35, cuposDisponibles: 8, color: '#0284C7',
        horarios: [{ dia: 'Viernes', horaInicio: '08:30', horaFin: '11:30' }]
      },
      {
        id: '1904-V06', materiaId: 'm-1904', materiaNombre: 'Práctica Jurídica III', codigoMateria: '1904',
        anio: 5, seccion: 'V06', turno: 'Mañana', profesor: 'Bernardo Pisani', aula: 'Proc. Inquilinarios',
        cuposTotales: 35, cuposDisponibles: 14, color: '#0284C7',
        horarios: [{ dia: 'Viernes', horaInicio: '10:00', horaFin: '13:00' }]
      },
      {
        id: '1904-CJ01', materiaId: 'm-1904', materiaNombre: 'Práctica Jurídica III', codigoMateria: '1904',
        anio: 5, seccion: 'CJ-M01', turno: 'Mañana', profesor: 'Jenniffer Bello', aula: 'Clínica Jurídica FCJP',
        cuposTotales: 30, cuposDisponibles: 10, color: '#0284C7',
        horarios: [
          { dia: 'Lunes', horaInicio: '07:00', horaFin: '10:00' },
          { dia: 'Viernes', horaInicio: '07:00', horaFin: '10:00' }
        ]
      },
      // TARDE
      {
        id: '1904-V01', materiaId: 'm-1904', materiaNombre: 'Práctica Jurídica III', codigoMateria: '1904',
        anio: 5, seccion: 'V01', turno: 'Tarde', profesor: 'Enrique Dubuc', aula: 'Sentencia y Casación',
        cuposTotales: 35, cuposDisponibles: 11, color: '#0284C7',
        horarios: [{ dia: 'Lunes', horaInicio: '14:30', horaFin: '17:30' }]
      },
      {
        id: '1904-V02', materiaId: 'm-1904', materiaNombre: 'Práctica Jurídica III', codigoMateria: '1904',
        anio: 5, seccion: 'V02', turno: 'Tarde', profesor: 'Monique Fernández', aula: 'Juicios orales y simulación',
        cuposTotales: 35, cuposDisponibles: 12, color: '#0284C7',
        horarios: [{ dia: 'Lunes', horaInicio: '16:00', horaFin: '19:00' }]
      },
      {
        id: '1904-V09', materiaId: 'm-1904', materiaNombre: 'Práctica Jurídica III', codigoMateria: '1904',
        anio: 5, seccion: 'V09', turno: 'Tarde', profesor: 'Azael Socorro', aula: 'Redacción y contratos',
        cuposTotales: 35, cuposDisponibles: 14, color: '#0284C7',
        horarios: [{ dia: 'Martes', horaInicio: '16:00', horaFin: '19:00' }]
      },
      {
        id: '1904-V05', materiaId: 'm-1904', materiaNombre: 'Práctica Jurídica III', codigoMateria: '1904',
        anio: 5, seccion: 'V05', turno: 'Tarde', profesor: 'Marianela Velásquez', aula: 'Proc. Laborales',
        cuposTotales: 35, cuposDisponibles: 13, color: '#0284C7',
        horarios: [{ dia: 'Viernes', horaInicio: '14:30', horaFin: '17:30' }]
      }
    ]
  }
];
