export function EmptyState({ message }: { message: string }) {
    return (
        <div
            className="rounded-2xl border border-dashed py-16 px-8 text-center"
            style={{ borderColor: 'var(--border)', color: 'var(--fg-muted)' }}
        >
            <p className="text-lg">{message}</p>
        </div>
    );
}
