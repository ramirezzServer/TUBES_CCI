import { MovieDetailView } from "@/components/movie-detail-view";

export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <MovieDetailView id={id} />;
}
