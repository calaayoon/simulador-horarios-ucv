import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import {
  Calendar,
  Clock,
  BookOpen,
  AlertTriangle,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Download,
  Trash2,
  Copy,
  Check,
  Search,
  Filter,
  GraduationCap,
  MapPin,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  User,
  ShieldAlert,
  Sparkles,
  Printer,
  X,
  Layers,
  MoreVertical
} from 'lucide-react';
import MateriasAprobadasPanel from './MateriasAprobadasPanel';
import {
  MATERIAS_DERECHO_UCV,
  MATERIAS_DERECHO_UCV_2026_2027,
  BLOQUES_CALENDARIO_UCV,
  DIAS_LABORABLES,
  Materia,
  Seccion,
  DiaSemana,
  Turno,
  PeriodoOferta,
  ConflictoHorario,
  getMateriasPorPeriodo,
  getPresetsPorPeriodo,
  detectarTodosLosChoques,
  horaAMinutos,
  bloquesSeSolapan,
  formatHora12,
  formatRangoHora12,
  formatearAula,
  asignarColoresDiferenciados
} from '../data/horariosData';
import { exportarHorarioPdf } from '../lib/horarioPdfGenerator';

const STORAGE_KEY = 'ucv_derecho_horarios_v3';
const STORAGE_KEY_PLANES = 'ucv_derecho_horarios_planes_v1';
const STORAGE_KEY_PLANES_2026 = 'ucv_derecho_horarios_planes_2026_2027_v1';
const STORAGE_KEY_PERIODO = 'ucv_derecho_periodo_oferta_v1';
const STORAGE_KEY_APROBADAS = 'ucv_derecho_materias_aprobadas_2025_2026';

export type PlanId = 'A' | 'B' | 'C' | 'D' | 'E';
const PLAN_IDS: PlanId[] = ['A', 'B', 'C', 'D', 'E'];

// Estructura de la alerta interactiva de prelaciones académicas
interface NotificacionPrelacionInfo {
  mensaje: string;
  materiaNombre: string;
  prelantesNombres: string;
  codigosFaltantes: string[];
  seccionAInscribir?: Seccion;
}

// Concatena nombres gramaticalmente ("A y B" o "A e Introducción...")
function formatListaNombres(nombres: string[]): string {
  if (nombres.length === 0) return '';
  if (nombres.length === 1) return nombres[0];
  if (nombres.length === 2) {
    const segundo = nombres[1].trim();
    const conj = segundo.toLowerCase().startsWith('i') || segundo.toLowerCase().startsWith('hi') ? 'e' : 'y';
    return `${nombres[0]} ${conj} ${segundo}`;
  }
  const ultimo = nombres[nombres.length - 1].trim();
  const anteriores = nombres.slice(0, -1).join(', ');
  const conj = ultimo.toLowerCase().startsWith('i') || ultimo.toLowerCase().startsWith('hi') ? 'e' : 'y';
  return `${anteriores} ${conj} ${ultimo}`;
}

// En móvil: remueve la palabra 'Derecho ' (o 'Derecho del/de ') para que la materia se lea completa (ej: 'Civil I', 'Romano I', 'Trabajo I')
// No aplica a materias como 'Economía Política' o 'Introducción al Derecho'
function formatNombreMateriaMobile(nombre: string): string {
  if (nombre.startsWith('Derecho ')) {
    return nombre.replace(/^Derecho\s+(del\s+|de\s+)?/i, '');
  }
  return nombre;
}

const PLANES_VACIOS_BASE = (): Record<PlanId, Seccion[]> => ({ A: [], B: [], C: [], D: [], E: [] });

// Garantiza que cada sección pertenezca estrictamente al período correspondiente
function esSeccionDePeriodo(seccion: Seccion, periodo: PeriodoOferta): boolean {
  const es2026 = seccion.id.startsWith('2627-');
  return periodo === '2026-2027' ? es2026 : !es2026;
}

