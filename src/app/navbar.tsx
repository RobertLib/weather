import { findForecast, searchLocation } from "./actions";
import CurrentLocation from "./current-location";
import SearchBox from "@/components/search-box";

export default function Navbar({
  cityName,
}: Readonly<{
  cityName?: string;
}>) {
  return (
    <nav className="sticky left-0 top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex h-[80px] w-full max-w-7xl items-center justify-between px-3">
        <ul className="flex items-center justify-center gap-2">
          <li className="text-3xl text-gray-500">
            Weather.<span className="text-blue-500">blue</span>
          </li>
        </ul>
        <ul className="flex items-center gap-2">
          <li>
            <CurrentLocation />
          </li>
          <li className="text-sm text-slate-900/80">{cityName}</li>
          <li className="hidden sm:list-item">
            <SearchBox
              action={searchLocation}
              loadSuggestions={async (value) => {
                "use server";

                const forecast = await findForecast(value);

                return forecast.list?.map((item) => item.name ?? "") ?? [];
              }}
              name="location"
              placeholder="Search location..."
            />
          </li>
        </ul>
      </div>
    </nav>
  );
}
