/**
 * Moteur de calcul MAS — Polycopié "Conception MAS 2026"
 * Toutes les formules avec références aux pages du document
 */

import {
  TABLE_1, KE_CURVE, DINT_CURVES, NORMALIZED_DIAMETERS,
  A_RANGE, BDELTA_RANGE, CONDUCTOR_SECTIONS, CONDUCTOR_DIAMETERS,
  ROTOR_SLOTS, BH_CURVE, KDELTA_DATA, CONDUCTIVITY, STEEL_LOSSES,
  AIR_GAP, CONSTANTS,
} from '@/data/tables';
import {
  interpolateKe, interpolateDint, interpolateBH,
  findNormalizedDiameter, findConductorSection,
  interpolateA, interpolateBdelta, interpolateAirGap,
  interpolateKdelta, linearInterpolate,
} from '@/data/interpolation';

// ══════════════════════════════════════════
// Types
// ══════════════════════════════════════════

export interface MASInput {
  Pn: number;      // Puissance nominale (kW)
  n: number;       // Vitesse nominale (tr/min)
  V: number;       // Tension (V)
  f: number;       // Fréquence (Hz)
  m1: number;      // Nombre de phases (3)
  cosPhi?: number; // cos φ (auto si vide)
  eta?: number;    // Rendement η (auto si vide)
  // Step 2 overrides
  q1?: number;     // Encoches/pôle/phase
  insulationClass?: string;
  // Step 3 overrides
  Z2?: number;     // Nombre d'encoches rotor
  // Step 6
  steelType?: string;
}

export interface Step1Results {
  poles2p: number;
  p: number;
  ns: number;       // Vitesse synchrone (tr/min)
  cosPhi: number;
  eta: number;
  ke: number;
  Dint: number;     // mm
  Dext: number;     // mm (normalisé)
  tau: number;      // Pas polaire (mm)
  ls: number;       // Longueur stator (mm)
  A: number;        // Charge linéaire (A/m)
  Bdelta: number;   // Induction entrefer (T)
  delta: number;    // Entrefer (mm)
  Drotor: number;   // Diamètre rotor (mm)
  Pa: number;       // Puissance apparente (VA)
  I1n: number;      // Courant nominal (A)
}

export interface Step2Results {
  q1: number;
  Z1: number;       // Nombre d'encoches stator
  t1: number;       // Pas dentaire stator (mm)
  I1n: number;      // Courant absorbé (A)
  Nc: number;       // Conducteurs par encoche
  w1: number;       // Nombre de spires par phase
  Sc: number;       // Section conducteur (mm²)
  dc: number;       // Diamètre conducteur (mm)
  dc_iso: number;   // Diamètre avec isolation (mm)
  Jc: number;       // Densité de courant (A/mm²)
  Kw1: number;      // Facteur de bobinage
  Phi: number;      // Flux magnétique (Wb)
  Bdelta_calc: number; // Bδ recalculé
  // Dimensions encoches stator
  b01: number;      // Ouverture encoche (mm)
  h01: number;      // Hauteur isthme (mm)
  b1: number;       // Largeur fond encoche (mm)
  b2: number;       // Largeur tête encoche (mm)
  h1: number;       // Hauteur encoche (mm)
  Km: number;       // Coefficient de remplissage
  Bd1: number;      // Induction dent stator (T)
  Bcs: number;      // Induction culasse stator (T)
  hcs: number;      // Hauteur culasse stator (mm)
}

export interface Step3Results {
  Z2: number;
  t2: number;       // Pas dentaire rotor (mm)
  I2: number;       // Courant rotor (A)
  Icc: number;      // Courant bague (A)
  Sb: number;       // Section barre (mm²)
  Sa: number;       // Section bague (mm²)
  // Dimensions encoches rotor
  b02: number;
  h02: number;
  br1: number;      // Largeur fond
  br2: number;      // Largeur tête
  hr: number;       // Hauteur encoche rotor
  Bd2: number;      // Induction dent rotor (T)
  Bcr: number;      // Induction culasse rotor (T)
  hcr: number;      // Hauteur culasse rotor (mm)
}

