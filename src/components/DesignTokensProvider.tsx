"use client";

import { useEffect, useMemo, useState } from "react";
import {
  DEFAULT_TOKENS,
  STORAGE_KEY,
  DesignTokensContext,
  applyTokensToCSS,
  normalizeStoredTokens,
  type Tokens,
  type TokenContextValue,
} from "./design-tokens-core";

function loadTokensFromStorage(): Tokens {
  // Guard: localStorage is only available in the browser
  if (typeof window === "undefined") return DEFAULT_TOKENS;
  try {
    localStorage.removeItem("design-theme");
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_TOKENS;
    const parsed = JSON.parse(raw);
    const normalized = normalizeStoredTokens(parsed);
    return { ...DEFAULT_TOKENS, ...normalized } as Tokens;
  } catch {
    return DEFAULT_TOKENS;
  }
}

export function DesignTokensProvider({ children }: { children: React.ReactNode }) {
  // Start with DEFAULT_TOKENS on server; load from storage after mount to avoid hydration mismatch
  const [tokens, setTokensState] = useState<Tokens>(DEFAULT_TOKENS);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only runs in the browser — safe to access localStorage and document
    const stored = loadTokensFromStorage();
    setTokensState(stored);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    // Clean up any inline style overrides from old DesignSystemProvider
    const root = document.documentElement;
    const oldVars = [
      "--color-primary", "--color-secondary", "--color-accent",
      "--color-gold", "--color-gold-light", "--color-gold-dark",
      "--spacing-xs", "--spacing-sm", "--spacing-md", "--spacing-lg", "--spacing-xl",
      "--radius-sm", "--radius-md", "--radius-lg", "--radius-xl",
      "--shadow-gold", "--font-sans", "--font-display",
    ];
    oldVars.forEach(v => root.style.removeProperty(v));

    applyTokensToCSS(tokens);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
    } catch {
      void 0;
    }
  }, [tokens, mounted]);

  const api = useMemo<TokenContextValue>(
    () => ({
      tokens,
      setTokens(next) {
        setTokensState((prev) => ({ ...prev, ...next }));
      },
      reset() {
        setTokensState(DEFAULT_TOKENS);
      },
    }),
    [tokens]
  );

  return <DesignTokensContext.Provider value={api}>{children}</DesignTokensContext.Provider>;
}
