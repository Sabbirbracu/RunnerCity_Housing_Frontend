import { useEffect, useState } from "react";
import { Clock, Sun, Moon, Zap, Calendar } from "lucide-react";
import { useGetPrayerByCoordinatesQuery } from "../../../features/api/prayerApi";
import { skipToken } from "@reduxjs/toolkit/query";

// Convert 24-hour time (like "17:45") → 12-hour (like "5:45 PM")
const to12HourFormat = (timeStr) => {
  if (!timeStr) return "";
  let [hours, minutes] = timeStr.split(":").map(Number);
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
};

// Parse time for next prayer highlighting
const parseTime = (timeStr) => {
  if (!timeStr) return new Date();
  const parts = timeStr.split(/[:\s]/);
  let [hours, minutes, modifier] = parts;
  hours = Number(hours);
  if (modifier) {
    if (modifier.toUpperCase() === "PM" && hours !== 12) hours += 12;
    if (modifier.toUpperCase() === "AM" && hours === 12) hours = 0;
  }
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, +minutes);
};

// Live clock formatting
const formatTime = (date) =>
  date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

export const PrayerCard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [coords, setCoords] = useState(null);

  // Live clock update
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Ask for geolocation permission
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          setCoords({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          }),
        (err) => console.error("Location error:", err),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  // Fetch prayer times with RTK Query
  const { data, isLoading, isError } = useGetPrayerByCoordinatesQuery(
    coords ? { latitude: coords.latitude, longitude: coords.longitude } : skipToken,
    { skip: !coords }
  );

  const timings = data?.data?.timings;

  // Apply 12-hour format conversion
  const prayerSchedule = timings
    ? [
        { name: "Fajr", time: to12HourFormat(timings.Fajr) },
        { name: "Dhuhr", time: to12HourFormat(timings.Dhuhr) },
        { name: "Asr", time: to12HourFormat(timings.Asr) },
        { name: "Maghrib", time: to12HourFormat(timings.Maghrib) },
        { name: "Isha", time: to12HourFormat(timings.Isha) },
      ]
    : [
        { name: "Fajr", time: "05:30 AM" },
        { name: "Dhuhr", time: "01:30 PM" },
        { name: "Asr", time: "04:30 PM" },
        { name: "Maghrib", time: "06:05 PM" },
        { name: "Isha", time: "07:45 PM" },
      ];

  const sunrise = timings?.Sunrise ? to12HourFormat(timings.Sunrise) : "5:32 AM";
  const sunset = timings?.Sunset ? to12HourFormat(timings.Sunset) : "6:02 PM";

  // Highlight next prayer
  const nextPrayerIndex = prayerSchedule.findIndex(
    (p) => parseTime(p.time) > currentTime
  );
  const highlightedIndex = nextPrayerIndex === -1 ? 0 : nextPrayerIndex;

  // Date info
  const dateStr = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="bg-gradient-to-br from-indigo-950 to-sky-800 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-[1.01] p-6 flex flex-col h-full text-white">
      {/* Top: Clock + Date */}
      <div className="mb-6 border-b border-white/30 pb-4">
        <div className="flex items-end gap-1">
          <Clock className="w-5 h-5 text-white/90 mb-1" />
          <span className="font-extrabold text-5xl leading-none tracking-tight">
            {formatTime(currentTime).split(":")[0]}:{formatTime(currentTime).split(":")[1].slice(0, 2)}
          </span>
          <span className="font-semibold text-2xl leading-none self-end pb-[4px]">
            {currentTime.toLocaleTimeString("en-US", { hour12: true }).split(" ")[1]}
          </span>
        </div>

        <div className="pt-2 flex items-center gap-2 text-white/80 text-sm font-medium">
          <Calendar className="w-4 h-4" />
          <span>{dateStr}</span>
        </div>
      </div>

      {/* Middle: Prayer Schedule */}
      <div className="flex-grow mb-2">
        <h3 className="font-bold text-xl mb-4 text-white">Prayer Schedule</h3>
        {isLoading ? (
          <p className="text-white/60 text-sm">Loading prayer times...</p>
        ) : isError ? (
          <p className="text-red-400 text-sm">Unable to fetch prayer times.</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {prayerSchedule.map((prayer, idx) => {
              const isNext = idx === highlightedIndex;
              return (
                <li
                  key={idx}
                  className={`flex justify-between items-center p-2 rounded-lg transition-all duration-200 
                    ${isNext
                      ? "bg-sky-200 text-gray-900 font-bold shadow-lg transform scale-[1.02]"
                      : "hover:bg-indigo-500/50"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    {isNext && <Zap className="w-4 h-4 text-sky-600 fill-sky-500" />}
                    <span className={`font-semibold text-base ${isNext ? "text-indigo-700" : "text-white/90"}`}>
                      {prayer.name}
                    </span>
                  </div>
                  <span className={`font-extrabold text-base ${isNext ? "text-gray-900" : "text-white"}`}>
                    {prayer.time}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Footer: Sunrise / Sunset */}
      <div className="border-t border-white/30 pt-4 text-sm font-medium text-white/80 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sun className="w-4 h-4 text-yellow-300" />
            <span>Sunrise</span>
          </div>
          <span className="font-bold">{sunrise}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Moon className="w-4 h-4 text-white" />
            <span>Sunset</span>
          </div>
          <span className="font-bold">{sunset}</span>
        </div>
      </div>
    </div>
  );
};