export interface Step4Results {
  Kdelta: number;   // Coefficient d'entrefer
  Fdelta: number;   // FMM entrefer (A)
  Fd1: number;      // FMM dent stator (A)
  Fd2: number;      // FMM dent rotor (A)
  Fcs: number;      // FMM culasse stator (A)
  Fcr: number;      // FMM culasse rotor (A)
  Ftotal: number;   // FMM totale (A)
  Ksat: number;     // Coefficient de saturation
  Im: number;       // Courant magnétisant (A)
  Hd1: number;
  Hd2: number;
  Hcs: number;
  Hcr: number;
}

export interface Step5Results {
  r1: number;       // Résistance stator (Ω)
  r2: number;       // Résistance rotor (Ω)
  r2_prime: number; // r2 ramené au stator (Ω)
  X1: number;       // Réactance stator (Ω)
  X2: number;       // Réactance rotor (Ω)
  X2_prime: number; // X2 ramené au stator (Ω)
  Lc: number;       // Longueur conducteur (mm)
  Lfrontale: number;// Longueur frontale (mm)
  // Per unit values
  r1_pu: number;
  r2_pu: number;
  x1_pu: number;
  x2_pu: number;
}

export interface Step6Results {
  Gd1: number;      // Poids dents stator (kg)
  Gcs: number;      // Poids culasse stator (kg)
  Gd2: number;      // Poids dents rotor (kg)
  Gcr: number;      // Poids culasse rotor (kg)
  Pfer_d1: number;  // Pertes fer dents stator (W)
  Pfer_cs: number;  // Pertes fer culasse stator (W)
  Pfer_total: number;// Pertes fer totales (W)
  Pmec: number;     // Pertes mécaniques (W)
  Pj1: number;      // Pertes Joule stator (W)
  Pj2: number;      // Pertes Joule rotor (W)
  Ptotal: number;   // Pertes totales (W)
  eta_calc: number; // Rendement calculé
}

export interface Step7Results {
  C1: number;
  C2: number;
  xcc: number;      // Réactance de court-circuit (Ω)
  rcc: number;      // Résistance de court-circuit (Ω)
  Zcc: number;
  P0: number;       // Pertes à vide (W)
  I0: number;       // Courant à vide (A)
  cosPhi0: number;  // cos φ à vide
  Dc: number;       // Diamètre du cercle (A)
  Icc_court: number;// Courant de court-circuit stator (A)
}

// ══════════════════════════════════════════
// Étape 1 : Cahier des charges & Dimensions principales
// ══════════════════════════════════════════

