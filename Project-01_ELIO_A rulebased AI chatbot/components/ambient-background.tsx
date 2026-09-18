"use client";
import { useEffect, useState, type CSSProperties } from "react";

export function AmbientBackground() {
  const [position, setPosition] = useState({ x: 50, y: 35 });
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let frame = 0;
    const move = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() =>
        setPosition({
          x: (event.clientX / window.innerWidth) * 100,
          y: (event.clientY / window.innerHeight) * 100,
        }),
      );
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <div
      aria-hidden
      className="ambient"
      style={
        {
          "--cursor-x": `${position.x}%`,
          "--cursor-y": `${position.y}%`,
        } as CSSProperties
      }
    />
  );
}
