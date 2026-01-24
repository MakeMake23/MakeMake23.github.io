import HeaderWithEmoji from "@/components/blog/HeaderWithEmoji";
import NotAIGeneratedWarning from "@/components/blog/NotAIGeneratedWarning";
import PostContainer from "@/components/blog/PostContainer";
import { getDictionary, Locale } from "@/dictionaries";

interface BlogPostProps {
  lang: Locale;
}

export default function NoMoreScamsPost({ lang }: BlogPostProps) {
  const dict = getDictionary(lang);
  const postDict = dict.blog.posts.no_more_scams;
  return (
    <PostContainer>
      <NotAIGeneratedWarning lang={lang} collapsible={true} />

      <HeaderWithEmoji text="¡NO MÁS ESTAFAS!" emoji="🚨" />
    </PostContainer>
  );
}
