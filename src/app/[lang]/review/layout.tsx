import { ReviewProvider } from "@/context/ReviewContext";

export default function ReviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ReviewProvider>{children}</ReviewProvider>;
}
