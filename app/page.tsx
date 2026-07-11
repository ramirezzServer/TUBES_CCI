import { MovieSection } from "@/components/movie-section";

export default function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-14 px-4 py-10 md:px-8 md:py-14 lg:px-12">
      <MovieSection title="Trending Minggu Ini" kind="trending" />
      <MovieSection title="Populer" kind="popular" />
    </div>
  );
}
