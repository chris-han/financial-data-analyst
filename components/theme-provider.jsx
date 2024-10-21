// components/theme-provider.tsx
"use client";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
export function ThemeProvider({ children, ...props }) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
//# sourceMappingURL=theme-provider.jsx.map