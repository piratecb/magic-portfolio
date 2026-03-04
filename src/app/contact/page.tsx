"use client";

import { Column, Heading, Text, Input, Button } from "@once-ui-system/core";
import { person } from "@/resources";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function Contact() {
  const t = useTranslations("contact");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
        setErrorMsg(data.error ?? t("genericError"));
      }
    } catch {
      setStatus("error");
      setErrorMsg(t("networkError"));
    }
  };

  return (
    <Column maxWidth="s" fillWidth gap="l" paddingX="l" paddingY="128">
      <Column gap="8">
        <Heading variant="display-strong-s">{t("heading")}</Heading>
        <Text variant="body-default-l" onBackground="neutral-weak">
          {t("description")}
        </Text>
      </Column>

      {status === "success" ? (
        <Column
          gap="12"
          padding="l"
          radius="l"
          background="surface"
          border="neutral-alpha-weak"
          horizontal="center"
          align="center"
        >
          <Text variant="display-strong-xs" onBackground="brand-medium">✓</Text>
          <Text variant="body-strong-m">{t("successTitle")}</Text>
          <Text variant="body-default-m" onBackground="neutral-weak" align="center">
            {t("successText", { email: person.email })}
          </Text>
          <Button
            variant="secondary"
            size="s"
            onClick={() => setStatus("idle")}
            label={t("anotherMessage")}
          />
        </Column>
      ) : (
        <form onSubmit={handleSubmit}>
          <Column gap="16">
            <Input
              id="name"
              label={t("name")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              id="email"
              label={t("email")}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {/* Message textarea using once-ui styling */}
            <Column gap="8">
              <Text variant="label-default-s" onBackground="neutral-strong">
                {t("message")}
              </Text>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={6}
                placeholder={t("placeholder")}
                style={{
                  width: "100%",
                  padding: "var(--static-space-12) var(--static-space-16)",
                  borderRadius: "var(--radius-m)",
                  border: "1px solid var(--neutral-alpha-medium)",
                  background: "var(--neutral-alpha-weak)",
                  color: "var(--neutral-on-background-strong)",
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--font-size-body-default-m)",
                  lineHeight: "var(--line-height-body-default-m)",
                  resize: "vertical",
                  outline: "none",
                  transition: "border-color 0.2s",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "var(--brand-solid-strong)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "var(--neutral-alpha-medium)";
                }}
              />
            </Column>

            {status === "error" && (
              <Text variant="body-default-s" onBackground="danger-medium">
                {errorMsg}
              </Text>
            )}

            <Button
              type="submit"
              label={status === "loading" ? t("sending") : t("send")}
              disabled={status === "loading"}
              suffixIcon="arrowRight"
            />
          </Column>
        </form>
      )}
    </Column>
  );
}
