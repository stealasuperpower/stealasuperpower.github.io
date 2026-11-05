"use client";

import { useState } from "react";
import type { ReportedCode } from "@/config/types";

export function CodeList({ codes }: { codes: ReportedCode[] }) {
  const [message, setMessage] = useState("");

  async function copy(code: string) {
    try {
      await navigator.clipboard.writeText(code);
      setMessage(`${code} copied. Paste it into the game’s Codes box.`);
    } catch {
      setMessage(`Copy unavailable. Select ${code} and copy it manually.`);
    }
  }

  return (
    <div className="mt-6">
      <ul className="grid gap-4 sm:grid-cols-2">
        {codes.map((item) => (
          <li key={item.code} className="content-card min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <code className="break-all text-lg font-bold text-foreground">{item.code}</code>
              <button type="button" className="button-secondary" aria-label={`Copy ${item.code}`} onClick={() => copy(item.code)}>Copy</button>
            </div>
            <p className="font-semibold">{item.reward}</p>
            <p className="text-sm">{item.status}</p>
            <p className="text-sm">
              <a className="underline" href={item.sourceUrl} rel="noopener noreferrer">{item.sourceLabel}</a>
              {" · Source checked "}<time dateTime={item.checked}>{item.checked}</time>
            </p>
          </li>
        ))}
      </ul>
      <p role="status" aria-live="polite" className="mt-3 min-h-7 text-sm">{message}</p>
    </div>
  );
}
