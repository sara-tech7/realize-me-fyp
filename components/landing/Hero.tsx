import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export default function Hero() {
    return (
        <section id="hero" className="container mx-auto px-4 pt-16 md:pt-24 pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* LEFT SECTION */}
                <div className="flex flex-col gap-6 text-center lg:text-left">

                    <div className="flex justify-center lg:justify-start">
                        <Badge className="bg-white border-gray-200 shadow-sm gap-2 pr-3 font-roboto">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-linear-to-r from-[#8B5CF6] to-[#D946EF]">
                                <Sparkles className="h-3 w-3 text-white" />
                            </span>
                            Powered by AI
                        </Badge>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold font-raleway leading-[1.1]">
                        Turn your sketches into <br />
                        <span className="bg-linear-to-r from-[#8B5CF6] via-[#D946EF] to-[#FCA5A5] bg-clip-text text-transparent">
                            real fashion
                        </span>
                    </h1>

                    <p className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-roboto">
                        Draw your dream outfit, let AI transform it into photorealistic imagery,
                        and discover where to buy it from{" "}
                        <strong className="text-gray-900">thousands of fashion retailers.</strong>
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-2">
                        <Button variant="gradient" size="lg" className="font-raleway font-bold group">
                            Start Sketching
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>

                        <Button variant="secondary" size="lg" className="gap-2">
                            <Play className="h-4 w-4" />
                            Watch Demo
                        </Button>
                    </div>

                </div>

                {/* RIGHT IMAGE */}
                <div className="relative mx-auto max-w-lg lg:max-w-none">
                    <div className="rounded-2xl border border-gray-200 shadow-2xl overflow-hidden bg-white">
                        <img
                            src="\hero-sketch.png"
                            alt="AI fashion example"
                            className="w-full object-cover aspect-4/3"
                        />
                    </div>

                    {/* Glow */}
                    <div className="absolute -inset-4 bg-linear-to-r from-[#8B5CF6] to-[#06B6D4] opacity-20 blur-3xl -z-10 rounded-full" />
                </div>

            </div>
        </section>
    );
}
