import React from "react";
import { SideBar } from "../components/SideBar";
import { Article } from "../components/Article";

export default function QuizPage() {
  return (
    <div className="min-h-screen w-full ">
      <div className="flex min-h-screen w-full flex-col md:flex-row">
        {/* Sidebar хэсэг */}
        <div className="flex flex-none overflow-hidden">
          <SideBar />
        </div>
        <div className="flex w-full justify-center p-4 bg-slate-50">
          <div className="w-full max-w-xl space-y-2 rounded-lg p-4">
            <div className="flex-1 p-6 flex justify-between">
              <Article
                name="Quick test"
                description="Take a quick test about your knowledge from your content"
              />

              <button
                type="button"
                className="w-10 h-10 rounded-md border border-zinc-200 bg-white flex items-center justify-center hover:bg-zinc-100 transition-colors"
                aria-label="Close"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#18181B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="border border-[#E4E4E7] bg-white p-7 space-y-4 rounded-md">
              <div className="flex justify-between">
                <p className="text-xl font-medium">
                  What was Gengis Khan's birth name?
                </p>
                <p className="text-xl font-medium">
                  1 <span className="text-[#737373] text-base">/ </span>
                  <span className="text-[#737373] text-base">5</span>
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-sm font-medium justify-center items-center text-center border border-[#E4E4E7] rounded-md py-2">
                  Yesugei
                </div>
                <div className="text-sm font-medium justify-center items-center text-center border border-[#E4E4E7] rounded-md py-2">
                  Temüjin
                </div>
                <div className="text-sm font-medium justify-center items-center text-center border border-[#E4E4E7] rounded-md py-2">
                  Jamukha
                </div>
                <div className="text-sm font-medium justify-center items-center text-center border border-[#E4E4E7] rounded-md py-2">
                  Toghrul
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