export function computeStep1(input: MASInput): Step1Results {
  const { Pn, n, V, f, m1 } = input;

  // Nombre de pôles : ns = 60f/p → 2p = round(120f/n)
  const poles2p = Math.round((120 * f) / n / 2) * 2;
  const p = poles2p / 2;
  const ns = (120 * f) / poles2p; // tr/min

  // Lookup cos φ et η (Tableau 1)
  const cosPhiEntry = TABLE_1.map(e => ({ x: e.power, y: e.cosPhiValues[poles2p] || 0.85 }));
  const etaEntry = TABLE_1.map(e => ({ x: e.power, y: e.etaValues[poles2p] || 0.85 }));
  const cosPhi = input.cosPhi ?? linearInterpolate(cosPhiEntry, Pn);
  const eta = input.eta ?? linearInterpolate(etaEntry, Pn);

  // ke (Figure 1)
  const ke = interpolateKe(KE_CURVE, p);

  // Dint (Figure 2)
  const dintCurve = DINT_CURVES[poles2p] || DINT_CURVES[4];
  const Dint = interpolateDint(dintCurve, Pn);

  // Diamètre extérieur : Dext = Dint / ke
  const DextCalc = Dint / ke;
  const Dext = findNormalizedDiameter(NORMALIZED_DIAMETERS, DextCalc);

  // Entrefer
  const delta = interpolateAirGap(AIR_GAP, Pn);

  // Diamètre rotor
  const Drotor = Dint - 2 * delta;

  // Pas polaire τ = π × Dint / (2p)
  const tau = (Math.PI * Dint) / poles2p;

  // Charge linéaire A et induction Bδ (Figures 1.3)
  const A = interpolateA(A_RANGE, tau, 0.5);
  const Bdelta = interpolateBdelta(BDELTA_RANGE, tau, 0.5);

  // Puissance apparente
  const Pa = (Pn * 1000) / (eta * cosPhi);

  // Courant nominal I1n = Pa / (m1 × V)
  // Pour triangle : I1n = Pa / (√3 × V)
  const I1n = Pa / (Math.sqrt(3) * V);

  // Longueur stator : ls = Pa / (π² × ke × Dint² × ns/60 × A × Bδ)
  // Formule simplifiée : ls = (Pn × 1000) / (π² × Dint² × (ns/60) × A × Bδ × ke × η × cosφ) × 1e6 (mm)
  const nsSec = ns / 60;
  const DintM = Dint / 1000;
  const ls_m = Pa / (Math.PI * Math.PI * ke * DintM * DintM * nsSec * A * Bdelta);
  const ls = ls_m * 1000; // mm

  return { poles2p, p, ns, cosPhi, eta, ke, Dint, Dext, tau, ls, A, Bdelta, delta, Drotor, Pa, I1n };
}

// ══════════════════════════════════════════
// Étape 2 : Paramètres du stator
// ══════════════════════════════════════════

export function computeStep2(input: MASInput, s1: Step1Results): Step2Results {
  const { V, f, m1 } = input;
  const q1 = input.q1 ?? 3;

  // Z1 = 2p × m1 × q1
  const Z1 = s1.poles2p * m1 * q1;

  // Pas dentaire t1 = π × Dint / Z1
  const t1 = (Math.PI * s1.Dint) / Z1;

  // Courant nominal
  const I1n = s1.I1n;

  // Facteur de bobinage Kw1 (approximation pour bobinage réparti)
  // Kw1 = Kd × Kp ≈ sin(π/(2×m1)) / (q1 × sin(π/(2×m1×q1)))
  const alpha = Math.PI / (m1 * s1.poles2p / s1.p);
  const Kd1 = Math.sin((q1 * alpha) / 2) / (q1 * Math.sin(alpha / 2));
  const Kp1 = 1.0; // Pas entier
  const Kw1 = Kd1 * Kp1;

  // Nombre de spires par phase
  // w1 = V / (4.44 × f × Kw1 × Φ)
  // On calcule d'abord Φ = Bδ × τ × ls / (p × 1e6)
  const Phi_approx = s1.Bdelta * (s1.tau / 1000) * (s1.ls / 1000);
  const w1_calc = V / (4.44 * f * Kw1 * Phi_approx * Math.sqrt(3));
  
  // Nc = nombre de conducteurs par encoche = (2 × m1 × w1) / Z1
  const Nc_calc = (2 * m1 * Math.round(w1_calc)) / Z1;
  const Nc = Math.round(Nc_calc);
  const w1 = (Nc * Z1) / (2 * m1);

  // Flux recalculé
  const Phi = V / (4.44 * f * Kw1 * w1 * Math.sqrt(3));
  const Bdelta_calc = Phi / ((s1.tau / 1000) * (s1.ls / 1000));

  // Section du conducteur : Sc = I1n / (a × Jc)
  // a = nombre de voies parallèles = 1 (typique)
  const a = 1;
  const Jc_target = 5.0; // A/mm² typique
  const Sc_calc = I1n / (a * Jc_target);
  const { section: Sc, diameter: dc } = findConductorSection(
    CONDUCTOR_SECTIONS, CONDUCTOR_DIAMETERS, Sc_calc
  );
  const Jc = I1n / (a * Sc);

  // Isolation
  const insClass = input.insulationClass ?? 'F';
  const insThickness = 0.06; // mm par côté pour classe F
  const dc_iso = dc + 2 * insThickness;

  // Dimensions d'encoche stator (trapézoïdale)
  const b01 = 3.0;  // mm ouverture
  const h01 = 1.0;  // mm isthme
  const b2 = t1 - 2.5; // largeur haut encoche
  const t1_fond = (Math.PI * (s1.Dint - 2 * 25)) / Z1; // estimation
  const b1 = Math.max(t1_fond - 2.5, b2 * 0.6);
  
  // Hauteur encoche - basée sur Nc et diamètre conducteur
  const h1 = Math.max(Nc * dc_iso * 1.2 / 2 + 3, 15); // estimation

  // Coefficient de remplissage
  const slotArea = ((b1 + b2) / 2) * (h1 - h01);
  const conductorArea = Nc * Math.PI * dc_iso * dc_iso / 4;
  const Km = conductorArea / slotArea;

  // Induction dans les dents stator
  const bd1_width = t1 - (b1 + b2) / 2;
  const Bd1 = s1.Bdelta * t1 / bd1_width;

  // Hauteur et induction culasse stator
  const hcs = (s1.Dext - s1.Dint) / 2 - h1;
  const Bcs = Phi / (2 * (hcs / 1000) * (s1.ls / 1000));

  return {
    q1, Z1, t1, I1n, Nc, w1, Sc, dc, dc_iso, Jc, Kw1,
    Phi, Bdelta_calc,
    b01, h01, b1, b2, h1, Km, Bd1, Bcs, hcs
  };
}

