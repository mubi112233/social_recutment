import { createContext, useContext } from "react";

type Language = "en" | "de";

type LanguageProviderState = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageProviderState | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (context === undefined)
    throw new Error("useLanguage must be used within a LanguageProvider");

  return context;
};

export { LanguageContext };
export type { Language, LanguageProviderState };
