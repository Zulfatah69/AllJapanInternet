'use client';

import { AppProvider } from './AppProvider';

export function ClientProviders({ children }: { children: React.ReactNode }) {
    return <AppProvider>{children}</AppProvider>;
}
