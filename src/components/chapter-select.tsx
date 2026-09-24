import type { ComponentProps } from "react";
import { SelectField } from "@/components/ui/field";
import type { ChapterOptions } from "@/lib/chapters";

type Props = Omit<ComponentProps<typeof SelectField>, "children"> & {
  levels: ChapterOptions;
  placeholder?: string;
};

/** A native select of chapters under their level. */
export function ChapterSelect({ levels, placeholder, ...props }: Props) {
  return (
    <SelectField {...props}>
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
