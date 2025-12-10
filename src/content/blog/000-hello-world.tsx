import CodeBlock from "@/components/blog/CodeBlock";
import EmphasisParagraph from "@/components/blog/EmphasisParagraph";
import HeaderWithEmoji from "@/components/blog/HeaderWithEmoji";
import NotAIGeneratedWarning from "@/components/blog/NotAIGeneratedWarning";
import Paragraph from "@/components/blog/Paragraph";
import PostContainer from "@/components/blog/PostContainer";
import TextOnlyLink from "@/components/TextOnlyLink";
import { getDictionary, Locale } from "@/dictionaries";

interface BlogPostProps {
  lang: Locale;
}

export default function HelloWorldPost({ lang }: BlogPostProps) {
  const dict = getDictionary(lang);
  const postDict = dict.blog.posts.hello_world;
  return (
    <PostContainer>
      <NotAIGeneratedWarning lang={lang} collapsible={false} />

      <HeaderWithEmoji text={postDict.genesis.header} emoji="🌱" />
      <Paragraph>
        {postDict.genesis.first_hello_world.before_hello_world}{" "}
        <i>{postDict.genesis.hello_world}</i>{" "}
        {postDict.genesis.first_hello_world.after_hello_world}:
      </Paragraph>

      <CodeBlock language="c++">{`cout << "Hello World!" << endl;`}</CodeBlock>

      <Paragraph>
        {postDict.genesis.past_welcome}{" "}
        <TextOnlyLink
          href="https://www.codeblocks.org"
          isInNewTab={true}
          text="CodeBlocks IDE"
        />
        .
      </Paragraph>

      <Paragraph>
        {postDict.genesis.today_hello_world.before_hello_world}{" "}
        <i>{postDict.genesis.hello_world}</i>{" "}
        {postDict.genesis.today_hello_world.after_hello_world}{" "}
      </Paragraph>

      <Paragraph>{postDict.genesis.me_and_my_blog}</Paragraph>

      <HeaderWithEmoji text={postDict.my_promise.header} emoji="🤞" />
      <Paragraph>{postDict.my_promise.text}</Paragraph>

      <HeaderWithEmoji text={postDict.thousand_thanks.header} emoji="🙏" />
      <Paragraph>{postDict.thousand_thanks.no_promotion}</Paragraph>

      <EmphasisParagraph>
        {postDict.thousand_thanks.very_much}
      </EmphasisParagraph>
    </PostContainer>
  );
}
