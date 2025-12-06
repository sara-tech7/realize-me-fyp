// components/tldraw/DesignerCanvas.tsx
'use client';

import { Tldraw } from 'tldraw';
import 'tldraw/tldraw.css';
import CustomToolbar from './CustomToolbar';
import CustomStylePanel from './CustomStylePanel';

export default function DesignerCanvas() {
    return (
        <div className="relative h-full w-full bg-white">
            <Tldraw
                hideUi
                inferDarkMode={false}
            >
                <CustomToolbar />
                <CustomStylePanel />
            </Tldraw>
        </div>
    );
}