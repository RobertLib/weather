import { Air, Droplet, Eye, Meter, Sunrise, Sunset } from "@/components/icons";

function WeatherItem({
  icon,
  info,
  value,
}: Readonly<{
  icon: React.ReactNode;
  info: string;
  value: string;
}>) {
  return (
    <div className="flex flex-col items-center justify-between gap-2 text-xs font-semibold text-black/80">
      <p className="whitespace-nowrap">{info}</p>
      <div className="text-3xl">{icon}</div>
      <p>{value}</p>
    </div>
  );
}

export default function WeatherDetail({
  airPressure,
  humidity,
  sunrise,
  sunset,
  visibility,
  windSpeed,
}: Readonly<{
  airPressure: string;
  humidity: string;
  sunrise: string;
  sunset: string;
  visibility: string;
  windSpeed: string;
}>) {
  return (
    <>
      <WeatherItem icon={<Eye />} info="Visibility" value={visibility} />
      <WeatherItem icon={<Droplet />} info="Humidity" value={humidity} />
      <WeatherItem icon={<Air />} info="Wind Speed" value={windSpeed} />
      <WeatherItem icon={<Meter />} info="Air Pressure" value={airPressure} />
      <WeatherItem icon={<Sunrise />} info="Sunrise" value={sunrise} />
      <WeatherItem icon={<Sunset />} info="Sunset" value={sunset} />
    </>
  );
}
