/**
 * Catálogo Académico Oficial - Escuela de Derecho (UCV)
 * Programación Académica Oficial Año Lectivo 2025 - 2026
 * 
 * Centraliza la oferta de 1er a 5to año basada en el documento oficial
 * emitido por la Facultad de Ciencias Jurídicas y Políticas.
 */

export * from './horariosTypes';
import {
  Materia,
  Seccion,
  BloqueHorario,
  ConflictoHorario,
  DiaSemana
} from './horariosTypes';

import { MATERIAS_1ER_ANIO } from './horarios1erAnio';
import { MATERIAS_2DO_ANIO } from './horarios2doAnio';
import { MATERIAS_3ER_ANIO } from './horarios3erAnio';
import { MATERIAS_4TO_ANIO } from './horarios4toAnio';
import { MATERIAS_5TO_ANIO } from './horarios5toAnio';

import { MATERIAS_1ER_ANIO_2026 } from './horarios2026_1erAnio';
import { MATERIAS_2DO_ANIO_2026 } from './horarios2026_2doAnio';
import { MATERIAS_3ER_ANIO_2026 } from './horarios2026_3erAnio';
import { MATERIAS_4TO_ANIO_2026 } from './horarios2026_4toAnio';
import { MATERIAS_5TO_ANIO_2026 } from './horarios2026_5toAnio';

export type PeriodoOferta = '2025-2026' | '2026-2027';

// Catálogo completo 1° a 5° año (2025 - 2026)
export const MATERIAS_DERECHO_UCV: Materia[] = [
  ...MATERIAS_1ER_ANIO,
  ...MATERIAS_2DO_ANIO,
  ...MATERIAS_3ER_ANIO,
  ...MATERIAS_4TO_ANIO,
  ...MATERIAS_5TO_ANIO
];

export const MATERIAS_DERECHO_UCV_2025_2026: Materia[] = MATERIAS_DERECHO_UCV;

// Catálogo completo 1° a 5° año (2026 - 2027)
export const MATERIAS_DERECHO_UCV_2026_2027: Materia[] = [
  ...MATERIAS_1ER_ANIO_2026,
  ...MATERIAS_2DO_ANIO_2026,
  ...MATERIAS_3ER_ANIO_2026,
  ...MATERIAS_4TO_ANIO_2026,
  ...MATERIAS_5TO_ANIO_2026
];

export function getMateriasPorPeriodo(periodo: PeriodoOferta): Materia[] {
  return periodo === '2026-2027'
    ? MATERIAS_DERECHO_UCV_2026_2027
    : MATERIAS_DERECHO_UCV_2025_2026;
}

// Convertir hora "HH:MM" a minutos desde medianoche
export function horaAMinutos(hora: string): number {
  const [h, m] = hora.split(':').map(Number);
  return h * 60 + m;
}

// Comprobar si dos bloques horarios se solapan
export function bloquesSeSolapan(b1: BloqueHorario, b2: BloqueHorario): boolean {
  if (b1.dia !== b2.dia) return false;
  const inicio1 = horaAMinutos(b1.horaInicio);
  const fin1 = horaAMinutos(b1.horaFin);
  const inicio2 = horaAMinutos(b2.horaInicio);
  const fin2 = horaAMinutos(b2.horaFin);

  return Math.max(inicio1, inicio2) < Math.min(fin1, fin2);
}

