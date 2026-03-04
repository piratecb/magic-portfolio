"use client";

import React from "react";
import { useTranslations } from "next-intl";
import {
  Avatar,
  Button,
  Column,
  Heading,
  Icon,
  IconButton,
  Media,
  Tag,
  Text,
  Row,
} from "@once-ui-system/core";
import { about, person, social } from "@/resources";
import TableOfContents from "@/components/about/TableOfContents";
import styles from "@/components/about/about.module.scss";

export function AboutContent() {
  const t = useTranslations("about");

  const structure = [
    {
      title: t("introTitle"),
      display: about.intro.display,
      items: [],
    },
    {
      title: t("workTitle"),
      display: about.work.display,
      items: about.work.experiences.map((e) => e.company),
    },
    {
      title: t("studiesTitle"),
      display: about.studies.display,
      items: about.studies.institutions.map((i) => i.name),
    },
    {
      title: t("technicalTitle"),
      display: about.technical.display,
      items: about.technical.skills.map((s) => s.title),
    },
  ];

  return (
    <Column maxWidth="m">
      {about.tableOfContent.display && (
        <Column
          left="0"
          style={{ top: "50%", transform: "translateY(-50%)" }}
          position="fixed"
          paddingLeft="24"
          gap="32"
          s={{ hide: true }}
        >
          <TableOfContents structure={structure} about={about} />
        </Column>
      )}
      <Row fillWidth s={{ direction: "column" }} horizontal="center">
        {about.avatar.display && (
          <Column
            className={styles.avatar}
            top="64"
            fitHeight
            position="sticky"
            s={{ position: "relative", style: { top: "auto" } }}
            xs={{ style: { top: "auto" } }}
            minWidth="160"
            paddingX="l"
            paddingBottom="xl"
            gap="m"
            flex={3}
            horizontal="center"
          >
            <Avatar src={person.avatar} size="xl" />
            <Row gap="8" vertical="center">
              <Icon onBackground="accent-weak" name="globe" />
              {person.location}
            </Row>
            {person.languages && person.languages.length > 0 && (
              <Row wrap gap="8">
                {person.languages.map((language, index) => (
                  <Tag key={index} size="l">
                    {language}
                  </Tag>
                ))}
              </Row>
            )}
          </Column>
        )}

        <Column className={styles.blockAlign} flex={9} maxWidth={40}>
          <Column
            id={t("introTitle")}
            fillWidth
            minHeight="160"
            vertical="center"
            marginBottom="32"
          >
            {about.calendar.display && (
              <Row
                fitWidth
                border="brand-alpha-medium"
                background="brand-alpha-weak"
                radius="full"
                padding="4"
                gap="8"
                marginBottom="m"
                vertical="center"
                className={styles.blockAlign}
                style={{ backdropFilter: "blur(var(--static-space-1))" }}
              >
                <Icon paddingLeft="12" name="calendar" onBackground="brand-weak" />
                <Row paddingX="8">{t("scheduleCall")}</Row>
                <IconButton
                  href={about.calendar.link}
                  data-border="rounded"
                  variant="secondary"
                  icon="chevronRight"
                />
              </Row>
            )}
            <Heading className={styles.textAlign} variant="display-strong-xl">
              {person.name}
            </Heading>
            <Text
              className={styles.textAlign}
              variant="display-default-xs"
              onBackground="neutral-weak"
            >
              {person.role}
            </Text>
            {social.length > 0 && (
              <Row
                className={styles.blockAlign}
                paddingTop="20"
                paddingBottom="8"
                gap="8"
                wrap
                horizontal="center"
                fitWidth
                data-border="rounded"
              >
                {social
                  .filter((item) => item.essential)
                  .map(
                    (item) =>
                      item.link && (
                        <React.Fragment key={item.name}>
                          <Row s={{ hide: true }}>
                            <Button
                              href={item.link}
                              prefixIcon={item.icon}
                              label={item.name}
                              size="s"
                              weight="default"
                              variant="secondary"
                            />
                          </Row>
                          <Row hide s={{ hide: false }}>
                            <IconButton
                              size="l"
                              href={item.link}
                              icon={item.icon}
                              variant="secondary"
                            />
                          </Row>
                        </React.Fragment>
                      ),
                  )}
              </Row>
            )}
          </Column>

          {about.intro.display && (
            <Column textVariant="body-default-l" fillWidth gap="m" marginBottom="xl">
              {t("introText")}
            </Column>
          )}

          {about.work.display && (
            <>
              <Heading
                as="h2"
                id={t("workTitle")}
                variant="display-strong-s"
                marginBottom="m"
              >
                {t("workTitle")}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.work.experiences.map((experience, index) => {
                  const expT = t.raw(`experiences.${experience.company}`) as Record<string, string> | undefined;
                  const role = expT?.role ?? experience.role;
                  const achievements = expT
                    ? Object.keys(expT)
                        .filter((k) => k.startsWith("achievement"))
                        .sort()
                        .map((k) => expT[k])
                    : experience.achievements.map(String);

                  return (
                    <Column key={`${experience.company}-${index}`} fillWidth>
                      <Row fillWidth horizontal="between" vertical="end" marginBottom="4">
                        <Text id={experience.company} variant="heading-strong-l">
                          {experience.company}
                        </Text>
                        <Text variant="heading-default-xs" onBackground="neutral-weak">
                          {experience.timeframe}
                        </Text>
                      </Row>
                      <Text
                        variant="body-default-s"
                        onBackground="brand-weak"
                        marginBottom="m"
                      >
                        {role}
                      </Text>
                      <Column as="ul" gap="16">
                        {achievements.map((achievement, i) => (
                          <Text
                            as="li"
                            variant="body-default-m"
                            key={`${experience.company}-${i}`}
                          >
                            {achievement}
                          </Text>
                        ))}
                      </Column>
                      {experience.images && experience.images.length > 0 && (
                        <Row fillWidth paddingTop="m" paddingLeft="40" gap="12" wrap>
                          {experience.images.map((image, i) => (
                            <Row
                              key={i}
                              border="neutral-medium"
                              radius="m"
                              minWidth={image.width}
                              height={image.height}
                            >
                              <Media
                                enlarge
                                radius="m"
                                sizes={image.width.toString()}
                                alt={image.alt}
                                src={image.src}
                              />
                            </Row>
                          ))}
                        </Row>
                      )}
                    </Column>
                  );
                })}
              </Column>
            </>
          )}

          {about.studies.display && (
            <>
              <Heading
                as="h2"
                id={t("studiesTitle")}
                variant="display-strong-s"
                marginBottom="m"
              >
                {t("studiesTitle")}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.studies.institutions.map((institution, index) => {
                  const desc = t.raw(`institutions.${institution.name}`) as string | undefined;
                  return (
                    <Column key={`${institution.name}-${index}`} fillWidth gap="4">
                      <Text id={institution.name} variant="heading-strong-l">
                        {institution.name}
                      </Text>
                      <Text variant="heading-default-xs" onBackground="neutral-weak">
                        {desc ?? String(institution.description)}
                      </Text>
                    </Column>
                  );
                })}
              </Column>
            </>
          )}

          {about.technical.display && (
            <>
              <Heading
                as="h2"
                id={t("technicalTitle")}
                variant="display-strong-s"
                marginBottom="40"
              >
                {t("technicalTitle")}
              </Heading>
              <Column fillWidth gap="l">
                {about.technical.skills.map((skill, index) => {
                  const skillDesc = t.raw(`skills.${skill.title}.description`) as string | undefined;
                  return (
                    <Column key={`${skill.title}-${index}`} fillWidth gap="4">
                      <Text id={skill.title} variant="heading-strong-l">
                        {skill.title}
                      </Text>
                      <Text variant="body-default-m" onBackground="neutral-weak">
                        {skillDesc ?? String(skill.description)}
                      </Text>
                      {skill.tags && skill.tags.length > 0 && (
                        <Row wrap gap="8" paddingTop="8">
                          {skill.tags.map((tag, tagIndex) => (
                            <Tag
                              key={`${skill.title}-${tagIndex}`}
                              size="l"
                              prefixIcon={tag.icon}
                            >
                              {tag.name}
                            </Tag>
                          ))}
                        </Row>
                      )}
                      {skill.images && skill.images.length > 0 && (
                        <Row fillWidth paddingTop="m" gap="12" wrap>
                          {skill.images.map((image, i) => (
                            <Row
                              key={i}
                              border="neutral-medium"
                              radius="m"
                              minWidth={image.width}
                              height={image.height}
                            >
                              <Media
                                enlarge
                                radius="m"
                                sizes={image.width.toString()}
                                alt={image.alt}
                                src={image.src}
                              />
                            </Row>
                          ))}
                        </Row>
                      )}
                    </Column>
                  );
                })}
              </Column>
            </>
          )}
        </Column>
      </Row>
    </Column>
  );
}
