import React, { useMemo } from 'react';
import {
  CheckCircle2,
  CheckSquare,
  Square,
  Sparkles,
  AlertCircle,
  GraduationCap,
  RotateCcw,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { Materia, MATERIAS_DERECHO_UCV } from '../data/horariosData';

interface MateriasAprobadasPanelProps {
  materiasAprobadas: string[];
  onToggleMateria: (codigo: string) => void;
  onMarcarAnioCompleto: (anio: number) => void;
  onDesmarcarAnioCompleto: (anio: number) => void;
  onMarcarHastaAnio: (hastaAnio: number) => void;
  onLimpiarTodas: () => void;
  onSeleccionarAnioHorario: (anio: number) => void;
}

export default function MateriasAprobadasPanel({
  materiasAprobadas,
  onToggleMateria,
  onMarcarAnioCompleto,
  onDesmarcarAnioCompleto,
  onMarcarHastaAnio,
  onLimpiarTodas,
  onSeleccionarAnioHorario
}: MateriasAprobadasPanelProps) {
  // Materias agrupadas por año (1° a 5° año)
  const materiasPorAnio = useMemo(() => {
    const mapa: { [key: number]: Materia[] } = { 1: [], 2: [], 3: [], 4: [], 5: [] };
    MATERIAS_DERECHO_UCV.forEach(m => {
      if (mapa[m.anio]) {
        mapa[m.anio].push(m);
      }
    });
    return mapa;
  }, []);

  // Total de materias del pensum (30 materias oficiales)
  const totalMateriasPensum = MATERIAS_DERECHO_UCV.length;

  // Mapa rápido de código -> nombre de materia
  const mapaNombres = useMemo(() => {
    const mapa = new Map<string, string>();
    MATERIAS_DERECHO_UCV.forEach(m => {
      mapa.set(m.codigo, m.nombre);
    });
    return mapa;
  }, []);

  // Verificar si todas las materias de un año están aprobadas
  const esAnioCompletoAprobado = (anio: number) => {
    const materias = materiasPorAnio[anio] || [];
    if (materias.length === 0) return false;
    return materias.every(m => materiasAprobadas.includes(m.codigo));
  };

  // Contar aprobadas por año
  const contarAprobadasEnAnio = (anio: number) => {
    const materias = materiasPorAnio[anio] || [];
    return materias.filter(m => materiasAprobadas.includes(m.codigo)).length;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-4">
      {/* Encabezado del Sistema de Prelaciones */}
      <div className="border-b border-slate-100 pb-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 leading-tight">
                Sistema de Prelaciones · Materias Aprobadas
              </h2>
              <p className="text-[11px] text-slate-500">
                Marca las asignaturas que ya tienes aprobadas en tu expediente UCV
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-1 rounded-md shrink-0">
            {materiasAprobadas.length} / {totalMateriasPensum} Aprobadas
          </span>
        </div>

        {/* Barra de progreso de la carrera */}
        <div className="mt-3">
          <div className="flex justify-between text-[11px] text-slate-600 font-medium mb-1">
            <span>Progreso del Pensum ({materiasAprobadas.length} / {totalMateriasPensum} materias aprobadas)</span>
            <span className="font-bold text-emerald-700">
              {Math.round((materiasAprobadas.length / totalMateriasPensum) * 100)}%
            </span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 transition-all duration-300 rounded-full"
              style={{ width: `${(materiasAprobadas.length / totalMateriasPensum) * 100}%` }}
            />
          </div>
        </div>

        {/* Atajos Rápidos de Carga por Año */}
        <div className="mt-3 pt-2.5 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Marcado rápido para estudiantes de años superiores:</span>
          </div>
          <div className="flex flex-wrap gap-1.5 text-xs">
            <button
              type="button"
              onClick={() => onMarcarHastaAnio(1)}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-medium text-[11px] transition-colors cursor-pointer"
              title="Aprobar todas las materias de 1er Año (para cursantes de 2do)"
            >
              Pasé hasta 1° (Voy a 2°)
            </button>
            <button
              type="button"
              onClick={() => onMarcarHastaAnio(2)}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-medium text-[11px] transition-colors cursor-pointer"
              title="Aprobar todas las materias de 1° y 2° Año (para cursantes de 3ro)"
            >
              Pasé hasta 2° (Voy a 3°)
            </button>
            <button
              type="button"
              onClick={() => onMarcarHastaAnio(3)}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-medium text-[11px] transition-colors cursor-pointer"
              title="Aprobar todas las materias de 1°, 2° y 3° Año (para cursantes de 4to)"
            >
              Pasé hasta 3° (Voy a 4°)
            </button>
            <button
              type="button"
              onClick={() => onMarcarHastaAnio(4)}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-medium text-[11px] transition-colors cursor-pointer"
              title="Aprobar todas las materias de 1° a 4° Año (para cursantes de 5to)"
            >
              Pasé hasta 4° (Voy a 5°)
            </button>
            <button
              type="button"
              onClick={onLimpiarTodas}
              disabled={materiasAprobadas.length === 0}
              className="px-2.5 py-1 bg-red-50 hover:bg-red-100 disabled:opacity-40 disabled:cursor-not-allowed text-red-700 rounded-md font-semibold text-[11px] transition-colors cursor-pointer flex items-center gap-1 border border-red-200/60"
              title="Desmarcar todas las materias aprobadas"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Limpiar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Listado de Materias por Cada Año (1° a 5°) */}
      <div className="space-y-4 max-h-[680px] overflow-y-auto pr-1">
        {[1, 2, 3, 4, 5].map(anio => {
          const materias = materiasPorAnio[anio] || [];
          const todasAprobadas = esAnioCompletoAprobado(anio);
          const aprobadasCount = contarAprobadasEnAnio(anio);

          return (
            <div
              key={anio}
              className={`rounded-xl border transition-all ${
                todasAprobadas
                  ? 'bg-emerald-50/40 border-emerald-200'
                  : aprobadasCount > 0
                  ? 'bg-slate-50/70 border-slate-200'
                  : 'bg-white border-slate-200'
              }`}
            >
              {/* Cabecera del Año con Acción Masiva */}
              <div className="p-3 bg-slate-100/80 rounded-t-xl border-b border-slate-200/80 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-[#7b0000] text-white text-xs font-bold flex items-center justify-center">
                    {anio}°
                  </span>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 leading-tight">
                      {anio}° Año del Pensum
                    </h3>
                    <span className="text-[10px] text-slate-500 font-medium">
                      {aprobadasCount} de {materias.length} materias aprobadas
                    </span>
                  </div>
                </div>

                {/* Botón para marcar o desmarcar el año completo */}
                <div>
                  {todasAprobadas ? (
                    <button
                      type="button"
                      onClick={() => onDesmarcarAnioCompleto(anio)}
                      className="px-2.5 py-1 rounded text-[11px] font-semibold bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 transition-colors cursor-pointer flex items-center gap-1"
                      title={`Desmarcar todas las materias de ${anio}° Año`}
                    >
                      <span>Desmarcar {anio}° Año</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onMarcarAnioCompleto(anio)}
                      className="px-2.5 py-1 rounded text-[11px] font-semibold bg-[#7b0000] hover:bg-[#620000] text-white transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                      title={`Aprobar todo el ${anio}° Año con 1 clic`}
                    >
                      <Check className="w-3 h-3 text-emerald-300" />
                      <span>Aprobar todo {anio}° Año</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Materias Individuales del Año */}
              <div className="p-2.5 space-y-1.5">
                {materias.map(materia => {
                  const estaAprobada = materiasAprobadas.includes(materia.codigo);

                  // Verificar si sus prelaciones están cumplidas
                  const prelacionesCodigos = materia.prelaciones || [];
                  const prelacionesFaltantes = prelacionesCodigos.filter(
                    cod => !materiasAprobadas.includes(cod)
                  );
                  const prelacionesCumplidas = prelacionesCodigos.length > 0 && prelacionesFaltantes.length === 0;

                  return (
                    <div
                      key={materia.codigo}
                      onClick={() => onToggleMateria(materia.codigo)}
                      className={`p-2.5 rounded-lg border transition-all cursor-pointer flex items-start justify-between gap-3 select-none ${
                        estaAprobada
                          ? 'bg-emerald-50/90 border-emerald-300 hover:bg-emerald-100/80 shadow-2xs'
                          : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start gap-2.5 flex-1 min-w-0">
                        {/* Checkbox Visual */}
                        <button
                          type="button"
                          className="mt-0.5 shrink-0 focus:outline-none"
                          aria-label={`Marcar ${materia.nombre} como aprobada`}
                        >
                          {estaAprobada ? (
                            <CheckSquare className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-400" />
                          )}
                        </button>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-mono text-[10px] font-bold px-1.5 py-0.2 bg-slate-100 text-slate-700 rounded border border-slate-200">
                              {materia.codigo}
                            </span>
                            <span className="text-xs font-bold text-slate-900 truncate">
                              {materia.nombre}
                            </span>
                          </div>

                          {/* Info de prelación si la materia tiene */}
                          {prelacionesCodigos.length > 0 && (
                            <div className="mt-1 flex items-center gap-1 text-[10px]">
                              <span className="text-slate-400 font-medium">Prela de:</span>
                              {prelacionesCodigos.map(pCod => {
                                const prelAprobada = materiasAprobadas.includes(pCod);
                                const nombrePrel = mapaNombres.get(pCod) || pCod;
                                return (
                                  <span
                                    key={pCod}
                                    className={`px-1 py-0.2 rounded font-medium ${
                                      prelAprobada
                                        ? 'bg-emerald-100 text-emerald-800'
                                        : 'bg-amber-100 text-amber-800'
                                    }`}
                                    title={`${pCod} - ${nombrePrel}`}
                                  >
                                    {pCod} {prelAprobada ? '✓' : '✗'}
                                  </span>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Insignia de Estado */}
                      <div className="shrink-0 text-right">
                        <span className="text-[10px] font-bold text-slate-500 block">
                          {materia.creditos} UC
                        </span>
                        {estaAprobada ? (
                          <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-100/90 px-1.5 py-0.5 rounded">
                            <Check className="w-2.5 h-2.5" />
                            <span>Aprobada</span>
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400 font-medium">
                            Pendiente
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Llamado a la Acción Inferior: Ir a Organizar Horario */}
      <div className="p-3 bg-[#7b0000]/5 border border-[#7b0000]/20 rounded-xl text-xs space-y-2">
        <div className="flex items-center gap-2 text-[#7b0000] font-bold">
          <BookOpen className="w-4 h-4 text-[#7b0000]" />
          <span>¿Listo con tus materias aprobadas? Organiza tu horario:</span>
        </div>
        <p className="text-[11px] text-slate-600">
          Haz clic en el año que vas a cursar este período académico para seleccionar tus secciones y profesores:
        </p>
        <div className="grid grid-cols-5 gap-1.5 pt-1">
          {[1, 2, 3, 4, 5].map(anio => (
            <button
              key={anio}
              type="button"
              onClick={() => onSeleccionarAnioHorario(anio)}
              className="py-1.5 px-2 bg-[#7b0000] hover:bg-[#620000] text-white rounded-lg font-bold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-2xs"
            >
              <span>{anio}° Año</span>
              <ArrowRight className="w-3 h-3 text-[#EADBCE]" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
