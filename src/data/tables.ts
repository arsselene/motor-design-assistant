/**
 * Données de référence du polycopié "Conception MAS 2026"
 * Toutes les tables, courbes et constantes du document
 */

// ── Tableau 1 : cos φ et η en fonction de Pn et 2p ──
export interface PerformanceEntry {
  power: number; // kW
  cosPhiValues: Record<number, number>; // 2p → cos φ
  etaValues: Record<number, number>;    // 2p → η
}

export const TABLE_1: PerformanceEntry[] = [
  { power: 0.55, cosPhiValues: { 2: 0.83, 4: 0.73, 6: 0.68, 8: 0.62 }, etaValues: { 2: 0.74, 4: 0.70, 6: 0.65, 8: 0.58 } },
  { power: 0.75, cosPhiValues: { 2: 0.84, 4: 0.75, 6: 0.70, 8: 0.64 }, etaValues: { 2: 0.76, 4: 0.72, 6: 0.67, 8: 0.60 } },
  { power: 1.1,  cosPhiValues: { 2: 0.85, 4: 0.77, 6: 0.72, 8: 0.66 }, etaValues: { 2: 0.78, 4: 0.75, 6: 0.70, 8: 0.64 } },
  { power: 1.5,  cosPhiValues: { 2: 0.86, 4: 0.78, 6: 0.73, 8: 0.68 }, etaValues: { 2: 0.80, 4: 0.77, 6: 0.73, 8: 0.67 } },
  { power: 2.2,  cosPhiValues: { 2: 0.87, 4: 0.80, 6: 0.75, 8: 0.70 }, etaValues: { 2: 0.82, 4: 0.80, 6: 0.76, 8: 0.70 } },
  { power: 3,    cosPhiValues: { 2: 0.87, 4: 0.82, 6: 0.76, 8: 0.72 }, etaValues: { 2: 0.84, 4: 0.82, 6: 0.78, 8: 0.73 } },
  { power: 4,    cosPhiValues: { 2: 0.88, 4: 0.83, 6: 0.78, 8: 0.74 }, etaValues: { 2: 0.86, 4: 0.84, 6: 0.80, 8: 0.75 } },
  { power: 5.5,  cosPhiValues: { 2: 0.88, 4: 0.84, 6: 0.80, 8: 0.75 }, etaValues: { 2: 0.87, 4: 0.855, 6: 0.82, 8: 0.78 } },
  { power: 7.5,  cosPhiValues: { 2: 0.89, 4: 0.85, 6: 0.81, 8: 0.77 }, etaValues: { 2: 0.88, 4: 0.87, 6: 0.84, 8: 0.80 } },
  { power: 11,   cosPhiValues: { 2: 0.89, 4: 0.86, 6: 0.82, 8: 0.78 }, etaValues: { 2: 0.89, 4: 0.88, 6: 0.85, 8: 0.82 } },
  { power: 13,   cosPhiValues: { 2: 0.89, 4: 0.87, 6: 0.83, 8: 0.79 }, etaValues: { 2: 0.895, 4: 0.885, 6: 0.86, 8: 0.83 } },
  { power: 15,   cosPhiValues: { 2: 0.90, 4: 0.87, 6: 0.84, 8: 0.80 }, etaValues: { 2: 0.90, 4: 0.89, 6: 0.87, 8: 0.84 } },
  { power: 18.5, cosPhiValues: { 2: 0.90, 4: 0.88, 6: 0.84, 8: 0.81 }, etaValues: { 2: 0.905, 4: 0.895, 6: 0.88, 8: 0.85 } },
  { power: 22,   cosPhiValues: { 2: 0.90, 4: 0.88, 6: 0.85, 8: 0.82 }, etaValues: { 2: 0.91, 4: 0.90, 6: 0.885, 8: 0.86 } },
  { power: 30,   cosPhiValues: { 2: 0.91, 4: 0.89, 6: 0.86, 8: 0.83 }, etaValues: { 2: 0.915, 4: 0.905, 6: 0.89, 8: 0.87 } },
  { power: 37,   cosPhiValues: { 2: 0.91, 4: 0.89, 6: 0.86, 8: 0.84 }, etaValues: { 2: 0.92, 4: 0.91, 6: 0.90, 8: 0.88 } },
  { power: 45,   cosPhiValues: { 2: 0.91, 4: 0.89, 6: 0.87, 8: 0.84 }, etaValues: { 2: 0.925, 4: 0.915, 6: 0.905, 8: 0.89 } },
  { power: 55,   cosPhiValues: { 2: 0.92, 4: 0.90, 6: 0.87, 8: 0.85 }, etaValues: { 2: 0.93, 4: 0.92, 6: 0.91, 8: 0.90 } },
  { power: 75,   cosPhiValues: { 2: 0.92, 4: 0.90, 6: 0.88, 8: 0.86 }, etaValues: { 2: 0.935, 4: 0.925, 6: 0.915, 8: 0.905 } },
  { power: 90,   cosPhiValues: { 2: 0.92, 4: 0.90, 6: 0.88, 8: 0.86 }, etaValues: { 2: 0.94, 4: 0.93, 6: 0.92, 8: 0.91 } },
  { power: 110,  cosPhiValues: { 2: 0.93, 4: 0.91, 6: 0.89, 8: 0.87 }, etaValues: { 2: 0.94, 4: 0.935, 6: 0.925, 8: 0.915 } },
];

