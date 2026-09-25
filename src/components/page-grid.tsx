// A student's photographed pages, each opening full size. No client code: the pages that show
// them may be server components, and a label function cannot cross into a client one.

export function PageGrid({
  pages,
  label,
}: {
  pages: { path: string | null; url: string | null }[];
  label: (number: number) => string;
}) {
  return (
    <ol className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {pages.map((page, index) => (
        <li key={page.path ?? index} className="grid gap-1">
          {page.url ? (
            <a href={page.url} target="_blank" rel="noreferrer" className="block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={page.url}
                alt={label(index + 1)}
                className="aspect-[3/4] w-full rounded border border-quadrillage bg-white object-cover"
              />
            </a>
          ) : (
            <span
              aria-hidden="true"
              className="aspect-[3/4] w-full rounded border border-quadrillage bg-sunken"
            />
          )}
          <span className="text-xs text-encre-douce">{label(index + 1)}</span>
        </li>
      ))}
    </ol>
  );
}
