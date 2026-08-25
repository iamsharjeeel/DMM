import type { ReactNode } from "react";
import Link from "next/link";
import { compliance } from "@/config/compliance";
import { legal, type LegalBlock, type LegalDocument } from "@/content/legal";
import { Container } from "@/components/ui/Container";
import { AccentRule } from "@/components/ui/AccentRule";

type LegalKey = keyof typeof legal;

const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;

function renderLinkedText(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  const pattern = new RegExp(linkPattern.source, "g");

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const label = match[1];
    const href = match[2];
    const key = `${href}-${match.index}`;
    if (href.startsWith("/")) {
      nodes.push(
        <Link
          key={key}
          href={href}
          className="text-blue underline underline-offset-4 hover:text-blue-hover"
        >
          {label}
        </Link>,
      );
    } else {
      nodes.push(
        <a
          key={key}
          href={href}
          className="text-blue underline underline-offset-4 hover:text-blue-hover"
        >
          {label}
        </a>,
      );
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

function LegalBlockView({ block }: { block: Exclude<LegalBlock, { type: "contact" }> }) {
  if (block.type === "p") {
    return <p>{renderLinkedText(block.text)}</p>;
  }

  if (block.type === "ul") {
    return (
      <ul className="list-disc space-y-2 pl-5">
        {block.items.map((item) => (
          <li key={item}>{renderLinkedText(item)}</li>
        ))}
      </ul>
    );
  }

  return (
    <dl className="space-y-3">
      {block.items.map((item) => (
        <div key={item.term}>
          <dt className="font-medium text-ink">{item.term}</dt>
          <dd className="mt-1">{renderLinkedText(item.definition)}</dd>
        </div>
      ))}
    </dl>
  );
}

function LegalContact() {
  return (
    <address className="not-italic">
      <p className="font-medium text-ink">{compliance.legalName}</p>
      <p className="mt-3">
        Email:{" "}
        <a
          href={compliance.emailHref}
          className="text-blue underline underline-offset-4 hover:text-blue-hover"
        >
          {compliance.email}
        </a>
      </p>
      <p className="mt-2">
        Phone:{" "}
        <a
          href={compliance.phoneHref}
          className="text-blue underline underline-offset-4 hover:text-blue-hover"
        >
          {compliance.phone}
        </a>
      </p>
      <p className="mt-2">
        Website:{" "}
        <a
          href={compliance.website}
          className="text-blue underline underline-offset-4 hover:text-blue-hover"
        >
          {compliance.website}
        </a>
      </p>
    </address>
  );
}

function LegalDocumentView({ page }: { page: LegalDocument }) {
  return (
    <article className="bg-ivory">
      <Container width="narrow" className="py-16 lg:py-24">
        <p className="eyebrow text-blue">Effective Date: {page.effectiveDate}</p>
        <AccentRule className="mt-5" />
        <h1 className="display-lg mt-5">{page.title}</h1>
        <p className="mt-6 text-ink-soft">
          Program Operator: {page.programOperator}
        </p>
        {page.programName ? (
          <p className="mt-2 text-ink-soft">Program Name: {page.programName}</p>
        ) : null}
        {page.intro ? (
          <p className="mt-6 text-lg text-ink-soft">{page.intro}</p>
        ) : null}
        <div className="mt-12 space-y-10">
          {page.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-[1.7rem] leading-tight">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4 text-ink-soft">
                {section.blocks.map((block, index) =>
                  block.type === "contact" ? (
                    <LegalContact key={`${section.heading}-contact`} />
                  ) : (
                    <LegalBlockView
                      key={`${section.heading}-${index}`}
                      block={block}
                    />
                  ),
                )}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </article>
  );
}

export function LegalPage({ kind }: { kind: LegalKey }) {
  return <LegalDocumentView page={legal[kind]} />;
}
