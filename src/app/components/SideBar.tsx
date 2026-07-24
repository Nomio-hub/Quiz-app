"use client";
import React, { useState } from "react";

const HISTORY_ITEMS = [
  "Genghis Khan",
  "Figma ашиглах заавар",
  "Санхүүгийн шийдвэрүүд",
  "Figma-д загвар зохион бүтээх аргачлалууд",
  "Санхүүгийн технологи 2023",
  "Хэрэглэгчийн интерфейс дизайны шилдэг туршлага",
  "Архитектур загварчлалын хэтэлбэрүүд",
  "Эрүүл амьдралын хэв маяг",
  "Технологийн салбарт хийгдэж буй инновац",
];

function ToggleIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.96997 2V22M14.97 9.44L12.41 12L14.97 14.56M21.97 15V9C21.97 4 19.97 2 14.97 2H8.96997C3.96997 2 1.96997 4 1.96997 9V15C1.96997 20 3.96997 22 8.96997 22H14.97C19.97 22 21.97 20 21.97 15Z"
        stroke="#292D32"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const SideBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <div className="flex h-full border-r border-[#E4E4E7]">
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-2 p-4 justify-between">
          {sidebarOpen && (
            <p className="whitespace-nowrap text-xl font-semibold">History</p>
          )}
          <button
            onClick={() => setSidebarOpen((open) => !open)}
            aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            <ToggleIcon />
          </button>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ${
            sidebarOpen ? "w-64" : "w-0"
          }`}
        >
          <div className="w-64 space-y-4 overflow-y-auto px-4 pb-4 text-sm text-[#3F3F46]">
            {HISTORY_ITEMS.map((item) => (
              <p
                key={item}
                className="cursor-pointer leading-snug hover:text-black"
              >
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
