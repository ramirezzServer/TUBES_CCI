interface MovieGridErrorProps {
  message: string;
}

export function MovieGridError({ message }: MovieGridErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-border bg-muted/40 py-16 text-center">
      <p className="text-sm font-medium text-foreground">{message}</p>
    </div>
  );
}
