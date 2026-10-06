"use client";

import { Copy, DownloadSimple, Pause, Play, Shuffle, SpeakerHigh, Timer } from "@phosphor-icons/react";
import QRCode from "qrcode";
import { useEffect, useMemo, useState } from "react";
import { calculateDiscount, calculatePercentage, compoundInterest, formatDuration, parseDuration, roundForDisplay } from "@/lib/math";
import { generatePassword } from "@/lib/password";
import { convert, type UnitGroup, unitNames } from "@/lib/units";

type ToolWorkspaceProps = { slug: string };

function Result({ children, label = "Resultado" }: { children: React.ReactNode; label?: string }) {
  return <output className="result-card"><span>{label}</span><strong>{children}</strong><p>Calculado localmente en tu navegador.</p></output>;
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() { await navigator.clipboard.writeText(value); setCopied(true); window.setTimeout(() => setCopied(false), 1600); }
  return <button className="button button-secondary" type="button" onClick={copy}><Copy size={18} />{copied ? "Copiado" : "Copiar"}</button>;
}

function PercentageTool() {
  const [part, setPart] = useState("20");
  const [whole, setWhole] = useState("80");
  const result = calculatePercentage(Number(part), Number(whole));
  return <div className="workspace-grid"><form className="tool-form"><label>Parte<input inputMode="decimal" value={part} onChange={(event) => setPart(event.target.value)} /></label><label>Total<input inputMode="decimal" value={whole} onChange={(event) => setWhole(event.target.value)} /></label><p className="form-hint">Qué porcentaje representa una cantidad del total.</p></form><Result>{result === null ? "Ingresa un total distinto de 0" : `${roundForDisplay(result)} %`}</Result></div>;
}

function ConverterTool() {
  const [group, setGroup] = useState<UnitGroup>("longitud");
  const [value, setValue] = useState("1");
  const [from, setFrom] = useState("metros");
  const [to, setTo] = useState("kilómetros");
  const units = unitNames(group);
  const result = convert(Number(value), group, from, to);
  function setSelectedGroup(nextGroup: UnitGroup) { const nextUnits = unitNames(nextGroup); setGroup(nextGroup); setFrom(nextUnits[0]); setTo(nextUnits[1] || nextUnits[0]); }
  return <div className="workspace-grid"><form className="tool-form"><label>Categoría<select value={group} onChange={(event) => setSelectedGroup(event.target.value as UnitGroup)}>{(["longitud", "masa", "temperatura", "tiempo"] as UnitGroup[]).map((item) => <option key={item} value={item}>{item}</option>)}</select></label><label>Valor<input inputMode="decimal" value={value} onChange={(event) => setValue(event.target.value)} /></label><div className="form-pair"><label>De<select value={from} onChange={(event) => setFrom(event.target.value)}>{units.map((unit) => <option key={unit}>{unit}</option>)}</select></label><label>A<select value={to} onChange={(event) => setTo(event.target.value)}>{units.map((unit) => <option key={unit}>{unit}</option>)}</select></label></div><button className="swap-button" type="button" onClick={() => { const oldFrom = from; setFrom(to); setTo(oldFrom); }}>Intercambiar unidades</button></form><Result label={`${from} a ${to}`}>{result === null ? "Revisa el valor" : roundForDisplay(result, 6)}</Result></div>;
}

function PasswordTool() {
  const [length, setLength] = useState(18);
  const [options, setOptions] = useState({ upper: true, lower: true, numbers: true, symbols: true });
  const password = useMemo(() => generatePassword(length, options), [length, options]);
  return <div className="workspace-grid"><form className="tool-form"><label>Longitud <b>{length}</b><input type="range" min="12" max="48" value={length} onChange={(event) => setLength(Number(event.target.value))} /></label>{(["upper", "lower", "numbers", "symbols"] as const).map((option) => <label className="check-row" key={option}><input type="checkbox" checked={options[option]} onChange={() => setOptions((current) => ({ ...current, [option]: !current[option] }))} />{{ upper: "Mayúsculas", lower: "Minúsculas", numbers: "Números", symbols: "Símbolos" }[option]}</label>)}<p className="form-hint">La contraseña se genera mediante Web Crypto y nunca sale de tu equipo.</p></form><div className="password-result"><Result label="Contraseña generada">{password}</Result><CopyButton value={password} /></div></div>;
}

