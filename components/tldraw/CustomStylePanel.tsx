'use client';

import { useEditor, useValue, DefaultColorStyle, DefaultSizeStyle, DefaultDashStyle } from 'tldraw';
import { useEffect } from 'react';

const COLORS = [
    { name: 'black', hex: '#1d1d1d' },
    { name: 'grey', hex: '#adb5bd' },
    { name: 'light-violet', hex: '#e9d5ff' },
    { name: 'violet', hex: '#8b5cf6' },
    { name: 'blue', hex: '#3b82f6' },
    { name: 'light-blue', hex: '#0ea5e9' },
    { name: 'yellow', hex: '#fbbf24' },
    { name: 'orange', hex: '#f97316' },
    { name: 'green', hex: '#10b981' },
    { name: 'light-green', hex: '#84cc16' },
    { name: 'light-red', hex: '#fb7185' },
    { name: 'red', hex: '#ef4444' },
];

const OPACITIES = [
    { label: '10%', value: '0.1' },
    { label: '50%', value: '0.5' },
    { label: '100%', value: '1' },
];

export default function CustomStylePanel() {
    const editor = useEditor();

    // 1. Force Defaults on Mount
    useEffect(() => {
        if (editor) {
            editor.setStyleForNextShapes(DefaultColorStyle, 'black');
            editor.setStyleForNextShapes(DefaultDashStyle, 'solid');
            editor.setStyleForNextShapes(DefaultSizeStyle, 's');
        }
    }, [editor]);

    // 2. Track Active Styles (With Type Safety Fixes)
    // FIX: Added 'as any' to bypass TypeScript overlap errors
    const currentColor = useValue('current color', () => {
        if (!editor) return 'black';
        if (editor.getSelectedShapes().length > 0) {
            const val = editor.getSharedStyles().get(DefaultColorStyle) as any;
            return val === 'mixed' ? null : val;
        }
        return editor.getStyleForNextShape(DefaultColorStyle) as any;
    }, [editor]);

    const currentDash = useValue('current dash', () => {
        if (!editor) return 'solid';
        if (editor.getSelectedShapes().length > 0) {
            const val = editor.getSharedStyles().get(DefaultDashStyle) as any;
            return val === 'mixed' ? null : val;
        }
        return editor.getStyleForNextShape(DefaultDashStyle) as any;
    }, [editor]);

    const currentSize = useValue('current size', () => {
        if (!editor) return 's';
        if (editor.getSelectedShapes().length > 0) {
            const val = editor.getSharedStyles().get(DefaultSizeStyle) as any;
            return val === 'mixed' ? null : val;
        }
        return editor.getStyleForNextShape(DefaultSizeStyle) as any;
    }, [editor]);

    if (!editor) return null;

    // --- Actions ---
    function setColor(color: string) {
        editor.run(() => {
            editor.setStyleForNextShapes(DefaultColorStyle, color as any);
            const selectedShapes = editor.getSelectedShapes();
            if (selectedShapes.length > 0) {
                editor.setStyleForSelectedShapes(DefaultColorStyle, color as any);
            }
        });
    }

    function setOpacity(opacity: string) {
        editor.run(() => {
            const opValue = parseFloat(opacity);
            editor.setOpacityForNextShapes(opValue);
            const selectedShapes = editor.getSelectedShapes();
            if (selectedShapes.length > 0) {
                editor.setOpacityForSelectedShapes(opValue);
            }
        });
    }

    function setDash(dash: 'draw' | 'solid') {
        editor.run(() => {
            editor.setStyleForNextShapes(DefaultDashStyle, dash);
            const selectedShapes = editor.getSelectedShapes();
            if (selectedShapes.length > 0) {
                editor.setStyleForSelectedShapes(DefaultDashStyle, dash);
            }
        });
    }

    function setSize(size: 's' | 'm') {
        editor.run(() => {
            editor.setStyleForNextShapes(DefaultSizeStyle, size);
            const selectedShapes = editor.getSelectedShapes();
            if (selectedShapes.length > 0) {
                editor.setStyleForSelectedShapes(DefaultSizeStyle, size);
            }
        });
    }

    // Styles
    const activeBtnClass = "bg-purple-100 border-purple-500 text-purple-700 font-bold shadow-inner";
    const inactiveBtnClass = "bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300";

    return (
        <div className="absolute top-4 right-4 z-[9999] pointer-events-auto select-none">
            <div className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white/95 backdrop-blur-sm p-3 shadow-xl w-[180px]">

                {/* Colors */}
                <div>
                    <div className="text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-wider">Color</div>
                    <div className="grid grid-cols-6 gap-1">
                        {COLORS.map((color) => {
                            const isActive = currentColor === color.name;
                            return (
                                <button
                                    key={color.name}
                                    onClick={() => setColor(color.name)}
                                    className={`w-5 h-5 rounded-full border border-gray-200 hover:scale-110 transition-transform ${isActive ? 'ring-2 ring-purple-500 ring-offset-1 scale-110' : ''
                                        }`}
                                    style={{ backgroundColor: color.hex }}
                                    title={color.name}
                                />
                            );
                        })}
                    </div>
                </div>

                {/* Stroke */}
                <div>
                    <div className="text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-wider">Stroke</div>
                    <div className="flex gap-1">
                        <button
                            onClick={() => setDash('draw')}
                            className={`flex-1 py-1 text-[10px] rounded border transition-all ${currentDash === 'draw' ? activeBtnClass : inactiveBtnClass
                                }`}
                        >
                            Ink
                        </button>
                        <button
                            onClick={() => setDash('solid')}
                            className={`flex-1 py-1 text-[10px] rounded border transition-all ${currentDash === 'solid' ? activeBtnClass : inactiveBtnClass
                                }`}
                        >
                            Liner
                        </button>
                    </div>
                </div>

                {/* Size */}
                <div>
                    <div className="text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-wider">Size</div>
                    <div className="flex gap-1">
                        <button
                            onClick={() => setSize('s')}
                            className={`flex-1 py-1 text-[10px] rounded border transition-all ${currentSize === 's' ? activeBtnClass : inactiveBtnClass
                                }`}
                        >
                            Small
                        </button>
                        <button
                            onClick={() => setSize('m')}
                            className={`flex-1 py-1 text-[10px] rounded border transition-all ${currentSize === 'm' ? activeBtnClass : inactiveBtnClass
                                }`}
                        >
                            Medium
                        </button>
                    </div>
                </div>

                {/* Opacity */}
                <div>
                    <div className="text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-wider">Opacity</div>
                    <div className="flex gap-1">
                        {OPACITIES.map((op) => (
                            <button
                                key={op.label}
                                onClick={() => setOpacity(op.value)}
                                className={`flex-1 py-1 text-[10px] rounded border ${inactiveBtnClass}`}
                            >
                                {op.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}