import { ArrowDown, ArrowRight } from "lucide-react"
import { Fragment } from "react"
import type { FlowStage } from "../../data/projectsData"

export function DataFlow({
  stages,
  description,
}: {
  stages: readonly FlowStage[]
  description: string
}) {
  return (
    <div>
      <p className="mb-5 max-w-[46rem] text-[14px] leading-6 text-fg-secondary">
        {description}
      </p>
      <ol
        aria-hidden="true"
        className="grid min-w-0 grid-cols-1 @min-[40rem]:grid-cols-2 @min-[64rem]:flex @min-[64rem]:flex-row @min-[64rem]:items-stretch"
      >
        {stages.map((stage, index) => (
          <Fragment key={stage.id}>
            <li className="min-w-0 border border-subtle px-4 py-4 @min-[64rem]:flex-1">
              <p className="font-mono text-[11px] text-fg-muted">{stage.index}</p>
              <p className="mt-2 font-mono text-[12px] font-medium tracking-[0.12em] text-fg uppercase">
                {stage.label}
              </p>
              {stage.detail ? (
                <p className="mt-1.5 text-[13px] leading-6 break-words text-fg-secondary">
                  {stage.detail}
                </p>
              ) : null}
            </li>
            {index < stages.length - 1 ? (
              <li className="flex shrink-0 items-center justify-center px-0 py-3 @min-[40rem]:hidden @min-[64rem]:flex @min-[64rem]:px-2.5 @min-[64rem]:py-0">
                <ArrowDown
                  size={16}
                  strokeWidth={1.75}
                  className="text-fg-muted @min-[64rem]:hidden"
                />
                <ArrowRight
                  size={16}
                  strokeWidth={1.75}
                  className="hidden text-fg-muted @min-[64rem]:block"
                />
              </li>
            ) : null}
          </Fragment>
        ))}
      </ol>
    </div>
  )
}
