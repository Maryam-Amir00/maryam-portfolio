import type { EngineeringDecision } from "../../data/projectsData"

export function EngineeringDecisionList({
  decisions,
  problemLabel = "problem",
  approachLabel = "approach",
  outcomeLabel = "why",
}: {
  decisions: readonly EngineeringDecision[]
  problemLabel?: string
  approachLabel?: string
  outcomeLabel?: string
}) {
  return (
    <ol className="divide-y divide-subtle border-y border-subtle">
      {decisions.map((decision) => (
        <li key={decision.id} className="py-5">
          <p className="font-mono text-[12px] text-fg-muted">{decision.key}</p>
          <h3 className="mt-1 text-[1.02rem] font-medium text-fg">
            {decision.title}
          </h3>
          <dl className="mt-4 grid gap-4 min-[900px]:grid-cols-3">
            <div className="min-w-0">
              <dt className="font-mono text-[11px] tracking-[0.08em] text-syntax-property">
                {problemLabel}
              </dt>
              <dd className="mt-1.5 text-[14px] leading-6 text-fg-secondary">
                {decision.problem}
              </dd>
            </div>
            <div className="min-w-0">
              <dt className="font-mono text-[11px] tracking-[0.08em] text-syntax-property">
                {approachLabel}
              </dt>
              <dd className="mt-1.5 text-[14px] leading-6 text-fg-secondary">
                {decision.approach}
              </dd>
            </div>
            <div className="min-w-0">
              <dt className="font-mono text-[11px] tracking-[0.08em] text-syntax-property">
                {outcomeLabel}
              </dt>
              <dd className="mt-1.5 text-[14px] leading-6 text-fg-secondary">
                {decision.outcome}
              </dd>
            </div>
          </dl>
        </li>
      ))}
    </ol>
  )
}
