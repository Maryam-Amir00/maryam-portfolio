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
        className="flex min-w-0 flex-col @min-[52rem]:flex-row @min-[52rem]:items-stretch"
      >
        {stages.map((stage, index) => (
          <Fragment key={stage.id}>
            <li className="min-w-0 flex-1 border border-subtle px-4 py-4">
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
              <li className="flex shrink-0 items-center justify-center px-0 py-3 @min-[52rem]:px-2.5 @min-[52rem]:py-0">
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
              </li>
            ) : null}
          </Fragment>
        ))}
      </ol>
    </div>
  )
}
