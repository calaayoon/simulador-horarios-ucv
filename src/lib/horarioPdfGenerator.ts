import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {
  Seccion,
  BLOQUES_CALENDARIO_UCV,
  DIAS_LABORABLES,
  bloquesSeSolapan,
  detectarTodosLosChoques,
  formatearAula,
  formatHora12,
  asignarColoresDiferenciados
} from '../data/horariosData';

export interface HorarioPdfOptions {
  estudianteNombre?: string;
  secciones: Seccion[];
  totalCreditos: number;
  totalMaterias: number;
  horasSemanalesTotales: number;
  periodoLectivo?: string;
  planActivo?: string;
  formato?: 'pdf' | 'imagen';
}

/**
 * Genera y descarga el horario visual tal cual se visualiza en el simulador
 * con su matriz semanal de 8 bloques, colores por materia, encabezado oficial UCV y logo Ideal UCVista.
 */
export async function exportarHorarioPdf(options: HorarioPdfOptions): Promise<void> {
  const {
    estudianteNombre = '',
    secciones,
    totalCreditos,
    totalMaterias,
    horasSemanalesTotales,
    periodoLectivo = 'Año Lectivo 2025 – 2026',
    planActivo = 'A',
    formato = 'pdf'
  } = options;

  const choques = detectarTodosLosChoques(secciones);
  const coloresMap = asignarColoresDiferenciados(secciones);

  // 1. Crear contenedor temporal con dimensiones de escritorio (1280px)
  const tempContainer = document.createElement('div');
  tempContainer.style.position = 'fixed';
  tempContainer.style.left = '-9999px';
  tempContainer.style.top = '0';
  tempContainer.style.width = '1280px';
  tempContainer.style.zIndex = '-9999';
  tempContainer.style.backgroundColor = '#FAF7F2';
  tempContainer.style.color = '#0F172A';
  tempContainer.style.fontFamily = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  tempContainer.style.padding = '16px';
  tempContainer.style.boxSizing = 'border-box';

  // 2. Construir la matriz visual de los 8 bloques
  const filasBloquesHtml = BLOQUES_CALENDARIO_UCV.map(bloque => {
    const celdasDiasHtml = DIAS_LABORABLES.map(dia => {
      const clasesEnCelda = secciones.flatMap(seccion => {
        const horariosCoincidentes = seccion.horarios.filter(h =>
          h.dia === dia &&
          bloquesSeSolapan(h, {
            dia,
            horaInicio: bloque.horaInicio,
            horaFin: bloque.horaFin
          })
        );
        return horariosCoincidentes.map(h => ({ seccion, horario: h }));
      });

      const hayChoque = clasesEnCelda.length > 1;

      if (clasesEnCelda.length === 0) {
        return `
          <div style="background: #ffffff; border: 1px dashed #CBD5E1; border-radius: 8px; min-height: 88px; height: 100%; box-sizing: border-box;"></div>
        `;
      }

      if (hayChoque) {
        return `
          <div style="background: #FEF2F2; border: 2px solid #DC2626; border-radius: 8px; padding: 6px; display: flex; flex-direction: column; gap: 4px; min-height: 88px; box-sizing: border-box;">
            <div style="font-size: 8.5px; font-weight: 800; color: #DC2626; text-transform: uppercase; letter-spacing: 0.5px;">
              ⚠️ Choque (${clasesEnCelda.length} materias)
            </div>
            ${clasesEnCelda.map(item => `
              <div style="background: #DC2626; color: #ffffff; border-radius: 6px; padding: 4px 6px;">
                <div style="font-weight: 800; font-size: 10px; line-height: 1.15;">
                  ${item.seccion.materiaNombre}
                </div>
                <div style="font-size: 8.5px; color: #FEE2E2; margin-top: 2px; font-weight: 600;">
                  Sec. ${item.seccion.seccion} · Prof. ${item.seccion.profesor}
                </div>
              </div>
            `).join('')}
          </div>
        `;
      }

      const sec = clasesEnCelda[0].seccion;
      const aulaLimpia = formatearAula(sec.aula);
      const colorSec = coloresMap.get(sec.materiaId || sec.codigoMateria) || sec.color;

      return `
        <div style="background-color: ${colorSec}; color: #ffffff; border-radius: 8px; padding: 8px 10px; display: flex; flex-direction: column; justify-content: flex-start; min-height: 88px; box-sizing: border-box; box-shadow: 0 1px 3px rgba(0,0,0,0.08);">
          <div style="font-weight: 800; font-size: 11.5px; line-height: 1.22; color: #ffffff;">
            ${sec.materiaNombre}
          </div>
          <div style="font-size: 10px; font-weight: 700; color: #FEF3C7; margin-top: 3px;">
            Sec. ${sec.seccion}${aulaLimpia ? ` · <span style="font-weight: 500; color: rgba(255,255,255,0.92);">${aulaLimpia}</span>` : ''}
          </div>
          <div style="margin-top: auto; border-top: 1px solid rgba(255,255,255,0.3); padding-top: 4px; font-size: 9.5px; color: #ffffff; font-weight: 700; line-height: 1.25;">
            Prof. ${sec.profesor}
          </div>
        </div>
      `;
    }).join('');

    return `
      <div style="display: grid; grid-template-columns: 115px repeat(5, 1fr); gap: 8px; min-height: 88px; margin-bottom: 7px;">
        <div style="background: #FDFBF7; border: 1.5px solid #E2D4C3; border-radius: 8px; padding: 6px 4px; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; min-height: 88px; box-sizing: border-box;">
          <span style="font-size: 13px; font-weight: 900; color: #7b0000; letter-spacing: -0.3px; line-height: 1.15;">
            ${formatHora12(bloque.horaInicio)}
          </span>
          <span style="font-size: 9px; font-weight: 700; color: #94A3B8; text-transform: uppercase; margin: 3px 0;">
            a
          </span>
          <span style="font-size: 13px; font-weight: 900; color: #7b0000; letter-spacing: -0.3px; line-height: 1.15;">
            ${formatHora12(bloque.horaFin)}
          </span>
        </div>
        ${celdasDiasHtml}
      </div>
    `;
  }).join('');

  // 3. Plantilla HTML completa
  tempContainer.innerHTML = `
    <div style="background: #ffffff; border: 1px solid #E2E8F0; border-radius: 14px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
      <!-- ENCABEZADO INSTITUCIONAL -->
      <div style="background: #7b0000; color: #ffffff; padding: 12px 20px; border-bottom: 3px solid #E2D4C3; display: flex; align-items: center; justify-content: space-between;">
        <div style="display: flex; align-items: center; gap: 14px;">
          <div style="background: #FFFDF9; padding: 4px 8px; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
            <img src="/ideal_ucvista_logo.png" style="height: 38px; width: auto; object-fit: contain;" alt="Logo" />
          </div>
          <div>
            <div style="font-size: 9.5px; font-weight: 700; color: #F5E6D3; letter-spacing: 0.8px;">
              UNIVERSIDAD CENTRAL DE VENEZUELA · FACULTAD DE CIENCIAS JURÍDICAS Y POLÍTICAS · ESCUELA DE DERECHO
            </div>
            <div style="font-size: 16px; font-weight: 900; letter-spacing: -0.2px; margin-top: 2px;">
              HORARIO SEMANAL OFICIAL · IDEAL UCVISTA
            </div>
          </div>
        </div>
        <div style="text-align: right;">
          <span style="background: #620000; border: 1px solid rgba(255,255,255,0.25); color: #FFFDF9; font-size: 11.5px; font-weight: 800; padding: 4px 12px; border-radius: 6px;">
            PLAN ${planActivo}
          </span>
          <div style="font-size: 9.5px; color: #F5E6D3; margin-top: 4px; font-weight: 600;">
            ${periodoLectivo}
          </div>
        </div>
      </div>

      <!-- BARRA DE INFORMACIÓN DEL ESTUDIANTE Y RESUMEN -->
      <div style="background: #FDFBF7; padding: 8px 20px; border-bottom: 1px solid #E2E8F0; display: flex; align-items: center; justify-content: space-between; font-size: 10.5px;">
        <div style="display: flex; align-items: center; gap: 14px;">
          ${estudianteNombre ? `<span><strong>Estudiante:</strong> ${estudianteNombre}</span>` : '<span><strong>Planificación de Inscripción</strong></span>'}
          <span style="color: #64748B;">Escuela de Derecho (UCV)</span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="background: rgba(123, 0, 0, 0.08); color: #7b0000; font-weight: 700; padding: 2.5px 8.5px; border-radius: 5px;">
            ${totalMaterias} Materias
          </span>
          <span style="background: #FEF3C7; color: #92400E; font-weight: 700; padding: 2.5px 8.5px; border-radius: 5px;">
            ${totalCreditos} UC
          </span>
          <span style="background: #E0E7FF; color: #3730A3; font-weight: 700; padding: 2.5px 8.5px; border-radius: 5px;">
            ${horasSemanalesTotales} hrs/semana
          </span>
          <span style="background: ${choques.length === 0 ? '#ECFDF5' : '#FEF2F2'}; color: ${choques.length === 0 ? '#065F46' : '#991B1B'}; font-weight: 700; padding: 2.5px 8.5px; border-radius: 5px;">
            ${choques.length === 0 ? '✓ Sin choques' : `⚠️ ${choques.length} Choque(s)`}
          </span>
        </div>
      </div>

      <!-- CUADRÍCULA SEMANAL DEL SIMULADOR -->
      <div style="padding: 10px 18px 12px 18px;">
        <!-- Cabecera de Días -->
        <div style="display: grid; grid-template-columns: 115px repeat(5, 1fr); gap: 8px; border-bottom: 2px solid #E2D4C3; padding-bottom: 6px; margin-bottom: 7px; text-align: center;">
          <div style="font-size: 11px; font-weight: 800; color: #64748B; text-align: center; letter-spacing: 0.5px;">HORA</div>
          ${DIAS_LABORABLES.map(dia => `
            <div style="font-size: 12px; font-weight: 900; color: #7b0000; text-transform: uppercase; letter-spacing: 0.6px;">${dia}</div>
          `).join('')}
        </div>

        <!-- 8 Filas de Bloques -->
        <div>
          ${filasBloquesHtml}
        </div>
      </div>

      <!-- PIE DE PÁGINA INSTITUCIONAL -->
      <div style="background: #F8FAFC; padding: 6px 20px; border-top: 1px solid #E2E8F0; display: flex; align-items: center; justify-content: space-between; font-size: 8.5px; color: #94A3B8;">
        <div>
          Generado con el Simulador de Horarios de la Escuela de Derecho (UCV) · Equipo Ideal UCVista
        </div>
        <div style="font-weight: 700; color: #7b0000;">
          Caracas, Venezuela · Año Lectivo 2025 – 2026
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(tempContainer);

  try {
    const canvas = await html2canvas(tempContainer, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#FAF7F2'
    });

    if (formato === 'imagen') {
      // Descarga directa como imagen PNG HD
      const link = document.createElement('a');
      link.download = `Horario_UCV_Derecho_Plan_${planActivo}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } else {
      // Descarga como PDF Landscape A4 ajustado y perfectamente centrado
      const imgData = canvas.toDataURL('image/png');
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = doc.internal.pageSize.getWidth(); // 297mm
      const pageHeight = doc.internal.pageSize.getHeight(); // 210mm
      const marginX = 8;
      const marginY = 8;
      const availWidth = pageWidth - (marginX * 2); // 281mm
      const availHeight = pageHeight - (marginY * 2); // 194mm

      const canvasRatio = canvas.width / canvas.height;
      let finalWidth = availWidth;
      let finalHeight = finalWidth / canvasRatio;

      if (finalHeight > availHeight) {
        finalHeight = availHeight;
        finalWidth = finalHeight * canvasRatio;
      }

      // Centrar vertical y horizontalmente en la hoja A4
      const posX = marginX + ((availWidth - finalWidth) / 2);
      const posY = marginY + ((availHeight - finalHeight) / 2);

      doc.addImage(imgData, 'PNG', posX, posY, finalWidth, finalHeight);
      doc.save(`Horario_UCV_Derecho_Plan_${planActivo}.pdf`);
    }
  } finally {
    document.body.removeChild(tempContainer);
  }
}
