//C:\Users\sohai\realizeme\app\page.tsx
import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import HowItWorks from "../components/landing/HowItWorks";
import CTA from "../components/landing/CTA";
import Footer from "../components/landing/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1F2937] font-roboto">
      <Navbar />
      <main className="flex flex-col gap-24">
        <Hero />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
