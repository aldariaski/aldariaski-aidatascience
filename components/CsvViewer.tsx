"use client";

import { useEffect, useMemo, useState } from "react";
import Papa from "papaparse";

export default function CsvViewer({ file }: { file: string }) {
  const [rows, setRows] = useState<Record<string, string>[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    fetch("/data/" + file)
      .then((r) => r.text())
      .then((t) => {
        const r = Papa.parse<Record<string, string>>(t, {
          header: true,
          skipEmptyLines: true,
        }).data;
        setRows(r);
        setHeaders(r.length ? Object.keys(r[0]) : []);
      });
  }, [file]);

  const shown = useMemo(() => {
    const x = q.toLowerCase();
    return rows
      .filter(
        (r) =>
          !x ||
          Object.values(r).some((v) =>
            String(v).toLowerCase().includes(x)
          )
      )
      .slice(0, 100);
  }, [rows, q]);

  return (
    <div className="tablewrap">
      <div className="csvtoolbar">
        <strong>
          {rows.length ? rows.length.toLocaleString() : "…"} rows
        </strong>
        <input
          className="search"
          placeholder="Search this dataset…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <a
          className="button"
          style={{ margin: 0, padding: "9px 13px" }}
          href={"/data/" + file}
          download
        >
          Download CSV
        </a>
      </div>

      <table className="csvtable">
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {shown.map((r, i) => (
            <tr key={i}>
              {headers.map((h) => (
                <td key={h}>{r[h]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
