import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

/**
 * Shared layout for all main pages (Home, About, etc.).
 * Provides the Navbar and Footer automatically — no need to add them in individual page files.
 * This uses a Next.js route group `(main)` so it doesn't affect the URL structure.
 */
export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-phause-dark text-white overflow-hidden">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
