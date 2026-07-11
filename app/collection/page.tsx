"use client";

import { useCollectionItems } from "@/hooks/use-collection";
import { WATCHED_KEY, WATCHLIST_KEY } from "@/lib/storage";
import { MovieGrid } from "@/components/movie-grid";
import { EmptyState } from "@/components/states/empty-state";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CollectionPage() {
  const watchlist = useCollectionItems(WATCHLIST_KEY);
  const watched = useCollectionItems(WATCHED_KEY);

  return (
    <div className="mx-auto w-full max-w-screen-2xl px-4 py-10 md:px-8 md:py-14 lg:px-12">
      <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        Collection
      </h1>
      <Tabs defaultValue="watchlist">
        <TabsList>
          <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
          <TabsTrigger value="watched">Watched</TabsTrigger>
        </TabsList>
        <TabsContent value="watchlist" className="mt-6">
          {watchlist.length === 0 ? (
            <EmptyState message="Belum ada film di Watchlist." />
          ) : (
            <MovieGrid movies={watchlist} />
          )}
        </TabsContent>
        <TabsContent value="watched" className="mt-6">
          {watched.length === 0 ? (
            <EmptyState message="Belum ada film yang Sudah Ditonton." />
          ) : (
            <MovieGrid movies={watched} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
