// Lightweight JSON key/value storage using lowdb. Use dynamic import to avoid
// type mismatches across lowdb versions.
let db: any = null;

export async function initLocalDb() {
  if (db) return;
  const lowdb = await import('lowdb');
  const node = await import('lowdb/node');
  const adapter = new node.JSONFile('./replit_db.json');
  db = new lowdb.Low(adapter as any, {});
  await db.read();
  db.data ||= {};
}

export async function getLocal(key: string) {
  if (!db) await initLocalDb();
  await db.read();
  return db.data ? db.data[key] : undefined;
}

export async function setLocal(key: string, value: any) {
  if (!db) await initLocalDb();
  await db.read();
  db.data ||= {};
  db.data[key] = value;
  await db.write();
}

export default async function getDb() {
  if (!db) await initLocalDb();
  return db;
}