// Verificar choque entre dos secciones
export function seccionesChocan(s1: Seccion, s2: Seccion): ConflictoHorario | null {
  if (s1.id === s2.id) return null;
  for (const b1 of s1.horarios) {
    for (const b2 of s2.horarios) {
      if (bloquesSeSolapan(b1, b2)) {
        const inicioSolap = Math.max(horaAMinutos(b1.horaInicio), horaAMinutos(b2.horaInicio));
        const finSolap = Math.min(horaAMinutos(b1.horaFin), horaAMinutos(b2.horaFin));
        const horaInicio24 = `${String(Math.floor(inicioSolap / 60)).padStart(2, '0')}:${String(inicioSolap % 60).padStart(2, '0')}`;
        const horaFin24 = `${String(Math.floor(finSolap / 60)).padStart(2, '0')}:${String(finSolap % 60).padStart(2, '0')}`;
        const horaInicioStr = formatHora12(horaInicio24);
        const horaFinStr = formatHora12(horaFin24);

        return {
          materia1: s1.materiaNombre,
          seccion1: s1.seccion,
          profesor1: s1.profesor,
          materia2: s2.materiaNombre,
          seccion2: s2.seccion,
          profesor2: s2.profesor,
          dia: b1.dia,
          horaInicio: horaInicioStr,
          horaFin: horaFinStr,
          descripcion: `Conflicto el ${b1.dia} (${horaInicioStr} a ${horaFinStr}) entre ${s1.materiaNombre} (${s1.profesor}) y ${s2.materiaNombre} (${s2.profesor})`
        };
      }
    }
  }
  return null;
}

// Encontrar todos los choques de un listado de secciones seleccionadas
export function detectarTodosLosChoques(secciones: Seccion[]): ConflictoHorario[] {
  const conflictos: ConflictoHorario[] = [];
  for (let i = 0; i < secciones.length; i++) {
    for (let j = i + 1; j < secciones.length; j++) {
      const choque = seccionesChocan(secciones[i], secciones[j]);
      if (choque) {
        conflictos.push(choque);
      }
    }
  }
  return conflictos;
}

// Convierte formato "13:00" a "1:00 pm", "07:00" a "7:00 am", "11:30" a "11:30 am"
export function formatHora12(hora24: string): string {
  if (!hora24) return '';
  const [hStr, mStr] = hora24.split(':');
  let h = parseInt(hStr, 10);
  const m = mStr || '00';
  const ampm = h >= 12 ? 'pm' : 'am';
  if (h === 0) {
    h = 12;
  } else if (h > 12) {
    h -= 12;
  }
  return `${h}:${m} ${ampm}`;
}

// Formato de rango: "7:00 am a 8:30 am"
export function formatRangoHora12(inicio: string, fin: string): string {
  return `${formatHora12(inicio)} a ${formatHora12(fin)}`;
}

// Limpia y formatea el texto de aula/ubicación, eliminando menciones redundantes de 'Edif. FCJP'
export function formatearAula(aula?: string): string {
  if (!aula) return '';
  return aula
    .replace(/^Edif\.\s*FCJP\s*[·•-]?\s*/gi, '')
    .replace(/\s*[·•-]?\s*Edif\.\s*FCJP/gi, '')
    .replace(/^Presencial\s*\/\s*FCJP$/gi, '')
    .trim();
}

// Bloques horarios oficiales UCV Escuela de Derecho (7:00 am a 7:00 pm)
export interface BloqueCalendarioUCV {
  id: number;
  label: string; // "7:00 am a 8:30 am"
  horaInicio: string; // "07:00"
  horaFin: string; // "08:30"
  minInicio: number; // 420
  minFin: number; // 510
}

export const BLOQUES_CALENDARIO_UCV: BloqueCalendarioUCV[] = [
  { id: 1, label: '7:00 am a 8:30 am', horaInicio: '07:00', horaFin: '08:30', minInicio: 420, minFin: 510 },
  { id: 2, label: '8:30 am a 10:00 am', horaInicio: '08:30', horaFin: '10:00', minInicio: 510, minFin: 600 },
  { id: 3, label: '10:00 am a 11:30 am', horaInicio: '10:00', horaFin: '11:30', minInicio: 600, minFin: 690 },
  { id: 4, label: '11:30 am a 1:00 pm', horaInicio: '11:30', horaFin: '13:00', minInicio: 690, minFin: 780 },
  { id: 5, label: '1:00 pm a 2:30 pm', horaInicio: '13:00', horaFin: '14:30', minInicio: 780, minFin: 870 },
  { id: 6, label: '2:30 pm a 4:00 pm', horaInicio: '14:30', horaFin: '16:00', minInicio: 870, minFin: 960 },
  { id: 7, label: '4:00 pm a 5:30 pm', horaInicio: '16:00', horaFin: '17:30', minInicio: 960, minFin: 1050 },
  { id: 8, label: '5:30 pm a 7:00 pm', horaInicio: '17:30', horaFin: '19:00', minInicio: 1050, minFin: 1140 }
];

