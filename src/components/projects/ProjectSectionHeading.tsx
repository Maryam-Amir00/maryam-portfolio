export function ProjectSectionHeading({
  comment,
  children,
  prominence = "default",
}: {
  comment: string
  children: string
  prominence?: "default" | "strong"
}) {
  return (
    <div className={prominence === "strong" ? "mb-6" : "mb-5"}>
      <p aria-hidden="true" className="font-mono text-[13px] text-syntax-comment">
        {`// ${comment}`}
      </p>
      <h2
        className={
          prominence === "strong"
            ? "mt-1 text-[1.15rem] font-semibold tracking-tight text-fg"
            : "mt-1 text-[1.05rem] font-medium tracking-tight text-fg"
        }
      >
        {children}
      </h2>
    </div>
  )
}
