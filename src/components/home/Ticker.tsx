import { Container } from "@/components/ui-editorial/Container";
import { memberships } from "@/content/memberships";
import { profile } from "@/content/profile";

export function Ticker() {
  const items = [
    {
      label: profile.currentPosition.role,
      value: profile.currentPosition.organization,
    },
    ...memberships.map((m) => ({
      label: m.shortName ?? m.organization,
      value: m.role,
    })),
  ];

  return (
    <section
      aria-label="Professional status"
      className="border-b border-rule bg-paper-deep/40"
    >
      <Container size="wide">
        <ul className="flex flex-col sm:flex-row sm:items-stretch divide-y sm:divide-y-0 sm:divide-x divide-rule">
          {items.map((item, idx) => (
            <li
              key={idx}
              className="flex-1 py-3 sm:py-4 px-0 sm:px-6 first:sm:pl-0 flex flex-col sm:flex-row sm:items-baseline sm:gap-3"
            >
              <span className="editorial-eyebrow">{item.label}</span>
              <span className="text-sm text-ink-soft font-medium">{item.value}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
