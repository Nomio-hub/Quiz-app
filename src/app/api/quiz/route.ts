import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { pool } from "@/src/lib/db";
import { createId } from "@paralleldrive/cuid2";
import { auth } from "@clerk/nextjs/server";

export const POST = async (request: Request) => {
  const { userId: clerkId } = await auth();
  if (!clerkId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { articleId } = await request.json();
  if (!articleId) {
    return NextResponse.json(
      { message: "articleId is required" },
      { status: 400 },
    );
  }

  const articleResult = await pool.query(
    `SELECT a.id, a.content
     FROM "Article" a
     JOIN "User" u ON u.id = a."userId"
     WHERE a.id = $1 AND u."clerkId" = $2`,
    [articleId, clerkId],
  );

  if (articleResult.rows.length === 0) {
    return NextResponse.json({ message: "Article not found" }, { status: 404 });
  }

  const article = articleResult.rows[0];

  // Хэрвээ энэ article-д quiz аль хэдийн үүссэн бол дахин generate хийхгүй, хуучныг ашиглана
  const existingQuiz = await pool.query(
    `SELECT id FROM "Quiz" WHERE "articleId" = $1 ORDER BY "createdAt" DESC LIMIT 1`,
    [articleId],
  );

  let quizId: string;

  if (existingQuiz.rows.length > 0) {
    quizId = existingQuiz.rows[0].id;
  } else {
    const ai = new GoogleGenAI({
      apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    });

    const interaction = await ai.interactions.create({
      model: "gemini-3.6-flash",
      input: `Create exactly 5 multiple-choice quiz questions based on the article below.
Return ONLY valid JSON, no markdown, no code fences, no extra text — an array of exactly 5 objects:
[
  {
    "question": "string",
    "options": ["string", "string", "string", "string"],
    "correctAnswer": "string (must exactly match one of the options)"
  }
]

Article:
${article.content}`,
    });

    let parsed: {
      question: string;
      options: string[];
      correctAnswer: string;
    }[];

    try {
      const cleaned = (interaction.output_text ?? "")
        .replace(/```json|```/g, "")
        .trim();
      parsed = JSON.parse(cleaned);
    } catch (err) {
      console.error(
        "Failed to parse Gemini quiz output",
        interaction.output_text,
      );
      return NextResponse.json(
        { message: "Failed to generate quiz" },
        { status: 500 },
      );
    }

    quizId = createId();
    await pool.query(
      `INSERT INTO "Quiz" (id, "articleId", "createdAt", "updatedAt")
       VALUES ($1, $2, NOW(), NOW())`,
      [quizId, articleId],
    );

    for (const q of parsed) {
      await pool.query(
        `INSERT INTO "Question" (id, "quizId", question, options, "correctAnswer", "createdAt")
         VALUES ($1, $2, $3, $4, $5, NOW())`,
        [createId(), quizId, q.question, q.options, q.correctAnswer],
      );
    }
  }

  // correctAnswer-г client рүү явуулахгүй — эсвэл хэрэглэгч Network tab-с хуурч харна
  const questionsResult = await pool.query(
    `SELECT id, question, options FROM "Question" WHERE "quizId" = $1 ORDER BY "createdAt" ASC`,
    [quizId],
  );

  return NextResponse.json({ quizId, questions: questionsResult.rows });
};
