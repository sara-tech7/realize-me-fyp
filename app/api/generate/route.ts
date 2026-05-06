import { NextRequest, NextResponse } from 'next/server';
import { verifyBearerIdTokenFromRequest } from '@/lib/firebase/admin';

const BACKEND_BASE_URL = process.env.REALIZEME_BACKEND_URL?.replace(/\/$/, '');

function toDataUrl(bytes: ArrayBuffer, mimeType: string) {
    const base64 = Buffer.from(bytes).toString('base64');
    return `data:${mimeType};base64,${base64}`;
}

async function parseSketchRequest(req: NextRequest) {
    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('multipart/form-data')) {
        const formData = await req.formData();
        const file = formData.get('file');

        if (!(file instanceof File)) {
            return { error: 'No file provided' } as const;
        }

        const arrayBuffer = await file.arrayBuffer();

        return {
            file,
            dataUrl: toDataUrl(arrayBuffer, file.type || 'image/png'),
        } as const;
    }

    const body = await req.json();

    if (!body?.sketch || typeof body.sketch !== 'string') {
        return { error: 'Missing or invalid sketch field' } as const;
    }

    return {
        dataUrl: body.sketch,
    } as const;
}

async function proxyGeneration(file: File) {
    const backendForm = new FormData();
    backendForm.append('file', file);

    const response = await fetch(`${BACKEND_BASE_URL}/generate-image`, {
        method: 'POST',
        body: backendForm,
    });

    if (!response.ok) {
        throw new Error(`Backend error: ${response.status}`);
    }

    return response.json();
}

export async function POST(req: NextRequest) {
    try {
        try {
            const decoded = await verifyBearerIdTokenFromRequest(req);
            console.info('Generate API authorized for uid:', decoded.uid);
        } catch (authError) {
            return NextResponse.json(
                {
                    error: 'Unauthorized',
                    details: authError instanceof Error ? authError.message : 'Invalid or missing token',
                },
                { status: 401 }
            );
        }

        const parsedRequest = await parseSketchRequest(req);

        if ('error' in parsedRequest) {
            return NextResponse.json(
                { error: parsedRequest.error },
                { status: 400 }
            );
        }

        if (BACKEND_BASE_URL && parsedRequest.file) {
            try {
                const proxied = await proxyGeneration(parsedRequest.file);
                const generatedImage =
                    proxied.generatedImage ||
                    (typeof proxied.image_base64 === 'string'
                        ? `data:image/png;base64,${proxied.image_base64}`
                        : null);

                if (generatedImage) {
                    return NextResponse.json({
                        ...proxied,
                        generatedImage,
                        success: proxied.success ?? true,
                    });
                }
            } catch (error) {
                console.error('Generation proxy failed, using mock fallback:', error);
            }
        }

        await new Promise((resolve) => setTimeout(resolve, 500));

        return NextResponse.json({
            generatedImage: parsedRequest.dataUrl,
            success: true,
            message: BACKEND_BASE_URL
                ? 'We couldn’t complete the render on our servers just now, so your original sketch appears in both panels. You can still compare layout and continue your workflow.'
                : 'Preview: your sketch is shown in both panels until the full render pipeline is connected.',
            mode: 'mock',
        });
    } catch (error) {
        console.error('Generation API error:', error);
        return NextResponse.json(
            {
                error: 'Failed to generate image',
                details: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({
        status: 'ok',
        message: 'Generate API is running',
        mode: BACKEND_BASE_URL ? 'proxy' : 'mock',
        backendConfigured: Boolean(BACKEND_BASE_URL),
    });
}