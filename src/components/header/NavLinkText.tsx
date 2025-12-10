interface Props {
  hasCustomBgColor: boolean;
  value: string;
}

export default function NavLinkText({ hasCustomBgColor, value }: Props) {
  return (
    <span
      className={`font-medium ${
        hasCustomBgColor ? "text-white" : "text-gray-900 dark:text-white"
      }`}
    >
      {value}
    </span>
  );
}
