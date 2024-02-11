import kelvinToCelsius from "@/utils/kelvin-to-celsius";
import Panel from "@/components/panel";
import WeatherDetail from "./weather-detail";
import WeatherIcon from "./weather-icon";

export default function ForecastDetail({
  airPressure,
  date,
  day,
  description,
  feelsLike,
  humidity,
  sunrise,
  sunset,
  temp,
  visibility,
  weatherIcon,
  windSpeed,
}: Readonly<{
  airPressure: string;
  date: string;
  day: string;
  description: string;
  feelsLike: number;
  humidity: string;
  sunrise: string;
  sunset: string;
  temp: number;
  visibility: string;
  weatherIcon: string;
  windSpeed: string;
}>) {
  return (
    <Panel className="gap-4">
      <section className="flex items-center gap-4 px-4 text-center">
        <div>
          <WeatherIcon iconName={weatherIcon} />
          <p className="whitespace-nowrap">{date}</p>
          <p className="text-sm">{day}</p>
        </div>

        <div className="flex flex-col space-y-1 px-4">
          <span className="text-5xl">{kelvinToCelsius(temp)}</span>
          <p className="space-x-1 whitespace-nowrap text-xs">
            <span>Feels like</span>
            <span>{kelvinToCelsius(feelsLike)}°</span>
          </p>
          <p className="capitalize">{description}</p>
        </div>
      </section>

      <section className="flex w-full justify-between gap-4 overflow-x-auto px-4 pr-10">
        <WeatherDetail
          airPressure={airPressure}
          humidity={humidity}
          sunrise={sunrise}
          sunset={sunset}
          visibility={visibility}
          windSpeed={windSpeed}
        />
      </section>
    </Panel>
  );
}
