'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Info, Loader, ShoppingBag } from 'lucide-react';

interface Product {
    product_id: string;
    name: string;
    brand: string;
    price: number;
    similarity: number;
    image_url: string;
    product_url: string;
}

export default function ResultsPage() {
    const router = useRouter();
    const [sketchImage, setSketchImage] = useState('');
    const [generatedImage, setGeneratedImage] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [notice, setNotice] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSearching, setIsSearching] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    useEffect(() => {
        const sketch = sessionStorage.getItem('realizeme:sketchImage');
        const generated = sessionStorage.getItem('realizeme:generatedImage');
        const generateNotice = sessionStorage.getItem('realizeme:generateNotice');

        if (!sketch || !generated) {
            router.push('/designer');
            return;
        }

        setSketchImage(sketch);
        setGeneratedImage(generated);
        setNotice(generateNotice || '');
        setIsLoading(false);
    }, [router]);

    const handleFindSimilar = async () => {
        if (!generatedImage || isSearching) {
            return;
        }

        setIsSearching(true);

        try {
            const base64Data = generatedImage.split(',')[1];

            if (!base64Data) {
                throw new Error('Generated image is not available for similarity search');
            }

            const binaryString = atob(base64Data);
            const bytes = new Uint8Array(binaryString.length);

            for (let i = 0; i < binaryString.length; i += 1) {
                bytes[i] = binaryString.charCodeAt(i);
            }

            const formData = new FormData();
            formData.append('file', new Blob([bytes], { type: 'image/png' }), 'generated.png');

            const response = await fetch('/api/find-similar', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.error || 'Failed to find similar products');
            }

            setProducts(Array.isArray(data.products) ? data.products : []);
            setHasSearched(true);

            if (data.message) {
                setNotice(data.message);
            }
        } catch (error) {
            console.error('Error finding similar products:', error);
            alert(error instanceof Error ? error.message : 'Error finding similar products');
        } finally {
            setIsSearching(false);
        }
    };

    const downloadImage = (dataUrl: string, filename: string) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDownloadBoth = () => {
        downloadImage(sketchImage, 'my-sketch.png');
        setTimeout(() => downloadImage(generatedImage, 'ai-generated-design.png'), 100);
    };

    const handleStartOver = () => {
        sessionStorage.removeItem('realizeme:sketchImage');
        sessionStorage.removeItem('realizeme:generatedImage');
        sessionStorage.removeItem('realizeme:sketchSnapshot');
        sessionStorage.removeItem('realizeme:generateNotice');
        router.push('/designer');
    };

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center bg-realize text-realize font-roboto">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading results...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-realize text-realize font-roboto">
            <header className="bg-white/80 backdrop-blur-sm border-b border-realize sticky top-0 z-10 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-realize-gradient flex items-center justify-center text-white font-bold text-lg shadow-realize-xl">
                            R
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-realize font-raleway">RealizeMe</h1>
                            <p className="text-xs text-gray-500">Results</p>
                        </div>
                    </div>

                    <Link href="/designer" className="text-sm text-gray-600 hover:text-gray-900 font-roboto">
                        ← Back to Canvas
                    </Link>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold font-raleway text-realize mb-4">
                        ✨ Your Design is Ready!
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600">
                        Compare your original sketch with the AI-generated design
                    </p>
                </div>

                {notice && (
                    <div className="mb-8 rounded-2xl border border-purple-200 bg-purple-50 px-5 py-4 text-left text-sm text-purple-900 shadow-sm">
                        <div className="flex items-start gap-3">
                            <Info className="mt-0.5 h-5 w-5 shrink-0" />
                            <p>{notice}</p>
                        </div>
                    </div>
                )}

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-white rounded-2xl shadow-realize-xl border border-realize overflow-hidden">
                        <div className="bg-realize-gradient p-6 text-white">
                            <h2 className="text-2xl font-bold font-raleway flex items-center gap-2">
                                ✏️ Your Sketch
                            </h2>
                            <p className="text-sm opacity-80 font-roboto">Original hand-drawn design</p>
                        </div>

                        <div className="p-6">
                            <div className="bg-gray-50 rounded-xl p-6 min-h-[400px] flex items-center justify-center border border-realize">
                                {sketchImage ? (
                                    <img
                                        src={sketchImage}
                                        className="max-w-full max-h-[500px] object-contain"
                                        alt="Your sketch"
                                    />
                                ) : (
                                    <p className="text-gray-400">No sketch available</p>
                                )}
                            </div>

                            <button
                                onClick={() => downloadImage(sketchImage, 'my-sketch.png')}
                                className="w-full mt-6 px-6 py-3 rounded-lg bg-realize-gradient text-white font-semibold shadow-realize-xl font-roboto"
                            >
                                Download Sketch
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-realize-xl border border-realize overflow-hidden">
                        <div className="bg-realize-gradient p-6 text-white">
                            <h2 className="text-2xl font-bold font-raleway flex items-center gap-2">
                                ✨ AI Realization
                            </h2>
                            <p className="text-sm opacity-80 font-roboto">Generated by Scribbler AI</p>
                        </div>

                        <div className="p-6">
                            <div className="bg-gray-50 rounded-xl p-6 min-h-[400px] flex items-center justify-center border border-realize">
                                {generatedImage ? (
                                    <img
                                        src={generatedImage}
                                        className="max-w-full max-h-[500px] object-contain rounded-lg shadow-md"
                                        alt="AI generated"
                                    />
                                ) : (
                                    <p className="text-gray-400">Generating...</p>
                                )}
                            </div>

                            <button
                                onClick={() => downloadImage(generatedImage, 'ai-generated-design.png')}
                                className="w-full mt-6 px-6 py-3 rounded-lg bg-realize-gradient text-white font-semibold shadow-realize-xl font-roboto"
                            >
                                Download Result
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 justify-center mt-12 mb-12">
                    <button
                        onClick={handleDownloadBoth}
                        className="px-8 py-4 bg-gray-900 text-white rounded-xl shadow-realize-xl hover:bg-gray-800 font-semibold flex items-center justify-center gap-2"
                    >
                        Download Both
                    </button>

                    <button
                        onClick={handleFindSimilar}
                        disabled={isSearching}
                        className={`px-8 py-4 rounded-xl shadow-realize-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                            isSearching
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-realize-gradient text-white'
                        }`}
                    >
                        {isSearching ? (
                            <>
                                <Loader size={20} className="animate-spin" />
                                Searching...
                            </>
                        ) : (
                            <>
                                <ShoppingBag size={20} />
                                Find Similar Products
                            </>
                        )}
                    </button>

                    <button
                        onClick={handleStartOver}
                        className="px-8 py-4 bg-white text-gray-700 border border-realize rounded-xl shadow-md hover:bg-gray-50 font-semibold flex items-center justify-center gap-2"
                    >
                        Start New Design
                    </button>
                </div>

                {hasSearched && (
                    <div>
                        <h2 className="text-3xl font-bold font-raleway text-realize mb-8 text-center">
                            🛍️ Top Similar Products
                        </h2>

                        {products.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg">No similar products found</p>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-6">
                                {products.map((product, idx) => (
                                    <div
                                        key={product.product_id}
                                        className="relative bg-white rounded-xl shadow-md hover:shadow-lg transition-all border border-realize overflow-hidden"
                                    >
                                        <div className="absolute top-3 left-3 bg-realize-gradient text-white rounded-full w-8 h-8 flex items-center justify-center font-bold z-10">
                                            {idx + 1}
                                        </div>

                                        <div className="relative h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                                            {product.image_url ? (
                                                <img
                                                    src={product.image_url}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <p className="text-gray-400">No image</p>
                                            )}
                                        </div>

                                        <div className="p-4">
                                            <div className="mb-3">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-xs font-semibold text-gray-600">Match</span>
                                                    <span className="text-sm font-bold text-purple-600">
                                                        {(product.similarity * 100).toFixed(1)}%
                                                    </span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="bg-realize-gradient h-2 rounded-full transition-all"
                                                        style={{ width: `${product.similarity * 100}%` }}
                                                    />
                                                </div>
                                            </div>

                                            <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1">
                                                {product.name}
                                            </h3>

                                            <p className="text-xs text-gray-500 mb-3">{product.brand}</p>

                                            <p className="text-lg font-bold text-gray-900 mb-4">
                                                ${product.price?.toFixed(2) || 'N/A'}
                                            </p>

                                            <a
                                                href={product.product_url || '#'}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full block px-4 py-2 bg-realize-gradient text-white rounded-lg font-semibold text-center text-sm"
                                            >
                                                View Product
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
