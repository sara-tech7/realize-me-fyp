// TODO: proxy to Python

// app/api/generate/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { sketch } = await req.json();

        if (!sketch || typeof sketch !== 'string') {
            return NextResponse.json(
                { error: 'Missing or invalid sketch field' },
                { status: 400 }
            );
        }

        // TODO: Replace with Python backend call
        console.log('Received sketch for generation (mock mode)');

        await new Promise(resolve => setTimeout(resolve, 1000));

        return NextResponse.json({
            generatedImage: sketch,
            success: true,
            message: 'Mock generation complete. Replace with real Python backend.',
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
        mode: 'mock',
    });
}