function PomodoroTool() {
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [mode, setMode] = useState<"focus" | "break">("focus");
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [settingsReady, setSettingsReady] = useState(false);
  useEffect(() => { const saved = window.localStorage.getItem("util-pomodoro-settings"); if (saved) { try { const settings = JSON.parse(saved) as { work?: number; rest?: number }; if (settings.work) { setWorkMinutes(settings.work); setSeconds(settings.work * 60); } if (settings.rest) setBreakMinutes(settings.rest); } catch { window.localStorage.removeItem("util-pomodoro-settings"); } } setSettingsReady(true); }, []);
  useEffect(() => { if (settingsReady) window.localStorage.setItem("util-pomodoro-settings", JSON.stringify({ work: workMinutes, rest: breakMinutes })); }, [breakMinutes, settingsReady, workMinutes]);
  useEffect(() => { if (!running) return; const timer = window.setInterval(() => setSeconds((current) => { if (current > 1) return current - 1; const nextMode = mode === "focus" ? "break" : "focus"; setMode(nextMode); setRunning(false); if (typeof Notification !== "undefined" && Notification.permission === "granted") new Notification(nextMode === "focus" ? "Hora de enfocarte" : "Hora de descansar"); return (nextMode === "focus" ? workMinutes : breakMinutes) * 60; }), 1000); return () => window.clearInterval(timer); }, [breakMinutes, mode, running, workMinutes]);
  function changeMode(nextMode: "focus" | "break") { setRunning(false); setMode(nextMode); setSeconds((nextMode === "focus" ? workMinutes : breakMinutes) * 60); }
  function updateMinutes(kind: "work" | "break", value: number) { const safe = Math.min(120, Math.max(1, Number.isFinite(value) ? value : 1)); if (kind === "work") { setWorkMinutes(safe); if (mode === "focus" && !running) setSeconds(safe * 60); } else { setBreakMinutes(safe); if (mode === "break" && !running) setSeconds(safe * 60); } }
  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0"); const remaining = String(seconds % 60).padStart(2, "0");
  return <div className="pomodoro"><div className="pomodoro-tabs"><button type="button" className={mode === "focus" ? "active" : ""} onClick={() => changeMode("focus")}>Enfoque</button><button type="button" className={mode === "break" ? "active" : ""} onClick={() => changeMode("break")}>Descanso</button></div><div><p>{mode === "focus" ? "Sesión de enfoque" : "Pausa breve"}</p><strong>{minutes}:{remaining}</strong><span>La configuración se guarda únicamente en este dispositivo.</span></div><div className="pomodoro-actions"><button className="button button-primary" type="button" onClick={() => setRunning((current) => !current)}>{running ? <Pause size={18} weight="fill" /> : <Play size={18} weight="fill" />}{running ? "Pausar" : "Empezar"}</button><button className="button button-secondary" type="button" onClick={() => { setRunning(false); setSeconds((mode === "focus" ? workMinutes : breakMinutes) * 60); }}><Timer size={18} />Reiniciar</button></div><div className="pomodoro-settings"><label>Enfoque (min)<input type="number" min="1" max="120" value={workMinutes} onChange={(event) => updateMinutes("work", Number(event.target.value))} /></label><label>Descanso (min)<input type="number" min="1" max="120" value={breakMinutes} onChange={(event) => updateMinutes("break", Number(event.target.value))} /></label></div><button className="notification-button" type="button" onClick={() => { if (typeof Notification !== "undefined") void Notification.requestPermission(); }}><SpeakerHigh size={16} />Activar avisos del navegador</button></div>;
}