// ── Figure 1 : ke en fonction de p (nombre de paires de pôles) ──
// Courbe empirique approximée par des points de données
export const KE_CURVE: { p: number; ke: number }[] = [
  { p: 1, ke: 0.64 },
  { p: 2, ke: 0.635 },
  { p: 3, ke: 0.62 },
  { p: 4, ke: 0.60 },
  { p: 5, ke: 0.58 },
  { p: 6, ke: 0.56 },
];

// ── Figure 2 : Dint (mm) en fonction de Pn (kW) et 2p ──
export const DINT_CURVES: Record<number, { power: number; dint: number }[]> = {
  2: [
    { power: 0.5, dint: 50 }, { power: 1, dint: 65 }, { power: 2, dint: 80 },
    { power: 5, dint: 105 }, { power: 10, dint: 130 }, { power: 15, dint: 148 },
    { power: 20, dint: 162 }, { power: 30, dint: 185 }, { power: 50, dint: 220 },
    { power: 75, dint: 255 }, { power: 100, dint: 285 },
  ],
  4: [
    { power: 0.5, dint: 60 }, { power: 1, dint: 78 }, { power: 2, dint: 95 },
    { power: 5, dint: 128 }, { power: 10, dint: 160 }, { power: 13, dint: 175 },
    { power: 15, dint: 182 }, { power: 20, dint: 200 }, { power: 30, dint: 228 },
    { power: 50, dint: 272 }, { power: 75, dint: 315 }, { power: 100, dint: 350 },
  ],
  6: [
    { power: 0.5, dint: 72 }, { power: 1, dint: 90 }, { power: 2, dint: 112 },
    { power: 5, dint: 150 }, { power: 10, dint: 190 }, { power: 15, dint: 215 },
    { power: 20, dint: 238 }, { power: 30, dint: 270 }, { power: 50, dint: 320 },
    { power: 75, dint: 370 }, { power: 100, dint: 410 },
  ],
  8: [
    { power: 0.5, dint: 85 }, { power: 1, dint: 105 }, { power: 2, dint: 130 },
    { power: 5, dint: 172 }, { power: 10, dint: 218 }, { power: 15, dint: 250 },
    { power: 20, dint: 275 }, { power: 30, dint: 310 }, { power: 50, dint: 370 },
    { power: 75, dint: 420 }, { power: 100, dint: 465 },
  ],
};

