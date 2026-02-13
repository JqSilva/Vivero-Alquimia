// app/(main)/layout.tsx

import { BottomNav } from "@/components/layout/BottomNav";


export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="relative flex min-h-screen w-full flex-col max-w-[480px] mx-auto shadow-2xl bg-background-light overflow-x-hidden">
        {children}
      </div>
      <BottomNav />
    </>
  );
}