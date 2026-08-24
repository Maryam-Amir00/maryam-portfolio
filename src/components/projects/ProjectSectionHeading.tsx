export function ProjectSectionHeading({
  comment,
  children,
}: {
  comment: string
  children: string
}) {
  return (
    <div className="mb-5">
      <p aria-hidden="true" className="font-mono text-[13px] text-syntax-comment">
        {`// ${comment}`}
      </p>
      <h2 className="mt-1 text-[1.05rem] font-medium tracking-tight text-fg">
        {children}
      </h2>
    </div>
  )
}
