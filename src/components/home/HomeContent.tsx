"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  Heading,
  Text,
  Button,
  Avatar,
  RevealFx,
  Column,
  Badge,
  Row,
  Line,
} from "@once-ui-system/core";
import { home, about, person } from "@/resources";
import { Mailchimp } from "@/components";

interface HomeContentProps {
  featuredProjectSlot: React.ReactNode;
  blogPostsSlot?: React.ReactNode;
  extraProjectsSlot: React.ReactNode;
  showBlog: boolean;
}

export function HomeContent({
  featuredProjectSlot,
  blogPostsSlot,
  extraProjectsSlot,
  showBlog,
}: HomeContentProps) {
  const t = useTranslations();

  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
      <Column fillWidth horizontal="center" gap="m" style={{ position: "relative" }}>
        <Image
          src="/images/BLogo.png"
          alt=""
          width={480}
          height={480}
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "-20%",
            top: "50%",
            transform: "translateY(-50%)",
            opacity: 0.18,
            pointerEvents: "none",
            zIndex: 0,
            userSelect: "none",
          }}
        />
        <Column maxWidth="s" horizontal="center" align="center" style={{ position: "relative", zIndex: 1 }}>
          {home.featured.display && (
            <RevealFx
              fillWidth
              horizontal="center"
              paddingTop="16"
              paddingBottom="32"
              paddingLeft="12"
            >
              <Badge
                background="brand-alpha-weak"
                paddingX="12"
                paddingY="4"
                onBackground="neutral-strong"
                textVariant="label-default-s"
                arrow={false}
                href={home.featured.href}
              >
                <Row paddingY="2">
                  <Row gap="12" vertical="center">
                    <strong className="ml-4">{t("home.openToWork")}</strong>{" "}
                    <Line background="brand-alpha-strong" vert height="20" />
                    <Text marginRight="4" onBackground="brand-medium">
                      {t("home.viewProjects")}
                    </Text>
                  </Row>
                </Row>
              </Badge>
            </RevealFx>
          )}
          <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="16">
            <Heading wrap="balance" variant="display-strong-l">
              {t("home.headline")}
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="32">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              {t.rich("home.subline", {
                strong: (chunks) => (
                  <Text as="span" size="xl" weight="strong">
                    {chunks}
                  </Text>
                ),
              })}
            </Text>
          </RevealFx>
          <RevealFx paddingTop="12" delay={0.4} horizontal="center" paddingLeft="12">
            <Button
              id="about"
              data-border="rounded"
              href={about.path}
              variant="secondary"
              size="m"
              weight="default"
              arrowIcon
            >
              <Row gap="8" vertical="center" paddingRight="4">
                {about.avatar.display && (
                  <Avatar
                    marginRight="8"
                    style={{ marginLeft: "-0.75rem" }}
                    src={person.avatar}
                    size="m"
                  />
                )}
                {t("home.aboutButton")}
              </Row>
            </Button>
          </RevealFx>
        </Column>
      </Column>

      {featuredProjectSlot}

      {showBlog && (
        <Column fillWidth gap="24" marginBottom="l">
          <Row fillWidth paddingRight="64">
            <Line maxWidth={48} />
          </Row>
          <Row fillWidth gap="24" marginTop="40" s={{ direction: "column" }}>
            <Row flex={1} paddingLeft="l" paddingTop="24">
              <Heading as="h2" variant="display-strong-xs" wrap="balance">
                {t("home.latestBlog")}
              </Heading>
            </Row>
            <Row flex={3} paddingX="20">
              {blogPostsSlot}
            </Row>
          </Row>
          <Row fillWidth paddingLeft="64" horizontal="end">
            <Line maxWidth={48} />
          </Row>
        </Column>
      )}

      {extraProjectsSlot}
      <Mailchimp />
    </Column>
  );
}
