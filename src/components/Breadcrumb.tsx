"use client";

import Link from "next/link";
import { generateBreadcrumbSchema } from "@/lib/structured-data";
import { useMemo } from "react";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  // Stable JSON string so the schema only changes when items actually change
  const schemaJson = useMemo(
    () => JSON.stringify(generateBreadcrumbSchema(items)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(items)]
  );

  return (
    <>
      {/* Inline schema — no DOM manipulation, no duplicate scripts */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaJson }} />
      <nav
        aria-label="Breadcrumb"
        className="mb-4 text-sm text-muted-foreground"
      >
        <ol className="flex items-center gap-2">
          {items.map((item, index) => (
            <li key={item.href} className="flex items-center gap-2">
              {index > 0 && <span className="mx-1" aria-hidden="true">/</span>}
              {index === items.length - 1 ? (
                <span className="font-medium text-foreground" aria-current="page">{item.label}</span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:underline text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}


