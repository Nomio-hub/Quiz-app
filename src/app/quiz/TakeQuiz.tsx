import React from "react";
import { SideBar } from "../components/SideBar";
import { Article } from "../components/Article";

const TakeQuiz = () => {
  return (
    <div className="min-h-screen w-full">
      <div className="flex min-h-screen w-full flex-col md:flex-row">
        <div className="flex flex-none overflow-hidden">
          <SideBar />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default TakeQuiz;
