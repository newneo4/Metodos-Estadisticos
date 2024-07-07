import Funciones from "@/components/app/home/Funciones";
import Hero from "../components/app/home/Hero";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-between px-20 py-10 bg-black">
      <Hero/>
      <Funciones/>
    </main>
  );
}
