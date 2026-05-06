import { NextRequest, NextResponse } from 'next/server';
import { verifyBearerIdTokenFromRequest } from '@/lib/firebase/admin';

const BACKEND_BASE_URL = process.env.REALIZEME_BACKEND_URL?.replace(/\/$/, '');

const FALLBACK_PRODUCTS = [
    {
        product_id: 'fallback-1',
        name: 'Minimal Satin Slip Dress',
        brand: 'Studio Mock',
        price: 68,
        similarity: 0.93,
        image_url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
        product_url: '#',
    },
    {
        product_id: 'fallback-2',
        name: 'Structured Midi Shirt Dress',
        brand: 'Demo Atelier',
        price: 84,
        similarity: 0.88,
        image_url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
        product_url: '#',
    },
    {
        product_id: 'fallback-3',
        name: 'Soft Tailored Blazer Set',
        brand: 'Reference Edit',
        price: 112,
        similarity: 0.84,
        image_url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',
        product_url: '#',
    },
    {
        product_id: 'fallback-4',
        name: 'Draped Evening Gown',
        brand: 'Mock Runway',
        price: 149,
        similarity: 0.79,
        image_url: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
        product_url: '#',
    },
    {
        product_id: 'fallback-5',
        name: 'Relaxed Utility Co-ord',
        brand: 'Prototype Wardrobe',
        price: 96,
        similarity: 0.74,
        image_url: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=800&q=80',
        product_url: '#',
    },
];

async function proxyFindSimilar(file: File) {
    const backendForm = new FormData();
    backendForm.append('file', file);

    const response = await fetch(`${BACKEND_BASE_URL}/find-similar`, {
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
            console.info('Find-similar API authorized for uid:', decoded.uid);
        } catch (authError) {
            return NextResponse.json(
                {
                    error: 'Unauthorized',
                    details: authError instanceof Error ? authError.message : 'Invalid or missing token',
                },
                { status: 401 }
            );
        }

        const formData = await req.formData();
        const file = formData.get('file');

        if (!(file instanceof File)) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            );
        }

        if (BACKEND_BASE_URL) {
            try {
                const proxied = await proxyFindSimilar(file);
                return NextResponse.json({
                    ...proxied,
                    success: proxied.success ?? true,
                });
            } catch (error) {
                console.error('Find similar proxy failed, using fallback:', error);
            }
        }

        return NextResponse.json({
            success: true,
            count: FALLBACK_PRODUCTS.length,
            products: FALLBACK_PRODUCTS,
            message: BACKEND_BASE_URL
                ? 'Recommendation backend was unavailable, so placeholder products are being shown.'
                : 'No recommendation backend is configured yet, so placeholder products are being shown.',
            mode: 'mock',
        });
    } catch (error) {
        console.error('Find similar API error:', error);
        return NextResponse.json(
            {
                error: 'Failed to find similar products',
                details: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}
