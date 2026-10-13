"use client";

import { useId, useState } from "react";

export type FaqItem = { q: string; a: string };

/** Accordion where opening one question closes the others. Clicking the open one closes it. */
export default function FaqList({ items }: { items: FaqItem[] }) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const open = openIndex === i;
        const buttonId = `${baseId}-q-${i}`;
        const panelId = `${baseId}-a-${i}`;

        return (
          <div
            key={item.q}
            className={`rounded-2xl border bg-white px-5 transition-colors duration-200 ${
              open ? "border-brand-purple-border" : "border-brand-border"
            }`}
          >
            <h3 className="text-[16.5px]">
              <button
                type="button"
                id={buttonId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : i)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 py-4 text-left font-semibold text-brand-black"
              >
                {item.q}
                <span
                  aria-hidden="true"
                  className={`shrink-0 text-brand-purple transition-transform duration-200 ${
                    open ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!open}
              className={`grid transition-[grid-template-rows,opacity,visibility] duration-[250ms] ease-out ${
                open ? "visible grid-rows-[1fr] opacity-100" : "invisible grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="pb-4 text-[15.5px] leading-[1.65] text-brand-gray">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
