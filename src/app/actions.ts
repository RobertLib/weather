"use server";

import { cookies } from "next/headers";
import { CurrentWeatherResponse, ForecastResponse } from "@/types";
import { redirect } from "next/navigation";

export async function findForecast(value: string): Promise<ForecastResponse> {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${process.env.WEATHER_API_KEY}`,
  );

  return response.json();
}

export async function getCurrentWeather(latitude: number, longitude: number) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.WEATHER_API_KEY}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }

  const data: CurrentWeatherResponse = await response.json();

  cookies().set("location", data.name);

  return data;
}

export async function searchLocation(formData: FormData) {
  const location = formData.get("location")?.toString().trim();

  cookies().set("location", location ?? "");

  redirect(location ? `/?location=${location}` : "/");
}
