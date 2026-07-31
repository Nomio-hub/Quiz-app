import { NextResponse } from "next/server";
import { pool } from "@/src/lib/db";
import { auth } from "@clerk/nextjs/server";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const result = await pool.query(
    `SELECT a.id, a.title, a.content, a.summary, a."createdAt"
     FROM "Article" a
     JOIN "User" u ON u.id = a."userId"
     WHERE a.id = $1 AND u."clerkId" = $2`,
    [id, clerkId],
  );

  if (result.rows.length === 0) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ article: result.rows[0] });
};
