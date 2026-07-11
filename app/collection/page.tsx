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
    <div className="mx-auto w-full max-w-6xl px-4 py-10 md:px-8">
      <h1 className="mb-6 text-2xl font-semibold text-foreground">
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
