export function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string
  title: string
}) {
  return (
    <div>
      <p className="text-primary text-xs font-bold tracking-[0.18em] uppercase">
        {eyebrow}
      </p>
      <h2 className="font-display text-deep-teal mt-2 max-w-2xl text-3xl font-semibold md:text-4xl">
        {title}
      </h2>
    </div>
  )
}
