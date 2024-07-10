
import dynamic from "next/dynamic";
import "./whiteboard.css"
const ExcalidrawWrapper = dynamic(
  async () => (await import("./excalidrawWrapper.tsx")).default,
  {
    ssr: false,
  },
);

export default function Page() {
  return (
    <ExcalidrawWrapper />
  );
}