function TimeCalculatorTool() {
  const [hours, setHours] = useState("1");
  const [minutes, setMinutes] = useState("30");
  const [seconds, setSeconds] = useState("0");
  const result = parseDuration(Number(hours), Number(minutes), Number(seconds));
  return <div className="workspace-grid"><form className="tool-form"><div className="form-pair"><label>Horas<input inputMode="numeric" value={hours} onChange={(event) => setHours(event.target.value)} /></label><label>Minutos<input inputMode="numeric" value={minutes} onChange={(event) => setMinutes(event.target.value)} /></label></div><label>Segundos<input inputMode="numeric" value={seconds} onChange={(event) => setSeconds(event.target.value)} /></label><p className="form-hint">Convierte una duración a un formato fácil de leer y reutilizar.</p></form><Result label="Duración normalizada">{result === null ? "Revisa horas, minutos y segundos" : formatDuration(result)}</Result></div>;
}

function CharacterCounterTool() {
  const [text, setText] = useState("");
  const words = text.trim() ? text.trim().split(/\s+/u).length : 0;
  return <div className="counter-tool"><label>Texto<textarea value={text} onChange={(event) => setText(event.target.value)} placeholder="Escribe o pega un texto aquí..." /></label><div className="counter-results"><Result label="Caracteres">{text.length}</Result><Result label="Palabras">{words}</Result><Result label="Lectura estimada">{`${Math.max(1, Math.ceil(words / 200))} min`}</Result></div></div>;
}

function CountdownTool() {
  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(10 * 60);
  const [running, setRunning] = useState(false);
  useEffect(() => { if (!running) return; const timer = window.setInterval(() => setSeconds((current) => { if (current <= 1) { setRunning(false); return 0; } return current - 1; }), 1000); return () => window.clearInterval(timer); }, [running]);
  function setDuration(value: number) { const safe = Math.min(180, Math.max(1, Number.isFinite(value) ? value : 1)); setMinutes(safe); setSeconds(safe * 60); setRunning(false); }
  const display = formatDuration(seconds) ?? "00:00:00";
  return <div className="pomodoro"><div><p>Cuenta atrás</p><strong>{display}</strong><span>Un temporizador simple para una tarea, descanso o reunión.</span></div><div className="pomodoro-actions"><button className="button button-primary" type="button" onClick={() => { if (seconds === 0) { setSeconds(minutes * 60); setRunning(true); } else setRunning((current) => !current); }}>{running ? <Pause size={18} weight="fill" /> : <Play size={18} weight="fill" />}{running ? "Pausar" : seconds === 0 ? "Reiniciar" : "Empezar"}</button><button className="button button-secondary" type="button" onClick={() => { setSeconds(minutes * 60); setRunning(false); }}><Timer size={18} />Restablecer</button></div><label className="countdown-input">Duración (min)<input type="number" min="1" max="180" value={minutes} onChange={(event) => setDuration(Number(event.target.value))} /></label></div>;
}

function DiscountTool() {
  const [price, setPrice] = useState("100");
  const [discount, setDiscount] = useState("15");
  const original = Number(price); const percentage = Number(discount); const final = calculateDiscount(original, percentage);
  return <div className="workspace-grid"><form className="tool-form"><label>Precio original<input inputMode="decimal" value={price} onChange={(event) => setPrice(event.target.value)} /></label><label>Descuento (%)<input inputMode="decimal" value={discount} onChange={(event) => setDiscount(event.target.value)} /></label><p className="form-hint">El precio final no incluye impuestos, envío ni cargos externos.</p></form><Result label="Precio final">{final === null ? "Revisa los valores" : `${roundForDisplay(final)} · ahorras ${roundForDisplay(original - final)}`}</Result></div>;
}

