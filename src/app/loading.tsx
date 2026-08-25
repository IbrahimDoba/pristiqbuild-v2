/**
 * Route-level loading state.
 *
 * A skeleton in the shape of the page that is arriving, rather than a spinner:
 * it keeps the layout stable while the route streams in, which is the
 * difference between a page that feels fast and one that flashes.
 */
export default function Loading() {
  return (
    <div className="min-h-[70vh] container-custom py-24" aria-busy="true">
      <span className="sr-only">Loading</span>

      <div className="max-w-3xl animate-pulse">
        <div className="h-4 w-32 rounded bg-steel-200 mb-8" />
        <div className="h-12 w-full rounded bg-steel-200 mb-4" />
        <div className="h-12 w-4/5 rounded bg-steel-200 mb-8" />
        <div className="h-4 w-full rounded bg-steel-100 mb-3" />
        <div className="h-4 w-11/12 rounded bg-steel-100 mb-3" />
        <div className="h-4 w-3/4 rounded bg-steel-100" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 animate-pulse">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-2xl border border-steel-100 p-6">
            <div className="h-40 rounded-xl bg-steel-100 mb-5" />
            <div className="h-4 w-2/3 rounded bg-steel-200 mb-3" />
            <div className="h-3 w-full rounded bg-steel-100 mb-2" />
            <div className="h-3 w-5/6 rounded bg-steel-100" />
          </div>
        ))}
      </div>
    </div>
  );
}
