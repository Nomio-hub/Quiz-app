import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { pool } from "@/src/lib/db";
import { createId } from "@paralleldrive/cuid2";
import { auth, currentUser } from "@clerk/nextjs/server";

async function getOrCreateUser(clerkId: string, email: string) {
  const existing = await pool.query(
    `SELECT id FROM "User" WHERE "clerkId" = $1`,
    [clerkId],
  );

  if (existing.rows.length > 0) {
    return existing.rows[0].id;
  }

  const newId = createId();
  await pool.query(
    `INSERT INTO "User" (id, "clerkId", email, "createdAt", "updatedAt")
     VALUES ($1, $2, $3, NOW(), NOW())`,
    [newId, clerkId, email],
  );
  return newId;
}

export const GET = async () => {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userDbId = await getOrCreateUser(clerkId, "");

  const result = await pool.query(
    `SELECT id, title, "createdAt"
     FROM "Article"
     WHERE "userId" = $1
     ORDER BY "createdAt" DESC`,
    [userDbId],
  );

  return NextResponse.json({ articles: result.rows });
};

export const POST = async (request: Request) => {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { title, content } = body;

  const user = await currentUser();
  const userDbId = await getOrCreateUser(
    clerkId,
    user?.emailAddresses[0]?.emailAddress ?? "",
  );

  const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  });

  const interaction = await ai.interactions.create({
    model: "gemini-3.6-flash",
    input: `Please provide a concise summary of the following article.Do not start with "Summary:" or any label, just write the summary text directly.: ${content}`,
  });

  const summary = interaction.output_text;
  const articleId = createId();

  const result = await pool.query(
    `INSERT INTO "Article" (id, title, content, summary, "userId", "createdAt", "updatedAt")
     VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
     RETURNING id, title, summary, "createdAt"`,
    [articleId, title, content, summary, userDbId],
  );

  return NextResponse.json({
    message: "Amjilttai summerize hiilee",
    article: result.rows[0],
    summery: summary,
  });
};
