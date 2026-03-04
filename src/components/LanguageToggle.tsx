"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ToggleButton } from "@once-ui-system/core";

function getLocaleCookie(): string {
  if (typeof document === "undefined") return "en";
  const match = document.cookie.match(/(?:^|; )locale=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : "en";
}

export const LanguageToggle: React.FC = () => {
  const [locale, setLocale] = useState("en");
  const router = useRouter();

  useEffect(() => {
    setLocale(getLocaleCookie());
  }, []);

  const toggle = () => {
    const next = locale === "en" ? "pt" : "en";
    document.cookie = `locale=${next}; path=/; max-age=31536000; SameSite=Lax`;
    setLocale(next);
    router.refresh();
  };

  return (
    <ToggleButton
      label={locale === "en" ? "PT" : "EN"}
      onClick={toggle}
      aria-label="Switch language"
    />
  );
};
