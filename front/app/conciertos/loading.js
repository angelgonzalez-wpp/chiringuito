import LoadingState from '@/components/ui/LoadingState';

export default function Loading() {
  return (
    <div className="min-h-screen bg-cream pt-24">
      <LoadingState message="Cargando conciertos..." />
    </div>
  );
}
