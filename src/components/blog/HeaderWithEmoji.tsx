interface Props {
  text: string;
  emoji: string;
}

export default function HeaderWithEmoji({ text, emoji }: Props) {
  return (
    <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
      {text} <span className="text-2xl">{emoji}</span>
    </h2>
  );
}
