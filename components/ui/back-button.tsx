"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./button";

const BackButton = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      className="flex items-center px-2 py-2 border border-gray-300 rounded-full hover:bg-gray-100"
      variant={"link"}
    >
      <ChevronLeft className="h-5 w-5 mr-2" />
      Back
    </Button>
  );
};

export default BackButton;
