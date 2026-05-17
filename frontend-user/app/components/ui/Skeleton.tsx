import { cn } from '../../lib/utils';

export function Skeleton({ className }: { className?: string }) {
    return <div className={cn('skeleton rounded-2xl', className)} />;
}

export function ProductGridSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-80" />
            ))}
        </div>
    );
}