function CompoundInterestTool() {
  const [principal, setPrincipal] = useState("1000");
  const [rate, setRate] = useState("8");
  const [years, setYears] = useState("5");
  const [contribution, setContribution] = useState("100");
  const value = compoundInterest(Number(principal), Number(rate), Number(years), Number(contribution));
  const contributed = Number(principal) + Number(contribution) * Number(years) * 12;
  return <div className="workspace-grid"><form className="tool-form"><div className="form-pair"><label>Capital inicial<input inputMode="decimal" value={principal} onChange={(event) => setPrincipal(event.target.value)} /></label><label>Aporte mensual<input inputMode="decimal" value={contribution} onChange={(event) => setContribution(event.target.value)} /></label></div><div className="form-pair"><label>Tasa anual (%)<input inputMode="decimal" value={rate} onChange={(event) => setRate(event.target.value)} /></label><label>Años<input inputMode="decimal" value={years} onChange={(event) => setYears(event.target.value)} /></label></div><p className="form-hint">Estimación educativa con capitalización mensual. No constituye asesoría financiera.</p></form><Result label="Saldo estimado">{value === null ? "Revisa los valores" : `${roundForDisplay(value)} · intereses ${roundForDisplay(value - contributed)}`}</Result></div>;
}

function QrTool() {
  const [kind, setKind] = useState("url");
  const [content, setContent] = useState("https://ejemplo.com");
  const [dataUrl, setDataUrl] = useState("");
  const [error, setError] = useState("");
  const payload = useMemo(() => {
    const value = content.trim();
    if (kind === "email") return `mailto:${value}`;
    if (kind === "teléfono") return `tel:${value.replace(/\s/gu, "")}`;
    if (kind === "sms") return `sms:${value}`;
    return value;
  }, [content, kind]);
  useEffect(() => {
    let active = true;
    const value = payload;
    if (!value) { setDataUrl(""); return; }
    QRCode.toDataURL(value, { width: 420, margin: 2, color: { dark: "#102A43", light: "#FFFFFFFF" } })
      .then((valueUrl) => { if (active) { setDataUrl(valueUrl); setError(""); } })
      .catch(() => { if (active) { setDataUrl(""); setError("No pudimos generar el código. Revisa el contenido."); } });
    return () => { active = false; };
  }, [payload]);
  const placeholders: Record<string, string> = { url: "https://ejemplo.com", texto: "Escribe un texto", email: "nombre@ejemplo.com", teléfono: "+593 99 000 0000", sms: "Escribe un mensaje" };
  return <div className="workspace-grid"><form className="tool-form"><label>Tipo de contenido<select value={kind} onChange={(event) => setKind(event.target.value)}><option value="url">Enlace</option><option value="texto">Texto</option><option value="email">Email</option><option value="teléfono">Teléfono</option><option value="sms">SMS</option></select></label><label>Contenido<textarea className="compact-textarea" value={content} onChange={(event) => setContent(event.target.value)} placeholder={placeholders[kind]} /></label><p className="form-hint">El QR se genera en este dispositivo. No enviamos el contenido a un servidor.</p></form><div className="qr-result">{dataUrl ? <><img src={dataUrl} alt="Vista previa del código QR" /><a className="button button-secondary" href={dataUrl} download="codigo-qr.png"><DownloadSimple size={18} />Descargar PNG</a></> : <div className="empty-tool"><Shuffle size={28} /><h2>Escribe contenido</h2><p>{error || "La vista previa aparecerá aquí."}</p></div>}</div></div>;
}

function UnavailableTool() { return <div className="empty-tool"><Shuffle size={28} /><h2>Esta herramienta está en preparación</h2><p>Su página, explicaciones y validaciones se añadirán al catálogo sin cambiar su enlace.</p></div>; }

export function ToolWorkspace({ slug }: ToolWorkspaceProps) {
  const tool = { "calculadora-porcentaje": <PercentageTool />, "conversor-unidades": <ConverterTool />, "generador-contrasenas": <PasswordTool />, pomodoro: <PomodoroTool />, "calculadora-tiempo": <TimeCalculatorTool />, "contador-caracteres": <CharacterCounterTool />, "contador-tiempo": <CountdownTool />, "calculadora-descuento": <DiscountTool />, "calculadora-interes-compuesto": <CompoundInterestTool />, "generador-qr": <QrTool /> }[slug] || <UnavailableTool />;
  return <section className="tool-workspace" aria-label="Área de trabajo">{tool}</section>;
}
