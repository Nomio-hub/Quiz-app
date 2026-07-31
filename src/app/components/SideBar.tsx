"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

type ArticleItem = {
  id: string;
  title: string;
  createdAt: string;
};

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
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("/api/article");
        setArticles(response.data.articles);
      } catch (error) {
        console.error("Failed to fetch articles", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

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
            {loading && <p className="text-[#A1A1AA]">Уншиж байна...</p>}

            {!loading && articles.length === 0 && (
              <p className="text-[#A1A1AA]">Түүх хоосон байна</p>
            )}

            {articles.map((article) => (
              <p
                key={article.id}
                className="cursor-pointer leading-snug hover:text-black"
                onClick={() => router.push(`/summary?id=${article.id}`)}
              >
                {article.title}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
