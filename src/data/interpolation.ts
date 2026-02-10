/**
 * Fonctions d'interpolation pour les courbes empiriques
 * Référence : polycopié "Conception MAS 2026"
 */

/**
 * Interpolation linéaire entre deux points de données
 */
export function linearInterpolate(
  data: { x: number; y: number }[],
  xTarget: number
): number {
  if (data.length === 0) return 0;
  if (xTarget <= data[0].x) return data[0].y;
  if (xTarget >= data[data.length - 1].x) return data[data.length - 1].y;

  for (let i = 0; i < data.length - 1; i++) {
    if (xTarget >= data[i].x && xTarget <= data[i + 1].x) {
      const t = (xTarget - data[i].x) / (data[i + 1].x - data[i].x);
      return data[i].y + t * (data[i + 1].y - data[i].y);
    }
  }
  return data[data.length - 1].y;
}

/**
 * Interpolation dans le Tableau 1 (cos φ ou η)
 */
export function interpolateTable1(
  table: { power: number; values: Record<number, number> }[],
  power: number,
  poles2p: number
): number {
  const data = table
    .filter(entry => entry.values[poles2p] !== undefined)
    .map(entry => ({ x: entry.power, y: entry.values[poles2p] }));
  return linearInterpolate(data, power);
}

/**
 * Interpolation ke en fonction de p (Figure 1)
 */
export function interpolateKe(
  keCurve: { p: number; ke: number }[],
  p: number
): number {
  const data = keCurve.map(pt => ({ x: pt.p, y: pt.ke }));
  return linearInterpolate(data, p);
}

/**
 * Interpolation Dint en fonction de Pn (Figure 2)
 */
export function interpolateDint(
  dintCurve: { power: number; dint: number }[],
  power: number
): number {
  const data = dintCurve.map(pt => ({ x: pt.power, y: pt.dint }));
  return linearInterpolate(data, power);
}

/**
 * Interpolation B → H sur la courbe de magnétisation
 */
export function interpolateBH(
  bhCurve: { B: number; H: number }[],
  B: number
): number {
  const data = bhCurve.map(pt => ({ x: pt.B, y: pt.H }));
  return linearInterpolate(data, B);
}

/**
 * Trouver le diamètre normalisé le plus proche (supérieur)
 */
export function findNormalizedDiameter(
  normalizedDiameters: number[],
  dExt: number
): number {
  for (const d of normalizedDiameters) {
    if (d >= dExt) return d;
  }
  return normalizedDiameters[normalizedDiameters.length - 1];
}

/**
 * Trouver la section de conducteur normalisée la plus proche (supérieure)
 */
export function findConductorSection(
  sections: number[],
  diameters: number[],
  targetSection: number
): { section: number; diameter: number; index: number } {
  for (let i = 0; i < sections.length; i++) {
    if (sections[i] >= targetSection) {
      return { section: sections[i], diameter: diameters[i], index: i };
    }
  }
  const last = sections.length - 1;
  return { section: sections[last], diameter: diameters[last], index: last };
}

/**
 * Interpolation A (charge linéaire) en fonction de τ
 */
export function interpolateA(
  aRange: { tau: number; Amin: number; Amax: number }[],
  tau: number,
  position: number = 0.5 // 0 = min, 1 = max
): number {
  const dataMin = aRange.map(pt => ({ x: pt.tau, y: pt.Amin }));
  const dataMax = aRange.map(pt => ({ x: pt.tau, y: pt.Amax }));
  const amin = linearInterpolate(dataMin, tau);
  const amax = linearInterpolate(dataMax, tau);
  return amin + position * (amax - amin);
}

/**
 * Interpolation Bδ en fonction de τ
 */
export function interpolateBdelta(
  bdRange: { tau: number; Bmin: number; Bmax: number }[],
  tau: number,
  position: number = 0.5
): number {
  const dataMin = bdRange.map(pt => ({ x: pt.tau, y: pt.Bmin }));
  const dataMax = bdRange.map(pt => ({ x: pt.tau, y: pt.Bmax }));
  const bmin = linearInterpolate(dataMin, tau);
  const bmax = linearInterpolate(dataMax, tau);
  return bmin + position * (bmax - bmin);
}

/**
 * Interpolation entrefer δ en fonction de Pn
 */
export function interpolateAirGap(
  airGapData: { power: number; delta: number }[],
  power: number
): number {
  const data = airGapData.map(pt => ({ x: pt.power, y: pt.delta }));
  return linearInterpolate(data, power);
}

/**
 * Interpolation Kδ en fonction de β₀/δ
 */
export function interpolateKdelta(
  kdeltaData: { bo_over_delta: number; kd: number }[],
  bo_over_delta: number
): number {
  const data = kdeltaData.map(pt => ({ x: pt.bo_over_delta, y: pt.kd }));
  return linearInterpolate(data, bo_over_delta);
}
