'use client';

import { useEditor, useValue } from 'tldraw';
import { useEffect } from 'react';
import { MousePointer2, Hand, Pencil, Eraser, Image as ImageIcon, Wand2 } from 'lucide-react';

export default function CustomToolbar() {
    const editor = useEditor();

    // Default tool = draw
    useEffect(() => {
        if (editor) editor.setCurrentTool("draw");
    }, [editor]);

    const currentToolId = useValue(
        "current tool",
        () => editor?.getCurrentToolId(),
        [editor]
    );

    if (!editor) return null;

    const tools = [
        { id: "select", icon: MousePointer2, label: "Select" },
        { id: "hand", icon: Hand, label: "Hand" },
        { id: "draw", icon: Pencil, label: "Draw" },
        { id: "eraser", icon: Eraser, label: "Eraser" },
    ];

    // Media Upload
    const handleMediaUpload = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/png, image/jpeg, image/jpg, image/webp";

        input.onchange = async (e: any) => {
            const file = e.target.files?.[0];
            if (file) {
                await editor.putExternalContent({
                    type: "files",
                    files: [file],
                    point: editor.getViewportPageBounds().center,
                });
            }
        };

        input.click();
    };

    // 🌈 BRAND THEME BUTTONS (Smooth gradients)
    const activeBtn =
        "bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#06B6D4] text-white shadow-realize-xl scale-[1.07] border border-realize transition-all duration-300";

    const inactiveBtn =
        "bg-white text-gray-600 hover:bg-gray-50 border border-realize hover:text-realize shadow-sm transition-all duration-200";

    return (
        <div
            className="
                absolute bottom-6 left-1/2 -translate-x-1/2 z-[9999] pointer-events-auto
                flex items-center gap-3 px-5 py-3
                rounded-2xl border-realize shadow-realize-xl
                bg-white/80 backdrop-blur-2xl
            "
        >
            {/* === Tool Buttons === */}
            {tools.map((tool) => {
                const Icon = tool.icon;
                const isActive = currentToolId === tool.id;

                return (
                    <button
                        key={tool.id}
                        onClick={() => editor.setCurrentTool(tool.id)}
                        className={`p-3 rounded-xl ${isActive ? activeBtn : inactiveBtn}`}
                        title={tool.label}
                    >
                        <Icon size={20} />
                    </button>
                );
            })}

            {/* Divider */}
            <div className="w-[1px] h-8 bg-realize mx-2" />

            {/* === Upload Button === */}
            <button
                onClick={handleMediaUpload}
                className={`p-3 rounded-xl ${inactiveBtn}`}
                title="Upload Image"
            >
                <ImageIcon size={20} />
            </button>

            {/* === Generate Button (Updated Smooth Gradient) === */}
            <button
                onClick={() => document.getElementById("realize-btn")?.click()}
                className="
                    relative px-7 py-3 rounded-xl font-raleway font-bold text-white
                    bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#06B6D4]
                    shadow-realize-xl hover:scale-[1.05] transition-all duration-300
                    overflow-hidden flex items-center gap-2
                "
            >
                {/* Glow Behind */}
                <div className="
                    absolute inset-0 
                    bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4]
                    blur-2xl opacity-30 -z-10
                "></div>

                <Wand2 size={20} className="drop-shadow-md" />
                Generate
            </button>
        </div>
    );
}
