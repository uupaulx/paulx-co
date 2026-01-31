import { Navbar, Footer } from "@/components/layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

function BlogCardSkeleton() {
  return (
    <Card className="h-full overflow-hidden border-border/50">
      {/* Cover Image Skeleton */}
      <div className="relative h-48 bg-muted animate-pulse" />

      <CardHeader className="pb-3">
        {/* Tags Skeleton */}
        <div className="flex gap-2 mb-3">
          <div className="h-5 w-16 bg-muted animate-pulse rounded-full" />
          <div className="h-5 w-20 bg-muted animate-pulse rounded-full" />
        </div>

        {/* Title Skeleton */}
        <div className="h-6 w-full bg-muted animate-pulse rounded mb-2" />
        <div className="h-6 w-3/4 bg-muted animate-pulse rounded" />
      </CardHeader>

      <CardContent className="pt-0">
        {/* Excerpt Skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 w-full bg-muted animate-pulse rounded" />
          <div className="h-4 w-full bg-muted animate-pulse rounded" />
          <div className="h-4 w-2/3 bg-muted animate-pulse rounded" />
        </div>

        {/* Meta Skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-3 w-24 bg-muted animate-pulse rounded" />
            <div className="h-3 w-16 bg-muted animate-pulse rounded" />
          </div>
          <div className="h-4 w-4 bg-muted animate-pulse rounded" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function BlogLoading() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header Skeleton */}
          <div className="text-center mb-16">
            <div className="h-12 w-48 bg-muted animate-pulse rounded mx-auto mb-4" />
            <div className="h-6 w-96 max-w-full bg-muted animate-pulse rounded mx-auto" />
          </div>

          {/* Blog Posts Grid Skeleton */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <BlogCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
