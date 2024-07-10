import { Home } from "@/container";

export default function HomePage() {
  return (
    <main>
      <Home.Hero />
      <Home.Catagories />
      <Home.Feed />
    </main>
  );
}
