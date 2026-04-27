"use client";

import { createContext } from "react";

export type Tokens = {
  background: string;
  card: string;
  hover: string;
  headingColor: string;
  headingSize: string;
  sidePadding: string;
};

export type TokenContextValue = {
  tokens: Tokens;
  setTokens: (next: Partial<Tokens>) => void;
  reset: () => void;
};

export const DEFAULT_TOKENS: Tokens = {
  // Empty means "use CSS defaults from :root/.dark" (do not override)
  background: "",
  card: "",
  hover: "",
  headingColor: "",
  headingSize: "",
  sidePadding: "",
};

export const STORAGE_KEY = "lux-va-design-tokens";

export const DesignTokensContext = createContext<TokenContextValue | null>(null);

export function applyTokensToCSS(tokens: Tokens) {
  const root = document.documentElement;
  // When a token is empty, remove inline override so class-based variables can take effect
  if (tokens.background) root.style.setProperty("--background", tokens.background); else root.style.removeProperty("--background");
  if (tokens.card) root.style.setProperty("--card", tokens.card); else root.style.removeProperty("--card");
  if (tokens.hover) root.style.setProperty("--hover", tokens.hover); else root.style.removeProperty("--hover");
  if (tokens.headingColor) root.style.setProperty("--heading-color", tokens.headingColor); else root.style.removeProperty("--heading-color");
  if (tokens.headingSize) root.style.setProperty("--heading-size", tokens.headingSize); else root.style.removeProperty("--heading-size");
  if (tokens.sidePadding) root.style.setProperty("--side-padding", tokens.sidePadding); else root.style.removeProperty("--side-padding");
}

export function normalizeStoredTokens(tokens: Partial<Tokens>): Partial<Tokens> {
  // Convert legacy values like "var(--background)" to empty so they don't override
  function fix(v?: string): string {
    if (!v) return "";
    if (v.indexOf("var(--") !== -1) return "";
    return v;
  }
  return {
    background: fix(tokens.background),
    card: fix(tokens.card),
    hover: fix(tokens.hover),
    headingColor: fix(tokens.headingColor),
    headingSize: tokens.headingSize ? tokens.headingSize : "",
    sidePadding: tokens.sidePadding ? tokens.sidePadding : "",
  };
}
