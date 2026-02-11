// app/(main)/layout.tsx
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { FloatingCart } from "@/components/cart/FloatingCart";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopBar />
      <div className="relative flex min-h-screen w-full flex-col max-w-[480px] mx-auto shadow-2xl bg-background-light overflow-x-hidden">
        {children}
      </div>
      <FloatingCart />
      <BottomNav />
    </>
  );
}