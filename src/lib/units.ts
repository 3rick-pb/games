export type UnitGroup = "longitud" | "masa" | "temperatura" | "tiempo";

type Unit = { label: string; toBase: (value: number) => number; fromBase: (value: number) => number };

const groups: Record<UnitGroup, Record<string, Unit>> = {
  longitud: {
    metros: { label: "metros", toBase: (value) => value, fromBase: (value) => value },
    kilómetros: { label: "kilómetros", toBase: (value) => value * 1000, fromBase: (value) => value / 1000 },
    millas: { label: "millas", toBase: (value) => value * 1609.344, fromBase: (value) => value / 1609.344 },
    pies: { label: "pies", toBase: (value) => value * 0.3048, fromBase: (value) => value / 0.3048 }
  },
  masa: {
    kilogramos: { label: "kilogramos", toBase: (value) => value, fromBase: (value) => value },
    gramos: { label: "gramos", toBase: (value) => value / 1000, fromBase: (value) => value * 1000 },
    libras: { label: "libras", toBase: (value) => value * 0.45359237, fromBase: (value) => value / 0.45359237 }
  },
  temperatura: {
    celsius: { label: "°C", toBase: (value) => value, fromBase: (value) => value },
    fahrenheit: { label: "°F", toBase: (value) => (value - 32) * (5 / 9), fromBase: (value) => value * (9 / 5) + 32 },
    kelvin: { label: "K", toBase: (value) => value - 273.15, fromBase: (value) => value + 273.15 }
  },
  tiempo: {
    segundos: { label: "segundos", toBase: (value) => value, fromBase: (value) => value },
    minutos: { label: "minutos", toBase: (value) => value * 60, fromBase: (value) => value / 60 },
    horas: { label: "horas", toBase: (value) => value * 3600, fromBase: (value) => value / 3600 },
    días: { label: "días", toBase: (value) => value * 86400, fromBase: (value) => value / 86400 }
  }
};

export function unitNames(group: UnitGroup): string[] {
  return Object.keys(groups[group]);
}

export function convert(value: number, group: UnitGroup, from: string, to: string): number | null {
  const origin = groups[group][from];
  const target = groups[group][to];
  if (!Number.isFinite(value) || !origin || !target) return null;
  return target.fromBase(origin.toBase(value));
}
