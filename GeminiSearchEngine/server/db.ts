/**
 * DB adapter placeholder.
 *
 * This project uses Drizzle for ORM. To enable a local SQLite
 * connection, install the runtime adapter packages:
 *
 *   npm install better-sqlite3 @drizzle-orm/better-sqlite3 --save
 *
 * Then replace this file with code that creates a Drizzle instance
 * using the adapter. Leaving this placeholder avoids compile-time
 * errors until you add the adapter.
 */

export function getDb() {
  throw new Error(
    'Database adapter not installed. Install better-sqlite3 and @drizzle-orm/better-sqlite3 and implement server/db.ts to return a Drizzle instance.'
  );
}
