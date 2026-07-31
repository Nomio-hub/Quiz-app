"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { Article } from "../components/Article";
import { SideBar } from "../components/SideBar";
import ReactMarkdown from "react-markdown";

type ArticleData = {
  id: string;
  title: string;
  content: string;
  summary: string;
};

function BackIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 18l-6-6 6-6"
        stroke="#09090B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const SummaryContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [article, setArticle] = useState<ArticleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFullContent, setShowFullContent] = useState(false);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchArticle = async () => {
      try {
        const response = await axios.get(`/api/article/${id}`);
        setArticle(response.data.article);
      } catch (error) {
        console.error("Failed to fetch article", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  return (
    <div className="min-h-screen w-full">
      <div className="flex min-h-screen w-full flex-col md:flex-row">
        <div className="flex flex-none overflow-hidden">
          <SideBar />
        </div>

        <div className="flex w-full flex-col items-center pt-10 bg-slate-50">
          <div className="mb-4 w-full max-w-xl">
            <button
              onClick={() => router.push("/")}
              aria-label="Буцах"
              className="flex items-center justify-center rounded-md border border-[#E4E4E7] bg-white p-2"
            >
              <BackIcon />
            </button>
          </div>

          <div className="w-full max-w-xl space-y-5 rounded-lg border border-[#E4E4E7] bg-white p-7">
            <Article name="Article Quiz Generator" />

            {loading && (
              <p className="text-sm text-[#71717A]">Уншиж байна...</p>
            )}

            {!loading && !article && (
              <p className="text-sm text-[#71717A]">Article олдсонгүй</p>
            )}

            {!loading && article && (
              <>
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
                  <p className="text-2xl font-semibold">{article.title}</p>
                  <div className="prose prose-sm max-w-none text-sm">
                    <ReactMarkdown>{article.summary}</ReactMarkdown>
                  </div>
                </div>

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
                    <p>Article Content</p>
                  </div>
                  <p
                    className={`text-sm ${!showFullContent ? "line-clamp-3" : ""}`}
                  >
                    {article.content}
                  </p>
                  <div
                    className="flex cursor-pointer justify-end text-sm text-[#71717A] hover:text-black"
                    onClick={() => setShowFullContent((prev) => !prev)}
                  >
                    {showFullContent ? "See less" : "See more"}
                  </div>
                </div>

                <div className="flex justify-start">
                  <button
                    onClick={() => router.push(`/quiz?id=${article.id}`)}
                    className="w-full rounded-md bg-black px-4 py-2 text-sm font-medium text-white sm:w-auto"
                  >
                    Take a quiz
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const SummaryPage = () => {
  return (
    <Suspense fallback={null}>
      <SummaryContent />
    </Suspense>
  );
};

export default SummaryPage;
