"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./SketchPrompt.module.scss";

// Original prompts, written for this page.
const PROMPTS = [
  "a message that is running late for its train",
  "a die on its first day of holiday",
  "an idea too big for its jar",
  "the chai that powers a release",
  "a spreadsheet trying to balance on one leg",
  "two apps shaking hands",
  "a paper plane carrying good news",
  "a robot learning to write in Hindi",
  "Monday morning, drawn as weather",
  "a bug that is very proud of itself",
  "the moment an OTP finally arrives",
  "a door labelled “maybe”",
];

type Point = [number, number];

/** Sketch Prompt: draw something silly in a minute, then keep it. */
export function SketchPrompt() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const strokes = useRef<Point[][]>([]);
  const drawing = useRef(false);
  const [prompt, setPrompt] = useState(PROMPTS[0]);
  const [count, setCount] = useState(0);
  const [color, setColor] = useState("oklch(21.54% 0.009 75.14)");
  const colors = useRef<string[]>([]);

  const redraw = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    const g = c.getContext("2d")!;
    g.fillStyle = "oklch(99.42% 0.0069 88.64)";
    g.fillRect(0, 0, c.width, c.height);
    g.lineCap = "round";
    g.lineJoin = "round";
    g.lineWidth = 4 * (c.width / c.clientWidth || 1);
    strokes.current.forEach((s, i) => {
      g.strokeStyle = colors.current[i] ?? "oklch(21.54% 0.009 75.14)";
      g.beginPath();
      s.forEach(([x, y], k) => (k ? g.lineTo(x, y) : g.moveTo(x, y)));
      if (s.length === 1) g.lineTo(s[0][0] + 0.1, s[0][1]);
      g.stroke();
    });
  }, []);

  useEffect(() => {
    const c = canvasRef.current!;
    const size = () => {
      const r = c.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = Math.round(r.width * dpr);
      c.height = Math.round(r.height * dpr);
      // Resizing a canvas wipes it, so start the sheet afresh.
      strokes.current = [];
      colors.current = [];
      redraw();
    };
    size();
    const onResize = () => {
      size();
      setCount(0);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [redraw]);

  const pos = (e: React.PointerEvent): Point => {
    const c = canvasRef.current!;
    const r = c.getBoundingClientRect();
    return [((e.clientX - r.left) / r.width) * c.width, ((e.clientY - r.top) / r.height) * c.height];
  };

  const down = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    drawing.current = true;
    strokes.current.push([pos(e)]);
    colors.current.push(color);
    setCount(strokes.current.length);
    redraw();
  };
  const move = (e: React.PointerEvent) => {
    if (!drawing.current) return;
    strokes.current[strokes.current.length - 1].push(pos(e));
    redraw();
  };
  const up = () => {
    drawing.current = false;
  };

  const undo = () => {
    strokes.current.pop();
    colors.current.pop();
    setCount(strokes.current.length);
    redraw();
  };
  const clear = () => {
    strokes.current = [];
    colors.current = [];
    setCount(0);
    redraw();
  };
  const next = () => {
    let p = prompt;
    while (p === prompt) p = PROMPTS[Math.floor(Math.random() * PROMPTS.length)];
    setPrompt(p);
  };
  const save = () => {
    const c = canvasRef.current!;
    const a = document.createElement("a");
    a.href = c.toDataURL("image/png");
    a.download = "walkover-sketch.png";
    a.click();
  };

  return (
    <div className={styles.wrap}>
      <p className={styles.prompt} aria-live="polite">
        <span>Draw</span> {prompt}
      </p>
      <div className={styles.tools}>
        <button type="button" className="btn btn-paper" onClick={next}>
          New prompt
        </button>
        <fieldset className={styles.inks}>
          <legend className="sr-only">Ink colour</legend>
          {[
            ["oklch(21.54% 0.009 75.14)", "Black ink"],
            ["oklch(57.77% 0.2148 29.08)", "Red ink"],
            ["oklch(54.16% 0.1241 257.41)", "Blue ink"],
          ].map(([c, label]) => (
            <label key={c} className={styles.ink} style={{ "--c": c } as React.CSSProperties}>
              <input type="radio" name="sketch-ink" checked={color === c} onChange={() => setColor(c)} />
              <span className="sr-only">{label}</span>
            </label>
          ))}
        </fieldset>
        <button type="button" className="btn btn-ghost" onClick={undo} disabled={!count}>
          Undo
        </button>
        <button type="button" className="btn btn-ghost" onClick={clear} disabled={!count}>
          Clear
        </button>
        <button type="button" className="btn btn-red" onClick={save} disabled={!count}>
          Save as PNG
        </button>
      </div>
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
        aria-label={`Drawing area. Prompt: draw ${prompt}. Draw with a mouse, finger or pen.`}
        role="img"
      />
      <p className={styles.note}>Your drawing stays in your browser. Nothing is uploaded.</p>
    </div>
  );
}
