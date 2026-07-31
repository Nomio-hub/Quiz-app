import { pool } from "@/src/lib/db";
import { createId } from "@paralleldrive/cuid2";

export async function getOrCreateUser(clerkId: string, email: string) {
  const existing = await pool.query(
    `SELECT id FROM "User" WHERE "clerkId" = $1`,
    [clerkId],
  );
  if (existing.rows.length > 0) return existing.rows[0].id;

  const newId = createId();
  await pool.query(
    `INSERT INTO "User" (id, "clerkId", email, "createdAt", "updatedAt")
     VALUES ($1, $2, $3, NOW(), NOW())`,
    [newId, clerkId, email],
  );
  return newId;
}
