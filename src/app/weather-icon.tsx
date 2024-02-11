import cn from "@/utils/cn";
import Image from "next/image";

export default function WeatherIcon({
  className,
  iconName,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Readonly<{ iconName: string }>) {
  return (
    <div {...props} className={cn("relative h-20 w-20", className)}>
      <Image
        alt="Weather icon"
        className="absolute h-full w-full"
        height={100}
        src={`https://openweathermap.org/img/wn/${iconName}@4x.png`}
        width={100}
      />
    </div>
  );
}
