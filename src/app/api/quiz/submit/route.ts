import { NextResponse } from "next/server";
import { pool } from "@/src/lib/db";
import { createId } from "@paralleldrive/cuid2";
import { auth } from "@clerk/nextjs/server";
import { getOrCreateUser } from "@/src/lib/getOrCreateUser";

export const POST = async (request: Request) => {
  const { userId: clerkId } = await auth();
  if (!clerkId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { quizId, answers } = await request.json();
  if (!quizId || !Array.isArray(answers)) {
    return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
  }

  const userDbId = await getOrCreateUser(clerkId, "");

  const questionsResult = await pool.query(
    `SELECT id, question, "correctAnswer" FROM "Question" WHERE "quizId" = $1 ORDER BY "createdAt" ASC`,
    [quizId],
  );
  const questionMap = new Map(
    questionsResult.rows.map((q) => [
      q.id,
      { question: q.question, correctAnswer: q.correctAnswer },
    ]),
  );

  let score = 0;
  const breakdown = answers.map(
    (a: { questionId: string; userAnswer: string }) => {
      const info = questionMap.get(a.questionId);
      const isCorrect = info?.correctAnswer === a.userAnswer;
      if (isCorrect) score += 1;
      return {
        questionId: a.questionId,
        question: info?.question ?? "",
        userAnswer: a.userAnswer,
        correctAnswer: info?.correctAnswer ?? "",
        isCorrect,
      };
    },
  );

  const attemptId = createId();
  await pool.query(
    `INSERT INTO "QuizAttempt" (id, "quizId", "userId", score, "totalCount", "createdAt")
     VALUES ($1, $2, $3, $4, $5, NOW())`,
    [attemptId, quizId, userDbId, score, questionsResult.rows.length],
  );

  for (const b of breakdown) {
    await pool.query(
      `INSERT INTO "QuizAnswer" (id, "attemptId", "questionId", "userAnswer", "isCorrect")
       VALUES ($1, $2, $3, $4, $5)`,
      [createId(), attemptId, b.questionId, b.userAnswer, b.isCorrect],
    );
  }

  return NextResponse.json({
    score,
    totalCount: questionsResult.rows.length,
    breakdown,
  });
};
