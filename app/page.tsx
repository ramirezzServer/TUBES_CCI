import { MovieSection } from "@/components/movie-section";

export default function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-10 md:px-8">
      <MovieSection title="Trending Minggu Ini" kind="trending" />
      <MovieSection title="Populer" kind="popular" />
    </div>
  );
}
