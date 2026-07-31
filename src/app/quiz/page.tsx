"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { SideBar } from "../components/SideBar";
import { Article } from "../components/Article";

type Question = {
  id: string;
  question: string;
  options: string[];
};

function QuizContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const articleId = searchParams.get("id");

  const [loading, setLoading] = useState(true);
  const [quizId, setQuizId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    if (!articleId) {
      setLoading(false);
      return;
    }
    const generateQuiz = async () => {
      try {
        const response = await axios.post("/api/quiz", { articleId });
        setQuizId(response.data.quizId);
        setQuestions(response.data.questions);
      } catch (error) {
        console.error("Failed to generate quiz", error);
      } finally {
        setLoading(false);
      }
    };
    generateQuiz();
  }, [articleId]);

  const currentQuestion = questions[currentIndex];

  type QuestionResult = {
    questionId: string;
    question: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
  };

  type QuizResult = {
    score: number;
    totalCount: number;
    breakdown: QuestionResult[];
  };

  function CheckIcon() {
    return (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 11C0 4.92472 4.92472 0 11 0C17.0753 0 22 4.92472 22 11C22 17.0753 17.0753 22 11 22C4.92472 22 0 17.0753 0 11ZM11 2C6.02928 2 2 6.02928 2 11C2 15.9707 6.02928 20 11 20C15.9707 20 20 15.9707 20 11C20 6.02928 15.9707 2 11 2Z"
          fill="#22C55E"
        />
      </svg>
    );
  }

  function XIcon() {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12Z"
          fill="#B91C1C"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M15.7071 8.29289C16.0976 8.68342 16.0976 9.31658 15.7071 9.70711L9.70711 15.7071C9.31658 16.0976 8.68342 16.0976 8.29289 15.7071C7.90237 15.3166 7.90237 14.6834 8.29289 14.2929L14.2929 8.29289C14.6834 7.90237 15.3166 7.90237 15.7071 8.29289Z"
          fill="#B91C1C"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8.29289 8.29289C8.68342 7.90237 9.31658 7.90237 9.70711 8.29289L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L8.29289 9.70711C7.90237 9.31658 7.90237 8.68342 8.29289 8.29289Z"
          fill="#B91C1C"
        />
      </svg>
    );
  }

  function RestartIcon() {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 1.40662C11.0986 1.40681 12.7068 3.56929 13.4316 4.84705L14.0283 5.89978H11.1992C11.181 5.89957 11.166 5.88483 11.166 5.86658C11.166 5.84836 11.181 5.83358 11.1992 5.83337H13.8867L13.4932 5.09705C12.8509 3.89688 11.2581 1.47323 8 1.47302C4.02006 1.47302 1.47266 4.73535 1.47266 8.00037C1.47287 11.2653 4.02023 14.5267 8 14.5267C9.91506 14.5266 11.4973 13.7718 12.624 12.6254C13.2294 12.0095 13.704 11.2803 14.0273 10.4945C14.0344 10.4776 14.0533 10.4691 14.0703 10.476C14.0873 10.4829 14.0959 10.5029 14.0889 10.5199C13.7623 11.3135 13.2834 12.05 12.6719 12.6722C11.5331 13.8308 9.9337 14.593 8 14.5931C3.97859 14.5931 1.40646 11.2971 1.40625 8.00037C1.40625 4.70354 3.97842 1.40662 8 1.40662ZM14.3994 2.63318C14.4177 2.63318 14.4325 2.64812 14.4326 2.66638V5.86658C14.4326 5.88496 14.4178 5.89978 14.3994 5.89978H14.3662V2.66638C14.3664 2.64818 14.3812 2.63328 14.3994 2.63318Z"
          fill="#09090B"
          stroke="#18181B"
        />
      </svg>
    );
  }

  function BookmarkIcon() {
    return (
      <svg
        width="11"
        height="13"
        viewBox="0 0 11 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.83333 12.5L5.16667 9.83333L0.5 12.5V1.83333C0.5 1.47971 0.640476 1.14057 0.890524 0.890524C1.14057 0.640476 1.47971 0.5 1.83333 0.5H8.5C8.85362 0.5 9.19276 0.640476 9.44281 0.890524C9.69286 1.14057 9.83333 1.47971 9.83333 1.83333V12.5Z"
          stroke="#FAFAFA"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
  }

  const handleSelect = (option: string) => {
    if (!currentQuestion) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: option }));
  };

  const handleRestart = () => {
    setResult(null);
    setAnswers({});
    setCurrentIndex(0);
  };

  const handleNext = async () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      return;
    }
    if (!quizId) return;
    setSubmitting(true);
    try {
      const payload = {
        quizId,
        answers: questions.map((q) => ({
          questionId: q.id,
          userAnswer: answers[q.id] ?? "",
        })),
      };
      const response = await axios.post("/api/quiz/submit", payload);
      setResult(response.data);
    } catch (error) {
      console.error("Failed to submit quiz", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full">
      <div className="flex min-h-screen w-full flex-col md:flex-row">
        <div className="flex flex-none overflow-hidden">
          <SideBar />
        </div>

        <div className="flex w-full justify-center p-4 bg-slate-50">
          <div className="w-full max-w-xl space-y-2 rounded-lg p-4">
            <div className="flex-1 pt-15 flex justify-between">
              <Article
                name="Quick completed"
                description="Let’s see what you did"
              />
              <button
                type="button"
                onClick={() => router.push(`/summary?id=${articleId}`)}
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

            {loading && (
              <div className="border border-[#E4E4E7] bg-white p-7 rounded-md text-sm text-[#71717A]">
                Асуултууд бэлдэж байна...
              </div>
            )}

            {!loading && questions.length === 0 && !result && (
              <div className="border border-[#E4E4E7] bg-white p-7 rounded-md text-sm text-[#71717A]">
                Асуулт үүсгэж чадсангүй. Дахин оролдоно уу.
              </div>
            )}

            {!loading && result && (
              <div className="space-y-1">
                <div className="border border-[#E4E4E7] bg-white p-7 space-y-5 rounded-md mt-4">
                  <p className="text-xl font-semibold">
                    Your score: {result.score}
                    <span className="text-base font-normal text-[#737373]">
                      {" "}
                      / {result.totalCount}
                    </span>
                  </p>

                  <div className="space-y-4">
                    {result.breakdown.map((item, idx) => (
                      <div key={item.questionId} className="flex gap-3">
                        <div className="mt-0.5 flex-shrink-0">
                          {item.isCorrect ? <CheckIcon /> : <XIcon />}
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-sm text-[#52525B]">
                            {idx + 1}. {item.question}
                          </p>
                          <p className="text-sm font-medium text-black">
                            Your answer: {item.userAnswer || "—"}
                          </p>
                          {!item.isCorrect && (
                            <p className="text-sm font-medium text-green-600">
                              Correct: {item.correctAnswer}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleRestart}
                      className="flex items-center gap-2 rounded-md border border-[#E4E4E7] bg-white px-4 py-2 text-sm font-medium hover:bg-zinc-50"
                    >
                      <RestartIcon />
                      Restart quiz
                    </button>
                    <button
                      onClick={() => router.push(`/summary?id=${articleId}`)}
                      className="flex items-center gap-2 rounded-md bg-black px-4 py-2 text-sm font-medium text-white"
                    >
                      <BookmarkIcon />
                      Save and leave
                    </button>
                  </div>
                </div>
              </div>
            )}

            {!loading && !result && currentQuestion && (
              <div className="border border-[#E4E4E7] bg-white p-7 space-y-4 rounded-md">
                <div className="flex justify-between">
                  <p className="text-xl font-medium">
                    {currentQuestion.question}
                  </p>
                  <p className="text-xl font-medium whitespace-nowrap">
                    {currentIndex + 1}
                    <span className="text-[#737373] text-base"> / </span>
                    <span className="text-[#737373] text-base">
                      {questions.length}
                    </span>
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {currentQuestion.options.map((option) => {
                    const isSelected = answers[currentQuestion.id] === option;
                    return (
                      <div
                        key={option}
                        onClick={() => handleSelect(option)}
                        className={`cursor-pointer text-sm font-medium text-center border rounded-md py-2 transition-colors ${
                          isSelected
                            ? "border-black bg-black text-white"
                            : "border-[#E4E4E7] hover:bg-zinc-50"
                        }`}
                      >
                        {option}
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleNext}
                    disabled={!answers[currentQuestion.id] || submitting}
                    className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
                  >
                    {submitting
                      ? "Илгээж байна..."
                      : currentIndex < questions.length - 1
                        ? "Дараах"
                        : "Дуусгах"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function QuizPage() {
  return (
    <Suspense fallback={null}>
      <QuizContent />
    </Suspense>
  );
}
