import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

export default function CTA() {
    return (
        <section className="container mx-auto px-4 mb-24">
            <div className="relative rounded-[2.5rem] overflow-hidden bg-[#F8F9FA] border border-white shadow-xl">

                {/* Cyan Glow */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#06B6D4]/10 blur-[100px] rounded-full" />

                {/* Violet Glow */}
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#8B5CF6]/10 blur-[100px] rounded-full" />

                <div className="relative z-10 px-6 py-24 md:py-32 text-center">

                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#1F2937] font-raleway">
                        Ready to realize your style?
                    </h2>

                    <p className="text-gray-600 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-roboto">
                        Join thousands of fashion enthusiasts creating and discovering their
                        dream outfits today.
                    </p>

                    <Button
                        variant="gradient"
                        size="lg"
                        className="shadow-xl shadow-purple-500/20 text-lg px-10 h-14 font-raleway font-bold"
                    >
                        Get Started Free <ArrowRight className="ml-2" />
                    </Button>
                </div>
            </div>
        </section>
    );
}