// ══════════════════════════════════════════
// Étape 3 : Paramètres du rotor
// ══════════════════════════════════════════

export function computeStep3(input: MASInput, s1: Step1Results, s2: Step2Results): Step3Results {
  const { m1 } = input;

  // Z2 depuis Table 3.1 ou override
  const availableZ2 = ROTOR_SLOTS[s1.poles2p]?.[s2.Z1] || [Math.round(s2.Z1 * 0.8)];
  const Z2 = input.Z2 ?? availableZ2[0];

  // Pas dentaire rotor
  const t2 = (Math.PI * s1.Drotor) / Z2;

  // Courant rotor I2 ≈ 0.85 × I1n × (m1 × w1 × Kw1) / (Z2/2)
  const ki = 0.85;
  const I2 = ki * s1.I1n * (2 * m1 * s2.w1 * s2.Kw1) / Z2;

  // Courant dans les barres et bagues
  const Icc = I2 / (2 * Math.sin(Math.PI * s1.p / Z2));

  // Section des barres : Sb = I2 / Jb (Jb ≈ 4-6 A/mm² pour aluminium)
  const Jb = 5.0;
  const Sb = I2 / Jb;

  // Section des bagues
  const Ja = 4.5;
  const Sa = Icc / Ja;

  // Dimensions d'encoche rotor (forme simplifiée)
  const b02 = 1.5;
  const h02 = 0.7;
  const br2 = t2 - 3.0;
  const br1 = br2 * 0.5;
  const hr = Sb / ((br1 + br2) / 2) + h02 + 1;

  // Induction dent rotor
  const bd2_width = t2 - (br1 + br2) / 2;
  const Bd2 = s1.Bdelta * t2 / bd2_width;

  // Hauteur et induction culasse rotor
  const Dshaft = s1.Drotor * 0.3; // estimation diamètre arbre
  const hcr = (s1.Drotor / 2 - hr - Dshaft / 2);
  const Bcr = s2.Phi / (2 * (Math.max(hcr, 5) / 1000) * (s1.ls / 1000));

  return { Z2, t2, I2, Icc, Sb, Sa, b02, h02, br1, br2, hr, Bd2, Bcr, hcr };
}

