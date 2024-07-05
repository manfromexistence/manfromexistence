
import dynamic from "next/dynamic";
import "./whiteboard.css"
import { SiteHeader } from "@/components/site-header.tsx";
const ExcalidrawWrapper = dynamic(
  async () => (await import("./excalidrawWrapper.tsx")).default,
  {
    ssr: false,
  },
);

export default function Page() {
  return (
    <>
    <SiteHeader />
    <ExcalidrawWrapper />
    </>
  );
}