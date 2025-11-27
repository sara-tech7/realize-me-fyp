import { PenTool, ShoppingBag, Sparkles } from "lucide-react";
import { Card } from "../ui/card";

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="container mx-auto px-4 py-16 md:py-24"
    >
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-raleway">
          How it Works
        </h2>
        <p className="text-gray-500 text-lg font-roboto">
          Three simple steps from imagination to reality
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Step 1 */}
        <Card className="p-10 hover:shadow-lg transition-shadow border-none bg-gradient-to-b from-white to-[#F8F9FA]">
          <div className="mb-6 inline-flex p-3 rounded-2xl bg-[#F3F0FF] text-[#8B5CF6]">
            <PenTool className="h-8 w-8" />
          </div>

          <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 font-raleway">
            STEP 1
          </div>

          <h3 className="text-2xl font-bold mb-3 font-raleway">
            Sketch your idea
          </h3>

          <p className="text-gray-600 leading-relaxed font-roboto">
            Draw your fashion concept on our intuitive canvas. No artistic
            skills needed—just express your vision.
          </p>
        </Card>

        {/* Step 2 */}
        <Card className="p-10 hover:shadow-lg transition-shadow border-none bg-gradient-to-b from-white to-[#F8F9FA]">
          <div className="mb-6 inline-flex p-3 rounded-2xl bg-[#ECFEFF] text-[#06B6D4]">
            <Sparkles className="h-8 w-8" />
          </div>

          <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 font-raleway">
            STEP 2
          </div>

          <h3 className="text-2xl font-bold mb-3 font-raleway">
            AI generates reality
          </h3>

          <p className="text-gray-600 leading-relaxed font-roboto">
            Our advanced Pix2Pix model transforms your sketch into a
            photorealistic garment image in seconds.
          </p>
        </Card>

        {/* Step 3 */}
        <Card className="p-10 hover:shadow-lg transition-shadow border-none bg-gradient-to-b from-white to-[#F8F9FA]">
          <div className="mb-6 inline-flex p-3 rounded-2xl bg-[#FFF1F2] text-[#E11D48]">
            <ShoppingBag className="h-8 w-8" />
          </div>

          <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 font-raleway">
            STEP 3
          </div>

          <h3 className="text-2xl font-bold mb-3 font-raleway">
            Discover & shop
          </h3>

          <p className="text-gray-600 leading-relaxed font-roboto">
            Browse visually similar products from real stores and find exactly
            what you imagined.
          </p>
        </Card>
      </div>
    </section>
  );
}
