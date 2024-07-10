"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  return (
    <div className="absolute top-4 left-4">
      <button
        className="flex items-center gap-2 group hover:underline"
        onClick={() => router.back()}
      >
        <ArrowLeft
          size={24}
          className="group-hover:-translate-x-1 transition-transform"
        />{" "}
        Go back
      </button>
    </div>
  );
};

export default BackButton;
