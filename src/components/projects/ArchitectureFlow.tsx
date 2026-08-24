import { ArrowDown, ArrowRight } from "lucide-react"
import { Fragment } from "react"
import type { ArchitectureLayer } from "../../data/projectsData"

export function ArchitectureFlow({
  layers,
  description,
}: {
  layers: readonly ArchitectureLayer[]
  description: string
}) {
  return (
    <div>
      <p className="sr-only">{description}</p>
      <div
        aria-hidden="true"
        className="flex min-w-0 flex-col min-[960px]:flex-row min-[960px]:items-stretch"
      >
        {layers.map((layer, index) => (
          <Fragment key={layer.id}>
            <div className="min-w-0 flex-1 overflow-x-auto border border-subtle px-4 py-3">
              <p className="font-mono text-[11px] tracking-[0.14em] text-fg-muted uppercase">
                {layer.label}
              </p>
              <ul className="mt-2">
                {layer.technologies.map((technology) => (
                  <li
                    key={technology}
                    className="text-[13px] leading-6 text-fg-secondary"
                  >
                    {technology}
                  </li>
                ))}
              </ul>
            </div>
            {index < layers.length - 1 ? (
              <div className="flex shrink-0 items-center justify-center px-0 py-2 min-[960px]:flex-col min-[960px]:px-2 min-[960px]:py-0">
                {layer.outgoing ? (
                  <span className="font-mono text-[10px] tracking-[0.08em] text-fg-muted uppercase">
                    {layer.outgoing}
                  </span>
                ) : null}
                <ArrowDown
                  size={14}
                  strokeWidth={1.75}
                  className="text-fg-muted min-[960px]:hidden"
                />
                <ArrowRight
                  size={14}
                  strokeWidth={1.75}
                  className="hidden text-fg-muted min-[960px]:block"
                />
              </div>
            ) : null}
          </Fragment>
        ))}
      </div>
    </div>
  )
}
