import { Calendar, Heart, MapPin, Users } from "lucide-react";
import { useTranslation } from "react-i18next";

// Dummy events — replace with API when ready
const dummyEvents = [
  {
    id: 1,
    title: "Ramadan Iftar Gathering",
    description: "Community iftar for all residents. Food will be arranged by the committee. Families are welcome.",
    date: "2026-06-10",
    time: "6:30 PM",
    location: "Community Hall",
    type: "religious",
    status: "upcoming",
    participants: 45,
  },
  {
    id: 2,
    title: "Blood Donation Camp",
    description: "Annual blood donation camp in collaboration with Red Crescent. All healthy adults are encouraged to participate.",
    date: "2026-06-15",
    time: "9:00 AM - 3:00 PM",
    location: "Block C Open Ground",
    type: "health",
    status: "upcoming",
    participants: 22,
  },
  {
    id: 3,
    title: "Road Development Fund Drive",
    description: "Collecting contributions for the internal road development project. Target: ৳5,00,000.",
    date: "2026-05-01",
    time: "Ongoing",
    location: "Online / Office",
    type: "fund",
    status: "active",
    participants: 67,
    target: 500000,
    collected: 185000,
  },
  {
    id: 4,
    title: "Eid Reunion & Cultural Program",
    description: "Post-Eid celebration with cultural performances, food stalls, and kids activities.",
    date: "2026-04-15",
    time: "5:00 PM",
    location: "Community Ground",
    type: "social",
    status: "completed",
    participants: 120,
  },
  {
    id: 5,
    title: "Tree Plantation Drive",
    description: "Plant trees around the community boundary. Saplings will be provided free. Bring your own gloves!",
    date: "2026-03-21",
    time: "7:00 AM",
    location: "All Blocks",
    type: "environment",
    status: "completed",
    participants: 35,
  },
];

const typeIcons = {
  religious: "🕌",
  health: "🩸",
  fund: "💰",
  social: "🎉",
  environment: "🌳",
};

const statusColors = {
  upcoming: "bg-blue-50 text-blue-700 ring-blue-200",
  active: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  completed: "bg-gray-100 text-gray-500 ring-gray-200",
};

const Events = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <h1 className="text-xl md:text-2xl font-bold text-gray-800">{t("sidebar.events")}</h1>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {dummyEvents.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-all flex flex-col"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <span className="text-2xl">{typeIcons[event.type] || "📅"}</span>
              <span className={`inline-flex items-center px-2.5 py-0.5 text-[10px] font-bold rounded-full ring-1 ring-inset uppercase ${statusColors[event.status] || statusColors.upcoming}`}>
                {event.status}
              </span>
            </div>

            {/* Title & Description */}
            <h3 className="text-base font-bold text-gray-900 mb-1.5">{event.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">{event.description}</p>

            {/* Fund Progress (if applicable) */}
            {event.target && (
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">৳{event.collected?.toLocaleString()} raised</span>
                  <span className="text-gray-500 font-medium">৳{event.target.toLocaleString()} goal</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.min(100, (event.collected / event.target) * 100)}%` }} />
                </div>
              </div>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 pt-3 border-t border-gray-50">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(event.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {event.location}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                {event.participants} joined
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
