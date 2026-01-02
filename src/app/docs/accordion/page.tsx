import {
  AccordionContent,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { CodeBlock } from "@/components/docs/code-block"
import {
  BankCardIcon,
  CustomerServiceIcon,
  PriceTagIcon,
  UserAddIcon,
} from "@/icons"

const faqItems = [
  {
    value: "free",
    icon: PriceTagIcon,
    question: "Is this free to try?",
    answer:
      "Yes. You can explore the core features without paying. If you hit a paid feature, we’ll clearly label it before you upgrade.",
  },
  {
    value: "plan",
    icon: BankCardIcon,
    question: "Can I change my plan later?",
    answer:
      "Anytime. Upgrades apply immediately, and downgrades take effect at the end of your current billing period so you don’t lose access mid-cycle.",
  },
  {
    value: "invite",
    icon: UserAddIcon,
    question: "How do I invite teammates?",
    answer:
      "Go to Settings → Team and send an invite by email. You can choose their role, and you can remove access whenever you need.",
  },
  {
    value: "help",
    icon: CustomerServiceIcon,
    question: "Where can I get help if I’m stuck?",
    answer:
      "Open the help menu to search guides or message support. Sharing a screenshot or link helps us troubleshoot faster.",
  },
]

export default function AccordionDocsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-40)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Accordion</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            Reveals supporting info inline
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-10)]">
        <CodeBlock
          code={`import {
  AccordionRoot,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

<AccordionRoot type="single" defaultValue={["item-1"]}>
  <AccordionItem value="item-1" variant="list">
    <AccordionTrigger icon={<PriceTagIcon className="size-4" />}>
      Question
    </AccordionTrigger>
    <AccordionContent>Answer</AccordionContent>
  </AccordionItem>
</AccordionRoot>

<AccordionRoot multiple defaultValue={["item-1", "item-2"]}>
  <AccordionItem value="item-1" variant="list">
    <AccordionTrigger>Question</AccordionTrigger>
    <AccordionContent>Answer</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2" variant="list">
    <AccordionTrigger>Another question</AccordionTrigger>
    <AccordionContent>Another answer</AccordionContent>
  </AccordionItem>
</AccordionRoot>`}
        />
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Styles</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">List</p>
            </div>
            <div className="w-full max-w-[420px]">
              <AccordionRoot type="single" defaultValue={["free"]}>
                {faqItems.map((item) => (
                  <AccordionItem key={item.value} value={item.value} variant="list">
                    <AccordionTrigger icon={<item.icon className="size-4" />}>
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </AccordionRoot>
            </div>
          </div>

          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Card</p>
            </div>
            <div className="w-full max-w-[420px]">
              <AccordionRoot
                type="single"
                defaultValue={["free"]}
                className="flex flex-col gap-[2px]"
              >
                {faqItems.map((item) => (
                  <AccordionItem key={item.value} value={item.value} variant="card">
                    <AccordionTrigger icon={<item.icon className="size-4" />}>
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </AccordionRoot>
            </div>
          </div>

          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">List (no icon)</p>
            </div>
            <div className="w-full max-w-[420px]">
              <AccordionRoot type="single" defaultValue={["free"]}>
                {faqItems.map((item) => (
                  <AccordionItem
                    key={item.value}
                    value={item.value}
                    variant="list"
                    withIcon={false}
                  >
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </AccordionRoot>
            </div>
          </div>

          <div className="flex flex-col gap-[var(--space-10)] py-[var(--space-24)] md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Card (no icon)</p>
            </div>
            <div className="w-full max-w-[420px]">
              <AccordionRoot
                type="single"
                defaultValue={["free"]}
                className="flex flex-col gap-[2px]"
              >
                {faqItems.map((item) => (
                  <AccordionItem
                    key={item.value}
                    value={item.value}
                    variant="card"
                    withIcon={false}
                  >
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </AccordionRoot>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Behavior</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Single open</p>
            </div>
            <div className="w-full max-w-[420px]">
              <AccordionRoot type="single" defaultValue={["free"]}>
                {faqItems.map((item) => (
                  <AccordionItem key={item.value} value={item.value} variant="list">
                    <AccordionTrigger icon={<item.icon className="size-4" />}>
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </AccordionRoot>
            </div>
          </div>

          <div className="flex flex-col gap-[var(--space-10)] py-[var(--space-24)] md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Multiple open</p>
            </div>
            <div className="w-full max-w-[420px]">
              <AccordionRoot multiple defaultValue={["free", "plan"]}>
                {faqItems.map((item) => (
                  <AccordionItem key={item.value} value={item.value} variant="list">
                    <AccordionTrigger icon={<item.icon className="size-4" />}>
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </AccordionRoot>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
