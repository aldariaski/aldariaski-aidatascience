"use client";

import { useEffect, useRef } from "react";

export function BarChart({
  items,
}: {
  items: { name: string; value: number }[];
}) {
  const max = Math.max(...items.map((x) => Math.abs(x.value)));

  return (
    <div>
      {items.map((x) => (
        <div className="metric" key={x.name}>
          <label>{x.name}</label>
          <div className="bar" style={{ background: "#e8e8e2" }}>
            <i
              style={{
                width: `${Math.min(100, (Math.abs(x.value) / max) * 100)}%`,
              }}
            />
          </div>
          <b style={{ fontSize: 12 }}>{x.value.toFixed(3)}</b>
        </div>
      ))}
    </div>
  );
}

export function Scatter({
  points,
  x,
  y,
}: {
  points: Record<string, number>[];
  x: string;
  y: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const w = 760,
    h = 390,
    p = 30;

  const xs = points.map((a) => Number(a[x]));
  const ys = points.map((a) => Number(a[y]));

  const xmin = Math.min(...xs),
    xmax = Math.max(...xs),
    ymin = Math.min(...ys),
    ymax = Math.max(...ys);

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${w} ${h}`}
      style={{
        width: "100%",
        height: "auto",
        background: "#fafaf7",
        borderRadius: 14,
      }}
    >
      {points.map((a, i) => {
        const cx =
          p + ((Number(a[x]) - xmin) / (xmax - xmin)) * (w - 2 * p);
        const cy =
          h -
          p -
          ((Number(a[y]) - ymin) / (ymax - ymin)) * (h - 2 * p);

        return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r="2.1"
            fill="#65745d"
            opacity=".45"
          />
        );
      })}
    </svg>
  );
}
