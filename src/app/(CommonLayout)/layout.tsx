import { Navbar } from "@/components/navbar";

export default function commonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
   <main>
    <nav>
      <Navbar />
    </nav>
    <section>
    {children}
    </section>
    </main>
  );
}
