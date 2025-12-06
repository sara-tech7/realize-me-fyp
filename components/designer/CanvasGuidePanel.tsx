// components/designer/CanvasGuidePanel.tsx
import { PenTool, Hand, Eraser, Image, Brush } from "lucide-react";

export default function CanvasGuidePanel() {
    return (
        <div className="h-full rounded-2xl border-2 border-gray-200 bg-white p-8 overflow-y-auto shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                How to Use the Canvas
            </h2>

            <div className="space-y-6">

                {/* STEP 1 */}
                <div className="border border-gray-200 rounded-xl p-5 shadow-sm bg-gray-50">
                    <div className="flex items-start gap-4">
                        <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                            <Brush className="h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 text-lg mb-1">
                                1. Pick a Tool
                            </h3>
                            <p className="text-sm text-gray-600">
                                Select from: <strong>Select</strong>, <strong>Hand</strong>,{" "}
                                <strong>Draw</strong>, <strong>Eraser</strong>, or{" "}
                                <strong>Media</strong>.
                            </p>
                        </div>
                    </div>
                </div>

                {/* STEP 2 */}
                <div className="border border-gray-200 rounded-xl p-5 shadow-sm bg-gray-50">
                    <div className="flex items-start gap-4">
                        <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                            <PenTool className="h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 text-lg mb-1">
                                2. Start Sketching
                            </h3>
                            <p className="text-sm text-gray-600">
                                Use the Draw tool to sketch your clothing outline. No need to be
                                perfect — the AI will enhance it.
                            </p>
                        </div>
                    </div>
                </div>

                {/* STEP 3 */}
                <div className="border border-gray-200 rounded-xl p-5 shadow-sm bg-gray-50">
                    <div className="flex items-start gap-4">
                        <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-green-100 text-green-600">
                            <Eraser className="h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 text-lg mb-1">
                                3. Adjust Style
                            </h3>
                            <p className="text-sm text-gray-600">
                                Change stroke color, opacity, and brush size using the style
                                panel.
                            </p>
                        </div>
                    </div>
                </div>

                {/* STEP 4 */}
                <div className="border border-gray-200 rounded-xl p-5 shadow-sm bg-gray-50">
                    <div className="flex items-start gap-4">
                        <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-pink-100 text-pink-600">
                            <Image className="h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 text-lg mb-1">
                                4. Add References (Optional)
                            </h3>
                            <p className="text-sm text-gray-600">
                                Upload photos or moodboard items using the Media tool.
                            </p>
                        </div>
                    </div>
                </div>

                {/* STEP 5 */}
                <div className="border border-gray-200 rounded-xl p-5 shadow-sm bg-gray-50">
                    <div className="flex items-start gap-4">
                        <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-yellow-100 text-yellow-600">
                            <Hand className="h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 text-lg mb-1">
                                5. Generate Your Design
                            </h3>
                            <p className="text-sm text-gray-600">
                                Click the “Realize” button to convert your sketch into a
                                photorealistic fashion image.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
