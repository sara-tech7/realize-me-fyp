//components/landing/Navbar.tsx
"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full bg-[#0F1115] border-b border-gray-800 text-white backdrop-blur supports-[backdrop-filter]:bg-[#0F1115]/90">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded bg-gradient-to-br from-[#8B5CF6] to-[#06B6D4] font-bold font-raleway">
                            R
                        </div>
                        <span className="text-xl font-bold font-raleway">RealizeMe</span>
                    </div>

                    <div className="hidden md:flex gap-8 text-sm font-roboto text-gray-300">
                        <a href="#hero" className="hover:text-white">Home</a>
                        <a href="#features" className="hover:text-white">Features</a>
                        <a href="#how-it-works" className="hover:text-white">How it works?</a>
                        <a href="#about" className="hover:text-white">About</a>
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        <a href="#" className="text-gray-300 hover:text-white">Log In</a>
                        <Button variant="gradient" size="sm" className="font-raleway font-semibold">
                            Sign Up
                        </Button>
                    </div>

                    <button className="md:hidden" onClick={() => setOpen(!open)}>
                        {open ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {open && (
                <div className="md:hidden bg-[#0F1115] border-b border-gray-800 p-4">
                    <div className="flex flex-col items-center gap-4 text-gray-300 font-roboto">
                        <a href="#hero" className="py-2">Home</a>
                        <a href="#features" className="py-2">Features</a>
                        <a href="#how-it-works" className="py-2">How it works?</a>
                        <a href="#about" className="py-2">About</a>

                        <div className="w-full flex flex-col gap-2 mt-4">
                            <Button variant="ghost">Log In</Button>
                            <Button variant="gradient" className="font-raleway">Sign Up</Button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