// ══════════════════════════════════════════
// Étape 4 : FMM & Saturation
// ══════════════════════════════════════════

export function computeStep4(
  input: MASInput, s1: Step1Results, s2: Step2Results, s3: Step3Results
): Step4Results {
  const { f, m1 } = input;
  const mu0 = CONSTANTS.mu0;

  // Coefficient d'entrefer Kδ
  const bo1_over_delta = s2.b01 / s1.delta;
  const Kdelta1 = interpolateKdelta(KDELTA_DATA, bo1_over_delta);
  const bo2_over_delta = s3.b02 / s1.delta;
  const Kdelta2 = interpolateKdelta(KDELTA_DATA, bo2_over_delta);
  const Kdelta = Kdelta1 * Kdelta2;

  // FMM entrefer : Fδ = Bδ × δ × Kδ / μ0
  const deltaM = s1.delta / 1000;
  const Fdelta = s1.Bdelta * deltaM * Kdelta / mu0;

  // FMM dents stator
  const Hd1 = interpolateBH(BH_CURVE, s2.Bd1);
  const hd1_m = s2.h1 / 1000;
  const Fd1 = Hd1 * hd1_m * 2; // aller-retour

  // FMM dents rotor
  const Hd2 = interpolateBH(BH_CURVE, s3.Bd2);
  const hd2_m = s3.hr / 1000;
  const Fd2 = Hd2 * hd2_m * 2;

  // FMM culasse stator
  const Hcs = interpolateBH(BH_CURVE, s2.Bcs);
  const Lcs = (Math.PI * (s1.Dext - s2.hcs)) / (2 * s1.poles2p) / 1000;
  const Fcs = Hcs * Lcs * 2;

  // FMM culasse rotor
  const Hcr = interpolateBH(BH_CURVE, Math.min(s3.Bcr, 2.0));
  const Lcr = (Math.PI * (s1.Drotor - 2 * s3.hr - s3.hcr)) / (2 * s1.poles2p) / 1000;
  const Fcr = Hcr * Math.abs(Lcr) * 2;

  // FMM totale
  const Ftotal = Fdelta + Fd1 + Fd2 + Fcs + Fcr;

  // Coefficient de saturation
  const Ksat = Ftotal / Fdelta;

  // Courant magnétisant
  // Im = Ftotal × p / (0.9 × m1 × w1 × Kw1)
  const Im = (Ftotal * s1.p) / (0.9 * m1 * s2.w1 * s2.Kw1);

  return { Kdelta, Fdelta, Fd1, Fd2, Fcs, Fcr, Ftotal, Ksat, Im, Hd1, Hd2, Hcs, Hcr };
}

// ══════════════════════════════════════════
// Étape 5 : Résistances & Réactances
// ══════════════════════════════════════════

