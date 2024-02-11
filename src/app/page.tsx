import { cookies } from "next/headers";
import { findForecast, searchLocation } from "./actions";
import { Forecast, ForecastResponse } from "@/types";
import { redirect } from "next/navigation";
import dayOrNightIcon from "@/utils/day-or-night-icon";
import ForecastDetail from "./forecast-detail";
import kelvinToCelsius from "@/utils/kelvin-to-celsius";
import Navbar from "./navbar";
import Panel from "@/components/panel";
import SearchBox from "@/components/search-box";
import WeatherDetail from "./weather-detail";
import WeatherIcon from "./weather-icon";

async function getForecast(location: string): Promise<ForecastResponse> {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${process.env.WEATHER_API_KEY}&cnt=56`,
    { cache: "no-store" },
  );

  // if (!response.ok) {
  //   throw new Error("Failed to fetch data.");
  // }

  return response.json();
}

export default async function Home({
  searchParams: { location },
}: Readonly<{
  searchParams: { location?: string };
}>) {
  const locationCookie = cookies().get("location");

  if (!location && locationCookie?.value) {
    return redirect(`/?location=${locationCookie.value}`);
  }

  const forecastResponse = await getForecast(location || "Prague");

  const [firstForecast] = forecastResponse.list ?? [];

  const uniqueDates = [
    ...new Set(
      forecastResponse.list?.map(
        (forecast) => new Date(forecast.dt * 1000).toISOString().split("T")[0],
      ),
    ),
  ];

  const firstForecastForEachDate = uniqueDates
    .map((date) => {
      return forecastResponse.list?.find((forecast) => {
        const entryDate = new Date(forecast.dt * 1000)
          .toISOString()
          .split("T")[0];

        const entryHours = new Date(forecast.dt * 1000).getHours();

        return entryDate === date && entryHours >= 6;
      });
    })
    .filter((forecast): forecast is Forecast => !!forecast);

  return (
    <div className="flex min-h-screen flex-col gap-4 bg-gray-100">
      <Navbar cityName={forecastResponse.city?.name} />

      <SearchBox
        action={searchLocation}
        className="sm:hidden"
        loadSuggestions={async (value) => {
          "use server";

          const forecast = await findForecast(value);

          return forecast.list?.map((item) => item.name ?? "") ?? [];
        }}
        name="location"
        placeholder="Search location..."
      />

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-9 px-3 pb-10 pt-4">
        {firstForecast && (
          <section className="space-y-4">
            <div className="space-y-2">
              <h2 className="flex items-end gap-1 text-2xl">
                {new Date(firstForecast.dt_txt).toLocaleString(undefined, {
                  weekday: "long",
                })}{" "}
                <span className="text-lg">
                  ({new Date(firstForecast.dt_txt).toLocaleDateString()})
                </span>
              </h2>

              <Panel className="items-center gap-10 px-6">
                <div className="flex flex-col space-y-1 px-4 text-center">
                  <span className="text-5xl">
                    {kelvinToCelsius(firstForecast.main.temp)}°
                  </span>
                  <p className="whitespace-nowrap text-xs">
                    <span>Feels like</span>{" "}
                    <span>
                      {kelvinToCelsius(firstForecast.main.feels_like)}°
                    </span>
                  </p>
                  <p className="text-xs">
                    <span>
                      {kelvinToCelsius(firstForecast.main.temp_min)}°↓
                    </span>{" "}
                    <span>
                      {kelvinToCelsius(firstForecast.main.temp_max)}°↑
                    </span>
                  </p>
                </div>

                <div className="flex w-full justify-between gap-10 overflow-x-auto pr-3 sm:gap-16">
                  {forecastResponse.list?.map((forecast, index) => (
                    <div
                      className="flex flex-col items-center justify-between gap-2 text-xs font-semibold"
                      key={index}
                    >
                      <p className="whitespace-nowrap">
                        {new Date(forecast.dt_txt).toLocaleTimeString(
                          undefined,
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        )}
                      </p>
                      <WeatherIcon
                        iconName={dayOrNightIcon(
                          forecast.weather[0].icon,
                          forecast.dt_txt,
                        )}
                      />
                      <p>{kelvinToCelsius(forecast.main.temp)}°</p>
                    </div>
                  ))}
                </div>
              </Panel>
            </div>

            <div className="flex gap-4">
              <Panel className="w-fit flex-col items-center justify-center px-4">
                <p className="text-center capitalize">
                  {firstForecast.weather[0].description}
                </p>
                <WeatherIcon
                  iconName={dayOrNightIcon(
                    firstForecast.weather[0].icon,
                    firstForecast.dt_txt,
                  )}
                />
              </Panel>
              <Panel className="w-full justify-between gap-4 overflow-x-auto !bg-blue-200/80 px-6">
                <WeatherDetail
                  airPressure={`${firstForecast.main.pressure} hPa`}
                  humidity={`${firstForecast.main.humidity}%`}
                  sunrise={
                    forecastResponse.city
                      ? new Date(
                          forecastResponse.city.sunrise * 1000,
                        ).toLocaleTimeString(undefined, {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""
                  }
                  sunset={
                    forecastResponse.city
                      ? new Date(
                          forecastResponse.city.sunset * 1000,
                        ).toLocaleTimeString(undefined, {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""
                  }
                  visibility={`${(firstForecast.visibility / 1000).toFixed(0)} km`}
                  windSpeed={`${firstForecast.wind.speed} m/s`}
                />
              </Panel>
            </div>
          </section>
        )}

        {firstForecastForEachDate.length > 0 && (
          <section className="flex w-full flex-col gap-4">
            <p className="text-2xl">Forecast (7 days)</p>

            {firstForecastForEachDate.map((forecast, index) => (
              <ForecastDetail
                airPressure={`${forecast.main.pressure} hPa`}
                date={new Date(forecast.dt_txt).toLocaleDateString()}
                day={new Date(forecast.dt_txt).toLocaleString(undefined, {
                  weekday: "long",
                })}
                description={forecast.weather[0].description}
                feelsLike={forecast.main.feels_like}
                humidity={`${forecast.main.humidity}%`}
                key={index}
                sunrise={
                  forecastResponse.city
                    ? new Date(
                        forecastResponse.city.sunrise * 1000,
                      ).toLocaleTimeString(undefined, {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""
                }
                sunset={
                  forecastResponse.city
                    ? new Date(
                        forecastResponse.city.sunset * 1000,
                      ).toLocaleTimeString(undefined, {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""
                }
                temp={forecast.main.temp}
                visibility={`${(forecast.visibility / 1000).toFixed(0)} km`}
                weatherIcon={forecast.weather[0].icon}
                windSpeed={`${forecast.wind.speed} m/s`}
              />
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
