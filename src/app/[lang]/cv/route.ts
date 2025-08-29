import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";
import { cwd } from "process";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ lang: string }> }
) {
  const { lang } = await params;
  const fileName =
    lang === "es"
      ? "andy-ledesma-garcia-cv-es.pdf"
      : "andy-ledesma-garcia-cv.pdf";

  const filePath = join(cwd(), "public", fileName);

  try {
    const fileBuffer = readFileSync(filePath);

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
