import React from "react";
import { Article } from "../components/Article";
import { SideBar } from "../components/SideBar";

const page = () => {
  return (
    <div className="min-h-screen w-full">
      <div className="flex min-h-screen w-full flex-col md:flex-row">
        <div className="flex flex-none overflow-hidden">
          <SideBar />
        </div>

        {/* Main content */}
        <div className="flex w-full justify-center pt-10 bg-slate-50">
          <div className="w-full max-w-xl space-y-5 rounded-lg border border-[#E4E4E7] p-7 bg-white">
            <button>mfkisd</button>
            <Article name="Article Quiz Generator" />
            <div>
              <div className="flex items-center gap-2">
                <svg
                  width="15"
                  height="13"
                  viewBox="0 0 15 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.16667 3.16667C7.16667 2.45942 6.88571 1.78115 6.38562 1.28105C5.88552 0.780951 5.20724 0.5 4.5 0.5H0.5V10.5H5.16667C5.6971 10.5 6.20581 10.7107 6.58088 11.0858C6.95595 11.4609 7.16667 11.9696 7.16667 12.5M7.16667 3.16667V12.5M7.16667 3.16667C7.16667 2.45942 7.44762 1.78115 7.94771 1.28105C8.44781 0.780951 9.12609 0.5 9.83333 0.5H13.8333V10.5H9.16667C8.63623 10.5 8.12753 10.7107 7.75245 11.0858C7.37738 11.4609 7.16667 11.9696 7.16667 12.5"
                    stroke="#09090B"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p>Summarized content</p>
              </div>
              <p className="font-semibold text-2xl">Genghis khan</p>
              <p className="text-sm">
                Genghis Khan, born Temüjin around 1162, was the founder of the
                Mongol Empire. After his father's death, Temüjin's family was
                left in poverty, and he later killed his half-brother to secure
                his position. He built alliances with leaders like Jamukha and
                Toghrul, and despite being defeated in battle and briefly under
                the Jin dynasty, he rose to power by defeating rivals. By 1206,
                after overcoming the Naiman tribe and executing Jamukha, Temüjin
                became the undisputed ruler of the Mongol steppe, eventually
                leading a series of successful military campaigns that expanded
                his empire across China and Central Asia.
              </p>
            </div>
            <div>
              <div className="flex items-center  gap-2">
                <svg
                  width="15"
                  height="13"
                  viewBox="0 0 15 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.16667 3.16667C7.16667 2.45942 6.88571 1.78115 6.38562 1.28105C5.88552 0.780951 5.20724 0.5 4.5 0.5H0.5V10.5H5.16667C5.6971 10.5 6.20581 10.7107 6.58088 11.0858C6.95595 11.4609 7.16667 11.9696 7.16667 12.5M7.16667 3.16667V12.5M7.16667 3.16667C7.16667 2.45942 7.44762 1.78115 7.94771 1.28105C8.44781 0.780951 9.12609 0.5 9.83333 0.5H13.8333V10.5H9.16667C8.63623 10.5 8.12753 10.7107 7.75245 11.0858C7.37738 11.4609 7.16667 11.9696 7.16667 12.5"
                    stroke="#09090B"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p>Article Content</p>
              </div>
              <p className="text-sm">
                Genghis Khan, born Temüjin around 1162, was the founder of the
                Mongol Empire. After his father's death, Temüjin's family was
                left in poverty, and he later killed his half-brother to secure
                his position.
              </p>
              <div className="flex justify-end font">See more</div>
            </div>
            <div className="flex justify-start ">
              <button className="w-full rounded-md bg-black px-4 py-2 text-sm font-medium text-white sm:w-auto">
                Take a quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
