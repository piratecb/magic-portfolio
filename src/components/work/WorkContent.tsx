"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Column, Heading } from "@once-ui-system/core";

interface WorkContentProps {
  projectsSlot: React.ReactNode;
}

export function WorkContent({ projectsSlot }: WorkContentProps) {
  const t = useTranslations("work");

  return (
    <Column maxWidth="m" paddingTop="24">
      <Heading marginBottom="l" variant="heading-strong-xl" align="center">
        {t("heading")}
      </Heading>
      {projectsSlot}
    </Column>
  );
}
