"use client";

import { getCurrentWeather } from "./actions";
import { MyLocation } from "@/components/icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import cn from "@/utils/cn";

export default function CurrentLocation() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  return (
    <button
      className="flex cursor-pointer text-2xl text-gray-400 hover:opacity-80"
      onClick={() => {
        setIsLoading(true);

        navigator.geolocation.getCurrentPosition(
          async ({ coords }) => {
            const { latitude, longitude } = coords;

            const currentWeather = await getCurrentWeather(latitude, longitude);

            router.replace(`/?location=${currentWeather.name}`);

            setIsLoading(false);
          },
          (error) => {
            console.error(error);

            setIsLoading(false);
          },
        );
      }}
      title="Current location"
      type="button"
    >
      <MyLocation className={cn(isLoading && "animate-pulse")} />
    </button>
  );
}
