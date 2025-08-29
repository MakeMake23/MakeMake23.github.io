import { getDictionary, Locale } from "@/dictionaries";
import ReviewPageClient from "@/components/ReviewPageClient";

interface ReviewPageProps {
  params: Promise<{
    lang: Locale;
    rating: string;
  }>;
}

export default async function ReviewPage({ params }: ReviewPageProps) {
  const { lang, rating } = await params;
  const dict = await getDictionary(lang);
  const initialRating = parseInt(rating, 10);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <ReviewPageClient initialRating={initialRating} dict={dict} />
    </div>
  );
}
