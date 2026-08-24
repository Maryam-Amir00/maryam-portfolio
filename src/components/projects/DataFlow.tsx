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
      <p className="sr-only">{description}</p>
      <ol
        aria-hidden="true"
        className="flex min-w-0 flex-col min-[960px]:flex-row min-[960px]:items-stretch"
      >
        {stages.map((stage, index) => (
          <Fragment key={stage.id}>
            <li className="min-w-0 flex-1 overflow-x-auto border border-subtle px-4 py-3">
              <p className="font-mono text-[11px] text-fg-muted">{stage.index}</p>
              <p className="mt-1 font-mono text-[11px] tracking-[0.12em] text-syntax-property uppercase">
                {stage.label}
              </p>
              {stage.detail ? (
                <p className="mt-1.5 text-[13px] leading-6 break-words text-fg">
                  {stage.detail}
                </p>
              ) : null}
            </li>
            {index < stages.length - 1 ? (
              <li className="flex shrink-0 items-center justify-center px-0 py-2 min-[960px]:px-1.5 min-[960px]:py-0">
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
              </li>
            ) : null}
          </Fragment>
        ))}
      </ol>
    </div>
  )
}
