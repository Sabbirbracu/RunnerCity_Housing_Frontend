import { Clock, Sun, Moon } from "lucide-react";

export const PrayerCard = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-3 flex flex-col justify-between border border-indigo-100">
      {/* ===== Top Section: Clock & Date ===== */}
      <div className="flex items-center justify-between mb-4">
        {/* Left: Clock */}
        <div className="flex items-center gap-2">
          <Clock className="w-8 h-8 text-indigo-500" />
          <span className="text-indigo-700 font-semibold text-lg">5:30 AM</span>
        </div>
        {/* Right: Date & Day */}
        <div className="text-right text-gray-500 text-sm">
          <div>Wednesday</div>
          <div>Oct 25, 2024</div>
        </div>
      </div>

      {/* ===== Middle Section: Prayer Times ===== */}
      <div className="mb-4">
        <h3 className="text-indigo-700 font-semibold text-lg mb-2">Prayer Times</h3>
        <ul className="space-y-2 text-gray-700 text-sm">
          {[
            { name: "Fajr", time: "5:30 AM" },
            { name: "Dhuhr", time: "1:30 PM" },
            { name: "Asr", time: "4:30 PM" },
            { name: "Maghrib", time: "6:05 PM", highlight: true },
            { name: "Isha", time: "7:45 PM" },
          ].map((prayer, idx) => (
            <li
              key={idx}
              className={`flex justify-between px-3 py-2 rounded-md ${
                prayer.highlight ? "bg-orange-50 text-orange-600 font-semibold" : "hover:bg-indigo-50"
              }`}
            >
              <span>{prayer.name}</span>
              <span className="font-semibold text-gray-800">{prayer.time}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ===== Footer Section: Sunrise & Sunset ===== */}
      <div className="border-t border-indigo-100 pt-3 text-gray-500 text-sm space-y-1">
        <div className="flex items-center gap-2">
          <Sun className="w-4 h-4 text-amber-400" />
          <span>Sunrise: 5:32 AM</span>
        </div>
        <div className="flex items-center gap-2">
          <Moon className="w-4 h-4 text-indigo-400" />
          <span>Sunset: 6:02 PM</span>
        </div>
      </div>
    </div>
  );
};
