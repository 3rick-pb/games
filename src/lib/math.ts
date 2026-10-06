export function calculatePercentage(part: number, whole: number): number | null {
  if (!Number.isFinite(part) || !Number.isFinite(whole) || whole === 0) return null;
  return (part / whole) * 100;
}

export function calculateDiscount(price: number, percentage: number): number | null {
  if (!Number.isFinite(price) || !Number.isFinite(percentage) || price < 0 || percentage < 0) return null;
  return price * (1 - percentage / 100);
}

export function roundForDisplay(value: number, decimals = 2): number {
  const factor = 10 ** decimals;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

export function parseDuration(hours: number, minutes: number, seconds = 0): number | null {
  if (![hours, minutes, seconds].every(Number.isFinite) || hours < 0 || minutes < 0 || seconds < 0 || minutes >= 60 || seconds >= 60) return null;
  return hours * 3600 + minutes * 60 + seconds;
}

export function formatDuration(totalSeconds: number): string | null {
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) return null;
  const safeSeconds = Math.round(totalSeconds);
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const seconds = safeSeconds % 60;
  return [hours, minutes, seconds].map((value) => String(value).padStart(2, "0")).join(":");
}

export function compoundInterest(principal: number, annualRate: number, years: number, monthlyContribution = 0): number | null {
  if (![principal, annualRate, years, monthlyContribution].every(Number.isFinite) || principal < 0 || years < 0 || monthlyContribution < 0 || annualRate < -100) return null;
  const months = Math.round(years * 12);
  const monthlyRate = annualRate / 100 / 12;
  if (monthlyRate === 0) return principal + monthlyContribution * months;
  return principal * (1 + monthlyRate) ** months + monthlyContribution * (((1 + monthlyRate) ** months - 1) / monthlyRate);
}
