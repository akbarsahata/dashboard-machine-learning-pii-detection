"use client";

import { useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/icons";
import { Search } from "lucide-react";

export function SearchInput() {
  const router = useRouter();
  const pathname = usePathname();
  const url = new URL(pathname, window.location.origin);

  const [isPending, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState(url.searchParams.get("q") ?? "");

  function searchAction(formData: FormData) {
    const value = formData.get("q") as string;

    url.searchParams.set("q", value);
    startTransition(() => {
      router.replace(url.pathname + url.search, { scroll: false });
    });
  }

  return (
    <form action={searchAction} className="relative ml-auto flex-1 md:grow-0">
      <Search className="absolute left-2.5 top-[.75rem] h-4 w-4 text-muted-foreground" />
      <Input
        name="q"
        type="search"
        placeholder="Search..."
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {isPending && <Spinner />}
    </form>
  );
}
