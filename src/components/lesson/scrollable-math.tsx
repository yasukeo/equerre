"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A displayed formula. One too wide for the screen scrolls on its own rather than widening the
 * page; it then takes the keyboard focus, so it can be scrolled with the arrow keys (WCAG
 * 2.1.1). One that fits stays out of the tab order.
 */
export function ScrollableMath({ html }: { html: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [overflows, setOverflows] = useState(false);

  useEffect(() => {
    const element = box.current;
    if (!element) return;
    const measure = () => setOverflows(element.scrollWidth > element.clientWidth + 1);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [html]);

  return (
    <div
      ref={box}
      className="lecon-math lecon-math-bloc"
      tabIndex={overflows ? 0 : undefined}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
