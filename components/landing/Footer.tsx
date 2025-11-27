import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

export default function Footer() {
  return (
    <footer className="bg-[#050607] text-gray-400 border-t border-gray-900 py-16 font-roboto">
      <div className="container mx-auto px-4">

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* Brand Block */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2 text-white">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-gradient-to-br from-[#8B5CF6] to-[#06B6D4] font-bold font-raleway">R</div>
              <span className="text-xl font-bold font-raleway">Realize</span>
            </div>

            <p className="text-sm font-medium text-white">
              AI-powered sketch-to-product discovery
            </p>

            <p className="text-sm leading-relaxed max-w-xs">
              Made with curiosity, creativity, and a little bit of AI to help
              you find exactly what you're looking for.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-6 font-raleway">
              Links
            </h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">How it works</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sketch a Design</a></li>
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Privacy */}
          <div>
            <h4 className="text-white font-semibold mb-6 font-raleway">
              Privacy & Terms
            </h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Privacy notes</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms & conditions</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Responsible AI</a></li>
            </ul>
          </div>

          {/* CTA Block */}
          <div className="flex flex-col gap-6">
            <h4 className="text-white font-semibold font-raleway">
              Get Started
            </h4>

            <div className="flex flex-col gap-4 text-sm">
              <a href="#" className="hover:text-white transition-colors">Sign up</a>
              <a href="#" className="hover:text-white transition-colors">Log in</a>

              <Button
                variant="gradient"
                size="sm"
                className="w-fit font-raleway font-bold"
              >
                Start Sketching <ArrowRight className="ml-1 w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-900 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2025 Realize</p>
          <p className="text-right">
            Crafted with patience, passion, and pixels.
            <br />
            Powered by open-source knowledge & creativity.
          </p>
        </div>
      </div>
    </footer>
  );
}
