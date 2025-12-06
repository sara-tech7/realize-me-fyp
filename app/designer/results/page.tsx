'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ResultsPage() {
    const router = useRouter();
    const [sketchImage, setSketchImage] = useState<string>('');
    const [generatedImage, setGeneratedImage] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const sketch = sessionStorage.getItem('realizeme:sketchImage');
        const generated = sessionStorage.getItem('realizeme:generatedImage');

        if (!sketch || !generated) {
            router.push('/designer');
            return;
        }

        setSketchImage(sketch);
        setGeneratedImage(generated);
        setIsLoading(false);
    }, [router]);

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

            {/* Header */}
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

            {/* Main */}
            <main className="max-w-7xl mx-auto px-6 py-12">

                {/* Title */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold font-raleway text-realize mb-4">
                        ✨ Your Design is Ready!
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600">
                        Compare your original sketch with the AI-generated design
                    </p>
                </div>

                {/* Sketch + Result Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">

                    {/* Sketch Card */}
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
                                    <img src={sketchImage} className="max-w-full max-h-[500px] object-contain" />
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

                    {/* AI Result Card */}
                    <div className="bg-white rounded-2xl shadow-realize-xl border border-realize overflow-hidden">
                        <div className="bg-realize-gradient p-6 text-white">
                            <h2 className="text-2xl font-bold font-raleway flex items-center gap-2">
                                ✨ AI Realization
                            </h2>
                            <p className="text-sm opacity-80 font-roboto">Generated by Pix2Pix AI</p>
                        </div>

                        <div className="p-6">
                            <div className="bg-gray-50 rounded-xl p-6 min-h-[400px] flex items-center justify-center border border-realize">
                                {generatedImage ? (
                                    <img src={generatedImage} className="max-w-full max-h-[500px] object-contain rounded-lg shadow-md" />
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

                {/* Buttons */}
                <div className="flex flex-col md:flex-row gap-4 justify-center mt-12 pb-12">

                    <button
                        onClick={handleDownloadBoth}
                        className="px-8 py-4 bg-gray-900 text-white rounded-xl shadow-realize-xl hover:bg-gray-800 font-semibold flex items-center gap-2"
                    >
                        Download Both
                    </button>

                    <button
                        onClick={handleStartOver}
                        className="px-8 py-4 bg-white text-gray-700 border border-realize rounded-xl shadow-md hover:bg-gray-50 font-semibold flex items-center gap-2"
                    >
                        Start New Design
                    </button>

                </div>
            </main>
        </div>
    );
}
