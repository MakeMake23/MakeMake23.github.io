import { NextRequest, NextResponse } from "next/server";
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ lang: string }> }
) {
  const { lang } = await params;
  const fileName =
    lang === "es"
      ? "andy-ledesma-garcia-cv-es.pdf"
      : "andy-ledesma-garcia-cv.pdf";

  const pdfUrl = new URL(fileName, request.nextUrl.origin);

  try {
    const pdfResponse = await fetch(pdfUrl);

    if (!pdfResponse.ok) {
      throw new Error(`Failed to fetch PDF: ${pdfResponse.statusText}`);
    }

    const fileBuffer = await pdfResponse.arrayBuffer();

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename=${fileName}`,
      },
    });
  } catch (error) {
    console.error("Error serving PDF:", error);
    return new NextResponse("PDF not found", { status: 404 });
  }
}
