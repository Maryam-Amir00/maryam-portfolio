type EditorGutterProps = {
  count?: number
}

export function EditorGutter({ count = 36 }: EditorGutterProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 left-0 hidden w-12 overflow-hidden border-r border-subtle select-none min-[900px]:block"
    >
      <div className="pt-5 font-mono text-[12px] leading-6 text-fg-muted">
        {Array.from({ length: count }, (_, index) => (
          <div key={index + 1} className="pr-3 text-right">
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  )
}
