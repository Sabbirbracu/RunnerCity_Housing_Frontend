import { Bell, Globe, Pin } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

// Dummy notices with Bangla as primary, English as translated
const dummyNotices = [
  {
    id: 1,
    title_bn: "মাসিক ফি পরিশোধের রিমাইন্ডার",
    title_en: "Monthly Fee Payment Reminder",
    body_bn: "মে ২০২৬ মাসের রক্ষণাবেক্ষণ ফি ৳৩,৫০০ বকেয়া আছে। বিলম্ব চার্জ এড়াতে অনুগ্রহ করে ১০ তারিখের মধ্যে পরিশোধ করুন।",
    body_en: "The maintenance fee of ৳3,500 for May 2026 is due. Please pay before the 10th to avoid late charges.",
    date: "2026-05-01",
    type: "fee",
    pinned: true,
  },
  {
    id: 2,
    title_bn: "পানি সরবরাহ বিঘ্নিত - ব্লক A ও B",
    title_en: "Water Supply Disruption - Block A & B",
    body_bn: "পাম্প মেরামতের কারণে ২৮ মে সকাল ১০টা থেকে বিকাল ৪টা পর্যন্ত পানি সরবরাহ বন্ধ থাকবে। অনুগ্রহ করে আগে থেকে পানি সংরক্ষণ করুন।",
    body_en: "Due to pump maintenance, water supply will be disrupted on May 28 from 10 AM to 4 PM. Please store water in advance.",
    date: "2026-05-25",
    type: "maintenance",
    pinned: true,
  },
  {
    id: 3,
    title_bn: "নতুন সিসিটিভি ক্যামেরা স্থাপন",
    title_en: "New CCTV Cameras Installed",
    body_bn: "ব্লক E প্রবেশপথ এবং মূল গেটে ৪টি নতুন সিসিটিভি ক্যামেরা স্থাপন করা হয়েছে। এটি আমাদের নিরাপত্তা উন্নয়ন প্রকল্পের অংশ।",
    body_en: "4 new CCTV cameras have been installed at Block E entrance and the main gate. This is part of our security upgrade initiative.",
    date: "2026-05-18",
    type: "security",
    pinned: false,
  },
  {
    id: 4,
    title_bn: "কমিউনিটি মিটিং - ৫ জুন",
    title_en: "Community Meeting - June 5",
    body_bn: "৫ জুন সন্ধ্যা ৭টায় কমিউনিটি হলে একটি সাধারণ সভা অনুষ্ঠিত হবে। সকল প্লট মালিকদের উপস্থিত থাকার অনুরোধ করা হচ্ছে।",
    body_en: "A general community meeting will be held on June 5 at 7 PM in the community hall. All plot owners are requested to attend.",
    date: "2026-05-20",
    type: "general",
    pinned: false,
  },
  {
    id: 5,
    title_bn: "ঈদের ছুটিতে স্টাফ",
    title_en: "Eid Vacation for Staff",
    body_bn: "সকল স্টাফ (গার্ড, ক্লিনার) ১৫-১৮ জুন ঈদের ছুটিতে থাকবেন। জরুরি যোগাযোগ: ০১৭০০০০০০০০।",
    body_en: "All staff (guards, cleaners) will have Eid vacation from June 15-18. Emergency contact: 01700000000.",
    date: "2026-05-10",
    type: "general",
    pinned: false,
  },
  {
    id: 6,
    title_bn: "রাস্তা উন্নয়ন কাজ শুরু",
    title_en: "Road Development Work Begins",
    body_bn: "আগামী সপ্তাহ থেকে ব্লক A ও B এর মধ্যবর্তী রাস্তার উন্নয়ন কাজ শুরু হবে। গাড়ি চলাচলে কিছুটা অসুবিধা হতে পারে।",
    body_en: "Road development work between Block A and B will begin next week. There may be some inconvenience for vehicle movement.",
    date: "2026-05-05",
    type: "maintenance",
    pinned: false,
  },
];

