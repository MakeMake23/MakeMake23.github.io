import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET(
  request: NextRequest,
  { params }: { params: { lang: string } }
) {
  // Awaiting params as shown in layout.tsx to correctly get the dynamic route parameter.
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const cvFileName = lang === 'es' ? 'andy-ledesma-garcia-cv-es.pdf' : 'andy-ledesma-garcia-cv.pdf';
  const filePath = path.resolve('.', `public/${cvFileName}`);

  try {
    const fileBuffer = await fs.readFile(filePath);
    const headers = new Headers();
    headers.set('Content-Type', 'application/pdf');
    headers.set('Content-Disposition', `inline; filename="${cvFileName}"`);
    return new NextResponse(fileBuffer, { status: 200, headers });
  } catch (error) {
    console.error(error);
    return new NextResponse('File not found', { status: 404 });
  }
}
