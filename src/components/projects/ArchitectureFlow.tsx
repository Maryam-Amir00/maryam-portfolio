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
      <p className="mb-5 max-w-[46rem] text-[14px] leading-6 text-fg-secondary">
        {description}
      </p>
      <div
        aria-hidden="true"
        className="flex min-w-0 flex-col @min-[52rem]:flex-row @min-[52rem]:items-stretch"
      >
        {layers.map((layer, index) => (
          <Fragment key={layer.id}>
            <div className="min-w-0 flex-1 border border-subtle bg-tab/35 px-4 py-4">
              <p className="font-mono text-[12px] font-medium tracking-[0.16em] text-fg uppercase">
                {layer.label}
              </p>
              <ul className="mt-3 space-y-0.5">
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
              <div className="flex shrink-0 flex-col items-center justify-center gap-1 px-0 py-3 @min-[52rem]:px-3 @min-[52rem]:py-0">
                {layer.outgoing ? (
                  <span className="font-mono text-[10px] tracking-[0.08em] text-fg-muted uppercase">
                    {layer.outgoing}
                  </span>
                ) : null}
                <ArrowDown
                  size={16}
                  strokeWidth={1.75}
                  className="text-fg-muted @min-[52rem]:hidden"
                />
                <ArrowRight
                  size={16}
                  strokeWidth={1.75}
                  className="hidden text-fg-muted @min-[52rem]:block"
                />
              </div>
            ) : null}
          </Fragment>
        ))}
      </div>
    </div>
  )
}
