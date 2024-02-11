"use client";

import { Search } from "./icons";
import { useMemo, useRef, useState } from "react";
import cn from "@/utils/cn";
import debounce from "@/utils/debounce";

export default function SearchBox({
  action,
  className,
  loadSuggestions,
  name,
  placeholder,
}: Readonly<{
  action?: (formData: FormData) => Promise<void>;
  className?: string;
  loadSuggestions?: (value: string) => Promise<string[]>;
  name?: string;
  placeholder?: string;
}>) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [suggestions, setSuggestions] = useState<string[]>([]);

  const debouncedLoadSuggestions = useMemo(
    () =>
      debounce(
        async ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
          const newSuggestions =
            loadSuggestions && value.length > 2
              ? (await loadSuggestions(value)) ?? []
              : [];

          setSuggestions(newSuggestions);
        },
        500,
      ),
    [loadSuggestions],
  );

  return (
    <form
      action={async (formData) => {
        await action?.(formData);

        if (inputRef.current) {
          inputRef.current.value = "";
        }

        setSuggestions([]);
      }}
      className={cn(
        "relative flex h-10 items-center justify-center",
        className,
      )}
    >
      <input
        className="h-full w-[230px] rounded-l-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
        list={name}
        name={name}
        onChange={debouncedLoadSuggestions}
        placeholder={placeholder}
        ref={inputRef}
        type="search"
      />
      <button
        className="h-full rounded-r-md bg-blue-500 px-4 py-[9px] text-white hover:bg-blue-600 focus:outline-none"
        type="submit"
      >
        <Search />
      </button>

      <datalist id={name}>
        {suggestions.map((suggestion, index) => (
          <option key={index} value={suggestion} />
        ))}
      </datalist>
    </form>
  );
}