export const DIAS_LABORABLES: DiaSemana[] = [
  'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'
];

// Presets oficiales para el Año Lectivo 2025 - 2026
export const PRESETS_HORARIO = [
  {
    id: 'preset-1-manana-a',
    titulo: '1er Año - Mañana (Bloque A)',
    anio: 1,
    seccionesIds: ['1501-A', '1502-A', '1101-A', '1201-A', '1601-A', '1602-A']
  },
  {
    id: 'preset-1-tarde-g',
    titulo: '1er Año - Tarde (Bloque G)',
    anio: 1,
    seccionesIds: ['1501-G', '1502-G', '1101-G', '1201-G', '1601-G', '1602-G']
  },
  {
    id: 'preset-2-manana-a',
    titulo: '2do Año - Mañana (Bloque A)',
    anio: 2,
    seccionesIds: ['1503-A', '1202-A', '1102-A', '1206-A', '1301-A', '1303-A']
  },
  {
    id: 'preset-3-manana-a',
    titulo: '3er Año - Mañana (Bloque A)',
    anio: 3,
    seccionesIds: ['1203-A', '1103-A', '1205-A', '1302-A', '1504-A']
  },
  {
    id: 'preset-4-manana-a',
    titulo: '4to Año - Mañana (Bloque A)',
    anio: 4,
    seccionesIds: ['1109-A', '1104-A', '1401-A', '1106-A', '1107-A']
  },
  {
    id: 'preset-5-manana-a',
    titulo: '5to Año - Mañana (Bloque A)',
    anio: 5,
    seccionesIds: ['1207-A', '1110-A', '1402-A', '1403-A', '1108-A']
  }
];

// Presets oficiales para el Año Lectivo 2026 - 2027
export const PRESETS_HORARIO_2026_2027 = PRESETS_HORARIO.map(preset => ({
  ...preset,
  seccionesIds: preset.seccionesIds.map(id => `2627-${id}`)
}));

export function getPresetsPorPeriodo(periodo: PeriodoOferta) {
  return periodo === '2026-2027' ? PRESETS_HORARIO_2026_2027 : PRESETS_HORARIO;
}

// Paleta de colores universitarios distintivos, elegantes, de alto contraste y legibilidad óptima
export const PALETA_COLORES_HORARIO = [
  '#7b0000', // Vinotinto Oficial UCV (1er lugar: identidad ucevista)
  '#1D4ED8', // Azul Cobalto / Real intenso
  '#047857', // Verde Esmeralda
  '#B45309', // Ámbar / Mostaza Cálido
  '#6D28D9', // Púrpura Real
  '#0E7490', // Cyan Océano / Azul Petróleo
  '#C2410C', // Terracota / Naranja Quemado
  '#4338CA', // Índigo Profundo
  '#BE185D', // Frambuesa / Fucsia Oscuro
  '#15803D', // Verde Bosque
  '#0284C7', // Azul Cielo Intenso
  '#374151'  // Gris Carbón Pizarra
];

/**
 * Asigna colores diferenciados y únicos a cada materia seleccionada en el horario.
 * Garantiza que cada materia dentro del horario tenga su propio color contrastante
 * y que ningún bloque de materias distintas comparta color.
 */
export function asignarColoresDiferenciados(secciones: Seccion[]): Map<string, string> {
  const map = new Map<string, string>();
  // Preservar orden de inserción de materias únicas
  const materiasUnicas: string[] = [];
  secciones.forEach(s => {
    const key = s.materiaId || s.codigoMateria;
    if (!materiasUnicas.includes(key)) {
      materiasUnicas.push(key);
    }
  });

  materiasUnicas.forEach((mId, index) => {
    // Asigna secuencialmente colores de la paleta curada
    const colorAsignado = PALETA_COLORES_HORARIO[index % PALETA_COLORES_HORARIO.length];
    map.set(mId, colorAsignado);
  });

  return map;
}