// ── Diamètres normalisés du stator (mm) ──
export const NORMALIZED_DIAMETERS: number[] = [
  116, 131, 149, 168, 191, 213, 242, 272, 301, 313, 349, 390, 437, 490, 530, 590
];

// ── Figures 1.3 : Plages A (A/m) et Bδ (T) en fonction de τ (mm) ──
export const A_RANGE: { tau: number; Amin: number; Amax: number }[] = [
  { tau: 50, Amin: 15000, Amax: 22000 },
  { tau: 80, Amin: 20000, Amax: 28000 },
  { tau: 100, Amin: 22000, Amax: 32000 },
  { tau: 130, Amin: 25000, Amax: 36000 },
  { tau: 160, Amin: 28000, Amax: 40000 },
  { tau: 200, Amin: 30000, Amax: 43000 },
  { tau: 250, Amin: 33000, Amax: 46000 },
  { tau: 300, Amin: 35000, Amax: 48000 },
];

export const BDELTA_RANGE: { tau: number; Bmin: number; Bmax: number }[] = [
  { tau: 50, Bmin: 0.55, Bmax: 0.72 },
  { tau: 80, Bmin: 0.62, Bmax: 0.78 },
  { tau: 100, Bmin: 0.65, Bmax: 0.82 },
  { tau: 130, Bmin: 0.68, Bmax: 0.85 },
  { tau: 160, Bmin: 0.72, Bmax: 0.87 },
  { tau: 200, Bmin: 0.75, Bmax: 0.88 },
  { tau: 250, Bmin: 0.78, Bmax: 0.90 },
  { tau: 300, Bmin: 0.80, Bmax: 0.92 },
];

// ── Tableau 2.1 : Sections de conducteurs normalisées (mm²) ──
export const CONDUCTOR_SECTIONS: number[] = [
  0.0314, 0.0491, 0.0707, 0.0962, 0.126, 0.159, 0.196, 0.246, 0.283,
  0.317, 0.385, 0.442, 0.503, 0.567, 0.636, 0.709, 0.785, 0.866,
  0.95, 1.039, 1.131, 1.227, 1.327, 1.431, 1.539, 1.651, 1.767,
  1.886, 2.011, 2.138, 2.27, 2.405, 2.545, 2.688, 2.835, 3.142,
  3.464, 3.801, 4.155, 4.524, 4.909, 5.309, 5.726, 6.158, 6.605,
  7.069, 7.548, 8.042, 8.553, 9.079, 9.621, 10.18, 10.75, 11.34,
  12.57
];

// ── Tableau 2.1 : Diamètres de conducteurs correspondants (mm) ──
export const CONDUCTOR_DIAMETERS: number[] = [
  0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.56, 0.6,
  0.63, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1.0, 1.05,
  1.1, 1.15, 1.2, 1.25, 1.3, 1.35, 1.4, 1.45, 1.5,
  1.55, 1.6, 1.65, 1.7, 1.75, 1.8, 1.85, 1.9, 2.0,
  2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9,
  3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8,
  4.0
];

// ── Tableau 2.2 : Isolation des conducteurs (épaisseur, mm) ──
export const CONDUCTOR_INSULATION: Record<string, number> = {
  'A': 0.04,  // Classe A
  'B': 0.05,  // Classe B
  'F': 0.06,  // Classe F
  'H': 0.07,  // Classe H
};

// ── Tableau 3.1 : Choix de Z2 (encoches rotor) selon 2p et Z1 ──
export const ROTOR_SLOTS: Record<number, Record<number, number[]>> = {
  2: {
    12: [9, 15],
    18: [14, 22],
    24: [18, 20, 30],
    36: [26, 28, 46],
    48: [38, 40, 58],
  },
  4: {
    24: [18, 30],
    36: [26, 28, 44],
    48: [38, 40, 56],
    60: [46, 50, 74],
  },
  6: {
    36: [26, 28, 46],
    54: [42, 44, 66],
    72: [56, 58, 86],
  },
  8: {
    48: [38, 40, 58],
    72: [56, 58, 86],
    96: [74, 76, 118],
  },
};

