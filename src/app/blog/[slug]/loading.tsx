export default function BlogPostLoading() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <article className="container mx-auto px-4 max-w-4xl">
        {/* Header Skeleton */}
        <header className="text-center mb-12">
          {/* Tags Skeleton */}
          <div className="flex justify-center gap-2 mb-6">
            <div className="h-6 w-20 bg-muted animate-pulse rounded-full" />
            <div className="h-6 w-24 bg-muted animate-pulse rounded-full" />
          </div>

          {/* Title Skeleton */}
          <div className="h-10 w-full bg-muted animate-pulse rounded mb-4" />
          <div className="h-10 w-3/4 bg-muted animate-pulse rounded mx-auto mb-6" />

          {/* Meta Skeleton */}
          <div className="flex items-center justify-center gap-6">
            <div className="h-4 w-32 bg-muted animate-pulse rounded" />
            <div className="h-4 w-24 bg-muted animate-pulse rounded" />
          </div>
        </header>

        {/* Cover Image Skeleton */}
        <div className="relative aspect-video mb-12 rounded-xl overflow-hidden bg-muted animate-pulse" />

        <hr className="mb-12 border-border" />

        {/* Content Skeleton */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {/* Paragraphs */}
          <div className="space-y-4 mb-8">
            <div className="h-4 w-full bg-muted animate-pulse rounded" />
            <div className="h-4 w-full bg-muted animate-pulse rounded" />
            <div className="h-4 w-5/6 bg-muted animate-pulse rounded" />
          </div>

          {/* Heading */}
          <div className="h-8 w-1/2 bg-muted animate-pulse rounded mb-4 mt-8" />

          {/* More paragraphs */}
          <div className="space-y-4 mb-8">
            <div className="h-4 w-full bg-muted animate-pulse rounded" />
            <div className="h-4 w-full bg-muted animate-pulse rounded" />
            <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
          </div>

          {/* Code block skeleton */}
          <div className="h-32 w-full bg-muted animate-pulse rounded-lg mb-8" />

          {/* More paragraphs */}
          <div className="space-y-4">
            <div className="h-4 w-full bg-muted animate-pulse rounded" />
            <div className="h-4 w-full bg-muted animate-pulse rounded" />
            <div className="h-4 w-2/3 bg-muted animate-pulse rounded" />
          </div>
        </div>
      </article>
    </div>
  );
}
