export default async function CVPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const pdfUrl =
    lang === "es"
      ? "/andy-ledesma-garcia-cv-es.pdf"
      : "/andy-ledesma-garcia-cv.pdf";
  return (
    <div className="w-full h-screen">
      <iframe src={pdfUrl} width="100%" height="100%" className="border-none" />
    </div>
  );
}
