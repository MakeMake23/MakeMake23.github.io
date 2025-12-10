import { getDictionary, Locale } from "@/dictionaries";
import Warning from "./Warning";

interface Props {
  lang: Locale;
  collapsible?: boolean;
}

export default function NotAIGeneratedWarning({
  lang,
  collapsible = true,
}: Props) {
  const dict = getDictionary(lang).blog.posts.not_ai_generated_warning;
  return (
    <Warning locale={lang} collapsible={collapsible}>
      {dict.before_no_generated} <b>{dict.no_generated}</b>.{" "}
      {dict.after_no_generated}
      <br />
      <p className="text-xs">{dict.ps}</p>
    </Warning>
  );
}