// ── Table 4.1 : Courbe de magnétisation acier (Bd → Hd) ──
export const BH_CURVE: { B: number; H: number }[] = [
  { B: 0.0, H: 0 },
  { B: 0.1, H: 35 },
  { B: 0.2, H: 49 },
  { B: 0.3, H: 65 },
  { B: 0.4, H: 76 },
  { B: 0.5, H: 90 },
  { B: 0.6, H: 106 },
  { B: 0.7, H: 124 },
  { B: 0.8, H: 148 },
  { B: 0.9, H: 177 },
  { B: 1.0, H: 221 },
  { B: 1.1, H: 292 },
  { B: 1.2, H: 425 },
  { B: 1.3, H: 650 },
  { B: 1.4, H: 1050 },
  { B: 1.5, H: 1760 },
  { B: 1.6, H: 2870 },
  { B: 1.7, H: 4800 },
  { B: 1.8, H: 8200 },
  { B: 1.9, H: 14000 },
  { B: 2.0, H: 22000 },
];

// ── Figure 4.1 : Coefficient d'entrefer Kδ ──
// Kδ1 en fonction de β₀/δ et t/δ (approximation)
export const KDELTA_DATA: { bo_over_delta: number; kd: number }[] = [
  { bo_over_delta: 0, kd: 1.0 },
  { bo_over_delta: 1, kd: 1.02 },
  { bo_over_delta: 2, kd: 1.08 },
  { bo_over_delta: 3, kd: 1.15 },
  { bo_over_delta: 4, kd: 1.22 },
  { bo_over_delta: 5, kd: 1.30 },
  { bo_over_delta: 6, kd: 1.38 },
  { bo_over_delta: 8, kd: 1.52 },
  { bo_over_delta: 10, kd: 1.65 },
];

// ── Table 5.1 : Conductibilité des matériaux ──
export const CONDUCTIVITY: Record<string, { sigma75: number; sigma115: number }> = {
  'cuivre': { sigma75: 46e6, sigma115: 40e6 },  // S/m à 75°C et 115°C
  'aluminium': { sigma75: 28e6, sigma115: 24e6 },
};

// ── Table 6.1 : Pertes spécifiques fer (W/kg) à 50 Hz, 1 T ──
export const STEEL_LOSSES: Record<string, { p10_50: number; density: number }> = {
  'M270-35A': { p10_50: 2.7, density: 7650 },
  'M330-35A': { p10_50: 3.3, density: 7650 },
  'M400-50A': { p10_50: 4.0, density: 7700 },
  'M530-50A': { p10_50: 5.3, density: 7700 },
  'M600-50A': { p10_50: 6.0, density: 7700 },
  'M700-65A': { p10_50: 7.0, density: 7750 },
  'M800-65A': { p10_50: 8.0, density: 7750 },
};

// ── Entrefer typique δ (mm) en fonction de la puissance ──
export const AIR_GAP: { power: number; delta: number }[] = [
  { power: 0.5, delta: 0.25 },
  { power: 1, delta: 0.3 },
  { power: 2, delta: 0.35 },
  { power: 5, delta: 0.4 },
  { power: 10, delta: 0.45 },
  { power: 15, delta: 0.5 },
  { power: 20, delta: 0.55 },
  { power: 30, delta: 0.6 },
  { power: 50, delta: 0.7 },
  { power: 75, delta: 0.8 },
  { power: 100, delta: 0.9 },
];

// ── Constantes ──
export const CONSTANTS = {
  mu0: 4 * Math.PI * 1e-7, // Perméabilité du vide (H/m)
  pi: Math.PI,
};