export function computeStep5(
  input: MASInput, s1: Step1Results, s2: Step2Results, s3: Step3Results
): Step5Results {
  const { f, m1, V } = input;

  // Longueur frontale (approximation)
  const Lfrontale = 1.3 * s1.tau + 20; // mm
  
  // Longueur totale du conducteur
  const Lc = 2 * s2.w1 * (s1.ls + Lfrontale); // mm

  // Résistance stator r1
  const sigma_cu = CONDUCTIVITY['cuivre'].sigma75;
  const r1 = (Lc / 1000) / (sigma_cu * (s2.Sc / 1e6));

  // Résistance rotor
  // r2 pour cage : r2 = ρ_al × ls / Sb + 2 × ρ_al × π × Dan / (Z2 × Sa)
  const sigma_al = CONDUCTIVITY['aluminium'].sigma75;
  const rho_al = 1 / sigma_al;
  const Dan = s1.Drotor - 2 * s3.hr; // diamètre anneau (mm)
  const rb = rho_al * (s1.ls / 1000) / (s3.Sb / 1e6);
  const ra = 2 * rho_al * Math.PI * (Dan / 1000) / (s3.Z2 * (s3.Sa / 1e6));
  const r2 = rb + ra;

  // r2' ramené au stator
  const r2_prime = r2 * (4 * m1 * (s2.w1 * s2.Kw1) ** 2) / s3.Z2;

  // Réactances de fuite stator (approximation)
  // λ_enc = h1/(3×b1) + h01/b01 (perméance d'encoche)
  const lambda_enc1 = s2.h1 / (3 * s2.b1) + s2.h01 / s2.b01;
  // λ_front ≈ 0.34 × q1 × (Lfrontale/ls - 0.64)
  const lambda_front1 = 0.34 * s2.q1 * (Lfrontale / s1.ls - 0.64);
  // λ_diff ≈ function of q1
  const lambda_diff1 = 0.9 * s1.tau / (s1.delta * s2.q1 * 12);
  
  const X1 = 4 * Math.PI * f * CONSTANTS.mu0 * (s1.ls / 1000) * s2.w1 ** 2 *
    (lambda_enc1 + lambda_front1 + lambda_diff1) / (s1.p * s2.q1);

  // Réactance rotor (approximation similaire)
  const lambda_enc2 = s3.hr / (3 * s3.br1) + s3.h02 / s3.b02;
  const X2 = 4 * Math.PI * f * CONSTANTS.mu0 * (s1.ls / 1000) *
    (lambda_enc2 + lambda_diff1 * 0.8) / s3.Z2;

  // X2' ramené au stator
  const X2_prime = X2 * (4 * m1 * (s2.w1 * s2.Kw1) ** 2) / s3.Z2;

  // Valeurs per unit
  const Zbase = V / (Math.sqrt(3) * s1.I1n);
  const r1_pu = r1 / Zbase;
  const r2_pu = r2_prime / Zbase;
  const x1_pu = X1 / Zbase;
  const x2_pu = X2_prime / Zbase;

  return { r1, r2, r2_prime, X1, X2, X2_prime, Lc, Lfrontale, r1_pu, r2_pu, x1_pu, x2_pu };
}

// ══════════════════════════════════════════
// Étape 6 : Pertes & Poids
// ══════════════════════════════════════════