const typeConfig = {
  fee: { color: "from-blue-500 to-blue-600", badge: "bg-blue-100 text-blue-700", label_en: "Fee", label_bn: "ফি" },
  maintenance: { color: "from-amber-500 to-amber-600", badge: "bg-amber-100 text-amber-700", label_en: "Maintenance", label_bn: "রক্ষণাবেক্ষণ" },
  security: { color: "from-purple-500 to-purple-600", badge: "bg-purple-100 text-purple-700", label_en: "Security", label_bn: "নিরাপত্তা" },
  general: { color: "from-gray-500 to-gray-600", badge: "bg-gray-100 text-gray-700", label_en: "General", label_bn: "সাধারণ" },
};

const Notices = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";
  const [filter, setFilter] = useState("all");

  const types = ["all", "fee", "maintenance", "security", "general"];
  const filtered = filter === "all" ? dummyNotices : dummyNotices.filter((n) => n.type === filter);

  const getTypeLabel = (type) => {
    if (type === "all") return isEn ? "All Notices" : "সব নোটিশ";
    const config = typeConfig[type];
    return isEn ? config?.label_en : config?.label_bn;
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">{t("sidebar.notices")}</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            {isEn ? "Community announcements & updates" : "কমিউনিটি ঘোষণা ও আপডেট"}
          </p>
        </div>
        <div className="flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-full">
          <Bell className="w-3.5 h-3.5 text-emerald-600" />
          <span className="text-xs font-semibold text-emerald-700">{filtered.length} {isEn ? "notices" : "টি নোটিশ"}</span>
        </div>
      </div>

      {/* Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition-all whitespace-nowrap ${
              filter === type
                ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                : "bg-white text-gray-500 border-gray-200 hover:border-emerald-300 hover:text-emerald-700"
            }`}
          >
            {getTypeLabel(type)}
          </button>
        ))}
      </div>

      {/* Notices List */}
      <div className="space-y-3">
        {filtered.map((notice) => {
          const config = typeConfig[notice.type] || typeConfig.general;
          const title = isEn ? notice.title_en : notice.title_bn;
          const body = isEn ? notice.body_en : notice.body_bn;

          return (
            <div
              key={notice.id}
              className={`relative bg-white rounded-xl border overflow-hidden transition-all hover:shadow-md group ${
                notice.pinned ? "border-emerald-200/80 shadow-sm" : "border-gray-100 shadow-sm"
              }`}
            >
              {/* Left color accent bar */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${config.color} rounded-l-xl`} />

              <div className="pl-5 pr-4 py-4 md:py-5">
                <div className="flex items-start gap-3.5">
                  {/* Date Block */}
                  <div className="hidden sm:flex flex-col items-center bg-gray-50/80 rounded-xl px-3 py-2.5 flex-shrink-0 min-w-[60px] border border-gray-100/50">
                    <span className="text-xl font-black text-gray-800 leading-none">
                      {new Date(notice.date).getDate()}
                    </span>
                    <span className="text-[10px] text-gray-500 font-bold uppercase mt-0.5">
                      {new Date(notice.date).toLocaleDateString(isEn ? "en-GB" : "bn-BD", { month: "short" })}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Badges */}
                    <div className="flex items-center gap-1.5 mb-2 flex-wrap">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${config.badge}`}>
                        {isEn ? config.label_en : config.label_bn}
                      </span>
                      {notice.pinned && (
                        <span className="flex items-center gap-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                          <Pin className="w-2.5 h-2.5" /> {isEn ? "Pinned" : "পিন"}
                        </span>
                      )}
                      {/* Mobile date */}
                      <span className="sm:hidden text-[10px] text-gray-400 font-medium ml-auto">
                        {new Date(notice.date).toLocaleDateString(isEn ? "en-GB" : "bn-BD", { day: "numeric", month: "short" })}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-[15px] md:text-base font-bold text-gray-900 mb-1.5 leading-snug group-hover:text-emerald-800 transition-colors">{title}</h3>

                    {/* Body */}
                    <p className="text-[13px] md:text-sm text-gray-500 leading-relaxed">{body}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="text-center py-14 bg-white rounded-xl border border-gray-100">
          <Bell className="w-10 h-10 mx-auto mb-3 text-gray-300" />
          <p className="text-sm font-semibold text-gray-500">{isEn ? "No notices found" : "কোনো নোটিশ পাওয়া যায়নি"}</p>
          <p className="text-xs text-gray-400 mt-0.5">{isEn ? "Try a different filter" : "অন্য ফিল্টার ব্যবহার করুন"}</p>
        </div>
      )}
    </div>
  );
};

export default Notices;
