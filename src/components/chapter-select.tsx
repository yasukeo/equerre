import type { ComponentProps } from "react";
import { SelectField } from "@/components/ui/field";
import type { ChapterOptions } from "@/lib/chapters";

type Props = Omit<ComponentProps<typeof SelectField>, "children"> & {
  levels: ChapterOptions;
  placeholder?: string;
  /** A choice of no chapter at all, which she may pick. */
  emptyLabel?: string;
};

/** A native select of chapters under their level. */
export function ChapterSelect({ levels, placeholder, emptyLabel, ...props }: Props) {
  return (
    <SelectField {...props}>
      {emptyLabel ? <option value="">{emptyLabel}</option> : null}
      {placeholder ? (
        <option value="" disabled>
          {placeholder}
        </option>
      ) : null}
      {levels.map((level) => (
        <optgroup key={level.label} label={level.label}>
          {level.chapters.map((chapter) => (
            <option key={chapter.id} value={chapter.id}>
              {chapter.title}
            </option>
          ))}
        </optgroup>
      ))}
    </SelectField>
  );
}