export function computeStep6(
  input: MASInput, s1: Step1Results, s2: Step2Results, s3: Step3Results, s5: Step5Results
): Step6Results {
  const { f } = input;
  const steelType = input.steelType ?? 'M400-50A';
  const steel = STEEL_LOSSES[steelType] || STEEL_LOSSES['M400-50A'];

  // Poids dents stator (kg)
  const bd1_width = s2.t1 - (s2.b1 + s2.b2) / 2; // mm
  const Vd1 = s2.Z1 * bd1_width * s2.h1 * s1.ls / 1e9; // m³
  const Gd1 = Vd1 * steel.density;

  // Poids culasse stator
  const Vcs = Math.PI * ((s1.Dext / 1000) ** 2 - ((s1.Dext - 2 * s2.hcs) / 1000) ** 2) / 4 * (s1.ls / 1000);
  const Gcs = Vcs * steel.density;

  // Poids dents rotor
  const bd2_width = s3.t2 - (s3.br1 + s3.br2) / 2;
  const Vd2 = s3.Z2 * bd2_width * s3.hr * s1.ls / 1e9;
  const Gd2 = Vd2 * steel.density;

  // Poids culasse rotor
  const Vcr = Math.PI * (((s1.Drotor - 2 * s3.hr) / 1000) ** 2 - ((s1.Drotor - 2 * s3.hr - 2 * s3.hcr) / 1000) ** 2) / 4 * (s1.ls / 1000);
  const Gcr = Math.abs(Vcr) * steel.density;

  // Pertes fer (W) : Pfe = p10_50 × (f/50)^1.3 × B^2 × G × Kf
  const fRatio = f / 50;
  const Kf = 1.8; // coefficient de majoration pour usinage
  const Pfer_d1 = steel.p10_50 * Math.pow(fRatio, 1.3) * s2.Bd1 ** 2 * Gd1 * Kf;
  const Pfer_cs = steel.p10_50 * Math.pow(fRatio, 1.3) * s2.Bcs ** 2 * Gcs * Kf;
  const Pfer_total = Pfer_d1 + Pfer_cs;

  // Pertes mécaniques (approximation empirique)
  const Pmec = 0.01 * input.Pn * 1000 * (s1.ns / 3000);

  // Pertes Joule stator
  const Pj1 = input.m1 * s5.r1 * s1.I1n ** 2;

  // Pertes Joule rotor (approximation par glissement)
  const slip = (s1.ns - input.n) / s1.ns;
  const Pem = input.Pn * 1000 / (1 - slip) * (1 - slip); // approximation
  const Pj2 = slip * (input.Pn * 1000 + Pmec + Pfer_total);

  // Pertes totales
  const Ptotal = Pfer_total + Pmec + Pj1 + Pj2;

  // Rendement calculé
  const eta_calc = (input.Pn * 1000) / (input.Pn * 1000 + Ptotal);

  return { Gd1, Gcs, Gd2, Gcr, Pfer_d1, Pfer_cs, Pfer_total, Pmec, Pj1, Pj2, Ptotal, eta_calc };
}

// ══════════════════════════════════════════
// Étape 7 : Schéma équivalent & Diagramme du cercle
// ══════════════════════════════════════════

export function computeStep7(
  input: MASInput, s1: Step1Results, s2: Step2Results, s4: Step4Results,
  s5: Step5Results, s6: Step6Results
): Step7Results {
  const { V, m1 } = input;

  // Coefficients C1 et C2
  const C1 = 1 + s5.X1 / (s5.X1 + s5.X2_prime); // approximation
  const C2 = 1; // approximation simplifiée

  // Impédance de court-circuit
  const xcc = s5.X1 + C1 * s5.X2_prime;
  const rcc = s5.r1 + C1 * s5.r2_prime;
  const Zcc = Math.sqrt(rcc ** 2 + xcc ** 2);

  // Pertes à vide
  const P0 = s6.Pfer_total + s6.Pmec;

  // Courant à vide
  const Ia = P0 / (m1 * V / Math.sqrt(3)); // composante active
  const Im = s4.Im; // composante réactive
  const I0 = Math.sqrt(Ia ** 2 + Im ** 2);

  // cos φ à vide
  const cosPhi0 = Ia / I0;

  // Diamètre du cercle
  const Vph = V / Math.sqrt(3);
  const Dc = Vph / xcc;

  // Courant de court-circuit
  const Icc_court = Vph / Zcc;

  return { C1, C2, xcc, rcc, Zcc, P0, I0, cosPhi0, Dc, Icc_court };
}

// ══════════════════════════════════════════
// Calcul complet
// ══════════════════════════════════════════

export interface MASResults {
  step1: Step1Results;
  step2: Step2Results;
  step3: Step3Results;
  step4: Step4Results;
  step5: Step5Results;
  step6: Step6Results;
  step7: Step7Results;
}

export function computeAll(input: MASInput): MASResults {
  const step1 = computeStep1(input);
  const step2 = computeStep2(input, step1);
  const step3 = computeStep3(input, step1, step2);
  const step4 = computeStep4(input, step1, step2, step3);
  const step5 = computeStep5(input, step1, step2, step3);
  const step6 = computeStep6(input, step1, step2, step3, step5);
  const step7 = computeStep7(input, step1, step2, step4, step5, step6);
  return { step1, step2, step3, step4, step5, step6, step7 };
}
