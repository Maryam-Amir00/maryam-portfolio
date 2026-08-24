import type { ProjectMetaItem } from "../../data/projectsData"

export function ProjectMeta({ items }: { items: readonly ProjectMetaItem[] }) {
  return (
    <section aria-label="Project metadata" className="mt-8 border-y border-subtle">
      <dl className="grid grid-cols-1 min-[720px]:grid-cols-2 min-[1080px]:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="border-subtle px-0 py-4 min-[720px]:px-4 min-[720px]:max-[1079px]:odd:pl-0 min-[1080px]:first:pl-0 max-[719px]:border-b max-[719px]:last:border-b-0 min-[720px]:max-[1079px]:[&:nth-child(-n+2)]:border-b min-[720px]:max-[1079px]:odd:border-r min-[1080px]:border-r min-[1080px]:last:border-r-0"
          >
            <dt className="font-mono text-[11px] tracking-[0.14em] text-fg-muted uppercase">
              {item.label}
            </dt>
            <dd className="mt-1.5 text-[13px] text-fg-secondary">{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
