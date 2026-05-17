import { cn } from '../../lib/utils';

export function Skeleton({ className }: { className?: string }) {
    return <div className={cn('skeleton rounded-2xl', className)} />;
}

export function ProductGridSkeleton() {
    return (
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-80" />
            ))}
        </div>
    );
}
