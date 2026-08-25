import { ChevronRight } from "lucide-react"

export type BreadcrumbItem = {
  label: string
  current?: boolean
}

export function EditorBreadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const mobileStart = Math.max(items.length - 2, 0)
  const fullPath = items.map((item) => item.label).join(" / ")

  return (
    <p
      aria-label={fullPath}
      className="flex h-7 min-h-7 min-w-0 max-w-full shrink-0 items-center overflow-hidden border-b border-subtle px-[clamp(1rem,3.5vw,2.25rem)] text-[12px] text-fg-muted whitespace-nowrap"
    >
      <span className="flex min-w-0 items-center gap-1 overflow-hidden whitespace-nowrap">
        {items.map((item, index) => (
          <span
            key={`${item.label}-${index}`}
            className={[
              "flex min-w-0 items-center gap-1",
              index < mobileStart ? "max-md:hidden" : "",
            ].join(" ")}
          >
            {index > 0 ? (
              <ChevronRight
                size={12}
                strokeWidth={2}
                className={[
                  "shrink-0 text-fg-muted",
                  index <= mobileStart ? "max-md:hidden" : "",
                ].join(" ")}
                aria-hidden="true"
              />
            ) : null}
            <span
              aria-hidden="true"
              className={`truncate ${item.current ? "text-fg-secondary" : ""}`}
              title={item.label}
            >
              {item.label}
            </span>
          </span>
        ))}
      </span>
    </p>
  )
}
