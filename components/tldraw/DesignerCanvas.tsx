'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Editor, Tldraw } from 'tldraw';
import 'tldraw/tldraw.css';

import { blobToBase64, exportCanvasToBlob } from '@/lib/tldraw-utils';

import CustomToolbar from './CustomToolbar';
import CustomStylePanel from './CustomStylePanel';

export default function DesignerCanvas() {
    const [editor, setEditor] = useState<Editor | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const router = useRouter();

    const handleGenerate = async () => {
        if (!editor || isGenerating) return;

        const blob = await exportCanvasToBlob(editor);

        if (!blob) {
            alert('Draw something first!');
            return;
        }

        setIsGenerating(true);

        try {
            const sketchImage = await blobToBase64(blob);
            const formData = new FormData();
            formData.append('file', blob, 'canvas.png');

            const response = await fetch('/api/generate', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.error || 'Failed to generate image');
            }

            const generatedImage = data.generatedImage ||
                (typeof data.image_base64 === 'string'
                    ? `data:image/png;base64,${data.image_base64}`
                    : '');

            if (!generatedImage) {
                throw new Error('Generation response did not include an image');
            }

            sessionStorage.setItem('realizeme:sketchImage', sketchImage);
            sessionStorage.setItem('realizeme:generatedImage', generatedImage);

            if (data.message) {
                sessionStorage.setItem('realizeme:generateNotice', data.message);
            } else {
                sessionStorage.removeItem('realizeme:generateNotice');
            }

            router.push('/designer/results');
        } catch (error) {
            console.error('Generation failed:', error);
            alert(error instanceof Error ? error.message : 'Generation failed');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="relative h-full w-full bg-white">
            <Tldraw
                onMount={(mountedEditor) => setEditor(mountedEditor)}
                hideUi
                inferDarkMode={false}
            >
                <CustomToolbar />
                <CustomStylePanel />
            </Tldraw>

            <button
                id="realize-btn"
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="hidden"
            >
                Generate
            </button>
        </div>
    );
}