export default function HorarioSimulator() {
  // Alerta de prelación académica
  const [notiPrelacion, setNotiPrelacion] = useState<NotificacionPrelacionInfo | null>(null);

  // Período de Oferta Académica (2026-2027 vigente por defecto vs 2025-2026 anterior)
  const [periodoOferta, setPeriodoOferta] = useState<PeriodoOferta>(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const guardado = localStorage.getItem(STORAGE_KEY_PERIODO);
        if (guardado === '2025-2026' || guardado === '2026-2027') {
          return guardado;
        }
      }
    } catch {
      // Fallback
    }
    return '2026-2027';
  });

  // Catálogo activo según período seleccionado
  const materiasCatalogo = useMemo(() => getMateriasPorPeriodo(periodoOferta), [periodoOferta]);

  // Estado del Plan Activo: 'A' | 'B' | 'C' | 'D' | 'E'
  const [planActivo, setPlanActivo] = useState<PlanId>(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const keyInicial = (localStorage.getItem(STORAGE_KEY_PERIODO) === '2025-2026')
          ? STORAGE_KEY_PLANES
          : STORAGE_KEY_PLANES_2026;
        const guardado = localStorage.getItem(keyInicial);
        if (guardado) {
          const parsed = JSON.parse(guardado);
          if (parsed && PLAN_IDS.includes(parsed.planActivo)) {
            return parsed.planActivo;
          }
        }
      }
    } catch {
      // Fallback
    }
    return 'A';
  });

  // Estado de los 5 planes de horario: solo el período activo puede tener materias cargadas
  const [planesPorPeriodo, setPlanesPorPeriodo] = useState<Record<PeriodoOferta, Record<PlanId, Seccion[]>>>(() => {
    const cargarPlanesDePeriodo = (
      storageKey: string,
      catalogo: Materia[],
      periodo: PeriodoOferta,
      allowLegacy: boolean
    ): Record<PlanId, Seccion[]> => {
      const planesVacios = PLANES_VACIOS_BASE();
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          const todasSecciones = catalogo.flatMap(m => m.secciones);
          const guardadoPlanes = localStorage.getItem(storageKey);

          if (guardadoPlanes) {
            const parsed = JSON.parse(guardadoPlanes);
            if (parsed && parsed.planes) {
              PLAN_IDS.forEach(pid => {
                const ids: string[] = parsed.planes[pid] || [];
                if (Array.isArray(ids) && ids.length > 0) {
                  planesVacios[pid] = todasSecciones.filter(
                    s => ids.includes(s.id) && esSeccionDePeriodo(s, periodo)
                  );
                }
              });
              return planesVacios;
            }
          }

          if (allowLegacy) {
            const guardadoLegacy = localStorage.getItem(STORAGE_KEY);
            if (guardadoLegacy) {
              const ids: string[] = JSON.parse(guardadoLegacy);
              if (Array.isArray(ids) && ids.length > 0) {
                planesVacios.A = todasSecciones.filter(
                  s => ids.includes(s.id) && esSeccionDePeriodo(s, periodo)
                );
              }
            }
          }
        }
      } catch {
        // Fallback
      }
      return planesVacios;
    };

    const planes2025 = periodoOferta === '2025-2026'
      ? cargarPlanesDePeriodo(STORAGE_KEY_PLANES, MATERIAS_DERECHO_UCV, '2025-2026', true)
      : PLANES_VACIOS_BASE();
    const planes2026 = periodoOferta === '2026-2027'
      ? cargarPlanesDePeriodo(STORAGE_KEY_PLANES_2026, MATERIAS_DERECHO_UCV_2026_2027, '2026-2027', false)
      : PLANES_VACIOS_BASE();

    return {
      '2025-2026': planes2025,
      '2026-2027': planes2026
    };
  });

  const planes = planesPorPeriodo[periodoOferta];

  const setPlanes = (updater: Record<PlanId, Seccion[]> | ((prev: Record<PlanId, Seccion[]>) => Record<PlanId, Seccion[]>)) => {
    setPlanesPorPeriodo(prevPorPeriodo => {
      const actual = prevPorPeriodo[periodoOferta];
      const nuevoBruto = typeof updater === 'function' ? updater(actual) : updater;
      const nuevoFiltrado = PLANES_VACIOS_BASE();
      PLAN_IDS.forEach(pid => {
        nuevoFiltrado[pid] = (nuevoBruto[pid] || []).filter(s => esSeccionDePeriodo(s, periodoOferta));
      });
      const otroPeriodo: PeriodoOferta = periodoOferta === '2026-2027' ? '2025-2026' : '2026-2027';
      return {
        ...prevPorPeriodo,
        [periodoOferta]: nuevoFiltrado,
        [otroPeriodo]: PLANES_VACIOS_BASE()
      };
    });
  };

  // Secciones del plan activo (Plan A, B, C, D o E)
  const seccionesSeleccionadas = planes[planActivo];

  // Actualizador para mutar el plan activo sin perder la compatibilidad con el resto de la app
  const setSeccionesSeleccionadas = (action: Seccion[] | ((prev: Seccion[]) => Seccion[])) => {
    setPlanes(prevPlanes => {
      const prevActivo = prevPlanes[planActivo];
      const nuevo = typeof action === 'function' ? action(prevActivo) : action;
      return {
        ...prevPlanes,
        [planActivo]: nuevo
      };
    });
  };

  // Menú desplegable de opciones avanzadas para duplicar o transferir planes
  const [mostrarMenuPlanes, setMostrarMenuPlanes] = useState(false);
  const planMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickFuera = (e: MouseEvent) => {
      if (planMenuRef.current && !planMenuRef.current.contains(e.target as Node)) {
        setMostrarMenuPlanes(false);
      }
    };
    if (mostrarMenuPlanes) {
      document.addEventListener('mousedown', handleClickFuera);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickFuera);
    };
  }, [mostrarMenuPlanes]);

  const cambiarPlan = (nuevoPlan: PlanId) => {
    if (nuevoPlan === planActivo) return;
    setPlanActivo(nuevoPlan);
    const count = planes[nuevoPlan].length;
    mostrarAviso(`Cambiaste a Plan ${nuevoPlan} (${count} ${count === 1 ? 'materia inscrita' : 'materias inscritas'})`);
  };

  const duplicarPlan = (origen: PlanId, destino: PlanId) => {
    const orig = planes[origen];
    setPlanes(prev => ({
      ...prev,
      [destino]: [...orig]
    }));
    setPlanActivo(destino);
    mostrarAviso(`✓ Se copió la configuración del Plan ${origen} (${orig.length} materias) al Plan ${destino}`);
  };

  const vaciarPlanActual = () => {
    setPlanes(prev => ({
      ...prev,
      [planActivo]: []
    }));
    mostrarAviso(`Se vació el Plan ${planActivo}. Los demás planes se conservaron intactos.`);
  };

  // Estado del Sistema de Prelaciones: Códigos de materias aprobadas en el Pensum
  const [materiasAprobadas, setMateriasAprobadas] = useState<string[]>(() => {
    try {
      const guardado = localStorage.getItem(STORAGE_KEY_APROBADAS);
      if (guardado) {
        const cods = JSON.parse(guardado);
        if (Array.isArray(cods)) return cods;
      }
    } catch {
      // Fallback
    }
    return [];
  });

  // Persistir materias aprobadas en localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_APROBADAS, JSON.stringify(materiasAprobadas));
    } catch {
      // Ignore
    }
  }, [materiasAprobadas]);

  // Filtros: 'aprobadas' (para el sistema de prelaciones) o año 1..5
  const [anioSeleccionado, setAnioSeleccionado] = useState<number | 'aprobadas'>('aprobadas');
  const [turnoFiltro, setTurnoFiltro] = useState<Turno | 'todos'>('todos');
  const [busqueda, setBusqueda] = useState('');
  const [materiaExpandida, setMateriaExpandida] = useState<string | null>(null);

  // Estado para descartar el recordatorio sutil de materias aprobadas
  const [avisoAprobadasDescartado, setAvisoAprobadasDescartado] = useState(false);

  // Vista activa: 'calendario' | 'lista'
  const [vistaActiva, setVistaActiva] = useState<'calendario' | 'lista'>('calendario');

  // Modos de visualización para móvil sin deslizar y filtro de días
  const [formatoVisualMobile, setFormatoVisualMobile] = useState<'cuadricula' | 'agenda'>('cuadricula');
  const [diaFiltroMobile, setDiaFiltroMobile] = useState<'todos' | DiaSemana>('todos');
  const [materiaDetalleModal, setMateriaDetalleModal] = useState<Seccion | null>(null);

  // Datos del estudiante para el PDF
  const [nombreEstudiante, setNombreEstudiante] = useState('');
  const [mostrarModalEstudiante, setMostrarModalEstudiante] = useState(false);

  // Estados de retroalimentación
  const [copiado, setCopiado] = useState(false);
  const [generandoPdf, setGenerandoPdf] = useState(false);
  const [mensajeExito, setMensajeExito] = useState<string | null>(null);

  // Confirmación al intentar cambiar de período cuando ya existen materias cargadas
  const [periodoPendienteCambio, setPeriodoPendienteCambio] = useState<PeriodoOferta | null>(null);

  // Aviso emergente informativo asociado a una sección (ej. horario por confirmar)
  const [avisoSeccionEmergente, setAvisoSeccionEmergente] = useState<Seccion | null>(null);

  const calendarioRef = useRef<HTMLDivElement>(null);

  const planesConMateriasEnPeriodoActual = useMemo(() => {
    return PLAN_IDS
      .map(pid => ({ plan: pid, cantidad: planesPorPeriodo[periodoOferta][pid].length }))
      .filter(item => item.cantidad > 0);
  }, [planesPorPeriodo, periodoOferta]);

  const cambiarPeriodoOferta = (nuevoPeriodo: PeriodoOferta) => {
    if (nuevoPeriodo === periodoOferta) return;

    // Impedir tener materias del horario vigente y anterior simultáneamente
    if (planesConMateriasEnPeriodoActual.length > 0) {
      setPeriodoPendienteCambio(nuevoPeriodo);
      return;
    }

    setPlanesPorPeriodo({
      '2025-2026': PLANES_VACIOS_BASE(),
      '2026-2027': PLANES_VACIOS_BASE()
    });
    setPeriodoOferta(nuevoPeriodo);
    setMateriaExpandida(null);
    mostrarAviso(`Oferta Académica ${nuevoPeriodo.replace('-', ' – ')} activada`);
  };

  const confirmarCambioPeriodoLimpiando = () => {
    if (!periodoPendienteCambio) return;
    const destino = periodoPendienteCambio;
    setPlanesPorPeriodo({
      '2025-2026': PLANES_VACIOS_BASE(),
      '2026-2027': PLANES_VACIOS_BASE()
    });
    setPeriodoOferta(destino);
    setMateriaExpandida(null);
    setPeriodoPendienteCambio(null);
    mostrarAviso(`✓ Se limpió el horario anterior y se activó la oferta ${destino.replace('-', ' – ')}`);
  };

  // Persistir período y planes por período en localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PERIODO, periodoOferta);

      const serializarPlanes = (p: Record<PlanId, Seccion[]>) => ({
        planActivo,
        planes: {
          A: p.A.map(s => s.id),
          B: p.B.map(s => s.id),
          C: p.C.map(s => s.id),
          D: p.D.map(s => s.id),
          E: p.E.map(s => s.id)
        }
      });

      localStorage.setItem(STORAGE_KEY_PLANES, JSON.stringify(serializarPlanes(planesPorPeriodo['2025-2026'])));
      localStorage.setItem(STORAGE_KEY_PLANES_2026, JSON.stringify(serializarPlanes(planesPorPeriodo['2026-2027'])));

      const idsActivos2025 = planesPorPeriodo['2025-2026'][planActivo].map(s => s.id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(idsActivos2025));
    } catch {
      // Ignore storage errors
    }
  }, [planesPorPeriodo, planActivo, periodoOferta]);

  // Detección de choques
  const choques = useMemo(() => {
    return detectarTodosLosChoques(seccionesSeleccionadas);
  }, [seccionesSeleccionadas]);

  // Colores diferenciados para garantizar que cada materia seleccionada tenga un color único y contrastante
  const coloresDiferenciados = useMemo(() => {
    return asignarColoresDiferenciados(seccionesSeleccionadas);
  }, [seccionesSeleccionadas]);

  const obtenerColorSeccion = useCallback((sec: Seccion) => {
    return coloresDiferenciados.get(sec.materiaId || sec.codigoMateria) || sec.color;
  }, [coloresDiferenciados]);

  // Métricas acumuladas
  const totalMaterias = seccionesSeleccionadas.length;
  const totalCreditos = useMemo(() => {
    return seccionesSeleccionadas.reduce((acc, sec) => {
      const mat = materiasCatalogo.find(m => m.id === sec.materiaId);
      return acc + (mat ? mat.creditos : 0);
    }, 0);
  }, [seccionesSeleccionadas, materiasCatalogo]);

  const horasSemanalesTotales = useMemo(() => {
    return seccionesSeleccionadas.reduce((acc, sec) => {
      const minutosTotales = sec.horarios.reduce((subAcc, h) => {
        return subAcc + (horaAMinutos(h.horaFin) - horaAMinutos(h.horaInicio));
      }, 0);
      return acc + Math.round(minutosTotales / 60);
    }, 0);
  }, [seccionesSeleccionadas]);

  // Filtrado de materias para la oferta académica de clases
  const materiasFiltradas = useMemo(() => {
    return materiasCatalogo.filter(materia => {
      // Filtro por año
      if (typeof anioSeleccionado === 'number' && materia.anio !== anioSeleccionado) {
        return false;
      }
      // Filtro por búsqueda (insensible a acentos)
      if (busqueda.trim() !== '') {
        const normalizar = (txt: string) =>
          txt.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
        const query = normalizar(busqueda);
        const coincideNombre = normalizar(materia.nombre).includes(query);
        const coincideCodigo = normalizar(materia.codigo).includes(query);
        const coincideProfe = materia.secciones.some(s => normalizar(s.profesor).includes(query));
        if (!coincideNombre && !coincideCodigo && !coincideProfe) {
          return false;
        }
      }
      // Filtro por turno
      if (turnoFiltro !== 'todos') {
        const tieneSeccionTurno = materia.secciones.some(s => s.turno === turnoFiltro);
        if (!tieneSeccionTurno) return false;
      }
      return true;
    });
  }, [materiasCatalogo, anioSeleccionado, busqueda, turnoFiltro]);

  // Manejadores del Sistema de Prelaciones / Materias Aprobadas
  const toggleMateriaAprobada = (codigo: string) => {
    setMateriasAprobadas(prev => {
      const existe = prev.includes(codigo);
      const mat = materiasCatalogo.find(m => m.codigo === codigo);
      if (existe) {
        mostrarAviso(`Se desmarcó: ${mat ? mat.nombre : codigo}`);
        return prev.filter(c => c !== codigo);
      } else {
        mostrarAviso(`Se aprobó: ${mat ? mat.nombre : codigo}`);
        return [...prev, codigo];
      }
    });
  };

  const marcarAnioCompleto = (anio: number) => {
    const codigosDelAnio = materiasCatalogo.filter(m => m.anio === anio).map(m => m.codigo);
    setMateriasAprobadas(prev => {
      const nuevoSet = new Set([...prev, ...codigosDelAnio]);
      return Array.from(nuevoSet);
    });
    mostrarAviso(`Se marcaron como aprobadas todas las materias de ${anio}° Año`);
  };

  const desmarcarAnioCompleto = (anio: number) => {
    const codigosDelAnio = materiasCatalogo.filter(m => m.anio === anio).map(m => m.codigo);
    setMateriasAprobadas(prev => prev.filter(c => !codigosDelAnio.includes(c)));
    mostrarAviso(`Se desmarcaron las materias de ${anio}° Año`);
  };

  const marcarHastaAnio = (hastaAnio: number) => {
    if (hastaAnio === 0) {
      setMateriasAprobadas([]);
      mostrarAviso('Se configuró como Nuevo Ingreso: 0 materias aprobadas');
      return;
    }
    const codigos = materiasCatalogo.filter(m => m.anio <= hastaAnio).map(m => m.codigo);
    setMateriasAprobadas(codigos);
    mostrarAviso(`✓ Se marcaron aprobadas las materias de 1° a ${hastaAnio}° Año (Listo para cursar ${hastaAnio + 1}° Año)`);
  };

  const limpiarTodasAprobadas = () => {
    setMateriasAprobadas([]);
    mostrarAviso('✓ Se desmarcaron todas las materias aprobadas');
  };

  // Manejadores de adición / remoción de secciones con validación estricta de prelaciones y período único
  const toggleSeccion = (seccion: Seccion) => {
    if (!esSeccionDePeriodo(seccion, periodoOferta)) {
      mostrarAviso(`⚠️ No puedes agregar materias de otro período mientras usas el horario ${periodoOferta.replace('-', '–')}.`);
      return;
    }

    const yaInscrita = seccionesSeleccionadas.some(s => s.id === seccion.id);
    if (yaInscrita) {
      setSeccionesSeleccionadas(prev => prev.filter(s => s.id !== seccion.id));
      mostrarAviso(`Se removió ${seccion.materiaNombre} (${seccion.seccion})`);
      return;
    }

    // VALIDACIÓN DE PRELACIONES:
    // Para poder añadir una materia que vayas a cursar, debes haber aprobado la materia que le prela
    const materia = materiasCatalogo.find(m => m.id === seccion.materiaId);
    if (materia && materia.prelaciones && materia.prelaciones.length > 0) {
      const faltantes = materia.prelaciones.filter(cod => !materiasAprobadas.includes(cod));
      if (faltantes.length > 0) {
        const nombresPrelantes = faltantes.map(cod => {
          const matPrel = materiasCatalogo.find(m => m.codigo === cod);
          return matPrel ? matPrel.nombre : `código ${cod}`;
        });
        const textoPrelantes = formatListaNombres(nombresPrelantes);

        // Notificación solicitada con el texto exacto:
        const mensajeExacto = `Para ver ${materia.nombre} debes aprobar ${textoPrelantes}, en caso de que se te haya olvidado recuerda marcar ${textoPrelantes} como aprobada`;

        setNotiPrelacion({
          mensaje: mensajeExacto,
          materiaNombre: materia.nombre,
          prelantesNombres: textoPrelantes,
          codigosFaltantes: faltantes,
          seccionAInscribir: seccion
        });

        mostrarAviso(`⚠️ ${mensajeExacto}`);
        return; // BLOQUEAR la adición de la materia
      }
    }

    // Si ya tiene otra sección de la misma materia, reemplazarla
    const filtradas = seccionesSeleccionadas.filter(s => s.materiaId !== seccion.materiaId);
    setSeccionesSeleccionadas([...filtradas, seccion]);
    if (seccion.avisoEmergente) {
      setAvisoSeccionEmergente(seccion);
    }
    mostrarAviso(`Se agregó ${seccion.materiaNombre} (${seccion.profesor})`);
  };

  const removerSeccion = (seccionId: string) => {
    setSeccionesSeleccionadas(prev => prev.filter(s => s.id !== seccionId));
  };

  const limpiarHorario = () => {
    vaciarPlanActual();
  };

  const cargarPreset = (presetId: string) => {
    const presets = getPresetsPorPeriodo(periodoOferta);
    const preset = presets.find(p => p.id === presetId);
    if (!preset) return;
    const todasSecciones = materiasCatalogo.flatMap(m => m.secciones);
    const nuevas = todasSecciones.filter(s => preset.seccionesIds.includes(s.id));
    setSeccionesSeleccionadas(nuevas);
    mostrarAviso(`Se cargó: ${preset.titulo}`);
  };

  // Selecciona automáticamente las materias del año para un turno específico (Mañana, Tarde o Noche)
  const seleccionarMateriasPorTurno = (anio: number, turno: Turno | 'todos') => {
    if (turno === 'todos') {
      mostrarAviso('Selecciona un turno específico (Mañana, Tarde o Noche) para realizar la inscripción.');
      return;
    }

    const materiasDelAnio = materiasCatalogo.filter(m => m.anio === anio);
    const seccionesCandidatas: Seccion[] = [];

    // Prioridad de letras según turno para asegurar secciones continuas
    const letrasPrioritarias = turno === 'Mañana'
      ? ['A', 'B', 'C', 'D', 'E', 'F']
      : turno === 'Tarde'
      ? ['G', 'H', 'I', 'J']
      : ['W', 'S', 'T', 'U', 'V'];

    for (const mat of materiasDelAnio) {
      const delTurno = mat.secciones.filter(s => s.turno === turno);
      if (delTurno.length === 0) continue;

      // Buscar coincidencia con la letra prioritaria del turno
      let seleccionada: Seccion | undefined = undefined;
      for (const letra of letrasPrioritarias) {
        seleccionada = delTurno.find(s => s.seccion === letra || s.seccion.startsWith(letra + ' ') || s.seccion.startsWith(letra + '-'));
        if (seleccionada) break;
      }

      if (!seleccionada) {
        seleccionada = delTurno[0];
      }

      seccionesCandidatas.push(seleccionada);
    }

    if (seccionesCandidatas.length === 0) {
      mostrarAviso(`No se encontraron asignaturas ofertadas para ${anio}° Año en el Turno ${turno}`);
      return;
    }

    // Comprobar prelaciones
    const materiasConPrelacionPendiente: { materia: Materia; faltantes: string[]; seccion: Seccion }[] = [];
    seccionesCandidatas.forEach(sec => {
      const mat = materiasCatalogo.find(m => m.id === sec.materiaId);
      if (mat && mat.prelaciones && mat.prelaciones.length > 0) {
        const faltantes = mat.prelaciones.filter(cod => !materiasAprobadas.includes(cod));
        if (faltantes.length > 0) {
          materiasConPrelacionPendiente.push({ materia: mat, faltantes, seccion: sec });
        }
      }
    });

    if (materiasConPrelacionPendiente.length > 0) {
      const primerCaso = materiasConPrelacionPendiente[0];
      const nombresPrelantes = primerCaso.faltantes.map(cod => {
        const p = materiasCatalogo.find(m => m.codigo === cod);
        return p ? p.nombre : `código ${cod}`;
      });
      const textoPrelantes = formatListaNombres(nombresPrelantes);

      const mensajeExacto = `Para ver ${primerCaso.materia.nombre} debes aprobar ${textoPrelantes}, en caso de que se te haya olvidado recuerda marcar ${textoPrelantes} como aprobada`;
      const todosCodigosFaltantes = Array.from(new Set(materiasConPrelacionPendiente.flatMap(c => c.faltantes)));

      setNotiPrelacion({
        mensaje: mensajeExacto,
        materiaNombre: primerCaso.materia.nombre,
        prelantesNombres: textoPrelantes,
        codigosFaltantes: todosCodigosFaltantes,
        seccionAInscribir: primerCaso.seccion
      });

      mostrarAviso(`⚠️ ${mensajeExacto}`);
      return;
    }

    const candidatasValidas = seccionesCandidatas.filter(s => esSeccionDePeriodo(s, periodoOferta));
    setSeccionesSeleccionadas(prev => {
      const deOtrosAnios = prev.filter(s => s.anio !== anio && esSeccionDePeriodo(s, periodoOferta));
      return [...deOtrosAnios, ...candidatasValidas];
    });

    mostrarAviso(`✓ Se seleccionaron las ${candidatasValidas.length} materias de ${anio}° Año en el Turno ${turno}`);
  };

  const mostrarAviso = (msg: string) => {
    setMensajeExito(msg);
    setTimeout(() => {
      setMensajeExito(null);
    }, 4500);
  };

  // Comprueba si una sección específica choca con alguna de las ya seleccionadas
  const comprobarChoqueIndividual = (seccion: Seccion): string | null => {
    // Si ya está seleccionada, no evaluar contra sí misma
    for (const seleccionada of seccionesSeleccionadas) {
      if (seleccionada.id === seccion.id) continue;
      // Si es de la misma materia y la reemplazará, no es un choque
      if (seleccionada.materiaId === seccion.materiaId) continue;

      for (const b1 of seccion.horarios) {
        for (const b2 of seleccionada.horarios) {
          if (bloquesSeSolapan(b1, b2)) {
            return `Choca con ${seleccionada.materiaNombre} (${seleccionada.profesor}) el ${b1.dia}`;
          }
        }
      }
    }
    return null;
  };

  // Copiar resumen de horario
  const copiarResumen = () => {
    if (seccionesSeleccionadas.length === 0) {
      mostrarAviso('No tienes asignaturas en tu horario para copiar.');
      return;
    }

    const lineas = [
      `📋 MI HORARIO - DERECHO UCV (${periodoOferta} · Plan ${planActivo})`,
      `Total: ${totalMaterias} materias | ${totalCreditos} UC | ${horasSemanalesTotales} hrs/semana`,
      '----------------------------------------',
      ...seccionesSeleccionadas.map(s => {
        const horarios = s.horarios.map(h => `${h.dia.slice(0, 3)} ${formatRangoHora12(h.horaInicio, h.horaFin)}`).join(', ');
        const aulaTxt = formatearAula(s.aula);
        return `• ${s.codigoMateria} ${s.materiaNombre} (Sec. ${s.seccion}) | Prof. ${s.profesor} | ${horarios}${aulaTxt ? ' | ' + aulaTxt : ''}`;
      }),
      '----------------------------------------',
      'Generado con el Simulador de Horarios UCV · Ideal UCVista'
    ];

    navigator.clipboard.writeText(lineas.join('\n'));
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2500);
  };

  // Descargar Horario Visual (PDF o Imagen PNG)
  const manejarDescargaVisual = async (formato: 'pdf' | 'imagen' = 'pdf') => {
    setGenerandoPdf(true);
    try {
      const seccionesConColoresDiferenciados = seccionesSeleccionadas.map(s => ({
        ...s,
        color: obtenerColorSeccion(s)
      }));
      await exportarHorarioPdf({
        estudianteNombre: nombreEstudiante.trim() || undefined,
        secciones: seccionesConColoresDiferenciados,
        totalCreditos,
        totalMaterias,
        horasSemanalesTotales,
        periodoLectivo: periodoOferta === '2025-2026' ? 'Año Lectivo 2025 – 2026' : 'Año Lectivo 2026 – 2027',
        planActivo,
        formato
      });
      setMostrarModalEstudiante(false);
      mostrarAviso(formato === 'imagen' ? '✓ Imagen HD del horario descargada' : '✓ Horario PDF descargado tal cual el simulador');
    } catch (err) {
      console.error('Error generando horario:', err);
      mostrarAviso('Hubo un error al generar la descarga. Por favor intenta nuevamente.');
    } finally {
      setGenerandoPdf(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-slate-900 pb-12">
      {/* 1. Barra de Navegación y Encabezado Institucional: Ideal UCVista */}
      <header className="bg-[#7b0000] text-white border-b-4 border-[#E2D4C3] shadow-md sticky top-0 z-30">
        <div className="max-w-[1700px] w-full mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Contenedor del Logo Oficial Ideal UCVista */}
            <div className="bg-[#FFFDF9] px-2.5 py-1 rounded-xl shadow-xs border border-[#EADBCE] flex items-center justify-center shrink-0">
              <img
                src="/ideal_ucvista_logo.png"
                alt="Ideal UCVista"
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 text-[10px] sm:text-xs text-[#F5E6D3] font-medium tracking-wide">
                <span className="font-extrabold text-[#FFFDF9] tracking-wider">IDEAL UCVISTA</span>
                <span aria-hidden="true" className="text-[#E2D4C3]/60">·</span>
                <span>DERECHO UCV</span>
                <span aria-hidden="true" className="text-[#E2D4C3]/60 hidden md:inline">·</span>
                <div className="bg-[#620000] text-[#F9F5EF] p-0.5 rounded text-[10px] font-semibold hidden md:inline-flex items-center gap-1 border border-[#8f1a1a]/60">
                  <button
                    type="button"
                    onClick={() => cambiarPeriodoOferta('2026-2027')}
                    className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
                      periodoOferta === '2026-2027' ? 'bg-white/20 text-white font-bold' : 'text-[#F5E6D3]/70 hover:text-white'
                    }`}
                    title="Oferta Académica 2026-2027 (Vigente)"
                  >
                    2026–2027
                  </button>
                  <span className="text-[#E2D4C3]/40">·</span>
                  <button
                    type="button"
                    onClick={() => cambiarPeriodoOferta('2025-2026')}
                    className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
                      periodoOferta === '2025-2026' ? 'bg-white/20 text-white font-bold' : 'text-[#F5E6D3]/70 hover:text-white'
                    }`}
                    title="Oferta Académica 2025-2026 (Anterior)"
                  >
                    2025–2026
                  </button>
                </div>
              </div>
              <h1 className="text-base sm:text-xl font-black tracking-tight text-white leading-tight">
                Simulador de Horarios
              </h1>
            </div>
          </div>

          {/* Acciones principales de la cabecera */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setMostrarModalEstudiante(true)}
              disabled={seccionesSeleccionadas.length === 0}
              className="flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-bold bg-[#FFFDF9] hover:bg-white text-[#7b0000] rounded-lg transition-all shadow-sm border border-[#E5D7C7] hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shrink-0"
              title="Descargar horario en PDF"
            >
              <Download className="w-4 h-4 text-[#7b0000]" />
              <span>Descargar PDF</span>
            </button>

            <button
              onClick={copiarResumen}
              disabled={seccionesSeleccionadas.length === 0}
              className="flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-medium bg-white/10 hover:bg-white/20 text-[#FAF5EE] rounded-lg transition-colors border border-white/25 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shrink-0"
              title="Copiar resumen al portapapeles"
            >
              {copiado ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span className="hidden sm:inline">{copiado ? 'Copiado' : 'Copiar'}</span>
            </button>

            {seccionesSeleccionadas.length > 0 && (
              <button
                onClick={limpiarHorario}
                className="flex items-center gap-1.5 px-2.5 py-2 text-xs font-medium bg-[#660000] hover:bg-[#520000] text-[#FADBD8] hover:text-white rounded-lg transition-colors border border-[#A83232]/50 whitespace-nowrap shrink-0"
                title={`Vaciar solo Plan ${planActivo}`}
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden md:inline">Vaciar Plan {planActivo}</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Alerta de Prelaciones Académicas Bloqueante */}
      {notiPrelacion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl border border-amber-300 max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Cabecera */}
            <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-amber-100" />
                </div>
                <div>
                  <h3 className="text-sm font-bold leading-tight">Control de Prelación · Pensum UCV</h3>
                  <p className="text-[11px] text-amber-100">Requisito previo obligatorio no cumplido</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setNotiPrelacion(null)}
                className="w-7 h-7 rounded-lg text-white/80 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Cerrar notificación"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cuerpo con el mensaje exacto solicitado */}
            <div className="p-5 space-y-4">
              <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-amber-950 text-xs sm:text-sm leading-relaxed">
                <p className="font-semibold">
                  "{notiPrelacion.mensaje}"
                </p>
              </div>

              <p className="text-xs text-slate-600">
                El sistema de prelaciones de la Escuela de Derecho no permite cursar una materia si no has aprobado su prelación oficial. Si ya aprobaste la asignatura, puedes marcarla ahora mismo:
              </p>

              {/* Botones de acción rápida */}
              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                {notiPrelacion.seccionAInscribir ? (
                  <button
                    type="button"
                    onClick={() => {
                      // 1. Agregar códigos faltantes a materias aprobadas
                      setMateriasAprobadas(prev => Array.from(new Set([...prev, ...notiPrelacion.codigosFaltantes])));
                      // 2. Inscribir la sección que el estudiante quería
                      const sec = notiPrelacion.seccionAInscribir!;
                      const filtradas = seccionesSeleccionadas.filter(s => s.materiaId !== sec.materiaId);
                      setSeccionesSeleccionadas([...filtradas, sec]);
                      if (sec.avisoEmergente) {
                        setAvisoSeccionEmergente(sec);
                      }
                      mostrarAviso(`✓ Se marcaron aprobadas ${notiPrelacion.prelantesNombres} y se inscribió ${sec.materiaNombre}`);
                      setNotiPrelacion(null);
                    }}
                    className="flex-1 py-2 px-3 bg-[#7b0000] hover:bg-[#620000] text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Marcar como aprobada e inscribir</span>
                  </button>
                ) : null}

                <button
                  type="button"
                  onClick={() => {
                    setAnioSeleccionado('aprobadas');
                    setNotiPrelacion(null);
                  }}
                  className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-slate-600" />
                  <span>Ir a Materias Aprobadas</span>
                </button>

                <button
                  type="button"
                  onClick={() => setNotiPrelacion(null)}
                  className="py-2 px-3 text-slate-500 hover:text-slate-800 text-xs font-medium transition-colors cursor-pointer text-center"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notificación flotante de confirmación */}
      {mensajeExito && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-xl text-xs sm:text-sm font-medium flex items-center gap-2.5 border border-slate-700 animate-in fade-in slide-in-from-bottom-2 max-w-md">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{mensajeExito}</span>
        </div>
      )}

      <div className="max-w-[1700px] w-full mx-auto px-2 sm:px-4 lg:px-6 mt-4">
        {/* 2. Barra de Métricas y Estado del Horario */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm mb-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-center">
            {/* Materias */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#7b0000]/10 text-[#7b0000] flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Materias (Plan {planActivo})</p>
                <div className="flex items-baseline gap-1.5">
                  <span className={`text-lg font-bold tabular-nums ${totalMaterias > 8 ? 'text-amber-600' : 'text-slate-900'}`}>
                    {totalMaterias}
                  </span>
                  <span className="text-xs text-slate-400 font-normal">/ máx 8</span>
                </div>
              </div>
            </div>

            {/* Unidades de Crédito */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Unidades de Crédito</p>
                <p className="text-lg font-bold text-slate-900 tabular-nums">{totalCreditos} UC</p>
              </div>
            </div>

            {/* Horas Semanales */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Carga Semanal</p>
                <p className="text-lg font-bold text-slate-900 tabular-nums">{horasSemanalesTotales} horas</p>
              </div>
            </div>

            {/* Estado de Choques */}
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${choques.length > 0 ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                {choques.length > 0 ? <AlertTriangle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Validación de Choques</p>
                <p className={`text-sm font-bold ${choques.length > 0 ? 'text-red-600' : 'text-emerald-700'}`}>
                  {choques.length === 0 ? 'Sin conflictos' : `${choques.length} ${choques.length === 1 ? 'choque detectado' : 'choques detectados'}`}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Alerta Compacta de Choques si existen */}
        {choques.length > 0 && (
          <div className="bg-red-50/90 border border-red-200 rounded-lg p-2.5 mb-4 shadow-2xs text-red-900">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
                <span className="text-xs font-bold text-red-800">
                  Choques detectados ({choques.length}):
                </span>
                <span className="text-[11px] text-red-600 hidden sm:inline">
                  Las materias en conflicto se resaltan en rojo en el calendario
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {choques.map((c, i) => (
                <div
                  key={i}
                  className="text-[11px] bg-white border border-red-200/90 rounded px-2 py-1 text-slate-800 flex items-center gap-1.5"
                >
                  <span className="font-bold text-red-700">{c.dia} {c.horaInicio}:</span>
                  <span>{c.materia1} <strong className="text-slate-900">({c.profesor1 || c.seccion1})</strong></span>
                  <span className="text-red-500 font-bold">≠</span>
                  <span>{c.materia2} <strong className="text-slate-900">({c.profesor2 || c.seccion2})</strong></span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. Panel Principal: Split 2 Columnas (Buscador/Materias vs Calendario) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 xl:grid-cols-12 gap-4 lg:gap-6 items-start">
          
          {/* ================= COLUMNA IZQUIERDA: Catálogo de Asignaturas ================= */}
          <div className="lg:col-span-4 xl:col-span-4 2xl:col-span-3 space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#7b0000]" />
                  <span>
                    {anioSeleccionado === 'aprobadas' ? 'Gestión de Prelaciones' : `Oferta Académica · ${anioSeleccionado}° Año`}
                  </span>
                </h2>
                <span className="text-xs text-slate-500 font-medium">
                  {anioSeleccionado === 'aprobadas'
                    ? `${materiasAprobadas.length} de 30 aprobadas`
                    : `${materiasFiltradas.length} ${materiasFiltradas.length === 1 ? 'materia' : 'materias'}`}
                </span>
              </div>

              {/* Selector de Período de Oferta Académica (2026-2027 vigente vs 2025-2026 anterior) */}
              <div className="mb-3.5 bg-slate-50/80 p-2 rounded-xl border border-slate-200/80">
                <div className="flex items-center justify-between mb-1.5 px-0.5">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#7b0000]" />
                    <span>Oferta Académica:</span>
                  </label>
                  <span className="text-[10px] text-slate-500 font-medium">
                    {periodoOferta === '2026-2027' ? 'Año Vigente' : 'Año Anterior'}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1.5 bg-slate-200/70 p-1 rounded-lg text-xs">
                  <button
                    type="button"
                    onClick={() => cambiarPeriodoOferta('2026-2027')}
                    className={`py-1.5 px-2 rounded-md font-bold transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 ${
                      periodoOferta === '2026-2027'
                        ? 'bg-[#7b0000] text-white shadow-2xs ring-1 ring-[#7b0000]'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                    }`}
                    title="Oferta Académica 2026-2027 (Horarios oficiales vigentes)"
                  >
                    <span>2026 – 2027</span>
                    <span className={`text-[9.5px] px-1.5 py-0.2 rounded font-semibold ${
                      periodoOferta === '2026-2027' ? 'bg-white/20 text-[#FAF5EE]' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      Vigente
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => cambiarPeriodoOferta('2025-2026')}
                    className={`py-1.5 px-2 rounded-md font-bold transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 ${
                      periodoOferta === '2025-2026'
                        ? 'bg-[#7b0000] text-white shadow-2xs ring-1 ring-[#7b0000]'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                    }`}
                    title="Oferta Académica 2025-2026 (Período anterior)"
                  >
                    <span>2025 – 2026</span>
                    <span className={`text-[9.5px] px-1.5 py-0.2 rounded font-semibold ${
                      periodoOferta === '2025-2026' ? 'bg-white/20 text-[#FAF5EE]' : 'bg-slate-200 text-slate-700'
                    }`}>
                      Anterior
                    </span>
                  </button>
                </div>
              </div>

              {/* Aviso Sutil y Descartable de Materias Aprobadas */}
              {!avisoAprobadasDescartado && (
                <div className="mb-2.5 px-3 py-2 bg-amber-50/90 border border-amber-200/90 rounded-lg flex items-center justify-between gap-2 text-xs text-amber-950 shadow-2xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="font-medium text-[11px] text-amber-900 leading-snug">
                      Antes de organizar tu horario, recuerda poner tus materias aprobadas
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {anioSeleccionado !== 'aprobadas' && (
                      <button
                        type="button"
                        onClick={() => setAnioSeleccionado('aprobadas')}
                        className="text-[10px] font-bold text-amber-900 hover:text-amber-950 px-2 py-0.5 bg-amber-200/70 hover:bg-amber-200 rounded transition-colors cursor-pointer"
                      >
                        Ir a Aprobadas
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setAvisoAprobadasDescartado(true)}
                      className="text-amber-500 hover:text-amber-800 p-0.5 rounded transition-colors cursor-pointer leading-none"
                      title="Descartar aviso"
                      aria-label="Descartar aviso"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Selector de Año del Pensum / Materias Aprobadas */}
              <div className="mb-3">
                <label className="block text-[11px] font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">
                  Año del Pensum:
                </label>
                <div className="flex flex-col sm:flex-row gap-1 bg-slate-100 p-1 rounded-lg text-xs">
                  {/* Botón Materias Aprobadas (en reemplazo del filtro 'Todos') */}
                  <button
                    type="button"
                    onClick={() => setAnioSeleccionado('aprobadas')}
                    className={`px-3 py-1.5 rounded-md font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer sm:shrink-0 ${
                      anioSeleccionado === 'aprobadas'
                        ? 'bg-[#002855] text-white shadow-sm'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-white/80'
                    }`}
                  >
                    <CheckCircle2 className={`w-3.5 h-3.5 ${anioSeleccionado === 'aprobadas' ? 'text-emerald-400' : 'text-emerald-600'}`} />
                    <span>Materias Aprobadas</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      anioSeleccionado === 'aprobadas' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {materiasAprobadas.length}
                    </span>
                  </button>

                  {/* Botones de Años 1° a 5° */}
                  <div className="grid grid-cols-5 gap-1 flex-1">
                    {[1, 2, 3, 4, 5].map(anio => (
                      <button
                        key={anio}
                        type="button"
                        onClick={() => setAnioSeleccionado(anio)}
                        className={`py-1.5 rounded font-semibold transition-colors cursor-pointer text-center ${
                          anioSeleccionado === anio
                            ? 'bg-[#7b0000] text-white shadow-sm'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                        }`}
                      >
                        {anio}°
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Filtros de Búsqueda y Turno cuando se está visualizando la oferta de un año */}
              {typeof anioSeleccionado === 'number' && (
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  {/* Buscador */}
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder={`Buscar en ${anioSeleccionado}° año por materia, código o profesor...`}
                      value={busqueda}
                      onChange={e => setBusqueda(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7b0000] focus:bg-white transition-all"
                    />
                    {busqueda && (
                      <button
                        onClick={() => setBusqueda('')}
                        className="absolute right-2.5 top-2 text-xs text-slate-400 hover:text-slate-600"
                      >
                        ×
                      </button>
                    )}
                  </div>

                  {/* Filtro por Turno */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                        Turno Horario:
                      </label>
                      {turnoFiltro !== 'todos' && (
                        <button
                          type="button"
                          onClick={() => setTurnoFiltro('todos')}
                          className="text-[10px] text-[#7b0000] hover:underline font-bold cursor-pointer"
                        >
                          Ver todos los turnos
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-4 gap-1 bg-slate-100 p-1 rounded-lg text-xs">
                      <button
                        type="button"
                        onClick={() => setTurnoFiltro('todos')}
                        className={`py-1 rounded font-medium transition-colors cursor-pointer ${turnoFiltro === 'todos' ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
                      >
                        Todos
                      </button>
                      {(['Mañana', 'Tarde', 'Noche'] as Turno[]).map(turno => (
                        <button
                          key={turno}
                          type="button"
                          onClick={() => setTurnoFiltro(turno)}
                          className={`py-1 rounded font-medium transition-colors cursor-pointer ${turnoFiltro === turno ? 'bg-[#7b0000] text-white shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
                        >
                          {turno}
                        </button>
                      ))}
                    </div>

                    {/* Banner de Acción: Inscribir todas las materias del turno seleccionado */}
                    {turnoFiltro !== 'todos' && (
                      <div className="mt-2.5 p-2 bg-[#7b0000]/5 border border-[#7b0000]/20 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <div className="text-[11px] text-slate-700 min-w-0">
                          <span className="font-bold text-[#7b0000]">Turno {turnoFiltro}</span>
                          <span className="text-slate-500 hidden sm:inline"> · Solo se muestran secciones de la {turnoFiltro.toLowerCase()}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => seleccionarMateriasPorTurno(anioSeleccionado, turnoFiltro)}
                          className="w-full sm:w-auto px-3 py-1.5 bg-[#7b0000] hover:bg-[#620000] text-white rounded-lg font-bold text-xs transition-colors shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                          title={`Inscribir automáticamente materias de ${anioSeleccionado}° Año en el Turno ${turnoFiltro}`}
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                          <span>Inscribir turno {turnoFiltro}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* VISTA A: PANEL DEL SISTEMA DE PRELACIONES Y MATERIAS APROBADAS */}
            {anioSeleccionado === 'aprobadas' ? (
              <MateriasAprobadasPanel
                materiasAprobadas={materiasAprobadas}
                onToggleMateria={toggleMateriaAprobada}
                onMarcarAnioCompleto={marcarAnioCompleto}
                onDesmarcarAnioCompleto={desmarcarAnioCompleto}
                onMarcarHastaAnio={marcarHastaAnio}
                onLimpiarTodas={limpiarTodasAprobadas}
                onSeleccionarAnioHorario={(anio) => {
                  setAnioSeleccionado(anio);
                }}
              />
            ) : (
              /* VISTA B: LISTADO DE ASIGNATURAS Y SECCIONES DISPONIBLES PARA EL AÑO */
              <div className="space-y-2.5 max-h-[750px] overflow-y-auto pr-1">
                {materiasFiltradas.length === 0 ? (
                  <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500">
                    <BookOpen className="w-8 h-8 mx-auto text-slate-400 mb-2 opacity-50" />
                    <p className="text-sm font-medium">No se encontraron materias con los filtros seleccionados.</p>
                    <button
                      onClick={() => {
                        setTurnoFiltro('todos');
                        setBusqueda('');
                      }}
                      className="mt-3 text-xs text-[#7b0000] font-semibold hover:underline"
                    >
                      Limpiar filtros de búsqueda
                    </button>
                  </div>
                ) : (
                  materiasFiltradas.map(materia => {
                    const seccionInscrita = seccionesSeleccionadas.find(s => s.materiaId === materia.id);
                    const isExpandida = materiaExpandida === materia.id;
                    const estaAprobada = materiasAprobadas.includes(materia.codigo);
                    const prelacionesCodigos = materia.prelaciones || [];
                    const faltantesPrelacion = prelacionesCodigos.filter(c => !materiasAprobadas.includes(c));

                    return (
                      <div
                        key={materia.id}
                        className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden ${
                          seccionInscrita
                            ? 'border-[#7b0000] shadow-sm ring-1 ring-[#7b0000]/20'
                            : estaAprobada
                            ? 'border-emerald-300 bg-emerald-50/20'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {/* Cabecera de la Materia */}
                        <button
                          onClick={() => setMateriaExpandida(isExpandida ? null : materia.id)}
                          className="w-full text-left p-3.5 flex items-center justify-between gap-3 bg-white hover:bg-slate-50/70 transition-colors"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 text-xs text-slate-500 mb-0.5 flex-wrap">
                              <span className="font-mono font-semibold text-slate-700">{materia.codigo}</span>
                              <span aria-hidden="true">·</span>
                              <span>{materia.anio}° Año</span>
                              <span aria-hidden="true">·</span>
                              <span>{materia.creditos} UC</span>
                              {estaAprobada && (
                                <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                                  <Check className="w-2.5 h-2.5" />
                                  <span>Ya Aprobada</span>
                                </span>
                              )}
                            </div>
                            <h3 className="text-sm font-bold text-slate-900 truncate">
                              {materia.nombre}
                            </h3>

                            {/* Alerta de Prelaciones en la tarjeta de materia */}
                            {prelacionesCodigos.length > 0 && (
                              <div className="mt-1">
                                {faltantesPrelacion.length > 0 ? (
                                  <span className="inline-flex items-center gap-1 text-[10px] text-amber-800 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded font-medium">
                                    <AlertCircle className="w-3 h-3 text-amber-600 shrink-0" />
                                    <span>
                                      Requiere aprobar: {formatListaNombres(faltantesPrelacion.map(c => {
                                        const p = materiasCatalogo.find(m => m.codigo === c);
                                        return p ? p.nombre : `código ${c}`;
                                      }))}
                                    </span>
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded font-medium">
                                    <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                                    <span>Prelación cumplida</span>
                                  </span>
                                )}
                              </div>
                            )}

                            {seccionInscrita && (
                              <div className="flex items-center gap-1.5 text-xs font-semibold mt-1">
                                <span
                                  className="w-2.5 h-2.5 rounded-full shrink-0 shadow-2xs"
                                  style={{ backgroundColor: obtenerColorSeccion(seccionInscrita) }}
                                  title="Color asignado en el horario"
                                />
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span className={turnoFiltro === 'todos' || seccionInscrita.turno === turnoFiltro ? 'text-[#7b0000]' : 'text-amber-800'}>
                                  Inscrita: {seccionInscrita.profesor.startsWith('Prof.') || seccionInscrita.profesor.startsWith('Dr.') || seccionInscrita.profesor.startsWith('Dra.') ? '' : 'Prof. '}
                                  {seccionInscrita.profesor} (Sec. {seccionInscrita.seccion} · {seccionInscrita.turno})
                                  {turnoFiltro !== 'todos' && seccionInscrita.turno !== turnoFiltro && ' · (Otro Turno)'}
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {isExpandida ? (
                              <ChevronUp className="w-4 h-4 text-slate-400" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-slate-400" />
                            )}
                          </div>
                        </button>

                      {/* Secciones de la Asignatura */}
                      {isExpandida && (() => {
                        const seccionesAMostrar = turnoFiltro === 'todos'
                          ? materia.secciones
                          : materia.secciones.filter(s => s.turno === turnoFiltro);

                        return (
                          <div className="p-3 bg-slate-50/70 border-t border-slate-100 space-y-2">
                            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-1">
                              <span>
                                {turnoFiltro === 'todos'
                                  ? `Secciones Disponibles (${materia.secciones.length}):`
                                  : `Secciones Turno ${turnoFiltro} (${seccionesAMostrar.length} de ${materia.secciones.length}):`}
                              </span>
                              {turnoFiltro !== 'todos' && materia.secciones.length > seccionesAMostrar.length && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setTurnoFiltro('todos');
                                  }}
                                  className="text-[10px] text-[#7b0000] hover:underline font-bold capitalize cursor-pointer"
                                >
                                  Ver todos los turnos
                                </button>
                              )}
                            </div>

                            {seccionesAMostrar.length === 0 ? (
                              <div className="p-3 bg-white rounded-lg border border-slate-200 text-center text-xs text-slate-500">
                                <p>Esta materia no posee secciones en el Turno {turnoFiltro}.</p>
                                <button
                                  type="button"
                                  onClick={() => setTurnoFiltro('todos')}
                                  className="mt-1 text-xs text-[#7b0000] font-bold hover:underline cursor-pointer"
                                >
                                  Ver las {materia.secciones.length} secciones en otros turnos
                                </button>
                              </div>
                            ) : (
                              seccionesAMostrar.map(sec => {
                                const estaSeleccionada = seccionesSeleccionadas.some(s => s.id === sec.id);
                                const advertenciaChoque = !estaSeleccionada ? comprobarChoqueIndividual(sec) : null;

                                return (
                                  <div
                                    key={sec.id}
                                    className={`p-2.5 rounded-lg border transition-all text-xs ${estaSeleccionada ? 'bg-[#7b0000]/5 border-[#7b0000]' : advertenciaChoque ? 'bg-amber-50/50 border-amber-300' : 'bg-white border-slate-200 hover:border-slate-300'}`}
                                  >
                                    <div className="flex items-start justify-between gap-2">
                                      <div>
                                        <div className="flex items-center gap-2 font-medium">
                                          <span className="font-bold text-slate-900 text-sm">Sec. {sec.seccion}</span>
                                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                                            sec.turno === 'Mañana'
                                              ? 'bg-[#7b0000]/10 text-[#7b0000]'
                                              : sec.turno === 'Tarde'
                                              ? 'bg-amber-100 text-amber-900'
                                              : 'bg-indigo-100 text-indigo-900'
                                          }`}>
                                            {sec.turno}
                                          </span>
                                        </div>
                                        <p className="text-slate-700 mt-1 flex items-center gap-1.5 font-medium">
                                          <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                          <span>Prof. {sec.profesor}</span>
                                        </p>
                                        {formatearAula(sec.aula) ? (
                                          <p className="text-slate-500 mt-0.5 flex items-center gap-1.5 text-[11px]">
                                            <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                                            <span>{formatearAula(sec.aula)}</span>
                                          </p>
                                        ) : null}

                                        {/* Horarios de esta sección */}
                                        <div className="mt-1.5 flex flex-wrap gap-1.5">
                                          {sec.horarios.map((h, idx) => (
                                            <span key={idx} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px]">
                                              {sec.avisoEmergente
                                                ? `${h.dia}: Tarde (hora por confirmar)`
                                                : `${h.dia.slice(0, 3)}: ${formatRangoHora12(h.horaInicio, h.horaFin)}`}
                                            </span>
                                          ))}
                                        </div>

                                        {/* Aviso informativo de sección con horario por confirmar */}
                                        {sec.avisoEmergente && (
                                          <button
                                            type="button"
                                            onClick={() => setAvisoSeccionEmergente(sec)}
                                            className="mt-2 text-[11px] text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2 py-1 rounded flex items-center gap-1.5 font-medium text-left cursor-pointer transition-colors"
                                          >
                                            <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                                            <span>Hora exacta por confirmar (ver aviso)</span>
                                          </button>
                                        )}

                                        {/* Alerta de choque si choca con otra materia */}
                                        {advertenciaChoque && (
                                          <div className="mt-2 text-[11px] text-amber-800 bg-amber-100/70 px-2 py-1 rounded flex items-center gap-1 font-medium">
                                            <AlertTriangle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                                            <span>{advertenciaChoque}</span>
                                          </div>
                                        )}
                                      </div>

                                      {/* Botón de Inscribir / Desinscribir */}
                                      <div className="shrink-0 pt-0.5">
                                        <button
                                          onClick={() => toggleSeccion(sec)}
                                          className={`px-3 py-1.5 rounded-md font-semibold text-xs transition-colors whitespace-nowrap cursor-pointer ${
                                            estaSeleccionada
                                              ? 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
                                              : seccionInscrita
                                              ? 'bg-amber-600 text-white hover:bg-amber-700'
                                              : 'bg-[#7b0000] text-white hover:bg-[#620000]'
                                          }`}
                                          title={
                                            estaSeleccionada
                                              ? 'Quitar sección de tu horario'
                                              : seccionInscrita
                                              ? `Cambiar a esta sección (actualmente tienes Sec. ${seccionInscrita.seccion} - ${seccionInscrita.turno})`
                                              : `Inscribir en Turno ${sec.turno}`
                                          }
                                        >
                                          {estaSeleccionada ? 'Quitar' : seccionInscrita ? 'Cambiar a esta' : 'Inscribir'}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })
                            )}
                          </div>
                        );
                      })()}
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>

          {/* ================= COLUMNA DERECHA: Calendario Semanal / Lista ================= */}
          <div className="lg:col-span-8 xl:col-span-8 2xl:col-span-9 space-y-4">
            {/* Selector de Pestañas y Selector de Planes (Arriba a la derecha del horario) */}
            <div className="bg-white rounded-xl border border-slate-200 p-2 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5">
              <div className="flex items-center justify-between sm:justify-start gap-2">
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-semibold">
                  <button
                    onClick={() => setVistaActiva('calendario')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${vistaActiva === 'calendario' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Calendario</span>
                  </button>
                  <button
                    onClick={() => setVistaActiva('lista')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${vistaActiva === 'lista' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Lista ({seccionesSeleccionadas.length})</span>
                  </button>
                </div>

                {/* Selector Cuadrícula vs Agenda (en móvil) */}
                {vistaActiva === 'calendario' && (
                  <div className="flex items-center gap-0.5 bg-slate-100 p-0.5 rounded-lg text-[11px] font-semibold sm:hidden">
                    <button
                      type="button"
                      onClick={() => setFormatoVisualMobile('cuadricula')}
                      className={`px-2 py-1 rounded-md transition-all ${
                        formatoVisualMobile === 'cuadricula' ? 'bg-white text-[#7b0000] font-bold shadow-2xs' : 'text-slate-600'
                      }`}
                    >
                      Cuadrícula
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormatoVisualMobile('agenda')}
                      className={`px-2 py-1 rounded-md transition-all ${
                        formatoVisualMobile === 'agenda' ? 'bg-white text-[#7b0000] font-bold shadow-2xs' : 'text-slate-600'
                      }`}
                    >
                      Agenda
                    </button>
                  </div>
                )}
              </div>

              {/* ARRIBA A LA DERECHA DEL HORARIO: Selector de Planes (Plan A, Plan B, Plan C, Plan D, Plan E) */}
              <div className="flex items-center justify-between sm:justify-end gap-1.5">
                <div className="flex items-center flex-wrap bg-slate-100 p-0.5 rounded-lg border border-slate-200 gap-0.5">
                  <div className="px-1.5 sm:px-2 py-0.5 text-[11px] font-bold text-slate-500 flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-[#7b0000]" />
                    <span className="hidden xl:inline">Planes:</span>
                  </div>
                  {PLAN_IDS.map(pid => {
                    const activo = planActivo === pid;
                    const count = planes[pid].length;
                    return (
                      <button
                        key={pid}
                        type="button"
                        onClick={() => cambiarPlan(pid)}
                        className={`flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
                          activo
                            ? 'bg-[#7b0000] text-white shadow-2xs ring-1 ring-[#7b0000]'
                            : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/80'
                        }`}
                        title={`Cambiar a Plan ${pid} (${count} materias inscritas)`}
                      >
                        <span>Plan {pid}</span>
                        <span
                          className={`text-[10px] px-1 sm:px-1.5 py-0.2 rounded-full font-bold ${
                            activo
                              ? 'bg-white/20 text-[#F5E6D3]'
                              : count > 0
                              ? 'bg-slate-200 text-slate-800'
                              : 'text-slate-400 font-normal'
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Menú de opciones de Plan (Copiar a otro plan, vaciar este plan) */}
                <div className="relative" ref={planMenuRef}>
                  <button
                    type="button"
                    onClick={() => setMostrarMenuPlanes(prev => !prev)}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200 transition-colors flex items-center gap-1 text-xs font-semibold cursor-pointer"
                    title="Opciones de planes: duplicar o transferir horario entre planes"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>

                  {mostrarMenuPlanes && (
                    <div className="absolute right-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-40 text-xs animate-in fade-in zoom-in-95">
                      <div className="px-3 pb-2 border-b border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-[#7b0000] text-sm">Plan {planActivo}</span>
                          <p className="text-[10px] text-slate-400">Plan actual en pantalla</p>
                        </div>
                        <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full">
                          {seccionesSeleccionadas.length} {seccionesSeleccionadas.length === 1 ? 'materia' : 'materias'}
                        </span>
                      </div>

                      <div className="p-1.5">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 pt-1.5 pb-1">
                          Duplicar horario de Plan {planActivo} a:
                        </p>
                        {PLAN_IDS.filter(p => p !== planActivo).map(dest => (
                          <button
                            key={dest}
                            type="button"
                            onClick={() => {
                              duplicarPlan(planActivo, dest);
                              setMostrarMenuPlanes(false);
                            }}
                            className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-100 text-slate-700 flex items-center justify-between transition-colors cursor-pointer"
                          >
                            <span className="flex items-center gap-1.5">
                              <Copy className="w-3.5 h-3.5 text-slate-400" />
                              <span>Copiar al <strong>Plan {dest}</strong></span>
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {planes[dest].length > 0 ? `Sobrescribe (${planes[dest].length})` : 'Vacío'}
                            </span>
                          </button>
                        ))}
                      </div>

                      <div className="border-t border-slate-100 p-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            vaciarPlanActual();
                            setMostrarMenuPlanes(false);
                          }}
                          disabled={seccionesSeleccionadas.length === 0}
                          className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-red-50 text-red-700 disabled:opacity-40 disabled:hover:bg-transparent flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-red-500" />
                          <span>Vaciar solo Plan {planActivo}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* VISTA 1: Calendario Semanal Visual (8 Bloques Tradicionales UCV) */}
            {vistaActiva === 'calendario' && (
              <div
                ref={calendarioRef}
                className="bg-white rounded-xl border border-slate-200 shadow-sm p-2 sm:p-4 w-full overflow-hidden"
              >
                {/* Cabecera del calendario institucional para exportación */}
                <div className="mb-2.5 pb-2 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-bold text-[#7b0000] text-[11px] sm:text-xs">
                      UCV · ESCUELA DE DERECHO · HORARIO SEMANAL
                    </span>
                    <span className="text-slate-400 hidden sm:inline">|</span>
                    <span className="text-slate-500 font-medium text-[10px] sm:text-xs hidden sm:inline">
                      8 Bloques Oficiales (7:00 am a 7:00 pm)
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#7b0000] text-white font-bold text-[10px] tracking-wide">
                      PLAN {planActivo} · {periodoOferta}
                    </span>
                  </div>

                  {/* Filtro de día para pantalla pequeña */}
                  <div className="flex items-center gap-1 overflow-x-auto py-0.5 sm:hidden">
                    <button
                      type="button"
                      onClick={() => setDiaFiltroMobile('todos')}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 transition-colors ${
                        diaFiltroMobile === 'todos' ? 'bg-[#7b0000] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Toda la Semana
                    </button>
                    {DIAS_LABORABLES.map(d => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDiaFiltroMobile(d)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 transition-colors ${
                          diaFiltroMobile === d ? 'bg-[#7b0000] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {d.slice(0, 3)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* OPCIÓN A: Vista Agenda Vertical (ideal para móvil sin deslizar) */}
                {formatoVisualMobile === 'agenda' ? (
                  <div className="space-y-3 sm:hidden">
                    {(diaFiltroMobile === 'todos' ? DIAS_LABORABLES : [diaFiltroMobile]).map(dia => {
                      const clasesDelDia = seccionesSeleccionadas.flatMap(seccion => {
                        const coincidentes = seccion.horarios.filter(h => h.dia === dia);
                        return coincidentes.map(horario => ({ seccion, horario }));
                      }).sort((a, b) => horaAMinutos(a.horario.horaInicio) - horaAMinutos(b.horario.horaInicio));

                      return (
                        <div key={dia} className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
                          <div className="bg-slate-100/90 px-3 py-2 border-b border-slate-200/80 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-[#7b0000]" />
                              <h4 className="text-xs font-bold text-[#7b0000] uppercase tracking-wider">{dia}</h4>
                            </div>
                            <span className="text-[11px] font-semibold text-slate-500">
                              {clasesDelDia.length} {clasesDelDia.length === 1 ? 'materia' : 'materias'}
                            </span>
                          </div>

                          <div className="p-2 space-y-2">
                            {clasesDelDia.length === 0 ? (
                              <p className="text-xs text-slate-400 italic py-2 text-center">Sin materias programadas este día</p>
                            ) : (
                              clasesDelDia.map((item, idx) => {
                                const choqueConOtra = clasesDelDia.some(
                                  (otro, oIdx) => oIdx !== idx && bloquesSeSolapan(item.horario, otro.horario)
                                );

                                return (
                                  <div
                                    key={`${item.seccion.id}-${idx}`}
                                    style={!choqueConOtra ? { borderLeftWidth: '4px', borderLeftColor: obtenerColorSeccion(item.seccion) } : undefined}
                                    className={`p-2.5 rounded-lg border text-xs flex items-start justify-between gap-2.5 transition-all ${
                                      choqueConOtra
                                        ? 'bg-red-50 border-red-300 text-red-950'
                                        : 'bg-white border-slate-200 shadow-2xs'
                                    }`}
                                  >
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-1.5 flex-wrap mb-1">
                                        <span className="font-mono text-[11px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-800">
                                          {formatRangoHora12(item.horario.horaInicio, item.horario.horaFin)}
                                        </span>
                                        <span className="text-[10px] font-bold uppercase text-slate-500">
                                          Sec. {item.seccion.seccion} · {item.seccion.turno}
                                        </span>
                                        {choqueConOtra && (
                                          <span className="text-[10px] font-extrabold bg-red-600 text-white px-1.5 py-0.5 rounded flex items-center gap-1">
                                            <AlertTriangle className="w-3 h-3" />
                                            <span>Choque</span>
                                          </span>
                                        )}
                                      </div>

                                      <h5 className="font-bold text-slate-900 text-sm leading-tight">
                                        {item.seccion.materiaNombre}
                                      </h5>

                                      <div className="text-[11px] text-slate-600 mt-1 flex items-center gap-3 flex-wrap">
                                        <span className="flex items-center gap-1">
                                          <User className="w-3.5 h-3.5 text-slate-400" />
                                          <span>Prof. {item.seccion.profesor}</span>
                                        </span>
                                        {formatearAula(item.seccion.aula) ? (
                                          <span className="flex items-center gap-1">
                                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                            <span>{formatearAula(item.seccion.aula)}</span>
                                          </span>
                                        ) : null}
                                      </div>
                                    </div>

                                    <button
                                      type="button"
                                      onClick={() => removerSeccion(item.seccion.id)}
                                      className="px-2 py-1 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded text-xs font-semibold transition-colors cursor-pointer shrink-0"
                                    >
                                      Quitar
                                    </button>
                                  </div>
                                );
                              })
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* OPCIÓN B: Cuadrícula Semanal 100% Adaptable sin Desplazamiento Horizontal */
                  <div className="w-full">
                    {(() => {
                      const diasAMostrar = diaFiltroMobile === 'todos' ? DIAS_LABORABLES : [diaFiltroMobile];
                      const gridColsClass = diasAMostrar.length === 1
                        ? 'grid-cols-[56px_1fr] sm:grid-cols-[90px_1fr]'
                        : 'grid-cols-[52px_repeat(5,minmax(0,1fr))] sm:grid-cols-[80px_repeat(5,minmax(0,1fr))] md:grid-cols-[95px_repeat(5,minmax(0,1fr))] lg:grid-cols-[115px_repeat(5,minmax(0,1fr))]';

                      return (
                        <div className="w-full">
                          {/* Encabezado de columnas */}
                          <div className={`grid ${gridColsClass} gap-1 sm:gap-1.5 border-b border-slate-200 pb-2 mb-2 text-center text-xs font-bold w-full`}>
                            <div className="text-slate-500 font-semibold text-left pl-1 sm:pl-2 text-[9px] sm:text-xs">
                              Horario
                            </div>
                            {diasAMostrar.map(dia => (
                              <div key={dia} className="uppercase tracking-wider text-[9px] sm:text-xs text-[#7b0000] text-center font-bold truncate">
                                <span className="sm:hidden">{dia.slice(0, 3)}</span>
                                <span className="hidden sm:inline">{dia}</span>
                              </div>
                            ))}
                          </div>

                          {/* 8 Filas de los Bloques Oficiales */}
                          <div className="space-y-1 sm:space-y-1.5 w-full">
                            {BLOQUES_CALENDARIO_UCV.map(bloque => (
                              <div
                                key={bloque.id}
                                className={`grid ${gridColsClass} gap-1 sm:gap-1.5 min-h-[58px] sm:min-h-[76px] md:min-h-[84px] w-full`}
                              >
                                {/* Columna de Hora (Formato clásico 12h tanto en móvil como en escritorio) */}
                                <div className="p-0.5 sm:p-2 bg-[#FDFBF7] rounded-lg border border-[#E2D4C3] flex flex-col justify-center items-center sm:items-start text-center sm:text-left overflow-hidden">
                                  <div className="sm:hidden flex flex-col items-center justify-center text-[7.5px] leading-tight font-extrabold text-[#7b0000]">
                                    <span>{formatHora12(bloque.horaInicio)}</span>
                                    <span className="text-[6.5px] font-normal text-slate-400 my-0.2">a</span>
                                    <span>{formatHora12(bloque.horaFin)}</span>
                                  </div>
                                  <div className="hidden sm:block text-xs font-bold text-[#7b0000] leading-snug">
                                    {bloque.label}
                                  </div>
                                </div>

                                {/* Celdas de cada Día */}
                                {diasAMostrar.map(dia => {
                                  const clasesEnCelda = seccionesSeleccionadas.flatMap(seccion => {
                                    const horariosCoincidentes = seccion.horarios.filter(h =>
                                      h.dia === dia &&
                                      bloquesSeSolapan(h, {
                                        dia,
                                        horaInicio: bloque.horaInicio,
                                        horaFin: bloque.horaFin
                                      })
                                    );
                                    return horariosCoincidentes.map(h => ({
                                      seccion,
                                      horario: h
                                    }));
                                  });

                                  const hayChoque = clasesEnCelda.length > 1;

                                  return (
                                    <div
                                      key={dia}
                                      className={`rounded-lg p-0.5 sm:p-1 transition-all flex flex-col justify-center min-w-0 overflow-hidden ${
                                        hayChoque
                                          ? 'bg-red-50/90 border-2 border-red-500 ring-1 ring-red-400/40'
                                          : clasesEnCelda.length === 1
                                          ? 'border border-slate-200/60'
                                          : 'border border-dashed border-slate-200/60 hover:bg-[#7b0000]/5'
                                      }`}
                                    >
                                      {clasesEnCelda.length === 0 ? (
                                        <div className="h-full min-h-[46px] sm:min-h-[64px]" />
                                      ) : hayChoque ? (
                                        /* CHOQUE: Se muestran las 2 materias en ROJO */
                                        <div
                                          className="space-y-0.5 sm:space-y-1 w-full cursor-pointer"
                                          onClick={() => setMateriaDetalleModal(clasesEnCelda[0].seccion)}
                                        >
                                          <div className="flex items-center gap-0.5 text-[8px] sm:text-[9px] font-extrabold text-red-700 uppercase tracking-wider px-0.5">
                                            <AlertTriangle className="w-2.5 h-2.5 text-red-600 shrink-0" />
                                            <span className="truncate">Choque ({clasesEnCelda.length})</span>
                                          </div>
                                          <div className="space-y-0.5 sm:space-y-1">
                                            {clasesEnCelda.map((item, cIdx) => (
                                              <div
                                                key={`${item.seccion.id}-${cIdx}`}
                                                className="bg-red-600 text-white p-1 sm:p-1.5 rounded-md shadow-xs flex flex-col justify-between group transition-transform hover:scale-[1.01]"
                                                title={`Choque detectado: ${item.seccion.materiaNombre} (${item.seccion.profesor})`}
                                              >
                                                <div className="flex items-start justify-between gap-0.5">
                                                  <div className="min-w-0 flex-1">
                                                    <div className="font-extrabold text-[8.5px] sm:text-[10px] leading-tight text-white line-clamp-2 sm:line-clamp-1">
                                                      <span className="sm:hidden">{formatNombreMateriaMobile(item.seccion.materiaNombre)}</span>
                                                      <span className="hidden sm:inline">{item.seccion.materiaNombre}</span>
                                                    </div>
                                                    <div className="text-[7.5px] sm:text-[9px] text-red-100 font-medium truncate mt-0.5" title={`Prof. ${item.seccion.profesor}`}>
                                                      Prof. {item.seccion.profesor}
                                                    </div>
                                                  </div>
                                                  <button
                                                    onClick={e => {
                                                      e.stopPropagation();
                                                      removerSeccion(item.seccion.id);
                                                    }}
                                                    className="text-white hover:bg-black/30 rounded px-1 text-[8px] sm:text-[8.5px] shrink-0 font-bold"
                                                    title={`Quitar ${item.seccion.materiaNombre}`}
                                                  >
                                                    ✕
                                                  </button>
                                                </div>
                                                <div className="mt-0.5 pt-0.5 border-t border-red-500/70 hidden sm:flex items-center text-[8px] text-red-100">
                                                  <span className="truncate">Sec. {item.seccion.seccion}{formatearAula(item.seccion.aula) ? ` · ${formatearAula(item.seccion.aula)}` : ''}</span>
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      ) : (
                                        /* MATERIA SIN CHOQUE: Color normal de la materia */
                                        <div
                                          style={{ backgroundColor: obtenerColorSeccion(clasesEnCelda[0].seccion) }}
                                          onClick={() => setMateriaDetalleModal(clasesEnCelda[0].seccion)}
                                          className="h-full rounded-md p-1 sm:p-1.5 text-white shadow-xs flex flex-col justify-between group transition-transform hover:scale-[1.01] cursor-pointer min-w-0 overflow-hidden"
                                          title={`${clasesEnCelda[0].seccion.materiaNombre} (${clasesEnCelda[0].seccion.seccion}) - ${clasesEnCelda[0].seccion.profesor}`}
                                        >
                                          <div className="min-w-0">
                                            <div className="flex items-start justify-between gap-0.5">
                                              <span className="font-bold text-[8.5px] sm:text-[10.5px] leading-tight text-white flex-1 min-w-0 line-clamp-2 sm:line-clamp-1">
                                                <span className="sm:hidden">{formatNombreMateriaMobile(clasesEnCelda[0].seccion.materiaNombre)}</span>
                                                <span className="hidden sm:inline">{clasesEnCelda[0].seccion.materiaNombre}</span>
                                              </span>
                                              <button
                                                onClick={e => {
                                                  e.stopPropagation();
                                                  removerSeccion(clasesEnCelda[0].seccion.id);
                                                }}
                                                className="sm:opacity-0 sm:group-hover:opacity-100 text-white/90 hover:text-white bg-black/25 hover:bg-black/40 rounded px-1 text-[8px] sm:text-[8.5px] shrink-0 transition-opacity"
                                                title="Remover materia"
                                              >
                                                ✕
                                              </button>
                                            </div>
                                            {/* Ocultar sección en móvil, visible en computadora */}
                                            <div className="text-[7.5px] sm:text-[9px] text-white/90 truncate mt-0.5 hidden sm:block">
                                              Sec. {clasesEnCelda[0].seccion.seccion}{formatearAula(clasesEnCelda[0].seccion.aula) ? ` · ${formatearAula(clasesEnCelda[0].seccion.aula)}` : ''}
                                            </div>
                                          </div>
                                          {/* Nombre completo del profesor (o lo que quepa), sin badge de hora */}
                                          <div className="mt-0.5 sm:mt-1 pt-0.5 border-t border-white/20 flex items-center text-[7.5px] sm:text-[9.5px] text-white/95 overflow-hidden">
                                            <span className="truncate w-full font-medium" title={`Prof. ${clasesEnCelda[0].seccion.profesor}`}>
                                              Prof. {clasesEnCelda[0].seccion.profesor}
                                            </span>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {seccionesSeleccionadas.length === 0 && (
                  <div className="text-center py-10 sm:py-12 text-slate-400 text-xs">
                    No has seleccionado ninguna materia aún. Haz clic en "Inscribir" en las asignaturas del panel izquierdo para comenzar a armar tu horario.
                  </div>
                )}
              </div>
            )}

            {/* Modal de Detalle de Materia para Móvil y Desktop */}
            {materiaDetalleModal && (
              <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-4 border border-slate-200 overflow-hidden relative">
                  <div
                    className="h-1.5 w-full absolute top-0 left-0"
                    style={{ backgroundColor: obtenerColorSeccion(materiaDetalleModal) }}
                  />
                  <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5 mb-3 pt-1">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded border border-slate-200">
                          {materiaDetalleModal.codigoMateria}
                        </span>
                        <span
                          className="w-2.5 h-2.5 rounded-full inline-block"
                          style={{ backgroundColor: obtenerColorSeccion(materiaDetalleModal) }}
                          title="Color asignado a esta materia"
                        />
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 mt-1">
                        {materiaDetalleModal.materiaNombre}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setMateriaDetalleModal(null)}
                      className="text-slate-400 hover:text-slate-700 p-1 text-sm font-bold cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="space-y-2 text-xs text-slate-600">
                    <div className="flex items-center justify-between py-1 border-b border-slate-50">
                      <span className="text-slate-400">Profesor:</span>
                      <span className="font-bold text-slate-800">{materiaDetalleModal.profesor}</span>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-slate-50">
                      <span className="text-slate-400">Sección y Turno:</span>
                      <span className="font-bold text-slate-800">Sección {materiaDetalleModal.seccion} ({materiaDetalleModal.turno})</span>
                    </div>
                    {formatearAula(materiaDetalleModal.aula) ? (
                      <div className="flex items-center justify-between py-1 border-b border-slate-50">
                        <span className="text-slate-400">Aula / Temática:</span>
                        <span className="font-bold text-slate-800">{formatearAula(materiaDetalleModal.aula)}</span>
                      </div>
                    ) : null}
                    <div className="py-1">
                      <span className="text-slate-400 block mb-1">Horarios semanales:</span>
                      <div className="flex flex-wrap gap-1">
                        {materiaDetalleModal.horarios.map((h, i) => (
                          <span key={i} className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-[11px] font-medium">
                            {materiaDetalleModal.avisoEmergente
                              ? `${h.dia}: Tarde (hora por confirmar)`
                              : `${h.dia}: ${formatRangoHora12(h.horaInicio, h.horaFin)}`}
                          </span>
                        ))}
                      </div>
                    </div>
                    {materiaDetalleModal.avisoEmergente && (
                      <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-[11px] text-amber-950 font-medium leading-snug">
                        {materiaDetalleModal.avisoEmergente}
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        removerSeccion(materiaDetalleModal.id);
                        setMateriaDetalleModal(null);
                      }}
                      className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Quitar del Horario
                    </button>
                    <button
                      type="button"
                      onClick={() => setMateriaDetalleModal(null)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* VISTA 2: Lista Detallada de Asignaturas */}
            {vistaActiva === 'lista' && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">
                    Resumen de Asignaturas Seleccionadas ({seccionesSeleccionadas.length})
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">
                    Total: {totalCreditos} UC acumuladas
                  </span>
                </div>

                {seccionesSeleccionadas.length === 0 ? (
                  <div className="p-8 text-center text-slate-500 text-xs">
                    No hay asignaturas en la propuesta actual.
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {seccionesSeleccionadas.map((sec) => (
                      <div key={sec.id} className="p-3.5 flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <div
                            className="w-1.5 self-stretch rounded-full shrink-0 my-0.5"
                            style={{ backgroundColor: obtenerColorSeccion(sec) }}
                            title={`Color asignado a ${sec.materiaNombre}`}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 text-xs text-slate-500 mb-0.5">
                              <span className="font-mono font-bold text-[#7b0000]">{sec.codigoMateria}</span>
                              <span aria-hidden="true">·</span>
                              <span className="font-semibold text-slate-800">Sección {sec.seccion}</span>
                              <span aria-hidden="true">·</span>
                              <span>Turno {sec.turno}</span>
                            </div>
                            <h4 className="text-sm font-bold text-slate-900 truncate">
                              {sec.materiaNombre}
                            </h4>
                            <p className="text-xs text-slate-600 mt-0.5">
                              Prof. {sec.profesor}{formatearAula(sec.aula) ? ` · ${formatearAula(sec.aula)}` : ''}
                            </p>
                            <div className="mt-1 flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                              {sec.horarios.map((h, i) => (
                                <span key={i} className="bg-slate-100 px-2 py-0.5 rounded font-medium text-slate-700">
                                  {h.dia}: {formatRangoHora12(h.horaInicio, h.horaFin)}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => removerSeccion(sec.id)}
                          className="px-2.5 py-1.5 text-xs text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors font-medium border border-transparent hover:border-red-200 shrink-0"
                          title="Remover de la propuesta"
                        >
                          Remover
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Consejos estudiantiles para la inscripción en Derecho UCV */}
            <div className="bg-amber-50/60 border border-amber-200/80 rounded-xl p-4 text-xs text-amber-900">
              <h4 className="font-bold text-amber-900 mb-1 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-700" />
                Información Clave para la Inscripción (UCV Derecho):
              </h4>
              <ul className="list-disc list-inside space-y-1 text-amber-800/90 pl-1">
                <li>El pensum de la Escuela de Derecho es anual (de 1er a 5to año).</li>
                <li>El tope regular aconsejado es de un máximo de <strong>8 asignaturas</strong> por período anual.</li>
                <li>Si trabajas, los turnos recomendados son <strong>Tarde (1:00 pm a 5:30 pm)</strong> o <strong>Noche (5:30 pm a 7:00 pm)</strong>.</li>
                <li>Descarga tu PDF para tener a mano los códigos y secciones al momento de ingresar a Control de Estudios / SICE.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: Datos del Estudiante para el PDF Oficial */}
      {mostrarModalEstudiante && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5 text-[#7b0000]">
                <Printer className="w-5 h-5 text-[#7b0000]" />
                <h3 className="text-base font-bold text-slate-900">
                  Descargar Horario Semanal (Plan {planActivo})
                </h3>
              </div>
              <button
                onClick={() => setMostrarModalEstudiante(false)}
                className="text-slate-400 hover:text-slate-600 text-lg leading-none cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 mt-3 mb-4 leading-relaxed">
              El horario se descargará con el <strong>diseño visual exacto del simulador</strong> (matriz de 8 bloques, colores oficiales por materia, profesores, secciones y logo de Ideal UCVista).
            </p>

            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nombre Completo del Estudiante (opcional):
                </label>
                <input
                  type="text"
                  placeholder="Ej. María Pérez"
                  value={nombreEstudiante}
                  onChange={e => setNombreEstudiante(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7b0000] focus:bg-white"
                />
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs space-y-1">
                <div className="flex justify-between text-slate-600">
                  <span>Plan a descargar:</span>
                  <span className="font-bold text-[#7b0000]">Plan {planActivo}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Asignaturas a exportar:</span>
                  <span className="font-bold text-slate-900">{totalMaterias}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Total Unidades de Crédito:</span>
                  <span className="font-bold text-[#7b0000]">{totalCreditos} UC</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Estado de choques:</span>
                  <span className={choques.length > 0 ? 'font-bold text-red-600' : 'font-bold text-emerald-600'}>
                    {choques.length > 0 ? `${choques.length} Choques` : 'Sin conflictos'}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setMostrarModalEstudiante(false)}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer text-center"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => manejarDescargaVisual('imagen')}
                disabled={generandoPdf}
                className="flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-[#FAF5EE] hover:bg-[#F2E8DC] text-[#7b0000] border border-[#E2D4C3] rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                title="Descargar imagen en alta resolución PNG para guardar en el celular"
              >
                <Download className="w-4 h-4" />
                <span>Imagen PNG (HD)</span>
              </button>
              <button
                type="button"
                onClick={() => manejarDescargaVisual('pdf')}
                disabled={generandoPdf}
                className="flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold bg-[#7b0000] hover:bg-[#620000] text-white rounded-lg transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
              >
                {generandoPdf ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Generando...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Descargar PDF</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Impedir mezclar horario vigente (2026-2027) y anterior (2025-2026) al mismo tiempo */}
      {periodoPendienteCambio && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-amber-300 animate-in zoom-in-95 duration-200">
            <div className="bg-[#7b0000] text-white px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="text-sm font-bold leading-tight">
                    Cambio de Período Académico
                  </h3>
                  <p className="text-[11px] text-[#F5E6D3]">
                    Solo un período activo a la vez
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPeriodoPendienteCambio(null)}
                className="w-7 h-7 rounded-lg text-white/80 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Cerrar modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-3.5 text-xs text-slate-700 leading-relaxed">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-950 font-medium">
                No puedes combinar ni mantener materias del horario{' '}
                <strong>2026–2027 (Vigente)</strong> y del horario{' '}
                <strong>2025–2026 (Anterior)</strong> al mismo tiempo.
              </div>

              <p>
                Actualmente tienes materias cargadas en el período{' '}
                <strong>
                  {periodoOferta === '2026-2027' ? '2026–2027 (Vigente)' : '2025–2026 (Anterior)'}
                </strong>
                :
              </p>

              <div className="flex flex-wrap gap-1.5">
                {planesConMateriasEnPeriodoActual.map(item => (
                  <span
                    key={item.plan}
                    className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 font-semibold text-slate-800"
                  >
                    Plan {item.plan}: {item.cantidad} {item.cantidad === 1 ? 'materia' : 'materias'}
                  </span>
                ))}
              </div>

              <p className="text-slate-600">
                Si cambias a{' '}
                <strong>
                  {periodoPendienteCambio === '2026-2027' ? '2026–2027 (Vigente)' : '2025–2026 (Anterior)'}
                </strong>
                , se limpiarán las materias del período actual para evitar mezclar ambos horarios.
              </p>

              <div className="pt-2 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setPeriodoPendienteCambio(null)}
                  className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold transition-colors cursor-pointer text-center"
                >
                  Mantener {periodoOferta === '2026-2027' ? '2026–2027' : '2025–2026'}
                </button>
                <button
                  type="button"
                  onClick={confirmarCambioPeriodoLimpiando}
                  className="px-4 py-2 rounded-lg bg-[#7b0000] hover:bg-[#620000] text-white font-bold transition-colors shadow-sm cursor-pointer text-center"
                >
                  Limpiar y cambiar a {periodoPendienteCambio === '2026-2027' ? '2026–2027' : '2025–2026'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Aviso emergente para secciones con información horaria parcial */}
      {avisoSeccionEmergente && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-amber-300 animate-in zoom-in-95 duration-200">
            <div className="bg-[#7b0000] text-white px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="text-sm font-bold leading-tight">
                    Aviso de Horario · Prof. {avisoSeccionEmergente.profesor}
                  </h3>
                  <p className="text-[11px] text-[#F5E6D3]">
                    {avisoSeccionEmergente.materiaNombre} · Sec. {avisoSeccionEmergente.seccion}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setAvisoSeccionEmergente(null)}
                className="w-7 h-7 rounded-lg text-white/80 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Cerrar aviso"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-3.5 text-xs text-slate-700 leading-relaxed">
              <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-950 font-semibold text-xs sm:text-sm leading-relaxed">
                "{avisoSeccionEmergente.avisoEmergente}"
              </div>

              <p className="text-slate-600">
                Esta sección se muestra de forma referencial los <strong>jueves en la tarde</strong> en el calendario mientras se confirma su hora exacta de inicio y fin.
              </p>

              <div className="pt-1 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2">
                {seccionesSeleccionadas.some(s => s.id === avisoSeccionEmergente.id) && (
                  <button
                    type="button"
                    onClick={() => {
                      removerSeccion(avisoSeccionEmergente.id);
                      setAvisoSeccionEmergente(null);
                      mostrarAviso(`Se removió ${avisoSeccionEmergente.materiaNombre} (${avisoSeccionEmergente.seccion})`);
                    }}
                    className="px-3.5 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-semibold transition-colors cursor-pointer text-center"
                  >
                    Quitar sección
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setAvisoSeccionEmergente(null)}
                  className="px-4 py-2 rounded-lg bg-[#7b0000] hover:bg-[#620000] text-white font-bold transition-colors shadow-sm cursor-pointer text-center"
                >
                  Entendido
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Pie de Página Institucional - Ideal UCVista */}
      <footer className="mt-14 border-t border-[#EADBCE] bg-[#FFFDF9] py-8 px-4 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="bg-white p-1 rounded-lg border border-[#EADBCE]/80 shadow-2xs">
              <img src="/ideal_ucvista_logo.png" alt="Ideal UCVista" className="h-9 w-auto object-contain" />
            </div>
            <div className="text-left">
              <p className="text-xs font-black text-[#7b0000] tracking-wider">IDEAL UCVISTA</p>
              <p className="text-[11px] text-slate-500 font-medium">Escuela de Derecho · Universidad Central de Venezuela</p>
            </div>
          </div>
          <p className="text-xs text-slate-600 max-w-md leading-relaxed">
            Simulador interactivo desarrollado por el equipo de <strong>Ideal UCVista</strong> para apoyar la planificación y verificación de inscripciones de la comunidad estudiantil.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[11px] font-semibold text-[#7b0000] pt-1">
            <span className="bg-[#7b0000]/10 px-2 py-0.5 rounded text-[#7b0000]">
              Año Lectivo {periodoOferta === '2026-2027' ? '2026 – 2027' : '2025 – 2026'}
            </span>
            <span className="text-[#D4C4B5]">·</span>
            <span>FCJP · UCV Caracas</span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium pt-1">
            Simulador diseñado por Carlos Alayón
          </p>
        </div>
      </footer>
</div>
  );
}
