"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, SelectField } from "@/components/ui/field";
import { FormMessage } from "@/components/ui/form-message";
import { fieldError } from "@/lib/form-state";
import type { PostCategory } from "@/lib/posts/queries";
import { sendFields, useFormAction } from "@/lib/use-form-action";
import { createPost } from "./actions";

/** A new post, as a draft: its title and theme; the editor opens on it. */
export function NewPostForm({ categories }: { categories: PostCategory[] }) {
  const t = useTranslations("postsAdmin");
  const tCategory = useTranslations("blog.category");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<string>(categories[0] ?? "methode");
  const [state, action, pending] = useFormAction(createPost, t("errors.unknown"));

  return (
    <form
      className="grid gap-4"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        sendFields(action, { title, category });
      }}
    >
      <Field
        id="new-post-title"
        label={t("fieldTitle")}
        maxLength={140}
        autoComplete="off"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        error={fieldError(state, "title")}
      />
      <SelectField
        id="new-post-category"
        label={t("fieldCategory")}
        value={category}
        onChange={(event) => setCategory(event.target.value)}
        error={fieldError(state, "category")}
      >
        {categories.map((value) => (
          <option key={value} value={value}>
            {tCategory(value)}
          </option>
        ))}
      </SelectField>
      <FormMessage state={state} />
      <Button type="submit" disabled={pending} className="justify-self-start">
        {pending ? t("creating") : t("create")}
      </Button>
    </form>
  );
}
