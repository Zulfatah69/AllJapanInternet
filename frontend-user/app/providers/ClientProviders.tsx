'use client';

import type { Settings } from '../types/api';
import { AppProvider } from './AppProvider';

export function ClientProviders({
    children,
    initialSettings,
}: {
    children: React.ReactNode;
    initialSettings?: Settings | null;
}) {
    return <AppProvider initialSettings={initialSettings}>{children}</AppProvider>;
}
