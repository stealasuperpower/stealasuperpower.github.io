import type { ContentSource } from "@/config/types";

export function ContentSources({ sources, reviewed }: { sources: ContentSource[]; reviewed: string }) {
  return (
    <section className="rounded-theme border border-border p-6" aria-label="Sources and review date">
      <h2>Sources and Review Date</h2>
      <p className="text-sm">Reviewed <time dateTime={reviewed}>{reviewed}</time>. Gameplay explanations use the developer description reproduced by the listed directory. Code reports are third-party records, not in-game tests by this site.</p>
      <ul className="mt-4 list-disc space-y-2 pl-6">
        {sources.map((source) => (
          <li key={source.url}><a className="underline break-words" href={source.url} rel="noopener noreferrer">{source.title}</a>{source.sourceType === "official" ? " (Official game)" : " (Third-party source)"}</li>
        ))}
      </ul>
    </section>
  );
}
