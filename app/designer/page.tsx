'use client';

import DesignerCanvas from '@/components/tldraw/DesignerCanvas';
import CanvasGuidePanel from "@/components/designer/CanvasGuidePanel";
import Link from 'next/link';
import { useState } from 'react';
import { PanelLeft, PenSquare, Search, Library, Settings, Menu } from 'lucide-react';

// --- 1. Helper Button Component ---
const Button = ({ variant = 'default', size = 'default', className = '', children, ...props }: any) => {
    const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 font-roboto";

    const variants: any = {
        default: "bg-purple-600 text-white hover:bg-purple-700", // Standardized to Global Theme
        ghostDark: "hover:bg-gray-800 text-gray-400 hover:text-white",
    };

    const sizes: any = {
        default: "h-10 px-4 py-2",
        icon: "h-9 w-9 rounded-md",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant] || variants.default} ${sizes[size] || sizes.default} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default function DesignerPage() {
    const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);

    return (
        // Applied Global Gradient Theme
        <div className="flex h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 overflow-hidden font-roboto">

            {/* --- 2. COLLAPSIBLE LEFT SIDEBAR --- */}
            <aside
                className={`
                    /* Mobile: Fixed overlay */
                    fixed inset-y-0 left-0 top-0 bottom-0 z-30
                    
                    /* Desktop: Relative flow */
                    md:relative md:top-auto md:bottom-auto
                    
                    /* Base styling */
                    w-14 bg-[#0F1115] border-r border-gray-800 flex flex-col items-center py-4 gap-4 
                    
                    /* Animation */
                    transition-all duration-300 ease-in-out
                    
                    /* THE FIX: overflow-hidden ensures icons don't spill out when width is 0 */
                    overflow-hidden
                    
                    /* Collapse Logic */
                    ${isLeftSidebarOpen ? 'translate-x-0' : '-translate-x-full md:w-0 md:border-none'}
                `}
            >
                {/* Inner Container: Fixed width prevents icon squashing */}
                <div className="w-14 flex flex-col items-center gap-4">

                    <Button variant="ghostDark" size="icon" title="Close Sidebar" onClick={() => setIsLeftSidebarOpen(false)}>
                        <PanelLeft className="w-5 h-5" />
                    </Button>

                    <div className="w-8 h-px bg-gray-800 my-1" />

                    <Button variant="ghostDark" size="icon" title="New Pad"><PenSquare className="w-5 h-5" /></Button>
                    <Button variant="ghostDark" size="icon" title="Search"><Search className="w-5 h-5" /></Button>
                    <Button variant="ghostDark" size="icon" title="Library"><Library className="w-5 h-5" /></Button>

                    <div className="mt-auto w-8 h-px bg-gray-800 my-1" />
                    <Button variant="ghostDark" size="icon" title="Settings"><Settings className="w-5 h-5" /></Button>
                </div>
            </aside>

            {/* --- 3. FLOATING OPEN BUTTON --- */}
            {!isLeftSidebarOpen && (
                <button
                    onClick={() => setIsLeftSidebarOpen(true)}
                    className="fixed left-4 top-24 z-20 bg-white border border-gray-300 rounded-lg p-2 shadow-lg hover:bg-gray-50 transition"
                    title="Open Sidebar"
                >
                    <Menu className="w-5 h-5 text-gray-700" />
                </button>
            )}

            {/* --- 4. MAIN CONTENT --- */}
            <main className="flex-1 flex flex-col min-w-0">
                {/* Top Bar */}
                <header className="shrink-0 flex items-center justify-between border-b border-gray-200 bg-white/80 backdrop-blur-md px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                            R
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-gray-900 font-raleway">RealizeMe</h1>
                            <p className="text-xs text-gray-500">Design Canvas</p>
                        </div>
                    </div>
                    <Link
                        href="/"
                        className="text-sm text-gray-600 hover:text-gray-900 transition font-medium"
                    >
                        ← Back to Home
                    </Link>
                </header>

                {/* Canvas Area */}
                <div className="flex-1 flex gap-6 p-6 min-h-0">
                    <div className="flex-3 min-w-0">
                        <div className="h-full rounded-2xl overflow-hidden border-2 border-gray-200 shadow-xl bg-white">
                            <DesignerCanvas />
                        </div>
                    </div>

                    <div className="flex-[1] min-w-0">
                        <CanvasGuidePanel />
                    </div>
                </div>
            </main>
        </div>
    );
}